import swaggerJSDoc from "swagger-jsdoc";
import packageJson from "../package.json" with { type: "json" };
import { schemas, responses } from "./schemas.js";

const PORT = process.env.PORT || 3001;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth",
      version: packageJson.version,
      description: "Authentication & authorization service for the ecommerce platform.",
    },
    servers: [{ url: `http://localhost:${PORT}`, description: "Local" }],
    components: {
      schemas,
      responses,
      securitySchemes: {
        // OAuth2 "password" flow: Swagger UI shows username + password fields,
        // exchanges them at the tokenUrl for a JWT, then sends it as a Bearer
        // token on every request. Lets you log in from the Authorize dialog.
        passwordAuth: {
          type: "oauth2",
          description:
            "Log in with username + password. **Demo credentials — username: `guest`, password: `guest12345`.** Leave client id/secret blank.",
          flows: {
            password: {
              tokenUrl: `http://localhost:${PORT}/api/login`,
              scopes: {},
            },
          },
        },
      },
    },
  },
  // Scan source files for @openapi JSDoc annotations
  apis: ["./index.js", "./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
