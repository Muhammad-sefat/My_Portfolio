import { Response } from "express";

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: ApiResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message || "Request completed successfully",
    data: data.data,
  });
};

export default sendResponse;
