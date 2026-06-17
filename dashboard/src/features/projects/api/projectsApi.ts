import { api } from "@/lib/api";
import { Project } from "../types";

interface ProjectsResponse {
  success: boolean;
  message: string;
  data: Project[];
}

interface SingleProjectResponse {
  success: boolean;
  message: string;
  data: Project;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

export const projectsApi = {
  async getProjects(): Promise<Project[]> {
    const response = await api.get<ProjectsResponse>("/projects");
    return response.data;
  },

  async createProject(project: Omit<Project, "id" | "_id">): Promise<Project> {
    const response = await api.post<SingleProjectResponse>("/projects", project);
    return response.data;
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await api.put<SingleProjectResponse>(`/projects/${id}`, project);
    return response.data;
  },

  async deleteProject(id: string): Promise<boolean> {
    const response = await api.delete<DeleteResponse>(`/projects/${id}`);
    return response.success;
  },
};
