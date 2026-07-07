/**
 * File-based mock notification store — the in-memory "database" for the
 * notification service. Mirrors the style of `orders.js`/`products.js`: plain
 * data held in memory, loaded once at import time and read/mutated by the
 * notification service's routes.
 *
 * Each notification targets a `userId` from `users.js` (1-10). `channel` is one
 * of email, sms, push; `type` describes the trigger (e.g. order_confirmation,
 * shipment_update, payment_receipt, promotion); `status` is one of pending,
 * sent, failed, read. Every id is unique. Pure data — no imports.
 */
const notifications = [
  {
    "id": 1,
    "userId": 1,
    "channel": "email",
    "type": "order_confirmation",
    "subject": "Your order #1 is confirmed",
    "body": "Thanks for your purchase! Your order #1 has been received.",
    "status": "sent",
    "createdAt": "2024-06-01T09:00:05.000Z",
    "sentAt": "2024-06-01T09:00:07.000Z"
  },
  {
    "id": 2,
    "userId": 2,
    "channel": "email",
    "type": "order_confirmation",
    "subject": "Your order #2 is confirmed",
    "body": "Thanks for your purchase! Your order #2 has been received.",
    "status": "sent",
    "createdAt": "2024-06-02T11:15:05.000Z",
    "sentAt": "2024-06-02T11:15:06.000Z"
  },
  {
    "id": 3,
    "userId": 2,
    "channel": "push",
    "type": "shipment_update",
    "subject": "Your order #2 has shipped",
    "body": "Good news — order #2 is on its way.",
    "status": "read",
    "createdAt": "2024-06-03T10:00:00.000Z",
    "sentAt": "2024-06-03T10:00:01.000Z"
  },
  {
    "id": 4,
    "userId": 3,
    "channel": "sms",
    "type": "payment_receipt",
    "subject": "Payment received",
    "body": "We received your payment of $74.90 for order #3.",
    "status": "sent",
    "createdAt": "2024-06-02T16:42:12.000Z",
    "sentAt": "2024-06-02T16:42:13.000Z"
  },
  {
    "id": 5,
    "userId": 4,
    "channel": "email",
    "type": "order_confirmation",
    "subject": "Your order #4 is confirmed",
    "body": "Thanks for your purchase! Your order #4 has been received.",
    "status": "sent",
    "createdAt": "2024-06-03T08:05:05.000Z",
    "sentAt": "2024-06-03T08:05:06.000Z"
  },
  {
    "id": 6,
    "userId": 5,
    "channel": "push",
    "type": "promotion",
    "subject": "Weekend flash sale — up to 40% off",
    "body": "Big savings across electronics and fashion this weekend only.",
    "status": "pending",
    "createdAt": "2024-06-07T08:00:00.000Z",
    "sentAt": null
  },
  {
    "id": 7,
    "userId": 7,
    "channel": "email",
    "type": "payment_failed",
    "subject": "Action needed: payment failed for order #7",
    "body": "We couldn't process your payment for order #7. Please update your details.",
    "status": "failed",
    "createdAt": "2024-06-04T13:48:05.000Z",
    "sentAt": null
  },
  {
    "id": 8,
    "userId": 8,
    "channel": "email",
    "type": "order_confirmation",
    "subject": "Your order #8 is confirmed",
    "body": "Thanks for your purchase! Your order #8 has been received.",
    "status": "sent",
    "createdAt": "2024-06-05T07:22:05.000Z",
    "sentAt": "2024-06-05T07:22:06.000Z"
  },
  {
    "id": 9,
    "userId": 10,
    "channel": "sms",
    "type": "shipment_update",
    "subject": "Your order #10 is out for delivery",
    "body": "Order #10 will arrive today.",
    "status": "sent",
    "createdAt": "2024-06-07T06:30:00.000Z",
    "sentAt": "2024-06-07T06:30:02.000Z"
  },
  {
    "id": 10,
    "userId": 6,
    "channel": "push",
    "type": "promotion",
    "subject": "We miss you — here's 15% off",
    "body": "Come back and save 15% on your next order.",
    "status": "read",
    "createdAt": "2024-06-06T12:00:00.000Z",
    "sentAt": "2024-06-06T12:00:01.000Z"
  }
];

export default notifications;
