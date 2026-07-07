/**
 * Notification helpers layered over the file-based store in
 * `database/notifications.js`: pagination and creation. Kept out of `routes/`
 * so the handlers stay thin (see CLAUDE.md: reusable helpers live in `utils/`).
 */
import notifications from "../../../database/notifications.js";

const CHANNELS = ["email", "sms", "push"];

/**
 * Slice `list` into the dummyjson-style pagination envelope.
 * `limit` defaults to 30; limit=0 (or invalid) returns all remaining items.
 */
export function paginate(list, { skip, limit } = {}) {
  const total = list.length;
  const s = Math.max(0, Number.parseInt(skip, 10) || 0);
  const rawLimit = limit === undefined ? 30 : Number.parseInt(limit, 10);
  const l = Number.isNaN(rawLimit) || rawLimit <= 0 ? total : rawLimit;
  const page = list.slice(s, s + l);
  return { notifications: page, total, skip: s, limit: page.length };
}

/**
 * Validate + append a new notification to the in-memory store. In this mock
 * "sending" is instantaneous, so the notification is stored as already `sent`.
 * Throws an error carrying a `statusCode` (read by the centralized error
 * handler) when the body is invalid.
 */
export function createNotification(body = {}) {
  const userId = Number.parseInt(body.userId, 10);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw badRequest("`userId` is required and must be a positive integer");
  }

  const channel = body.channel;
  if (!CHANNELS.includes(channel)) {
    throw badRequest(`\`channel\` must be one of: ${CHANNELS.join(", ")}`);
  }

  const type = typeof body.type === "string" ? body.type.trim() : "";
  if (!type) {
    throw badRequest("`type` is required");
  }

  const now = new Date().toISOString();
  const id = notifications.reduce((max, n) => Math.max(max, n.id), 0) + 1;
  const notification = {
    id,
    userId,
    channel,
    type,
    subject: body.subject || "",
    body: body.body || "",
    status: "sent",
    createdAt: now,
    sentAt: now,
  };

  notifications.push(notification);
  return notification;
}

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}
