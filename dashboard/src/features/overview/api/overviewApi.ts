import { api } from "@/lib/api";
import { StatsResponse, DashboardStats } from "../types";

export const overviewApi = {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<StatsResponse>("/meta/stats");
    return response.data;
  },
};
