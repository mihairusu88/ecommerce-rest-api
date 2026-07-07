/**
 * Inventory adjustment over the shared file-based catalogue
 * (`database/products.js`). This is the *effect* the product service applies in
 * reaction to an `OrderPlaced` event consumed from Kafka (see utils/kafka.js).
 *
 * Because `products` is a live in-memory array imported by reference, mutating a
 * product's `stock` here is immediately visible to the read routes — the mock
 * "database" is updated in place.
 */
import products from "../../../database/products.js";

// Stock at/below this reads as "Low Stock"; zero reads as "Out of Stock".
const LOW_STOCK_THRESHOLD = 10;

function availabilityFor(stock) {
  if (stock <= 0) return "Out of Stock";
  if (stock <= LOW_STOCK_THRESHOLD) return "Low Stock";
  return "In Stock";
}

/**
 * Decrement stock for each ordered line item `{ id, quantity }`. Unknown product
 * ids are skipped; stock never drops below zero. Returns a per-item report of
 * what changed (handy for logging). Pure/synchronous — the caller decides how to
 * source the items (today: a Kafka OrderPlaced event).
 */
export function reduceStock(items = []) {
  const changes = [];
  for (const { id, quantity } of items) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      changes.push({ id, applied: false, reason: "unknown product" });
      continue;
    }
    const before = product.stock ?? 0;
    const after = Math.max(0, before - (quantity ?? 0));
    product.stock = after;
    product.availabilityStatus = availabilityFor(after);
    changes.push({ id, quantity, before, after });
  }
  return changes;
}
