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
      service: { type: "string", example: "order-service" },
      uptime: {
        type: "number",
        format: "float",
        description: "Process uptime in seconds",
        example: 12.34,
      },
    },
  },
  OrderProduct: {
    type: "object",
    required: ["id", "title", "price", "quantity", "total"],
    properties: {
      id: { type: "integer", example: 16 },
      title: { type: "string", example: "Anker Power Bank 20000mAh" },
      price: { type: "number", format: "float", example: 45.99 },
      quantity: { type: "integer", example: 4 },
      total: { type: "number", format: "float", example: 183.96 },
      discountPercentage: { type: "number", format: "float", example: 20 },
      discountedTotal: { type: "number", format: "float", example: 147.17 },
      thumbnail: { type: "string", format: "uri", example: "https://images.unsplash.com/photo-1542838132-92c53300491e" },
    },
  },
  Order: {
    type: "object",
    required: ["id", "userId", "products", "total"],
    properties: {
      id: { type: "integer", example: 1 },
      userId: { type: "integer", example: 1 },
      products: { type: "array", items: { $ref: "#/components/schemas/OrderProduct" } },
      total: { type: "number", format: "float", example: 363.91 },
      discountedTotal: { type: "number", format: "float", example: 308.22 },
      totalProducts: { type: "integer", example: 3 },
      totalQuantity: { type: "integer", example: 9 },
      status: {
        type: "string",
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        example: "shipped",
      },
      createdAt: { type: "string", format: "date-time", example: "2024-06-01T09:00:00.000Z" },
      updatedAt: { type: "string", format: "date-time", example: "2024-06-01T09:00:00.000Z" },
    },
  },
  OrderListResponse: {
    type: "object",
    required: ["orders", "total", "skip", "limit"],
    properties: {
      orders: { type: "array", items: { $ref: "#/components/schemas/Order" } },
      total: { type: "integer", example: 25 },
      skip: { type: "integer", example: 0 },
      limit: { type: "integer", example: 30 },
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
