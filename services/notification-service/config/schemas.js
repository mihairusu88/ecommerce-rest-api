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
      service: { type: "string", example: "notification-service" },
      uptime: {
        type: "number",
        format: "float",
        description: "Process uptime in seconds",
        example: 12.34,
      },
    },
  },
  Notification: {
    type: "object",
    required: ["id", "userId", "channel", "type", "status"],
    properties: {
      id: { type: "integer", example: 1 },
      userId: { type: "integer", example: 1 },
      channel: {
        type: "string",
        enum: ["email", "sms", "push"],
        example: "email",
      },
      type: {
        type: "string",
        description: "The trigger for the notification.",
        example: "order_confirmation",
      },
      subject: { type: "string", example: "Your order #1 is confirmed" },
      body: { type: "string", example: "Thanks for your purchase!" },
      status: {
        type: "string",
        enum: ["pending", "sent", "failed", "read"],
        example: "sent",
      },
      createdAt: { type: "string", format: "date-time", example: "2024-06-01T09:00:05.000Z" },
      sentAt: {
        type: "string",
        format: "date-time",
        nullable: true,
        example: "2024-06-01T09:00:07.000Z",
      },
    },
  },
  NotificationListResponse: {
    type: "object",
    required: ["notifications", "total", "skip", "limit"],
    properties: {
      notifications: { type: "array", items: { $ref: "#/components/schemas/Notification" } },
      total: { type: "integer", example: 10 },
      skip: { type: "integer", example: 0 },
      limit: { type: "integer", example: 30 },
    },
  },
  CreateNotificationRequest: {
    type: "object",
    required: ["userId", "channel", "type"],
    properties: {
      userId: { type: "integer", example: 3 },
      channel: {
        type: "string",
        enum: ["email", "sms", "push"],
        example: "email",
      },
      type: { type: "string", example: "order_confirmation" },
      subject: { type: "string", example: "Your order is confirmed" },
      body: { type: "string", example: "Thanks for your purchase!" },
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
