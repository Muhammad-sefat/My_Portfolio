import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    image: z.string().url("Invalid image URL"),
    readTime: z.string().min(1, "Read time is required"),
    date: z.string().optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    image: z.string().url("Invalid image URL").optional(),
    readTime: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
