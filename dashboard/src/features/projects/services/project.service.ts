import { projectsApi } from "../api/projectsApi";
import { Project } from "../types";

export const projectService = {
  getProjects: () => projectsApi.getProjects(),
  createProject: (project: Omit<Project, "id" | "_id">) => projectsApi.createProject(project),
  updateProject: (id: string, project: Partial<Project>) => projectsApi.updateProject(id, project),
  deleteProject: (id: string) => projectsApi.deleteProject(id),
};
