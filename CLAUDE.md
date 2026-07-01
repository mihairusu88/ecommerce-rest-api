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

Current state: `auth-service` has real JWT auth (login / me / refresh — see
below); `product-service` serves a 50-item catalog (list / get-by-id);
`order-service` serves a 25-item order store (list / get-by-id), mirroring the
product service. Persistence is a
**file-based mock database** in the repo-root `database/` folder — plain JS
modules exporting in-memory arrays (`users.js`, `products.js`, `orders.js`), imported directly
by the services. There is no MongoDB. `kafkajs` is still a declared dependency
but **not yet wired up**; expect to add Kafka as features land.

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
- `utils/` — everything else that used to live in `config/`. **`config/` holds
  only `swagger.js` + `schemas.js`; all other helpers go in `utils/`.** E.g.
  the gateway's `utils/proxy.js` + `utils/url.js`, and auth's `utils/jwt.js`,
  `utils/users.js`, `utils/cookies.js`, `utils/refreshStore.js`.

Data lives outside the services entirely, in the repo-root `database/` folder
(`users.js`, `products.js`) — plain modules exporting in-memory arrays, imported
via a relative path (e.g. `../../../database/products.js`).

When adding endpoints, follow this split: handler + `@openapi` JSDoc in
`routes/`, shared component definitions in `config/schemas.js`, other helpers in
`utils/`.

### Authentication (auth-service)

`auth-service` is the only service with real logic beyond health. Routes:
`POST /api/login`, `GET /api/me`, `POST /api/refresh`.

- **JWT** (`utils/jwt.js`) — HS256 via `jsonwebtoken`. Access tokens are signed
  with `JWT_SECRET` (falls back to `dev-secret-change-me`), `JWT_EXPIRES_IN`
  default `1h`. Refresh tokens are signed separately with `JWT_REFRESH_SECRET`
  (falls back to `<JWT_SECRET>-refresh`), `JWT_REFRESH_EXPIRES_IN` default `7d`,
  and tagged `type: "refresh"` so an access token can't be replayed at `/refresh`.
- **Users** (`utils/users.js`) — lookup + password helpers layered over the
  file-based store in `database/users.js` (bcrypt-hashed passwords, `id`/
  `username`/`email` unique; ~10 seed users that all share the password
  `test12345`, e.g. `guest`/`test12345`). Callers use `findUserByUsername` / `findUserById` /
  `verifyPassword` / `toPublicUser`.
- **Refresh-token store** (`utils/refreshStore.js`) — an in-memory allow-list of
  live refresh tokens enabling rotation: a token is accepted at `/refresh` only
  if it is both cryptographically valid AND still active; on refresh the old
  token is retired and a new pair issued. Resets on restart (fine for a mock).
- **Cookies** (`utils/cookies.js`) — login and refresh set `accessToken` +
  `refreshToken` as HTTP cookies (no `cookie-parser`; the raw `Cookie` header is
  parsed manually, responses use Express's `res.cookie`). `/refresh` reads the
  refresh token from the request body **or** the `refreshToken` cookie.
- **`authenticate` middleware** (`middleware/authenticate.js`) — requires
  `Authorization: Bearer <token>`, attaches the decoded payload to `req.user`,
  rejects with the standard 401 error shape otherwise. Guards `/me` (not
  `/refresh`, which authenticates via the refresh token itself).
- **Login/refresh responses** — `/api/login` returns the flat user profile
  (`id`, `username`, `email`, `firstName`, `lastName`, `gender`, `image`) plus
  `accessToken` + `refreshToken`; `/api/refresh` returns `{ accessToken,
  refreshToken }`. Both also set the two cookies.
- **Swagger login** — `config/swagger.js` declares a `passwordAuth` OAuth2
  *password* flow whose `tokenUrl` is `/api/login`, so the Swagger UI Authorize
  dialog can log in and auto-apply the Bearer token. `/api/login` deliberately
  also returns OAuth2 fields (`access_token`, `token_type`) alongside
  `accessToken` to satisfy that flow.

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
  `package.json` for its spec version, and the auth/product/order services import
  the repo-root `database/` folder. The Dockerfiles copy those in (`COPY database/
  /app/database/` for auth + product + order). Paths in the Dockerfiles are repo-relative.
- `docker-compose.yml` runs the full local stack (gateway + three services) with
  health-gated `depends_on`: `docker compose up --build`. No database container —
  persistence is the file-based mock in `database/`.
- `render.yaml` is a Render Blueprint provisioning all four as Docker web
  services. `autoDeploy` is **off**; deploys are triggered by GitHub Actions.
- `.github/workflows/deploy.yml` — on push to `master`: matrix-build every
  image, then trigger each service's deploy via the Render REST API (service ids
  resolved by name; downstreams first, gateway last). Needs a single
  `RENDER_API_KEY` secret. No test step yet (see Commands).
- `PORT` is injected by Render/Compose and never hard-coded; the port table above
  is only local defaults.
