import { z } from "zod";

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().url("Invalid image URL"),
    liveUrl: z.string().url("Invalid live URL"),
    githubUrl: z.string().url("Invalid github URL"),
    tags: z.array(z.string()).min(1, "Tags are required"),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url("Invalid image URL").optional(),
    liveUrl: z.string().url("Invalid live URL").optional(),
    githubUrl: z.string().url("Invalid github URL").optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const ProjectValidations = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
