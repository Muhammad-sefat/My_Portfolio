import cors from "cors";
import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import globalErrorHandler from "./app/errors/globalErrorHandler.js";
import router from "./app/routes/index.js";
import swaggerSpec from "./app/swagger/swagger.js";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors({ origin: "*" }));

// Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Application Routes
app.use("/api", router);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("MS Portfolio API Server is running!");
});

// Not Found Route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    errorSources: [
      {
        path: req.originalUrl,
        message: "The requested resource could not be found.",
      },
    ],
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
