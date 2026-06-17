import { blogsApi } from "../api/blogsApi";

export const blogService = {
  getBlogs: () => blogsApi.getBlogs(),
};
