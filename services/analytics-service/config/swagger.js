import swaggerJSDoc from "swagger-jsdoc";
import packageJson from "../package.json" with { type: "json" };
import { schemas, responses } from "./schemas.js";

const PORT = process.env.PORT || 3006;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Analytics",
      version: packageJson.version,
      description: "Analytics service for the ecommerce platform.",
    },
    servers: [{ url: `http://localhost:${PORT}`, description: "Local" }],
    components: { schemas, responses },
  },
  apis: ["./index.js", "./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
