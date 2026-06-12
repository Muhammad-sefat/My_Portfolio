import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";
import { seedInitialProjects } from "./app/modules/project/project.model";
import { seedInitialBlogs } from "./app/modules/blog/blog.model";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connected successfully!");

    const initialProjects = [
      {
        title: "E-Commerce Platform",
        description:
          "Full-featured shopping app with cart, auth, and payment integration",
        image: "https://picsum.photos/seed/ecommerce/800/600",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        tags: ["Next.js", "TypeScript", "Stripe"],
      },
      {
        title: "Task Management App",
        description: "Kanban-style productivity tool with drag-and-drop",
        image: "https://picsum.photos/seed/taskapp/800/600",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        tags: ["React", "Redux", "Tailwind"],
      },
      {
        title: "Blog Platform",
        description: "MDX-powered blog with dark mode and syntax highlighting",
        image: "https://picsum.photos/seed/blogplatform/800/600",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        tags: ["Next.js", "MDX", "Tailwind"],
      },
    ];

    const initialBlogs = [
      {
        title: "Why I Chose Next.js Over Plain React",
        excerpt:
          "After working with both, here's why Next.js has become my go-to framework for every project.",
        content:
          "Next.js provides SSR, SSG, file-based routing, and incredible performance out of the box. The developer experience is unmatched — from automatic code splitting to the built-in Image optimization. If you're still debating whether to use Next.js, the answer is almost always yes for production apps.",
        category: "Next.js",
        image: "https://picsum.photos/seed/nextjsblog/800/400",
        readTime: "4 min read",
        date: "Jan 15, 2025",
      },
      {
        title: "My MERN Stack Learning Journey",
        excerpt:
          "From zero backend knowledge to building REST APIs — here's what I've learned so far.",
        content:
          "Starting with Node.js felt overwhelming but the ecosystem is incredible. I began with Express.js to understand how servers work, then moved to MongoDB for data persistence. The MERN stack is powerful because JavaScript is used everywhere — from the UI to the database queries.",
        category: "Backend",
        image: "https://picsum.photos/seed/mernstack/800/400",
        readTime: "6 min read",
        date: "Feb 03, 2025",
      },
    ];

    await seedInitialProjects(initialProjects);
    await seedInitialBlogs(initialBlogs);

    server = app.listen(config.port, () => {
      console.log(`Application is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to bootstrap application:", error);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected, shutting down server...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected, shutting down server...");
  process.exit(1);
});
