import { Blog } from "../types";
import { INITIAL_BLOGS } from "../data/mockBlogs";

export const blogsApi = {
  getBlogs: async (): Promise<Blog[]> => {
    // Placeholder for API fetching
    return INITIAL_BLOGS;
  },
};
