import { api } from "@/lib/api";
import { Blog } from "../types";

interface BlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
}

interface SingleBlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

export const blogsApi = {
  async getBlogs(): Promise<Blog[]> {
    const response = await api.get<BlogsResponse>("/blogs");
    return response.data;
  },

  async createBlog(blog: Omit<Blog, "id" | "_id" | "date">): Promise<Blog> {
    const response = await api.post<SingleBlogResponse>("/blogs", blog);
    return response.data;
  },

  async updateBlog(id: string, blog: Partial<Blog>): Promise<Blog> {
    const response = await api.put<SingleBlogResponse>(`/blogs/${id}`, blog);
    return response.data;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const response = await api.delete<DeleteResponse>(`/blogs/${id}`);
    return response.success;
  },
};