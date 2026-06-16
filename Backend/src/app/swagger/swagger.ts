import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        url: "https://my-portfolio-zsvg.vercel.app",
        description: "Production server",
      },
    ],
  },
  apis: [path.join(__dirname, "../modules/**/*.route.*")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
