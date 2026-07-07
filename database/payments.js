/**
 * File-based mock payment store — the in-memory "database" for the payment
 * service. Mirrors the style of `orders.js`/`products.js`: plain data held in
 * memory, loaded once at import time and read/mutated by the payment service's
 * routes.
 *
 * Each payment references an `orderId` from `orders.js` (1-25) and the `userId`
 * that placed it. `amount` is the charged sum (matches the order's
 * `discountedTotal`); `status` is one of pending, authorized, captured, failed,
 * refunded. `method` is the payment instrument. Every id is unique. Pure data —
 * no imports.
 */
const payments = [
  {
    "id": 1,
    "orderId": 1,
    "userId": 1,
    "amount": 308.22,
    "currency": "USD",
    "method": "credit_card",
    "status": "refunded",
    "transactionId": "txn_9f2a1c7b",
    "createdAt": "2024-06-01T09:01:00.000Z",
    "updatedAt": "2024-06-03T14:20:00.000Z"
  },
  {
    "id": 2,
    "orderId": 2,
    "userId": 2,
    "amount": 129.49,
    "currency": "USD",
    "method": "paypal",
    "status": "captured",
    "transactionId": "txn_3b8e5d1a",
    "createdAt": "2024-06-02T11:15:00.000Z",
    "updatedAt": "2024-06-02T11:15:30.000Z"
  },
  {
    "id": 3,
    "orderId": 3,
    "userId": 3,
    "amount": 74.90,
    "currency": "USD",
    "method": "credit_card",
    "status": "captured",
    "transactionId": "txn_7c4f2e9d",
    "createdAt": "2024-06-02T16:42:00.000Z",
    "updatedAt": "2024-06-02T16:42:10.000Z"
  },
  {
    "id": 4,
    "orderId": 4,
    "userId": 4,
    "amount": 210.05,
    "currency": "USD",
    "method": "debit_card",
    "status": "captured",
    "transactionId": "txn_1a9b3c6e",
    "createdAt": "2024-06-03T08:05:00.000Z",
    "updatedAt": "2024-06-03T08:05:20.000Z"
  },
  {
    "id": 5,
    "orderId": 5,
    "userId": 5,
    "amount": 55.30,
    "currency": "USD",
    "method": "apple_pay",
    "status": "authorized",
    "transactionId": "txn_5e2d8f4a",
    "createdAt": "2024-06-03T19:30:00.000Z",
    "updatedAt": "2024-06-03T19:30:05.000Z"
  },
  {
    "id": 6,
    "orderId": 6,
    "userId": 6,
    "amount": 412.77,
    "currency": "USD",
    "method": "credit_card",
    "status": "captured",
    "transactionId": "txn_8d1c4b7f",
    "createdAt": "2024-06-04T10:12:00.000Z",
    "updatedAt": "2024-06-04T10:12:15.000Z"
  },
  {
    "id": 7,
    "orderId": 7,
    "userId": 7,
    "amount": 89.99,
    "currency": "USD",
    "method": "google_pay",
    "status": "failed",
    "transactionId": "txn_2f6a9e3c",
    "createdAt": "2024-06-04T13:48:00.000Z",
    "updatedAt": "2024-06-04T13:48:02.000Z"
  },
  {
    "id": 8,
    "orderId": 8,
    "userId": 8,
    "amount": 167.40,
    "currency": "USD",
    "method": "paypal",
    "status": "captured",
    "transactionId": "txn_4b7d1f8a",
    "createdAt": "2024-06-05T07:22:00.000Z",
    "updatedAt": "2024-06-05T07:22:12.000Z"
  },
  {
    "id": 9,
    "orderId": 9,
    "userId": 9,
    "amount": 33.15,
    "currency": "USD",
    "method": "credit_card",
    "status": "pending",
    "transactionId": "txn_6c3e8a2d",
    "createdAt": "2024-06-05T18:55:00.000Z",
    "updatedAt": "2024-06-05T18:55:00.000Z"
  },
  {
    "id": 10,
    "orderId": 10,
    "userId": 10,
    "amount": 254.60,
    "currency": "USD",
    "method": "debit_card",
    "status": "captured",
    "transactionId": "txn_9a5f2c7e",
    "createdAt": "2024-06-06T09:40:00.000Z",
    "updatedAt": "2024-06-06T09:40:18.000Z"
  }
];

export default payments;
