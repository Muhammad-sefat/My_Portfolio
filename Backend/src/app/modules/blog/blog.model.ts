import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    readTime: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Blog = model<IBlog>("Blog", blogSchema);

// Seed helper function
export const seedInitialBlogs = async (initialBlogs: any[]) => {
  const count = await Blog.countDocuments();
  if (count === 0) {
    await Blog.insertMany(initialBlogs);
    console.log("Blogs seeded successfully!");
  }
};
