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
      username: { type: "string", example: "emilys" },
      password: { type: "string", example: "emilyspass" },
    },
  },
  UserDetails: {
    type: "object",
    required: ["id", "username", "email", "firstName", "lastName", "gender", "image"],
    properties: {
      id: { type: "integer", example: 1 },
      username: { type: "string", example: "emilys" },
      email: { type: "string", format: "email", example: "emily.johnson@example.com" },
      firstName: { type: "string", example: "Emily" },
      lastName: { type: "string", example: "Johnson" },
      gender: { type: "string", example: "female" },
      image: { type: "string", format: "uri", example: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80" },
    },
  },
  LoginResponse: {
    type: "object",
    required: ["id", "username", "email", "accessToken", "refreshToken"],
    properties: {
      id: { type: "integer", example: 1 },
      username: { type: "string", example: "emilys" },
      email: { type: "string", format: "email", example: "emily.johnson@example.com" },
      firstName: { type: "string", example: "Emily" },
      lastName: { type: "string", example: "Johnson" },
      gender: { type: "string", example: "female" },
      image: { type: "string", format: "uri", example: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80" },
      accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
      refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
      access_token: {
        type: "string",
        description: "Same JWT as `accessToken`, named per OAuth2 so Swagger's password flow can consume it.",
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
    description:
      "Optional — if omitted, the refresh token is read from the `refreshToken` cookie.",
    properties: {
      refreshToken: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  },
  RefreshTokenResponse: {
    type: "object",
    required: ["accessToken", "refreshToken"],
    properties: {
      accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
      refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
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
