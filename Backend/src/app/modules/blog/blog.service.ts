import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const addBlogIntoDB = async (payload: IBlog) => {
  if (!payload.date) {
    const today = new Date();
    payload.date = today.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find().sort({ createdAt: -1 });
  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlogInDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  addBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
