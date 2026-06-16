import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MS Portfolio API",
      version: "1.0.0",
      description:
        "Backend API for MS Portfolio & Admin Dashboard — manages projects, blogs, contact messages, and dashboard meta stats.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://my-portfolio-backend-alpha-blond.vercel.app",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/app/modules/**/*.route.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
