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
      service: { type: "string", example: "analytics-service" },
      uptime: {
        type: "number",
        format: "float",
        description: "Process uptime in seconds",
        example: 12.34,
      },
    },
  },
  AnalyticsSummary: {
    type: "object",
    description: "Aggregated platform metrics computed from the order catalogue and recorded events.",
    properties: {
      orders: {
        type: "object",
        properties: {
          total: { type: "integer", example: 25 },
          revenue: { type: "number", format: "float", example: 5231.44 },
          averageOrderValue: { type: "number", format: "float", example: 209.26 },
          byStatus: {
            type: "object",
            additionalProperties: { type: "integer" },
            example: { pending: 4, confirmed: 6, shipped: 7, delivered: 6, cancelled: 2 },
          },
        },
      },
      products: {
        type: "object",
        properties: {
          total: { type: "integer", example: 50 },
          lowStock: { type: "integer", description: "Products with stock below the threshold.", example: 8 },
          outOfStock: { type: "integer", example: 1 },
        },
      },
      events: {
        type: "object",
        properties: {
          total: { type: "integer", example: 15 },
          byType: {
            type: "object",
            additionalProperties: { type: "integer" },
            example: { product_view: 3, order_placed: 8, payment_captured: 3, page_view: 1 },
          },
        },
      },
    },
  },
  AnalyticsEvent: {
    type: "object",
    required: ["id", "type", "at"],
    properties: {
      id: { type: "integer", example: 1 },
      type: {
        type: "string",
        description: "The kind of event that occurred.",
        example: "order_placed",
      },
      userId: { type: "integer", nullable: true, example: 1 },
      productId: { type: "integer", nullable: true, example: 16 },
      orderId: { type: "integer", nullable: true, example: 1 },
      value: { type: "number", format: "float", nullable: true, example: 363.91 },
      at: { type: "string", format: "date-time", example: "2024-06-01T09:00:00.000Z" },
    },
  },
  AnalyticsEventListResponse: {
    type: "object",
    required: ["events", "total", "skip", "limit"],
    properties: {
      events: { type: "array", items: { $ref: "#/components/schemas/AnalyticsEvent" } },
      total: { type: "integer", example: 15 },
      skip: { type: "integer", example: 0 },
      limit: { type: "integer", example: 30 },
    },
  },
  CreateEventRequest: {
    type: "object",
    required: ["type"],
    properties: {
      type: { type: "string", example: "product_view" },
      userId: { type: "integer", example: 3 },
      productId: { type: "integer", example: 16 },
      orderId: { type: "integer", example: 11 },
      value: { type: "number", format: "float", example: 45.99 },
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
