import { api } from "@/lib/api";
import { Blog } from "../types";

interface BlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
}

export const blogsApi = {
  async getBlogs(): Promise<Blog[]> {
    const response = await api.get<BlogsResponse>("/blogs");
    return response.data;
  },
};
