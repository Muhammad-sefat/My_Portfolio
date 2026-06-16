import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    return new Promise((resolve, reject) => {
      mongoose.connection.once("connected", () => resolve(mongoose.connection));
      mongoose.connection.once("error", (err) => reject(err));
    });
  }

  try {
    const conn = await mongoose.connect(env.database_url);

    console.log("✅ MongoDB Connected Successfully");
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw error;
  }
};

