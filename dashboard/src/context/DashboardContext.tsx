"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, Blog, Contact } from "../types";

// Initial projects from Frontend/data/projects.ts
const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-featured shopping app with cart, auth, and payment integration",
    image: "https://picsum.photos/seed/ecommerce/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Kanban-style productivity tool with drag-and-drop",
    image: "https://picsum.photos/seed/taskapp/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["React", "Redux", "Tailwind"],
  },
  {
    id: 3,
    title: "Blog Platform",
    description: "MDX-powered blog with dark mode and syntax highlighting",
    image: "https://picsum.photos/seed/blogplatform/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["Next.js", "MDX", "Tailwind"],
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Real-time weather app with beautiful animated UI",
    image: "https://picsum.photos/seed/weatherapp/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["React", "OpenWeather API"],
  },
  {
    id: 5,
    title: "Portfolio V1",
    description: "My first portfolio website built with React",
    image: "https://picsum.photos/seed/portfoliov1/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["React", "CSS3"],
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat app with Socket.io and Node.js",
    image: "https://picsum.photos/seed/chatapp/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["React", "Node.js", "Socket.io"],
  },
  {
    id: 7,
    title: "Recipe Finder",
    description: "Search and save recipes using Spoonacular API",
    image: "https://picsum.photos/seed/recipefinder/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["React", "API", "Tailwind"],
  },
  {
    id: 8,
    title: "Admin Dashboard",
    description: "Analytics dashboard with charts and data tables",
    image: "https://picsum.photos/seed/admindash/800/600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    tags: ["Next.js", "Recharts", "shadcn/ui"],
  },
];

// Initial blogs from Frontend/data/blogs.ts
const INITIAL_BLOGS: Blog[] = [
  {
    id: 1,
    title: "Why I Chose Next.js Over Plain React",
    excerpt: "After working with both, here's why Next.js has become my go-to framework for every project.",
    content: "Next.js provides SSR, SSG, file-based routing, and incredible performance out of the box. When I first started with React, I loved the flexibility but quickly realized that setting up routing, SSR, and optimization manually was tedious. Next.js solves all of that. The App Router in Next.js 13+ takes it even further with React Server Components, nested layouts, and streaming. The developer experience is unmatched — from automatic code splitting to the built-in Image optimization. If you're still debating whether to use Next.js, the answer is almost always yes for production apps.",
    category: "Next.js",
    image: "https://picsum.photos/seed/nextjsblog/800/400",
    readTime: "4 min read",
    date: "Jan 15, 2025",
  },
  {
    id: 2,
    title: "My MERN Stack Learning Journey",
    excerpt: "From zero backend knowledge to building REST APIs — here's what I've learned so far.",
    content: "Starting with Node.js felt overwhelming but the ecosystem is incredible. I began with Express.js to understand how servers work, then moved to MongoDB for data persistence. The hardest part was understanding async/await patterns and error handling in Node. But once it clicked, building REST APIs became intuitive. I've learned to structure my Express apps with MVC patterns, use Mongoose for schema validation, and implement JWT authentication. The MERN stack is powerful because JavaScript is used everywhere — from the UI to the database queries.",
    category: "Backend",
    image: "https://picsum.photos/seed/mernstack/800/400",
    readTime: "6 min read",
    date: "Feb 03, 2025",
  },
  {
    id: 3,
    title: "Tailwind CSS Tips I Wish I Knew Earlier",
    excerpt: "10 Tailwind CSS tricks that made my workflow 10x faster.",
    content: "Tailwind's utility-first approach changed how I think about styling. Here are the tips that transformed my workflow: 1) Use the `group` and `peer` utilities for interactive states without JavaScript. 2) The `@apply` directive is powerful for extracting repeated utility combinations. 3) Use arbitrary values with `[]` syntax for one-off values. 4) The JIT mode generates only the CSS you use — keeping bundle sizes tiny. 5) Custom CSS variables work seamlessly with Tailwind. 6) `space-x` and `space-y` utilities replace manual margin stacking. 7) The `prose` plugin from @tailwindcss/typography is incredible for blog content. 8) Dark mode is just a `dark:` prefix away.",
    category: "CSS",
    image: "https://picsum.photos/seed/tailwindblog/800/400",
    readTime: "5 min read",
    date: "Feb 20, 2025",
  },
  {
    id: 4,
    title: "TypeScript for React Developers",
    excerpt: "A beginner-friendly guide to adding TypeScript to your React projects.",
    content: "TypeScript scared me at first, but proper typing makes your code so much safer. The key concepts every React developer needs: typing component props with interfaces, using generic types for useState and useRef, typing event handlers correctly, and creating utility types with Pick, Omit, and Partial. The most common mistake beginners make is using `any` everywhere — which defeats the purpose. Start by typing your data structures and API responses. Then type your component props. The TypeScript compiler becomes your best pair programmer, catching errors before they reach production.",
    category: "TypeScript",
    image: "https://picsum.photos/seed/typescriptblog/800/400",
    readTime: "7 min read",
    date: "Mar 05, 2025",
  },
  {
    id: 5,
    title: "Using Redux Toolkit in 2025",
    excerpt: "Redux used to be complex. Redux Toolkit makes it enjoyable again.",
    content: "RTK simplifies store setup, reducers, and async logic dramatically. Gone are the days of writing action creators, action types, and reducers separately. With `createSlice`, you define all three in one place. `createAsyncThunk` handles async operations with built-in pending/fulfilled/rejected states. RTK Query takes it even further — it's a powerful data fetching and caching solution built right into RTK. The devtools integration is still best-in-class. For large applications with complex shared state, Redux Toolkit remains the gold standard in 2025.",
    category: "React",
    image: "https://picsum.photos/seed/reduxblog/800/400",
    readTime: "5 min read",
    date: "Mar 22, 2025",
  },
  {
    id: 6,
    title: "GSAP Animations for Web Developers",
    excerpt: "Getting started with GSAP to add buttery smooth animations to any website.",
    content: "GSAP is the gold standard for web animation and for good reason. The API is intuitive: `gsap.to()`, `gsap.from()`, and `gsap.fromTo()` cover most use cases. Timeline allows you to sequence animations with precision. ScrollTrigger is a game-changer — elements animate as they enter the viewport with almost zero configuration. The performance is exceptional because GSAP uses CSS transforms and handles browser quirks for you. For React, the `@gsap/react` package provides `useGSAP` hook that properly handles cleanup. Start with simple fade-in animations and work your way up to complex scroll-driven sequences.",
    category: "Animation",
    image: "https://picsum.photos/seed/gsapblog/800/400",
    readTime: "6 min read",
    date: "Apr 10, 2025",
  },
];

