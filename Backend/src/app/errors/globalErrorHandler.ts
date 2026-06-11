import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "Internal Server Error!";
  let errorSources = [
    {
      path: "",
      message: err.message || "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorSources = err.issues.map((issue) => ({
      path: issue.path[issue.path.length - 1] as string,
      message: issue.message,
    }));
  } else if (err?.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errorSources = Object.values(err.errors).map((val: any) => ({
      path: val.path,
      message: val.message,
    }));
  } else if (err?.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    errorSources = [
      {
        path: err.path,
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === "development" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
