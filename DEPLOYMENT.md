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
| `.github/workflows/deploy.yml` | On push to `master`: build every image, then trigger Render deploys via the REST API. |

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

### 2. Render — create an API key

**Dashboard → Account Settings → API Keys → Create API Key → copy it.**
One key covers all four services — the workflow looks each service up by name
(as declared in `render.yaml`) and triggers its deploy via the Render REST API.

### 3. GitHub — add the key as a repository secret

**Repo → Settings → Secrets and variables → Actions → New repository secret.**
Add one:

| Secret name | Value |
|-------------|-------|
| `RENDER_API_KEY` | the Render API key from step 2 |

That's it — one credential. (This replaces the old per-service deploy hooks,
which broke silently with a 404 whenever a service was recreated and got a new
`srv-` id. Resolving service ids by name avoids that.)

## The deploy flow

Push to `master` →

1. **build** job — for each service: `npm ci` + `docker build` (matrix, in
   parallel). Fails the pipeline if any image doesn't build.
2. **deploy** job — after all builds pass, resolves each service id by name and
   `POST`s the Render REST API to trigger a deploy (downstreams first, then the
   gateway).

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
