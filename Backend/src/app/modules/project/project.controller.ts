import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { ProjectServices } from "./project.service.js";

const addProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.addProjectIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project uploaded successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjectsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ProjectServices.updateProjectInDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await ProjectServices.deleteProjectFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: null,
  });
});

export const ProjectControllers = {
  addProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
