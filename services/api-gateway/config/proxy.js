import { createProxyMiddleware } from "http-proxy-middleware";
import { normalizeBaseUrl } from "./url.js";

const AUTH_SERVICE_URL = normalizeBaseUrl(process.env.AUTH_SERVICE_URL || "http://localhost:3001");
const PRODUCT_SERVICE_URL = normalizeBaseUrl(process.env.PRODUCT_SERVICE_URL || "http://localhost:3002");
const ORDER_SERVICE_URL = normalizeBaseUrl(process.env.ORDER_SERVICE_URL || "http://localhost:3003");

// Gateway path prefixes here mirror the prefixes used when merging each
// service's spec in config/swagger.js. Every service mounts its routes under
// `/api`, so the gateway prefix (`/api/auth`, ...) is rewritten back to `/api`
// before forwarding (e.g. /api/orders/health -> /api/health).
const TARGETS = [
  { prefix: "/api/auth", url: AUTH_SERVICE_URL },
  { prefix: "/api/products", url: PRODUCT_SERVICE_URL },
  { prefix: "/api/orders", url: ORDER_SERVICE_URL },
];

/**
 * Build a reverse-proxy middleware for a single downstream service. Requests
 * whose path is (or starts with) the service prefix are forwarded to the
 * downstream service, with the service segment rewritten back to `/api`.
 * Unreachable downstreams return a 502 in the standard ErrorResponse shape.
 *
 * Register these BEFORE express.json() so request bodies stream through
 * untouched; each downstream service parses its own body.
 */
function serviceProxy({ prefix, url }) {
  return createProxyMiddleware({
    target: url,
    changeOrigin: true,
    // Match the prefix exactly or any subpath under it.
    pathFilter: (path) => path === prefix || path.startsWith(`${prefix}/`),
    // /api/<service>/... -> /api/...
    pathRewrite: { [`^${prefix}`]: "/api" },
    on: {
      error: (err, req, res) => {
        if (res.headersSent || !res.writeHead) return;
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: "error",
            message: `Bad Gateway — could not reach ${url}: ${err.message}`,
            statusCode: 502,
          })
        );
      },
    },
  });
}

// Array of per-service proxies; mount with a single `app.use(proxyMiddlewares)`.
export const proxyMiddlewares = TARGETS.map(serviceProxy);
