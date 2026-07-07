/**
 * Reusable OpenAPI component schemas & responses, referenced from route JSDoc
 * via `$ref` (e.g. `$ref: '#/components/schemas/HealthResponse'`).
 */

export const schemas = {
  HealthResponse: {
    type: "object",
    required: ["status", "service", "uptime"],
    properties: {
      status: { type: "string", example: "OK" },
      service: { type: "string", example: "payment-service" },
      uptime: {
        type: "number",
        format: "float",
        description: "Process uptime in seconds",
        example: 12.34,
      },
    },
  },
  Payment: {
    type: "object",
    required: ["id", "orderId", "userId", "amount", "status"],
    properties: {
      id: { type: "integer", example: 1 },
      orderId: { type: "integer", example: 1 },
      userId: { type: "integer", example: 1 },
      amount: { type: "number", format: "float", example: 308.22 },
      currency: { type: "string", example: "USD" },
      method: {
        type: "string",
        enum: ["credit_card", "debit_card", "paypal", "apple_pay", "google_pay"],
        example: "credit_card",
      },
      status: {
        type: "string",
        enum: ["pending", "authorized", "captured", "failed", "refunded"],
        example: "captured",
      },
      transactionId: { type: "string", example: "txn_9f2a1c7b" },
      createdAt: { type: "string", format: "date-time", example: "2024-06-01T09:01:00.000Z" },
      updatedAt: { type: "string", format: "date-time", example: "2024-06-01T09:01:00.000Z" },
    },
  },
  PaymentListResponse: {
    type: "object",
    required: ["payments", "total", "skip", "limit"],
    properties: {
      payments: { type: "array", items: { $ref: "#/components/schemas/Payment" } },
      total: { type: "integer", example: 10 },
      skip: { type: "integer", example: 0 },
      limit: { type: "integer", example: 30 },
    },
  },
  CreatePaymentRequest: {
    type: "object",
    required: ["orderId", "userId", "amount"],
    properties: {
      orderId: { type: "integer", example: 11 },
      userId: { type: "integer", example: 3 },
      amount: { type: "number", format: "float", example: 149.99 },
      currency: { type: "string", example: "USD", default: "USD" },
      method: {
        type: "string",
        enum: ["credit_card", "debit_card", "paypal", "apple_pay", "google_pay"],
        example: "credit_card",
        default: "credit_card",
      },
    },
  },
  ErrorResponse: {
    type: "object",
    required: ["status", "message", "statusCode"],
    properties: {
      status: { type: "string", example: "error" },
      message: { type: "string", example: "Resource not found" },
      statusCode: { type: "integer", example: 404 },
    },
  },
};

export const responses = {
  BadRequest: {
    description: "The request payload was invalid",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ErrorResponse" },
      },
    },
  },
  NotFound: {
    description: "The requested resource was not found",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ErrorResponse" },
      },
    },
  },
  InternalServerError: {
    description: "Unexpected server error",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ErrorResponse" },
      },
    },
  },
};
