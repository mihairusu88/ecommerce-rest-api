# ecommerce-rest-api

An ecommerce REST API built as independent microservices under [`services/`](services/).
Each service is a self-contained Node.js (ESM) Express app with its own
`package.json`, `.env`, and `node_modules` — there is **no shared/workspace
dependency tree**. The root [`package.json`](package.json) is orchestration-only
(`concurrently` + `npm --prefix` scripts).

| Service | Port | Path prefix (via gateway) | Responsibility |
|---------|------|---------------------------|----------------|
| [`api-gateway`](services/api-gateway/) | 3000 | — | Entry point; reverse-proxies traffic and aggregates OpenAPI docs |
| [`auth-service`](services/auth-service/) | 3001 | `/api/auth` | Authentication & authorization (JWT) |
| [`product-service`](services/product-service/) | 3002 | `/api/products` | Product catalog |
| [`order-service`](services/order-service/) | 3003 | `/api/orders` | Order management |
| [`payment-service`](services/payment-service/) | 3004 | `/api/payments` | Payment processing |
| [`notification-service`](services/notification-service/) | 3005 | `/api/notifications` | User notifications |
| [`analytics-service`](services/analytics-service/) | 3006 | `/api/analytics` | Metrics & event tracking |

Some services are also connected asynchronously through **Apache Kafka** — see
[Event-driven architecture (Kafka)](#event-driven-architecture-kafka) below.

Every service mounts its router at `/api` and answers `GET /api/health` directly.
Through the gateway those become `GET /api/auth/health`, `GET /api/products/health`, etc.

> Architecture deep-dive: [CLAUDE.md](CLAUDE.md) · Deploy details: [DEPLOYMENT.md](DEPLOYMENT.md)

<img width="1905" height="1439" alt="image" src="https://github.com/user-attachments/assets/2dcd4105-4b99-48f1-9d3c-b5aa20cee3ce" />

> **Try it live** — the full stack is deployed on Render:
> [open the aggregated Swagger UI](https://api-gateway-22ik.onrender.com/api-docs)
> and hit **Authorize** with the demo credentials `guest` / `test12345`.

## Endpoints

Everything is reachable through the gateway on port `3000` under the `/api`
prefix. Responses are JSON; list endpoints return a paginated envelope — the
items array plus `total`, `skip` and `limit` (dummyjson-style).

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Log in; returns the user profile + access & refresh tokens |
| `GET`  | `/api/auth/me` | Current user (requires `Authorization: Bearer <token>`) |
| `POST` | `/api/auth/refresh` | Rotate the refresh token for a fresh token pair |
| `GET`  | `/api/products` | List products — `limit`, `skip`, `category`, `sortBy`, `order` |
| `GET`  | `/api/products/search` | Full-text search — `query` (or `q`), plus sort & pagination |
| `GET`  | `/api/products/categories` | List product categories |
| `GET`  | `/api/products/{id}` | Single product by id |
| `GET`  | `/api/orders` | List orders — `limit`, `skip`, `userId`, `status` |
| `POST` | `/api/orders` | Place an order (publishes an `OrderPlaced` Kafka event) |
| `GET`  | `/api/orders/{id}` | Single order by id |
| `GET`  | `/api/payments` | List payments — `limit`, `skip`, `orderId`, `userId`, `status` |
| `POST` | `/api/payments` | Capture a payment for an order |
| `GET`  | `/api/payments/{id}` | Single payment by id |
| `GET`  | `/api/notifications` | List notifications — `userId`, `channel`, `type`, `status` |
| `POST` | `/api/notifications` | Send a notification |
| `GET`  | `/api/analytics/summary` | Aggregated metrics (orders, products, events) |
| `GET`  | `/api/analytics/events` | List recorded analytics events — `type`, `userId` |
| `POST` | `/api/analytics/events` | Record an analytics event |
| `GET`  | `/api/{service}/health` | Health check for any service |

The mock dataset is **50 products** across 7 categories (beauty, electronics,
fashion, fragrances, groceries, home, sports), **25 orders**, **10 users** (all
share the password `test12345`, e.g. `guest` / `test12345`), plus seed
**payments**, **notifications**, and **analytics events**.

## Using the API

The base URL is the gateway — `http://localhost:3000` locally, or the
[live demo](https://api-gateway-22ik.onrender.com) on Render.

### Authenticate

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{ "username": "guest", "password": "test12345" }'
```

```jsonc
{
  "id": 10,
  "username": "guest",
  "email": "guest@example.com",
  "firstName": "Guest",
  "lastName": "User",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Send the access token as a Bearer header to reach protected routes:

```bash
curl http://localhost:3000/api/auth/me \
  -H 'Authorization: Bearer <accessToken>'
```

### List, paginate, filter & sort products

```bash
# 10 products, skipping the first 20
curl 'http://localhost:3000/api/products?limit=10&skip=20'

# only the "electronics" category, most expensive first
curl 'http://localhost:3000/api/products?category=electronics&sortBy=price&order=desc'
```

```jsonc
{
  "products": [ /* … */ ],
  "total": 50,
  "skip": 20,
  "limit": 10
}
```

> `limit=0` returns every remaining item. The same `limit` / `skip` / `sortBy` /
> `order` params also work on `/api/products/search` and `/api/orders`.

### Search products

```bash
curl 'http://localhost:3000/api/products/search?q=mascara'
```

### Filter orders

```bash
# delivered orders placed by user 1
curl 'http://localhost:3000/api/orders?userId=1&status=delivered'
```

## Event-driven architecture (Kafka)

Beyond the synchronous request/response calls above, some services talk to each
other **asynchronously** through [Apache Kafka](https://kafka.apache.org/). A
service that does something noteworthy publishes an **event** (an immutable fact
like `OrderPlaced`) to a **topic**, and any number of other services **consume**
that topic and react — without the publisher knowing they exist.

### Why — the benefit, in code

Say placing an order needs to update inventory, take payment, and email the
customer. The naive synchronous version chains the calls and **blocks** on each:

```js
// ❌ Synchronous / blocking — order-service waits for every downstream in turn.
// Total latency = the SUM of all three. If ANY one is slow or down, the order fails.
async function placeOrder(order) {
  await updateInventory(order);        // → product-service       (~120ms)
  await capturePayment(order);         // → payment-service       (~300ms)
  await sendConfirmationEmail(order);  // → notification-service  (~200ms)
  return order;                        // caller waited ~620ms, and one failure breaks it all
}
```

The event-driven version just records the fact and returns. The three reactions
happen **independently, in parallel, and later** — the caller never waits for them:

```js
// ✅ Event-driven / non-blocking — order-service records the fact and returns.
async function placeOrder(order) {
  await publishOrderPlaced(order);     // append ONE event to the log (~5ms)
  return order;                        // caller waited ~5ms
}

// Elsewhere, each service reacts on its own — order-service knows nothing about them:
//   product-service consumes "orders" → decrements stock
//   payment-service consumes "orders" → opens a pending payment
// If a consumer is down, Kafka retains the event and it catches up when it's back.
// Want order confirmation emails too? Subscribe a new consumer to "orders" —
// ZERO changes to order-service. (That is exactly how the flows below are built.)
```

What you gain:

- **Non-blocking & faster responses** — the client isn't held hostage to the
  slowest downstream; work happens after the response is sent.
- **Decoupling (fan-out)** — the producer publishes once; new consumers subscribe
  independently. No editing the producer to bolt on the next feature.
- **Resilience** — a downstream being down doesn't fail the request; the event
  waits in the log (each consumer tracks its own offset) and is processed on recovery.
- **Replayable audit trail** — the log is a durable, ordered history of what happened.

### The flows in this project

```
order-service ─OrderPlaced─▶  orders       ──▶ product-service  (decrement stock)
 (POST /api/orders)                         └▶ payment-service  (open pending payment)

auth-service  ─UserLoggedIn─▶ user-events  ──▶ notification-service (notify the user)
 (POST /api/login,           ─UserDetailed─▶ └▶ analytics-service    (record the event)
  GET  /api/me)
```

Each consumer is on its **own consumer group**, so both receivers get every event
(that is the fan-out). Kafka is **optional and env-gated**: with no `KAFKA_BROKERS`
set (the default for `npm run dev`) every service still boots and behaves as the
pure file-based mock — publishing is a no-op and consumers don't start.

### Run it live and watch the events

```bash
docker compose up --build   # starts the broker + a Kafka-UI at http://localhost:8080
```

Then trigger a flow and watch it land:

```bash
# 1) place an order → OrderPlaced fans out to product + payment
curl -X POST http://localhost:3000/api/orders/orders \
  -H 'Content-Type: application/json' \
  -d '{ "userId": 5, "products": [{ "id": 16, "quantity": 3 }] }'

# stock dropped by 3, and a pending payment was auto-created for the order:
curl http://localhost:3000/api/products/products/16          # "stock": 497
curl 'http://localhost:3000/api/payments/payments?orderId=26'  # status "pending"

# 2) log in → UserLoggedIn fans out to notification + analytics
curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{ "username": "guest", "password": "test12345" }'

# analytics recorded it from the event:
curl 'http://localhost:3000/api/analytics/analytics/events?type=user_login'
```

Open the **Kafka-UI at http://localhost:8080** → cluster `local` → **Topics** →
`orders` / `user-events` → **Messages** to see each event, and **Consumers** to
see the four groups and their lag (0 = fully caught up).

> Deep-dive on the producer/consumer wiring, topics, and env vars:
> [CLAUDE.md → Event-driven flow](CLAUDE.md).

## Local development

### Option A — run everything with Node (fastest inner loop)

```bash
npm run install:all   # install root + all seven services
cp services/auth-service/.env.example services/auth-service/.env    # per service, first time
npm run dev           # run all seven with node --watch (color-prefixed logs)
# or: npm start       # plain node, no watch
```

> `npm run dev` runs in **mock mode** — no Kafka broker, so events are disabled
> (every endpoint still works). Use Docker (Option B) to run the Kafka flows live.

<img width="1892" height="512" alt="Screenshot 2026-07-02 at 11 12 03" src="https://github.com/user-attachments/assets/cf88c5ce-0f55-4507-9878-87bca56c606d" />

Copy `.env.example` → `.env` in each service before the first run (defaults match
the ports above). There is **no test runner or linter** — every `npm test` is a
placeholder that exits 1.

### Option B — run the full stack in Docker (mirrors production topology)

```bash
docker compose up --build
```

Brings up the gateway + six services + a single-node **Kafka broker** (KRaft, no
ZooKeeper) + a **Kafka-UI** (http://localhost:8080), all health-gated with
`depends_on`. This is the mode where the Kafka event flows are live. There is no
database container — persistence is a file-based mock in the repo-root
`database/` folder (see below).

### Per-service (from within `services/<name>/`)

```bash
npm install
npm run dev        # node --watch, auto-restarts on change
npm start          # plain node index.js
```

### Handy URLs (local)

| URL | What |
|-----|------|
| http://localhost:3000/api-docs | Aggregated Swagger UI (all services, via gateway) |
| http://localhost:3000/api/auth/login | Auth login (seed creds: `guest` / `test12345`) |
| http://localhost:3001/api-docs | auth-service Swagger UI (direct) |
| http://localhost:8080 | Kafka-UI — topics, messages, consumer groups (Docker only) |
| `GET /api/health` on any port | Service health check |

## Deployment

Deploys go to [Render](https://render.com) as seven Docker web services, triggered
by GitHub Actions on push to `master` (build every image → trigger each service's
deploy via the Render REST API, resolved by name, downstreams first, gateway
last). `autoDeploy` is off; the only CI secret is `RENDER_API_KEY`. Full setup —
Render Blueprint, API key, spin-down caveats — is in [DEPLOYMENT.md](DEPLOYMENT.md).

### What to set up on Render after these changes

The new services and Kafka wiring are already in [`render.yaml`](render.yaml) and
the [CI workflow](.github/workflows/deploy.yml) (build matrix + deploy calls), so
CI needs **no** new GitHub secrets — `RENDER_API_KEY` still covers everything.
On Render itself:

1. **Re-sync the Blueprint** so Render creates the three new services. Dashboard →
   your Blueprint → **Sync** (or **New + → Blueprint** if setting up fresh). It
   reads `render.yaml` and provisions `payment-service`, `notification-service`,
   and `analytics-service` alongside the existing four. Let their first deploy
   finish so they get public URLs.
2. **Point the gateway at the three new downstreams.** Their URL vars are
   `sync: false` (Render won't guess them), so on **api-gateway → Environment**
   set each to the service's public URL, then let the gateway redeploy:
   - `PAYMENT_SERVICE_URL` → `https://payment-service-xxxx.onrender.com`
   - `NOTIFICATION_SERVICE_URL` → `https://notification-service-xxxx.onrender.com`
   - `ANALYTICS_SERVICE_URL` → `https://analytics-service-xxxx.onrender.com`

   (Same pattern as the existing `AUTH_/PRODUCT_/ORDER_SERVICE_URL` vars.) Until
   set, the gateway just lists those sections as "Unavailable" in the merged docs.
3. **Decide on Kafka.** Render has **no managed Kafka**, and the services are
   env-gated on `KAFKA_BROKERS`:
   - **Do nothing** → `KAFKA_BROKERS` stays unset → services run in **mock mode**
     (all HTTP endpoints work; the async event flows are simply off). Deployment
     works fine like this.
   - **Enable events in prod** → provision a broker with an external provider
     (e.g. [Upstash Kafka](https://upstash.com/), Confluent Cloud, Aiven), then
     add `KAFKA_BROKERS` (+ any SASL/TLS vars kafkajs needs) to
     `auth`, `order`, `product`, `payment`, `notification`, and `analytics` — via
     the dashboard or as `sync: false` vars in `render.yaml`.

That's it — no per-service deploy hooks, no other secrets. Push to `master` (or
run the workflow manually) and CI builds all seven images and triggers the deploys.

## Adding a new service

A new service (say `payment-service` on port `3004`, prefix `/api/payments`)
touches both the local-dev wiring and the deploy wiring. Work through both
checklists — the gateway only sees a service once it's added to **all** of the
lists below.

### 1. Scaffold the service

- Create `services/payment-service/` following the identical per-service layout
  (`index.js`, `routes/index.js`, `config/swagger.js`, `config/schemas.js`) —
  see [CLAUDE.md](CLAUDE.md) for the layout and shared conventions (ESM, error
  shape `{ status, message, statusCode }`, health shape `{ status, service, uptime }`).
- Add `services/payment-service/.env.example` (with `PORT=3004`) and a
  multi-stage `services/payment-service/Dockerfile` (copy an existing one —
  **the build context is the repo root**, so paths are repo-relative).

### 2. Local dev wiring

- **[`package.json`](package.json)** — add the service to all three root scripts
  (`dev`, `start`, `install:all`), matching the `concurrently` name/color pattern.
- **[`docker-compose.yml`](docker-compose.yml)** — add a service block (build
  context `.`, dockerfile path, `PORT`, port mapping, healthcheck) and add it to
  the gateway's `AUTH_SERVICE_URL`-style env vars + `depends_on`.

### 3. Gateway wiring (so it's proxied and appears in aggregated docs)

- **[`services/api-gateway/config/proxy.js`](services/api-gateway/config/proxy.js)** —
  add `PAYMENT_SERVICE_URL` and a `{ prefix: "/api/payments", url: PAYMENT_SERVICE_URL }`
  entry to `TARGETS`.
- **[`services/api-gateway/config/swagger.js`](services/api-gateway/config/swagger.js)** —
  add `PAYMENT_SERVICE_URL` and a `DOWNSTREAM` entry (`tag`, `ns: "Payment_"`,
  `pathPrefix: "/api/payments"`, `url`, `description`). The `ns` namespaces the
  service's OpenAPI components so same-named schemas don't collide.

### 4. Deploy wiring

- **[`render.yaml`](render.yaml)** — add a `type: web` block for the new service
  (docker runtime, `dockerfilePath`, `dockerContext: .`, `healthCheckPath: /api/health`,
  `autoDeploy: false`, env vars). Add a `PAYMENT_SERVICE_URL` env var to the
  `api-gateway` block as `sync: false` (set it to the service's public URL after
  its first deploy — free-tier services can't receive private traffic; see
  [DEPLOYMENT.md](DEPLOYMENT.md)).
- **[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)** — add the
  service to the `build` matrix and add a `deploy "payment-service"` call (before
  the gateway) in the deploy step. Deploys resolve by name via the Render REST
  API, so **no new secret is needed** — `RENDER_API_KEY` already covers it.
- **Render** — re-sync the Blueprint so the new service is created, then set the
  gateway's `PAYMENT_SERVICE_URL` to its public URL (see [DEPLOYMENT.md](DEPLOYMENT.md)).

### 5. Verify

```bash
docker compose up --build
# new service resolves through the gateway and shows up in the merged docs:
curl http://localhost:3000/api/payments/health
open http://localhost:3000/api-docs
```
