/**
 * Reusable OpenAPI component schemas & responses for this service.
 *
 * Schemas are referenced from route JSDoc via `$ref`, e.g.
 *   schema:
 *     $ref: '#/components/schemas/HealthResponse'
 *
 * Responses are referenced the same way, e.g.
 *   responses:
 *     404:
 *       $ref: '#/components/responses/NotFound'
 */

export const schemas = {
  HealthResponse: {
    type: "object",
    required: ["status", "service", "uptime"],
    properties: {
      status: { type: "string", example: "OK" },
      service: { type: "string", example: "auth-service" },
      uptime: {
        type: "number",
        format: "float",
        description: "Process uptime in seconds",
        example: 12.34,
      },
    },
  },
  LoginRequest: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string", example: "guest" },
      password: { type: "string", example: "guest12345" },
    },
  },
  UserDetails: {
    type: "object",
    required: ["id", "username", "email"],
    properties: {
      id: { type: "integer", example: 1 },
      username: { type: "string", example: "guest" },
      email: { type: "string", format: "email", example: "guest@example.com" },
    },
  },
  LoginResponse: {
    type: "object",
    required: ["status", "message", "token"],
    properties: {
      status: { type: "string", example: "success" },
      message: { type: "string", example: "Login successful" },
      token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
      access_token: {
        type: "string",
        description: "Same JWT as `token`, named per OAuth2 so Swagger's password flow can consume it.",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      token_type: { type: "string", example: "bearer" },
    },
  },
  UserInformationResponse: {
    type: "object",
    required: ["status", "message", "user"],
    properties: {
      status: { type: "string", example: "success" },
      message: { type: "string", example: "User information retrieved successfully" },
      user: { $ref: "#/components/schemas/UserDetails" },
    },
  },
  RefreshTokenRequest: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: { type: "string", example: "dummy-refresh-token" },
    },
  },
  RefreshTokenResponse: {
    type: "object",
    required: ["status", "message", "token"],
    properties: {
      status: { type: "string", example: "success" },
      message: { type: "string", example: "Token refreshed successfully" },
      token: { type: "string", example: "new-dummy-jwt-token" },
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
  Unauthorized: {
    description: "Authentication required — missing, invalid, or expired token",
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
