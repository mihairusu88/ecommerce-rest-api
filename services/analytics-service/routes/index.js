import { Router } from "express";
import packageJson from "../package.json" with { type: "json" };
import analyticsEvents from "../../../database/analyticsEvents.js";
import { summarize, paginate, recordEvent } from "../utils/analytics.js";

const router = Router();
const SERVICE_NAME = packageJson.name;

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is up and running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: SERVICE_NAME,
    uptime: process.uptime(),
  });
});

/**
 * @openapi
 * /api/analytics/summary:
 *   get:
 *     summary: Aggregated platform metrics
 *     description: >
 *       Computes order, product and event metrics on demand from the shared
 *       data stores. Values reflect the current in-memory state.
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: The aggregated metrics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyticsSummary'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/analytics/summary", (req, res) => {
  res.status(200).json(summarize());
});

/**
 * @openapi
 * /api/analytics/events:
 *   get:
 *     summary: List recorded analytics events
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 30
 *         description: Max number of events to return (0 returns all).
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of events to skip (for pagination).
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by event type (e.g. order_placed, product_view).
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by the user the event belongs to.
 *     responses:
 *       200:
 *         description: A paginated list of events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyticsEventListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/analytics/events", (req, res) => {
  const { type } = req.query;
  let list = analyticsEvents;

  if (type) list = list.filter((e) => e.type === type);
  if (req.query.userId !== undefined) {
    const userId = Number.parseInt(req.query.userId, 10);
    list = list.filter((e) => e.userId === userId);
  }

  res.status(200).json(paginate(list, req.query));
});

/**
 * @openapi
 * /api/analytics/events:
 *   post:
 *     summary: Record an analytics event
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       201:
 *         description: The recorded event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyticsEvent'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/analytics/events", (req, res) => {
  const event = recordEvent(req.body);
  res.status(201).json(event);
});

export default router;
