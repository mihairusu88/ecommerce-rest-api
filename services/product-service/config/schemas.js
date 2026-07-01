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
      service: { type: "string", example: "product-service" },
      uptime: {
        type: "number",
        format: "float",
        description: "Process uptime in seconds",
        example: 12.34,
      },
    },
  },
  ProductReview: {
    type: "object",
    properties: {
      rating: { type: "integer", example: 4 },
      comment: { type: "string", example: "Great quality!" },
      date: { type: "string", format: "date-time", example: "2024-05-23T08:56:21.618Z" },
      reviewerName: { type: "string", example: "John Doe" },
      reviewerEmail: { type: "string", format: "email", example: "john.doe@example.com" },
    },
  },
  Product: {
    type: "object",
    required: ["id", "title", "category", "price"],
    properties: {
      id: { type: "integer", example: 1 },
      title: { type: "string", example: "Essence Mascara Lash Princess" },
      description: { type: "string", example: "A quality beauty product offering excellent value." },
      category: { type: "string", example: "beauty" },
      price: { type: "number", format: "float", example: 9.99 },
      discountPercentage: { type: "number", format: "float", example: 7.17 },
      rating: { type: "number", format: "float", example: 4.94 },
      stock: { type: "integer", example: 5 },
      tags: { type: "array", items: { type: "string" }, example: ["beauty", "mascara"] },
      brand: { type: "string", example: "Essence" },
      sku: { type: "string", example: "ADM1000" },
      weight: { type: "number", format: "float", example: 2 },
      dimensions: {
        type: "object",
        properties: {
          width: { type: "number", format: "float", example: 23.17 },
          height: { type: "number", format: "float", example: 14.43 },
          depth: { type: "number", format: "float", example: 28.01 },
        },
      },
      warrantyInformation: { type: "string", example: "1 month warranty" },
      shippingInformation: { type: "string", example: "Ships in 1 month" },
      availabilityStatus: { type: "string", example: "Low Stock" },
      reviews: { type: "array", items: { $ref: "#/components/schemas/ProductReview" } },
      returnPolicy: { type: "string", example: "30 days return policy" },
      minimumOrderQuantity: { type: "integer", example: 24 },
      meta: {
        type: "object",
        properties: {
          createdAt: { type: "string", format: "date-time", example: "2024-05-23T08:56:21.618Z" },
          updatedAt: { type: "string", format: "date-time", example: "2024-05-23T08:56:21.618Z" },
          barcode: { type: "string", example: "9164035109868" },
          qrCode: { type: "string", format: "uri", example: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80" },
        },
      },
      thumbnail: { type: "string", format: "uri", example: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
      images: { type: "array", items: { type: "string", format: "uri" } },
    },
  },
  Category: {
    type: "object",
    required: ["slug", "name", "url"],
    properties: {
      slug: { type: "string", example: "beauty" },
      name: { type: "string", example: "Beauty" },
      url: {
        type: "string",
        format: "uri",
        example: "http://localhost:3002/api/products/categories?category=beauty",
      },
    },
  },
  ProductListResponse: {
    type: "object",
    required: ["products", "total", "skip", "limit"],
    properties: {
      products: { type: "array", items: { $ref: "#/components/schemas/Product" } },
      total: { type: "integer", example: 50 },
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
