import { Project } from "../projects/types";
import { Blog } from "../blogs/types";

export interface DashboardStats {
  totalProjects: number;
  totalBlogs: number;
  unreadMessages: number;
  recentProjects: Project[];
  recentBlogs: Blog[];
}

export interface StatsResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}
