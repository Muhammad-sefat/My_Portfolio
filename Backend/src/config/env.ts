import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  port: number | string;
  database_url: string;
  node_env: string;
}

export const env: EnvConfig = {
  port: process.env.PORT as string,
  database_url: process.env.DATABASE_URL as string,
  node_env: (process.env.NODE_ENV as string) || "development",
};
