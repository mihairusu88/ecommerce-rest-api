import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { getMergedSpec } from "./config/swagger.js";
import { proxyMiddlewares } from "./config/proxy.js";
import routes from "./routes/index.js";
import packageJson from "./package.json" with { type: "json" };

const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_NAME = packageJson.name || "api-gateway";

app.disable("x-powered-by");

// Reverse-proxy downstream services (/api/auth, /api/products, /api/orders).
// Registered before express.json() so request bodies stream through untouched —
// each downstream service parses its own body.
app.use(proxyMiddlewares);

app.use(express.json());

// API routes (gateway's own endpoints live under /api)
app.use("/api", routes);

// Aggregated Swagger UI (browser) — single page, endpoints grouped by service
app.use("/api-docs", swaggerUi.serve, async (req, res, next) => {
  try {
    const spec = await getMergedSpec();
    swaggerUi.setup(spec, { explorer: false })(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Raw merged spec (CORS-enabled for cross-origin consumers / codegen)
app.get("/api-docs.json", async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(await getMergedSpec());
  } catch (err) {
    next(err);
  }
});

// 404 handler — consistent ErrorResponse shape
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} not found`,
    statusCode: 404,
  });
});

// Centralized error handler — consistent ErrorResponse shape
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[${SERVICE_NAME}]`, err);
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`[${SERVICE_NAME}] running on http://localhost:${PORT}`);
  console.log(`[${SERVICE_NAME}] swagger docs at http://localhost:${PORT}/api-docs`);
});
