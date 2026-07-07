/**
 * File-based mock analytics event store — the in-memory "database" for the
 * analytics service. Mirrors the style of `orders.js`/`products.js`: plain data
 * held in memory, loaded once at import time and read/appended by the analytics
 * service's routes.
 *
 * Each event is an immutable fact of something that happened in the platform:
 * `type` is one of page_view, product_view, add_to_cart, checkout_started,
 * order_placed, payment_captured. `userId` (1-10) and the optional
 * `productId`/`orderId`/`value` give the event its context. Every id is unique.
 * Pure data — no imports.
 */
const analyticsEvents = [
  { "id": 1, "type": "product_view", "userId": 1, "productId": 16, "orderId": null, "value": null, "at": "2024-06-01T08:40:00.000Z" },
  { "id": 2, "type": "add_to_cart", "userId": 1, "productId": 16, "orderId": null, "value": null, "at": "2024-06-01T08:52:00.000Z" },
  { "id": 3, "type": "order_placed", "userId": 1, "productId": null, "orderId": 1, "value": 363.91, "at": "2024-06-01T09:00:00.000Z" },
  { "id": 4, "type": "payment_captured", "userId": 1, "productId": null, "orderId": 1, "value": 308.22, "at": "2024-06-01T09:01:00.000Z" },
  { "id": 5, "type": "product_view", "userId": 2, "productId": 42, "orderId": null, "value": null, "at": "2024-06-02T10:55:00.000Z" },
  { "id": 6, "type": "order_placed", "userId": 2, "productId": null, "orderId": 2, "value": 129.49, "at": "2024-06-02T11:15:00.000Z" },
  { "id": 7, "type": "payment_captured", "userId": 2, "productId": null, "orderId": 2, "value": 129.49, "at": "2024-06-02T11:15:30.000Z" },
  { "id": 8, "type": "page_view", "userId": 3, "productId": null, "orderId": null, "value": null, "at": "2024-06-02T16:30:00.000Z" },
  { "id": 9, "type": "order_placed", "userId": 3, "productId": null, "orderId": 3, "value": 74.90, "at": "2024-06-02T16:42:00.000Z" },
  { "id": 10, "type": "order_placed", "userId": 4, "productId": null, "orderId": 4, "value": 210.05, "at": "2024-06-03T08:05:00.000Z" },
  { "id": 11, "type": "checkout_started", "userId": 5, "productId": null, "orderId": null, "value": null, "at": "2024-06-03T19:25:00.000Z" },
  { "id": 12, "type": "order_placed", "userId": 5, "productId": null, "orderId": 5, "value": 55.30, "at": "2024-06-03T19:30:00.000Z" },
  { "id": 13, "type": "order_placed", "userId": 6, "productId": null, "orderId": 6, "value": 412.77, "at": "2024-06-04T10:12:00.000Z" },
  { "id": 14, "type": "checkout_started", "userId": 7, "productId": null, "orderId": null, "value": null, "at": "2024-06-04T13:40:00.000Z" },
  { "id": 15, "type": "order_placed", "userId": 8, "productId": null, "orderId": 8, "value": 167.40, "at": "2024-06-05T07:22:00.000Z" }
];

export default analyticsEvents;
