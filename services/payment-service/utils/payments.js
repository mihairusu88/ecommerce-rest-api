/**
 * Payment helpers layered over the file-based store in `database/payments.js`:
 * pagination and creation. Kept out of `routes/` so the handlers stay thin
 * (see CLAUDE.md: reusable helpers live in `utils/`).
 */
import payments from "../../../database/payments.js";

const METHODS = ["credit_card", "debit_card", "paypal", "apple_pay", "google_pay"];

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
  return { payments: page, total, skip: s, limit: page.length };
}

/** Pseudo-random-looking transaction id derived from the payment id + time. */
function makeTransactionId(id) {
  const hex = (id * 2654435761 + Date.now()).toString(16).slice(-8);
  return `txn_${hex}`;
}

/**
 * Validate + append a new payment to the in-memory store. In this mock the
 * charge is assumed to succeed ("captured"). Throws an error carrying a
 * `statusCode` (read by the centralized error handler) when the body is invalid.
 */
export function createPayment(body = {}) {
  const orderId = Number.parseInt(body.orderId, 10);
  const userId = Number.parseInt(body.userId, 10);
  const amount = Number.parseFloat(body.amount);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw badRequest("`orderId` is required and must be a positive integer");
  }
  if (!Number.isInteger(userId) || userId <= 0) {
    throw badRequest("`userId` is required and must be a positive integer");
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    throw badRequest("`amount` is required and must be a positive number");
  }

  const method = body.method || "credit_card";
  if (!METHODS.includes(method)) {
    throw badRequest(`\`method\` must be one of: ${METHODS.join(", ")}`);
  }

  const now = new Date().toISOString();
  const id = payments.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const payment = {
    id,
    orderId,
    userId,
    amount: Math.round(amount * 100) / 100,
    currency: body.currency || "USD",
    method,
    status: "captured",
    transactionId: makeTransactionId(id),
    createdAt: now,
    updatedAt: now,
  };

  payments.push(payment);
  return payment;
}

/**
 * Create a *pending* payment in reaction to an `OrderPlaced` event consumed from
 * the `orders` topic (see utils/kafka.js). Unlike the API-driven `createPayment`
 * (which captures immediately), an order-initiated payment starts as `pending`:
 * the order exists but the charge hasn't been taken yet. Idempotent — if a
 * payment for this order already exists it is returned unchanged, so replaying
 * the event never double-creates. Returns null when the event lacks the data
 * needed to bill (logged by the caller); never throws.
 */
export function createPendingPaymentFromOrder(event = {}) {
  const orderId = Number.parseInt(event.orderId, 10);
  const userId = Number.parseInt(event.userId, 10);
  // Bill the post-discount total; fall back to the gross total.
  const amount = Number.parseFloat(event.discountedTotal ?? event.total);

  if (!Number.isInteger(orderId) || orderId <= 0) return null;
  if (!Number.isInteger(userId) || userId <= 0) return null;
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const existing = payments.find((p) => p.orderId === orderId);
  if (existing) return existing;

  const now = new Date().toISOString();
  const id = payments.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const payment = {
    id,
    orderId,
    userId,
    amount: Math.round(amount * 100) / 100,
    currency: "USD",
    method: "credit_card",
    status: "pending",
    transactionId: makeTransactionId(id),
    createdAt: now,
    updatedAt: now,
  };

  payments.push(payment);
  return payment;
}

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}
