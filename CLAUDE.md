# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

An ecommerce REST API built as independent microservices under `services/`. Each
service is a self-contained Node.js (ESM) Express app with its own
`package.json`, `.env`, and dependencies — there is **no shared/workspace
dependency tree**; every service installs its own `node_modules`. The root
`package.json` is orchestration-only (`concurrently` + `npm --prefix` scripts,
see Commands); it is not an npm workspace.

| Service           | Port | Path prefix (via gateway) | Responsibility                        |
|-------------------|------|---------------------------|---------------------------------------|
| `api-gateway`     | 3000 | —                         | Entry point; aggregates OpenAPI docs  |
| `auth-service`    | 3001 | `/api/auth`               | Authentication & authorization        |
| `product-service` | 3002 | `/api/products`           | Product catalog                       |
| `order-service`   | 3003 | `/api/orders`             | Order management                      |

All application routes live under an `/api` prefix. Each service mounts its
router at `/api`, so it answers `GET /api/health` directly; through the gateway
those become `GET /api/auth/health`, `GET /api/products/health`, etc.

Current state: mostly scaffolding. `auth-service` has real JWT auth
(login / me / refresh — see below); `product-service` and `order-service` still
expose only `GET /api/health`. `mongoose` and `kafkajs` are declared dependencies
but **not yet wired up** — persistence is faked (see `auth-service/config/users.js`)
and expect to add MongoDB + Kafka as features land.

## Commands

Whole system, from the repo root (uses `concurrently`):

```bash
npm run install:all   # install root + all four services
npm run dev           # run all four with node --watch (color-prefixed logs)
npm start             # run all four with plain node
```

Or per service, from within `services/<name>/`:

```bash
npm install
npm run dev        # node --watch, auto-restarts on change
npm start          # plain node index.js
```

Copy `.env.example` to `.env` in each service first (defaults match the ports
above). There is **no test runner or linter** — every service's `npm test` is a
placeholder that exits 1, and the `eslint-disable` comments anticipate ESLint but
no config exists yet. CI therefore only runs `npm ci` + a Docker build.

## Architecture

### Per-service layout (identical across all four)

- `index.js` — Express app: `express.json()`, mounts `routes/`, serves Swagger
  UI at `/api-docs` and raw spec at `/api-docs.json`, then a 404 handler and a
  centralized error handler.
- `routes/index.js` — route definitions with OpenAPI docs in `@openapi` JSDoc
  comments above each handler.
- `config/swagger.js` — builds the service's OpenAPI spec with `swagger-jsdoc`,
  scanning `index.js` and `routes/*.js` for the JSDoc annotations.
- `config/schemas.js` — reusable OpenAPI component `schemas` and `responses`
  (e.g. `HealthResponse`, `ErrorResponse`, `NotFound`), referenced from route
  JSDoc via `$ref`.

When adding endpoints, follow this split: handler + `@openapi` JSDoc in
`routes/`, shared component definitions in `config/schemas.js`.

### Authentication (auth-service)

`auth-service` is the only service with real logic beyond health. Routes:
`POST /api/login`, `GET /api/me`, `POST /api/refresh`.

- **JWT** (`config/jwt.js`) — HS256 via `jsonwebtoken`, signed with `JWT_SECRET`
  (falls back to `dev-secret-change-me`), `JWT_EXPIRES_IN` default `1h`.
- **Users** (`config/users.js`) — a mock in-memory store with bcrypt-hashed
  passwords, standing in for a DB until Mongo lands (seed creds: `guest` /
  `guest12345`). Callers use `findUserByUsername` / `verifyPassword` /
  `toPublicUser`; swapping in model queries later shouldn't change route code.
- **`authenticate` middleware** (`middleware/authenticate.js`) — requires
  `Authorization: Bearer <token>`, attaches the decoded payload to `req.user`,
  rejects with the standard 401 error shape otherwise. Guards `/me` and `/refresh`.
- **Swagger login** — `config/swagger.js` declares a `passwordAuth` OAuth2
  *password* flow whose `tokenUrl` is `/api/login`, so the Swagger UI Authorize
  dialog can log in and auto-apply the Bearer token. `/api/login` deliberately
  returns OAuth2 fields (`access_token`, `token_type`) alongside `token` to
  satisfy that flow.

### Gateway spec aggregation (the one non-trivial piece)

`api-gateway/config/swagger.js` (`getMergedSpec`) fetches each downstream
service's `/api-docs.json` **server-side at request time** and merges them into a
single OpenAPI document served at the gateway's `/api-docs`:

- Each service's components and paths are **namespaced** (`Auth_`, `Product_`,
  `Order_`, `Gateway_`) and internal `$ref` pointers are rewritten to match, so
  same-named schemas across services don't collide.
- Paths are prefixed per the table above and every operation is re-tagged by
  service so the UI groups them.
- Results are cached for 30s (`CACHE_TTL_MS`); downstream fetches time out after
  3s (`FETCH_TIMEOUT_MS`).
- **Degrades gracefully**: an unreachable service still appears as a section
  marked unavailable rather than failing the whole doc.
- **Security schemes** (e.g. auth's OAuth2 `passwordAuth`) are merged in and
  their URLs rewritten so the login flow targets the gateway's prefixed path
  (`/api/auth/login`) instead of the downstream's own host.

Downstream URLs come from `AUTH_SERVICE_URL` / `PRODUCT_SERVICE_URL` /
`ORDER_SERVICE_URL`. These may be bare `host:port` (Render private networking) or
full `http://…` URLs; `config/url.js` (`normalizeBaseUrl`) prepends `http://`
when the scheme is missing so both forms work.

### Shared conventions

- **ESM throughout** — `"type": "module"`; note JSON imports use the
  `with { type: "json" }` import attribute.
- **Consistent error shape** — every service returns errors (including 404s) as
  `{ status: "error", message, statusCode }`. Throw errors with a `statusCode`
  property to control the response status; the centralized handler in `index.js`
  reads it.
- **Health responses** — `{ status: "OK", service, uptime }`.
- The gateway both aggregates docs and **reverse-proxies** request traffic:
  `config/proxy.js` uses [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware)
  to forward `/api/auth`, `/api/products`, and `/api/orders` to the
  corresponding downstream service, rewriting the service segment back to `/api`
  (e.g. `/api/orders/health` → the order service's `/api/health`), so the
  prefixed paths shown in the merged Swagger UI are live. The proxies are
  registered before `express.json()` so request bodies stream through untouched;
  unreachable downstreams return a `502` in the standard error shape (via each
  proxy's `on.error` handler).

## Deployment

Full details in [DEPLOYMENT.md](DEPLOYMENT.md); the key facts:

- Each service has a multi-stage `Dockerfile`. **The Docker build context is the
  repo root, not the service dir** — because the gateway imports the repo-root
  `package.json` for its spec version. Paths in the Dockerfiles are repo-relative.
- `docker-compose.yml` runs the full local stack (gateway + three services +
  MongoDB) with health-gated `depends_on`: `docker compose up --build`.
- `render.yaml` is a Render Blueprint provisioning all four as Docker web
  services. `autoDeploy` is **off**; deploys are triggered by GitHub Actions.
- `.github/workflows/deploy.yml` — on push to `master`: matrix-build every
  image, then trigger each service's deploy via the Render REST API (service ids
  resolved by name; downstreams first, gateway last). Needs a single
  `RENDER_API_KEY` secret. No test step yet (see Commands).
- `PORT` is injected by Render/Compose and never hard-coded; the port table above
  is only local defaults.
