# Deployment

This repo deploys to [Render](https://render.com) as four Docker web services.
CI (build) and CD (deploy trigger) run on every push to `master` via GitHub
Actions.

## Topology

```
                 ┌────────────────────────── Render (private network) ──────────┐
 internet ──► api-gateway (public)  ──http──►  auth-service                       │
              /api/auth|products|orders        product-service                    │
              /api-docs (aggregated)           order-service                       │
                 └──────────────────────────────────────────────────────────────┘
```

The gateway reaches the other three over Render's private network. `render.yaml`
wires the downstream addresses automatically with `fromService … property:
hostport` (yields `host:port`); the gateway prepends `http://`
([config/url.js](services/api-gateway/config/url.js)). `PORT` is injected by
Render — nothing hard-codes it.

## Files

| File | Purpose |
|------|---------|
| `services/*/Dockerfile` | One multi-stage image per service. **Build context is the repo root** (the gateway imports the repo-root `package.json`). |
| `.dockerignore` | Keeps `node_modules`/`.env` out of the build context. |
| `docker-compose.yml` | Local full stack (+ MongoDB). `docker compose up --build`. |
| `render.yaml` | Render Blueprint — provisions all four services. |
| `.github/workflows/deploy.yml` | On push to `master`: build every image, then trigger Render deploy hooks. |

## Local run

```bash
docker compose up --build
# Gateway + aggregated Swagger UI: http://localhost:3000/api-docs
```

## One-time setup

### 1. Render — create the services

1. Push this repo to GitHub (`master`).
2. Render dashboard → **New +** → **Blueprint** → select this repo. Render reads
   `render.yaml` and creates all four services.
3. When prompted, set the secret env var:
   - **auth-service → `JWT_SECRET`** — a long random string
     (`openssl rand -hex 32`).
4. Let the first deploy finish so the services exist and get their URLs.

`autoDeploy` is **off** in the blueprint on purpose — deploys are triggered by
GitHub Actions (below) so nothing ships unless CI passes.

### 2. Render — grab a Deploy Hook for each service

For each service: **Dashboard → the service → Settings → Deploy Hook → copy URL.**
You'll have four URLs (gateway, auth, product, order).

### 3. GitHub — add the hooks as repository secrets

**Repo → Settings → Secrets and variables → Actions → New repository secret.**
Add all four:

| Secret name | Value |
|-------------|-------|
| `RENDER_DEPLOY_HOOK_GATEWAY` | api-gateway deploy hook URL |
| `RENDER_DEPLOY_HOOK_AUTH` | auth-service deploy hook URL |
| `RENDER_DEPLOY_HOOK_PRODUCT` | product-service deploy hook URL |
| `RENDER_DEPLOY_HOOK_ORDER` | order-service deploy hook URL |

That's it — no Render API key needed. Deploy hooks are the only credential.

## The deploy flow

Push to `master` →

1. **build** job — for each service: `npm ci` + `docker build` (matrix, in
   parallel). Fails the pipeline if any image doesn't build.
2. **deploy** job — after all builds pass, `POST`s each Render deploy hook
   (downstreams first, then the gateway).

Trigger manually anytime from the **Actions** tab (`workflow_dispatch`).

## Notes / when features land

- **No tests yet.** `npm test` is a placeholder that exits 1, so CI runs
  `npm ci` + the Docker build only. Add a real test step to the `build` job once
  a test runner exists.
- **MongoDB / Kafka** are declared deps but not wired up. When they are:
  - add a managed MongoDB (e.g. Atlas) and set `MONGODB_URI` per service
    (`sync: false` in `render.yaml`, uncomment in `docker-compose.yml`);
  - Render has no managed Kafka — use an external provider and add its
    connection env vars the same way.
