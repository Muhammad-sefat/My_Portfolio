import { blogsApi } from "../api/blogsApi";
import { Blog } from "../types";

export const blogService = {
    getBlogs: () => blogsApi.getBlogs(),
    createBlog: (blog: Omit<Blog, "id" | "_id" | "date">) => blogsApi.createBlog(blog),
    updateBlog: (id: string, blog: Partial<Blog>) => blogsApi.updateBlog(id, blog),
    deleteBlog: (id: string) => blogsApi.deleteBlog(id),
};