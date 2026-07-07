import { Router } from "express";
import packageJson from "../package.json" with { type: "json" };
import payments from "../../../database/payments.js";
import { paginate, createPayment } from "../utils/payments.js";

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
 * /api/payments:
 *   get:
 *     summary: List payments
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 30
 *         description: Max number of payments to return (0 returns all).
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of payments to skip (for pagination).
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: integer
 *         description: Filter by the order the payment belongs to.
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by the user who made the payment.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by payment status (e.g. captured, pending, refunded).
 *     responses:
 *       200:
 *         description: A paginated list of payments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/payments", (req, res) => {
  const { status } = req.query;
  let list = payments;

  if (req.query.orderId !== undefined) {
    const orderId = Number.parseInt(req.query.orderId, 10);
    list = list.filter((p) => p.orderId === orderId);
  }
  if (req.query.userId !== undefined) {
    const userId = Number.parseInt(req.query.userId, 10);
    list = list.filter((p) => p.userId === userId);
  }
  if (status) {
    list = list.filter((p) => p.status === status);
  }

  res.status(200).json(paginate(list, req.query));
});

/**
 * @openapi
 * /api/payments:
 *   post:
 *     summary: Create (capture) a payment for an order
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentRequest'
 *     responses:
 *       201:
 *         description: The captured payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/payments", (req, res) => {
  const payment = createPayment(req.body);
  res.status(201).json(payment);
});

/**
 * @openapi
 * /api/payments/{id}:
 *   get:
 *     summary: Get a single payment by id
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The payment id.
 *     responses:
 *       200:
 *         description: The requested payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/payments/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const payment = payments.find((p) => p.id === id);

  if (!payment) {
    return res.status(404).json({
      status: "error",
      message: `Payment with id ${req.params.id} not found`,
      statusCode: 404,
    });
  }

  res.status(200).json(payment);
});

export default router;
