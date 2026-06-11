import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { MetaServices } from "./meta.service";

const getStats = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaServices.getStatsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard stats aggregated successfully",
    data: result,
  });
});

export const MetaControllers = {
  getStats,
};
