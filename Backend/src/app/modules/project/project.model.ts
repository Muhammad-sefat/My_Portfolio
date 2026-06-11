import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Project = model<IProject>("Project", projectSchema);
// Seed helper function
export const seedInitialProjects = async (initialProjects: any[]) => {
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(initialProjects);
    console.log("Projects seeded successfully!");
  }
};
