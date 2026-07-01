# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

An ecommerce REST API built as independent microservices under `services/`. Each
service is a self-contained Node.js (ESM) Express app with its own
`package.json`, `.env`, and dependencies — there is no root-level workspace,
package manager config, or orchestration. Install and run each service
separately.

| Service           | Port | Path prefix (via gateway) | Responsibility                        |
|-------------------|------|---------------------------|---------------------------------------|
| `api-gateway`     | 3000 | —                         | Entry point; aggregates OpenAPI docs  |
| `auth-service`    | 3001 | `/api/auth`               | Authentication & authorization        |
| `product-service` | 3002 | `/api/products`           | Product catalog                       |
| `order-service`   | 3003 | `/api/orders`             | Order management                      |

All application routes live under an `/api` prefix. Each service mounts its
router at `/api`, so it answers `GET /api/health` directly; through the gateway
those become `GET /api/auth/health`, `GET /api/products/health`, etc.

Current state: scaffolding. Every service exposes only `GET /api/health` plus its
Swagger docs. `mongoose` and `kafkajs` are declared dependencies but not yet
wired up — expect to add MongoDB persistence and Kafka messaging as features land.

## Commands

Run per service (from within `services/<name>/`):

```bash
npm install        # once per service
npm run dev        # node --watch, auto-restarts on change
npm start          # plain node index.js
```

There is no test runner or linter configured — `npm test` is a placeholder that
exits 1. The `eslint-disable` comments in source anticipate ESLint but no config
exists yet.

To run the whole system, start each service in its own terminal. Copy
`.env.example` to `.env` in each service first (defaults match the ports above).

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

Downstream URLs come from `AUTH_SERVICE_URL` / `PRODUCT_SERVICE_URL` /
`ORDER_SERVICE_URL` in the gateway's `.env`.

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
