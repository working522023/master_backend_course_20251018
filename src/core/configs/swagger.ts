import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export const setupSwagger = (app: Application) => {
  const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
      title: "Master Backend API",
      version: "1.0.0",
      description: "API documentation for Auth, Users, and Media handling",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  };

  const options: swaggerJsdoc.Options = {
    definition: swaggerDefinition,
    apis: [
      "./src/modules/auth/*.ts",
      "./src/modules/users/*.ts",
      "./src/modules/media/*.ts",
      "./src/routes/*.ts",
    ],
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
