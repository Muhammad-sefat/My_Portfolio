import { Project } from "../types";
import { INITIAL_PROJECTS } from "../data/mockProjects";

export const projectsApi = {
  getProjects: async (): Promise<Project[]> => {
    // Placeholder for API fetching
    return INITIAL_PROJECTS;
  },
};
