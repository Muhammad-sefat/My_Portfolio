import { api } from "@/lib/api";
import { Project } from "../types";

interface ProjectsResponse {
  success: boolean;
  message: string;
  data: Project[];
}

export const projectsApi = {
  async getProjects(): Promise<Project[]> {
    const response = await api.get<ProjectsResponse>("/projects");
    return response.data;
  },
};
