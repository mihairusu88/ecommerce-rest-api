import { Router } from "express";
import packageJson from "../package.json" with { type: "json" };
import notifications from "../../../database/notifications.js";
import { paginate, createNotification } from "../utils/notifications.js";

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
 * /api/notifications:
 *   get:
 *     summary: List notifications
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 30
 *         description: Max number of notifications to return (0 returns all).
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of notifications to skip (for pagination).
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by the recipient user id.
 *       - in: query
 *         name: channel
 *         schema:
 *           type: string
 *           enum: [email, sms, push]
 *         description: Filter by delivery channel.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by notification type (e.g. order_confirmation).
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status (e.g. sent, pending, failed, read).
 *     responses:
 *       200:
 *         description: A paginated list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/notifications", (req, res) => {
  const { channel, type, status } = req.query;
  let list = notifications;

  if (req.query.userId !== undefined) {
    const userId = Number.parseInt(req.query.userId, 10);
    list = list.filter((n) => n.userId === userId);
  }
  if (channel) list = list.filter((n) => n.channel === channel);
  if (type) list = list.filter((n) => n.type === type);
  if (status) list = list.filter((n) => n.status === status);

  res.status(200).json(paginate(list, req.query));
});

/**
 * @openapi
 * /api/notifications:
 *   post:
 *     summary: Send (create) a notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNotificationRequest'
 *     responses:
 *       201:
 *         description: The sent notification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/notifications", (req, res) => {
  const notification = createNotification(req.body);
  res.status(201).json(notification);
});

/**
 * @openapi
 * /api/notifications/{id}:
 *   get:
 *     summary: Get a single notification by id
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The notification id.
 *     responses:
 *       200:
 *         description: The requested notification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/notifications/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const notification = notifications.find((n) => n.id === id);

  if (!notification) {
    return res.status(404).json({
      status: "error",
      message: `Notification with id ${req.params.id} not found`,
      statusCode: 404,
    });
  }

  res.status(200).json(notification);
});

export default router;
