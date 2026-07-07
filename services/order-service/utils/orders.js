/**
 * Order helpers layered over the file-based stores. Building an order enriches
 * each requested line item from the shared product catalogue
 * (`database/products.js`) — pulling the current title/price/discount/thumbnail
 * — then computes the pre- and post-discount totals, mirroring the shape of the
 * seed data in `database/orders.js`. Kept out of `routes/` so the handlers stay
 * thin (see CLAUDE.md: reusable helpers live in `utils/`).
 */
import orders from "../../../database/orders.js";
import products from "../../../database/products.js";

/** Round to 2 decimals, avoiding floating-point noise in the totals. */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Validate the request body and build + persist a new order. Throws an error
 * carrying a `statusCode` (read by the centralized error handler) when the body
 * is invalid or references an unknown product.
 *
 * Body: `{ userId, products: [{ id, quantity }] }`.
 */
export function createOrder(body = {}) {
  const userId = Number.parseInt(body.userId, 10);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw badRequest("`userId` is required and must be a positive integer");
  }

  if (!Array.isArray(body.products) || body.products.length === 0) {
    throw badRequest("`products` is required and must be a non-empty array of { id, quantity }");
  }

  const lineItems = body.products.map((item) => {
    const id = Number.parseInt(item?.id, 10);
    const quantity = Number.parseInt(item?.quantity, 10);
    if (!Number.isInteger(id) || id <= 0) {
      throw badRequest("each product needs a positive integer `id`");
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw badRequest(`product ${item?.id} needs a positive integer \`quantity\``);
    }

    const product = products.find((p) => p.id === id);
    if (!product) {
      throw badRequest(`product with id ${id} does not exist`);
    }

    const total = round2(product.price * quantity);
    const discountPercentage = product.discountPercentage ?? 0;
    const discountedTotal = round2(total * (1 - discountPercentage / 100));

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      total,
      discountPercentage,
      discountedTotal,
      thumbnail: product.thumbnail,
    };
  });

  const total = round2(lineItems.reduce((sum, li) => sum + li.total, 0));
  const discountedTotal = round2(lineItems.reduce((sum, li) => sum + li.discountedTotal, 0));
  const totalQuantity = lineItems.reduce((sum, li) => sum + li.quantity, 0);
  const now = new Date().toISOString();
  const id = orders.reduce((max, o) => Math.max(max, o.id), 0) + 1;

  const order = {
    id,
    userId,
    products: lineItems,
    total,
    discountedTotal,
    totalProducts: lineItems.length,
    totalQuantity,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  orders.push(order);
  return order;
}

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}
