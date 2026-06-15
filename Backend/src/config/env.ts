import dotenv from "dotenv";

dotenv.config();

export interface EnvConfig {
  port: number;
  database_url: string;
  node_env: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  port: parseInt(getEnvVar("PORT", "5000"), 10),
  database_url: getEnvVar("DATABASE_URL"),
  node_env: getEnvVar("NODE_ENV", "development"),
};
