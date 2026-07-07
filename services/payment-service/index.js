import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import routes from "./routes/index.js";
import { startOrderConsumer, stopOrderConsumer } from "./utils/kafka.js";
import packageJson from "./package.json" with { type: "json" };

const app = express();
const PORT = process.env.PORT || 3004;
const SERVICE_NAME = packageJson.name || "payment-service";

app.disable("x-powered-by");
app.use(express.json());

app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));

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

// Open a pending payment for each placed order (no-op when KAFKA_BROKERS unset).
startOrderConsumer();

// Disconnect cleanly on shutdown so the consumer group rebalances promptly.
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    await stopOrderConsumer();
    process.exit(0);
  });
}
