import { Router } from "express";
import packageJson from "../package.json" with { type: "json" };
import orders from "../../../database/orders.js";

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
 * /api/orders:
 *   get:
 *     summary: List orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 30
 *         description: Max number of orders to return (0 returns all).
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of orders to skip (for pagination).
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by the id of the user who placed the order.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status (e.g. pending, shipped, delivered).
 *     responses:
 *       200:
 *         description: A paginated list of orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/orders", (req, res) => {
  const { status } = req.query;
  let list = orders;

  if (req.query.userId !== undefined) {
    const userId = Number.parseInt(req.query.userId, 10);
    list = list.filter((o) => o.userId === userId);
  }
  if (status) {
    list = list.filter((o) => o.status === status);
  }

  const total = list.length;
  const skip = Math.max(0, Number.parseInt(req.query.skip, 10) || 0);
  const rawLimit = req.query.limit === undefined ? 30 : Number.parseInt(req.query.limit, 10);
  // limit=0 (or invalid) means "return all remaining".
  const limit = Number.isNaN(rawLimit) || rawLimit <= 0 ? total : rawLimit;

  const page = list.slice(skip, skip + limit);

  res.status(200).json({
    orders: page,
    total,
    skip,
    limit: page.length,
  });
});

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order id.
 *     responses:
 *       200:
 *         description: The requested order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/orders/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({
      status: "error",
      message: `Order with id ${req.params.id} not found`,
      statusCode: 404,
    });
  }

  res.status(200).json(order);
});

export default router;
