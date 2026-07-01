# Deployment

This repo deploys to [Render](https://render.com) as four Docker web services.
CI (build) and CD (deploy trigger) run on every push to `master` via GitHub
Actions.

## Topology

```
 internet ──► api-gateway (public)  ──https──►  auth-service    (public onrender.com)
              /api/auth|products|orders         product-service (public onrender.com)
              /api-docs (aggregated)            order-service   (public onrender.com)
```

The gateway reaches the other three over their **public** `onrender.com` URLs.
It cannot use Render's private network here: **free web services can't *receive*
private network traffic**, so private addresses (`fromService … property:
hostport`) would be unreachable. Instead, `render.yaml` declares
`AUTH_SERVICE_URL` / `PRODUCT_SERVICE_URL` / `ORDER_SERVICE_URL` as `sync: false`
vars that you set **manually in the dashboard** to each downstream's public URL
(e.g. `https://auth-service-xxxx.onrender.com`). The gateway prepends `http://`
only if a scheme is missing ([config/url.js](services/api-gateway/config/url.js)).
`PORT` is injected by Render — nothing hard-codes it.

> Free services also spin down after 15 min idle and take ~1 min to wake on the
> next public request — so a downstream may briefly show "Unavailable" in the
> aggregated docs (the gateway's fetch times out after 3s) until it's warm.
> Upgrade the downstreams to a paid plan to get private networking + no
> spin-down; then you can switch these vars back to `fromService … property: hostport`.

## Files

| File | Purpose |
|------|---------|
| `services/*/Dockerfile` | One multi-stage image per service. **Build context is the repo root** (the gateway imports the repo-root `package.json`). |
| `.dockerignore` | Keeps `node_modules`/`.env` out of the build context. |
| `docker-compose.yml` | Local full stack (gateway + three services). `docker compose up --build`. |
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
5. **Wire the gateway to the downstreams' public URLs.** Copy each downstream's
   public URL from its dashboard page (e.g. `https://auth-service-xxxx.onrender.com`),
   then on **api-gateway → Environment** set:
   - `AUTH_SERVICE_URL` → auth-service's public URL
   - `PRODUCT_SERVICE_URL` → product-service's public URL
   - `ORDER_SERVICE_URL` → order-service's public URL

   Save and let the gateway redeploy. (These are `sync: false` in the blueprint,
   so Render won't overwrite them.) On the free plan the gateway can't reach the
   downstreams over the private network — see [Topology](#topology).

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
- **Persistence is a file-based mock.** Data lives in the repo-root `database/`
  folder (`users.js`, `products.js`) and is imported directly by the services —
  there is no database server to provision. The auth and product Dockerfiles copy
  `database/` into their images (`COPY database/ /app/database/`).
- **Kafka** is a declared dep but not wired up. Render has no managed Kafka —
  when it lands, use an external provider and add its connection env vars via
  `render.yaml` (`sync: false`) / `docker-compose.yml`.
