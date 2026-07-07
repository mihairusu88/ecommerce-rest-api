import swaggerJSDoc from "swagger-jsdoc";
import packageJson from "../package.json" with { type: "json" };
import { schemas, responses } from "./schemas.js";

const PORT = process.env.PORT || 3004;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment",
      version: packageJson.version,
      description: "Payment processing service for the ecommerce platform.",
    },
    servers: [{ url: `http://localhost:${PORT}`, description: "Local" }],
    components: { schemas, responses },
  },
  apis: ["./index.js", "./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
