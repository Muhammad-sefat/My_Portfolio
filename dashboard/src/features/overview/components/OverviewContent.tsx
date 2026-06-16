"use client";

import React from "react";
import Link from "next/link";
import { useDashboard } from "@/providers/DashboardProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { FolderGit2, BookOpen, MessageSquare, ArrowRight, ExternalLink } from "lucide-react";

export function OverviewContent() {
  const { projects, blogs, contacts } = useDashboard();

  const totalProjects = projects.length;
  const totalBlogs = blogs.length;
  const unreadMessages = contacts.filter((c) => !c.read).length;

  // Recent data (latest 3)
  const recentProjects = [...projects].reverse().slice(0, 3);
  const recentBlogs = [...blogs].reverse().slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">Welcome back, Sefat!</h2>
        <p className="text-xs text-muted-foreground">
          Here is a quick overview of your portfolio website CMS statistics.
        </p>
      </div>

      {/* Grid of stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card hoverEffect>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              <CardDescription>Uploaded on portfolio</CardDescription>
            </div>
            <div className="rounded-xl bg-[#E85D04]/10 p-2.5 border border-[#E85D04]/20 text-[#E85D04]">
              <FolderGit2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="mt-2">
            <span className="text-3xl font-extrabold text-foreground">{totalProjects}</span>
          </CardContent>
        </Card>

        <Card hoverEffect>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Blogs</CardTitle>
              <CardDescription>Articles published</CardDescription>
            </div>
            <div className="rounded-xl bg-[#E85D04]/10 p-2.5 border border-[#E85D04]/20 text-[#E85D04]">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="mt-2">
            <span className="text-3xl font-extrabold text-foreground">{totalBlogs}</span>
          </CardContent>
        </Card>

        <Card hoverEffect>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
              <CardDescription>Pending client responses</CardDescription>
            </div>
            <div className={`rounded-xl p-2.5 border ${
              unreadMessages > 0
                ? "bg-[#E85D04]/20 border-[#E85D04]/40 text-[#E85D04] animate-pulse"
                : "bg-background border-border text-muted-foreground"
            }`}>
              <MessageSquare className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="mt-2">
            <span className="text-3xl font-extrabold text-foreground">{unreadMessages}</span>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-bold text-foreground text-base">Recent Projects</h3>
              <p className="text-[11px] text-muted-foreground">Latest showcase work uploaded</p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#E85D04] hover:text-[#C64F03] hover:underline"
            >
              Manage <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentProjects.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">No projects uploaded yet.</p>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="group flex gap-4 items-center rounded-xl bg-background p-3 border border-border hover:border-muted-foreground/20 transition-colors"
                >
                  <img
                    src={project.image || "https://picsum.photos/seed/default/100/100"}
                    alt={project.title}
                    className="h-12 w-16 object-cover rounded-lg bg-card border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{project.title}</h4>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-card hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recent Blogs */}
        <Card>
          <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-bold text-foreground text-base">Recent Articles</h3>
              <p className="text-[11px] text-muted-foreground">Latest insights published</p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#E85D04] hover:text-[#C64F03] hover:underline"
            >
              Manage <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentBlogs.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">No blogs published yet.</p>
            ) : (
              recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex gap-4 items-center rounded-xl bg-background p-3 border border-border hover:border-muted-foreground/20 transition-colors"
                >
                  <img
                    src={blog.image || "https://picsum.photos/seed/default/100/100"}
                    alt={blog.title}
                    className="h-12 w-16 object-cover rounded-lg bg-card border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{blog.title}</h4>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-[10px] bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20 px-2 py-0.5 rounded-full font-medium">
                        {blog.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{blog.date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
