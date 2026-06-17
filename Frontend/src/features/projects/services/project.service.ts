import { projectsApi } from "../api/projectsApi";

export const projectService = {
  getProjects: () => projectsApi.getProjects(),
};
