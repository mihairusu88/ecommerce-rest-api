/**
 * Analytics helpers. The summary is computed on demand from the shared
 * file-based stores (`database/orders.js`, `database/products.js`) plus the
 * recorded event log (`database/analyticsEvents.js`); events can also be
 * appended. Kept out of `routes/` so the handlers stay thin (see CLAUDE.md:
 * reusable helpers live in `utils/`).
 */
import orders from "../../../database/orders.js";
import products from "../../../database/products.js";
import analyticsEvents from "../../../database/analyticsEvents.js";

// Products with stock at/below this are counted as "low stock" in the summary.
const LOW_STOCK_THRESHOLD = 10;

/** Round to 2 decimals, avoiding floating-point noise in the totals. */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/** Tally an array of items by the string key returned from `keyFn`. */
function tallyBy(list, keyFn) {
  return list.reduce((acc, item) => {
    const key = keyFn(item);
    if (key === undefined || key === null) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Aggregate platform metrics across orders, products and recorded events.
 * Revenue uses each order's post-discount total.
 */
export function summarize() {
  const revenue = orders.reduce((sum, o) => sum + (o.discountedTotal ?? o.total ?? 0), 0);
  const total = orders.length;

  return {
    orders: {
      total,
      revenue: round2(revenue),
      averageOrderValue: total ? round2(revenue / total) : 0,
      byStatus: tallyBy(orders, (o) => o.status),
    },
    products: {
      total: products.length,
      lowStock: products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= LOW_STOCK_THRESHOLD).length,
      outOfStock: products.filter((p) => (p.stock ?? 0) === 0).length,
    },
    events: {
      total: analyticsEvents.length,
      byType: tallyBy(analyticsEvents, (e) => e.type),
    },
  };
}

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
  return { events: page, total, skip: s, limit: page.length };
}

/** Coerce an optional integer field; returns null when absent/blank. */
function optionalInt(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number.parseInt(value, 10);
  return Number.isNaN(n) ? null : n;
}

/**
 * Validate + append a new analytics event to the in-memory log. Throws an error
 * carrying a `statusCode` (read by the centralized error handler) when the body
 * is invalid.
 */
export function recordEvent(body = {}) {
  const type = typeof body.type === "string" ? body.type.trim() : "";
  if (!type) {
    throw badRequest("`type` is required");
  }

  const value = body.value === undefined || body.value === null || body.value === ""
    ? null
    : Number.parseFloat(body.value);
  if (value !== null && !Number.isFinite(value)) {
    throw badRequest("`value` must be a number when provided");
  }

  // Honour a caller-supplied timestamp (e.g. the `at` from a Kafka event, so the
  // recorded fact keeps the moment it actually happened); otherwise stamp now.
  const at = typeof body.at === "string" && body.at ? body.at : new Date().toISOString();

  const id = analyticsEvents.reduce((max, e) => Math.max(max, e.id), 0) + 1;
  const event = {
    id,
    type,
    userId: optionalInt(body.userId),
    productId: optionalInt(body.productId),
    orderId: optionalInt(body.orderId),
    value,
    at,
  };

  analyticsEvents.push(event);
  return event;
}

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}
