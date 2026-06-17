import { overviewApi } from "../api/overviewApi";

export const overviewService = {
  getStats: () => overviewApi.getStats(),
};
