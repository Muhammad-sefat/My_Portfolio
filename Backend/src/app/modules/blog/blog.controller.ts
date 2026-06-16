import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { BlogServices } from "./blog.service.js";

const addBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.addBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog post published successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await BlogServices.getBlogByIdFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Blog post not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog post retrieved successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await BlogServices.updateBlogInDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog post updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await BlogServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog post deleted successfully",
    data: null,
  });
});

export const BlogControllers = {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
