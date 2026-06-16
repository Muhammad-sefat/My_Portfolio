"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/features/projects/types";
import { INITIAL_PROJECTS } from "@/features/projects/data/mockProjects";
import { Blog } from "@/features/blogs/types";
import { INITIAL_BLOGS } from "@/features/blogs/data/mockBlogs";
import { Contact } from "@/features/contacts/types";
import { INITIAL_CONTACTS } from "@/features/contacts/data/mockContacts";

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
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [blogs, setBlogs] = useState<Blog[]>(INITIAL_BLOGS);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hydrated, setHydrated] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("dashboard_projects");
      const storedBlogs = localStorage.getItem("dashboard_blogs");
      const storedContacts = localStorage.getItem("dashboard_contacts");
      const storedTheme = localStorage.getItem("dashboard_theme") as "dark" | "light" | null;

      if (storedProjects) setProjects(JSON.parse(storedProjects));
      if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
      if (storedContacts) setContacts(JSON.parse(storedContacts));
      
      if (storedTheme) {
        setTheme(storedTheme);
        if (storedTheme === "light") {
          document.documentElement.classList.add("light");
        } else {
          document.documentElement.classList.remove("light");
        }
      } else {
        document.documentElement.classList.remove("light");
      }

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

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("dashboard_theme", nextTheme);
      if (nextTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return nextTheme;
    });
  };

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
        theme,
        toggleTheme,
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