// Initial mock contact submissions
const INITIAL_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Freelance Project Inquiry",
    message: "Hi Sefat, I'm looking for a frontend developer to help build a custom Next.js application with Tailwind styling. Your portfolio looks great! Let me know your rates and availability.",
    date: "Jun 10, 2026",
    read: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    subject: "Job Opening at Tech Corp",
    message: "Hello Sefat, we have an opening for a Junior Frontend Developer position at Tech Corp. We would love to chat about your background and schedule a screening call. Let me know if you are interested!",
    date: "Jun 08, 2026",
    read: true,
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@designco.net",
    subject: "Collaboration Invitation",
    message: "Hey! I'm a UI/UX designer and I have a few clients who need development work. I'd love to partner up and refer them to you. Let's jump on a quick Zoom call to discuss this further.",
    date: "Jun 05, 2026",
    read: false,
  },
];

interface DashboardContextType {
  projects: Project[];
  blogs: Blog[];
  contacts: Contact[];
  addProject: (project: Omit<Project, "id">) => void;
  editProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  addBlog: (blog: Omit<Blog, "id" | "date">) => void;
  editBlog: (blog: Blog) => void;
  deleteBlog: (id: number) => void;
  deleteContact: (id: number) => void;
  markContactAsRead: (id: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [blogs, setBlogs] = useState<Blog[]>(INITIAL_BLOGS);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [hydrated, setHydrated] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("dashboard_projects");
      const storedBlogs = localStorage.getItem("dashboard_blogs");
      const storedContacts = localStorage.getItem("dashboard_contacts");

      if (storedProjects) setProjects(JSON.parse(storedProjects));
      if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
      if (storedContacts) setContacts(JSON.parse(storedContacts));

      setHydrated(true);
    }
  }, []);

  // Sync state to localStorage when changes occur
  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      localStorage.setItem("dashboard_projects", JSON.stringify(projects));
    }
  }, [projects, hydrated]);

  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      localStorage.setItem("dashboard_blogs", JSON.stringify(blogs));
    }
  }, [blogs, hydrated]);

  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      localStorage.setItem("dashboard_contacts", JSON.stringify(contacts));
    }
  }, [contacts, hydrated]);

  // Project CRUD
  const addProject = (projectData: Omit<Project, "id">) => {
    setProjects((prev) => [
      ...prev,
      {
        ...projectData,
        id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
      },
    ]);
  };

  const editProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Blog CRUD
  const addBlog = (blogData: Omit<Blog, "id" | "date">) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    setBlogs((prev) => [
      ...prev,
      {
        ...blogData,
        id: prev.length > 0 ? Math.max(...prev.map((b) => b.id)) + 1 : 1,
        date: formattedDate,
      },
    ]);
  };

  const editBlog = (updatedBlog: Blog) => {
    setBlogs((prev) => prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };

  const deleteBlog = (id: number) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // Contacts Actions
  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const markContactAsRead = (id: number) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: true } : c))
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        projects,
        blogs,
        contacts,
        addProject,
        editProject,
        deleteProject,
        addBlog,
        editBlog,
        deleteBlog,
        deleteContact,
        markContactAsRead,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
