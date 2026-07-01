import swaggerJSDoc from "swagger-jsdoc";
import packageJson from "../package.json" with { type: "json" };
import rootPackageJson from "../../../package.json" with { type: "json" };
import { schemas, responses } from "./schemas.js";
import { normalizeBaseUrl } from "./url.js";

const PORT = process.env.PORT || 3000;

// Public origin the gateway is reached at. On Render this is injected as
// RENDER_EXTERNAL_URL; locally it falls back to localhost. Used for the Swagger
// `servers` entry and for rewriting downstream OAuth token URLs so the docs UI
// stays same-origin when deployed.
const PUBLIC_URL = process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: packageJson.version,
      description: "Entry point / gateway for the ecommerce platform.",
    },
    servers: [{ url: PUBLIC_URL, description: "Gateway" }],
    components: { schemas, responses },
  },
  // Scan source files for @openapi JSDoc annotations
  apis: ["./index.js", "./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);

const AUTH_SERVICE_URL = normalizeBaseUrl(process.env.AUTH_SERVICE_URL || "http://localhost:3001");
const PRODUCT_SERVICE_URL = normalizeBaseUrl(process.env.PRODUCT_SERVICE_URL || "http://localhost:3002");
const ORDER_SERVICE_URL = normalizeBaseUrl(process.env.ORDER_SERVICE_URL || "http://localhost:3003");

const DOWNSTREAM = [
  {
    tag: "Auth",
    ns: "Auth_",
    pathPrefix: "/api/auth",
    url: AUTH_SERVICE_URL,
    description: "Authentication & authorization endpoints.",
  },
  {
    tag: "Product",
    ns: "Product_",
    pathPrefix: "/api/products",
    url: PRODUCT_SERVICE_URL,
    description: "Product catalog endpoints.",
  },
  {
    tag: "Order",
    ns: "Order_",
    pathPrefix: "/api/orders",
    url: ORDER_SERVICE_URL,
    description: "Order management endpoints.",
  },
];

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "options", "head", "trace"];
const CACHE_TTL_MS = 30_000;
const FETCH_TIMEOUT_MS = 3_000;

let cache = { spec: null, expires: 0 };

/**
 * Rewrite all internal $ref pointers in a spec fragment so they resolve to the
 * namespaced component keys. Because each service's refs only point at its own
 * components, prefixing the ref base path with the service namespace is safe.
 */
function namespaceRefs(fragment, ns) {
  return JSON.parse(
    JSON.stringify(fragment)
      .replaceAll("#/components/schemas/", `#/components/schemas/${ns}`)
      .replaceAll("#/components/responses/", `#/components/responses/${ns}`)
  );
}

/**
 * Rewrite the URLs of an OAuth2 security scheme so they point at the gateway
 * (which proxies to the downstream service) instead of directly at the service.
 *
 * A downstream scheme's `tokenUrl` is `<service>/api/login`, but Swagger UI runs
 * on the gateway's origin — hitting the service directly is cross-origin and the
 * browser blocks it (CORS). Since the gateway already proxies `/api/<svc>` to the
 * service's `/api`, we rewrite `<service>/api/...` to `<gateway>/<pathPrefix>/...`
 * so the token request stays same-origin. Non-oauth2 schemes pass through.
 */
function rewriteSchemeUrls(def, { url, pathPrefix }) {
  if (def.type !== "oauth2" || !def.flows || !url) return def;
  const clone = structuredClone(def);
  const base = `${url}/api`;
  const gatewayBase = `${PUBLIC_URL}${pathPrefix}`;
  for (const flow of Object.values(clone.flows)) {
    for (const key of ["tokenUrl", "authorizationUrl", "refreshUrl"]) {
      if (typeof flow[key] === "string" && flow[key].startsWith(base)) {
        flow[key] = gatewayBase + flow[key].slice(base.length);
      }
    }
  }
  return clone;
}

/**
 * Merge one service's spec into the target merged document.
 */
function mergeService(target, spec, { tag, ns, pathPrefix, url }) {
  // Components: namespace names + rewrite internal refs.
  for (const [name, def] of Object.entries(spec.components?.schemas ?? {})) {
    target.components.schemas[ns + name] = namespaceRefs(def, ns);
  }
  for (const [name, def] of Object.entries(spec.components?.responses ?? {})) {
    target.components.responses[ns + name] = namespaceRefs(def, ns);
  }

  // Security schemes are intentionally NOT namespaced: every service
  // authenticates with the same platform JWT, so we share a single `bearerAuth`
  // entry. That yields one "Authorize" button in the merged UI whose token
  // applies to every protected endpoint across services. Operation-level
  // `security` requirements reference the scheme by name (not via $ref), so they
  // resolve as-is without rewriting. (Same-named schemes are assumed identical;
  // last one wins.)
  for (const [name, def] of Object.entries(spec.components?.securitySchemes ?? {})) {
    target.components.securitySchemes[name] = rewriteSchemeUrls(def, { url, pathPrefix });
  }

  // Paths: every service already documents its routes under `/api`. Strip that
  // leading segment and re-prefix with the gateway prefix so the merged doc
  // shows the gateway-facing path (e.g. auth's `/api/health` -> `/api/auth/health`,
  // the gateway's own `/api/health` stays `/api/health`). Also rewrite refs and
  // re-tag every operation.
  for (const [path, item] of Object.entries(spec.paths ?? {})) {
    const rewritten = namespaceRefs(item, ns);
    for (const method of HTTP_METHODS) {
      if (rewritten[method]) rewritten[method].tags = [tag];
    }
    const suffix = path.replace(/^\/api/, "");
    target.paths[`${pathPrefix}${suffix}`] = rewritten;
  }
}

/**
 * Fetch a service's raw OpenAPI spec (server-side, with a timeout).
 */
async function fetchSpec(baseUrl) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${baseUrl}/api-docs.json`, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Build (and cache) the merged spec. Degrades gracefully: if a service can't be
 * reached, it's still listed as a section but marked unavailable.
 */
export async function getMergedSpec() {
  const now = Date.now();
  if (cache.spec && now < cache.expires) return cache.spec;

  const merged = {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: rootPackageJson.version,
      description:
        "Unified API documentation for all ecommerce microservices, aggregated by the API Gateway.",
    },
    servers: [{ url: PUBLIC_URL, description: "Gateway" }],
    tags: [],
    paths: {},
    components: { schemas: {}, responses: {}, securitySchemes: {} },
  };

  // Gateway's own spec — already in-process, no HTTP needed.
  mergeService(merged, swaggerSpec, { tag: "API", ns: "Gateway_", pathPrefix: "/api" });
  merged.tags.push({ name: "API", description: "General API endpoints." });

  // Downstream services — fetched server-side.
  for (const svc of DOWNSTREAM) {
    try {
      const spec = await fetchSpec(svc.url);
      mergeService(merged, spec, {
        tag: svc.tag,
        ns: svc.ns,
        pathPrefix: svc.pathPrefix,
        url: svc.url,
      });
      merged.tags.push({ name: svc.tag, description: svc.description });
    } catch (err) {
      console.warn(
        `[api-gateway] could not fetch docs from ${svc.tag} (${svc.url}): ${err.message}`
      );
      merged.tags.push({
        name: svc.tag,
        description: `⚠️ Unavailable — could not fetch docs from ${svc.url}`,
      });
    }
  }

  cache = { spec: merged, expires: now + CACHE_TTL_MS };
  return merged;
}
