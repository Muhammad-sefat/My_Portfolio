"use client";

import React, { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Plus, Search, Edit3, Trash2, BookOpen, Calendar, Clock } from "lucide-react";
import { Blog } from "@/types";

export function BlogContent() {
  const { blogs, addBlog, editBlog, deleteBlog } = useDashboard();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [readTime, setReadTime] = useState("");

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("Development");
    setImage("https://picsum.photos/seed/newblog/800/400");
    setReadTime("5 min read");
    setIsModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCategory(blog.category);
    setImage(blog.image);
    setReadTime(blog.readTime);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number, blogTitle: string) => {
    if (confirm(`Are you sure you want to delete article "${blogTitle}"?`)) {
      deleteBlog(id);
      toast({
        title: "Blog Post Deleted",
        description: `"${blogTitle}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in Title, Excerpt, and Content.",
        variant: "destructive",
      });
      return;
    }

    const blogData = {
      title,
      excerpt,
      content,
      category: category.trim() || "General",
      image: image.trim() || "https://picsum.photos/seed/default/800/400",
      readTime: readTime.trim() || "3 min read",
    };

    if (editingBlog) {
      editBlog({
        ...blogData,
        id: editingBlog.id,
        date: editingBlog.date, // keep original date
      });
      toast({
        title: "Blog Article Updated",
        description: `"${title}" has been successfully updated.`,
        variant: "success",
      });
    } else {
      addBlog(blogData);
      toast({
        title: "Blog Article Published",
        description: `"${title}" has been published.`,
        variant: "success",
      });
    }

    setIsModalOpen(false);
  };

  const filteredBlogs = blogs.filter((b) => {
    const query = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query) ||
      b.excerpt.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search articles by title, excerpt or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d0d0e] border border-neutral-900 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-neutral-500"
          />
        </div>

        {/* Add Blog Button */}
        <Button onClick={openAddModal} className="flex gap-2 items-center">
          <Plus className="h-4 w-4" />
          Write New Blog
        </Button>
      </div>

      {/* Blogs Display */}
      <div className="space-y-4">
        {filteredBlogs.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-neutral-900 rounded-2xl bg-[#0d0d0e]">
            <p className="text-neutral-500 text-sm">No blog posts found matching criteria.</p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="relative overflow-hidden hover:border-neutral-800 transition-colors"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Blog Image */}
                <div className="h-32 w-full md:w-48 overflow-hidden rounded-xl bg-neutral-950 border border-neutral-900 flex-shrink-0">
                  <img
                    src={blog.image || "https://picsum.photos/seed/default/800/400"}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content Block */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20 px-2.5 py-0.5 rounded-full">
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                        <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                        <Clock className="h-3.5 w-3.5 text-neutral-500" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#E85D04] transition-colors truncate">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-neutral-900/60 pt-4 mt-4">
                    <span className="text-[11px] text-neutral-500">ID: {blog.id}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(blog)}
                        className="flex gap-1.5 items-center"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(blog.id, blog.title)}
                        className="flex gap-1.5 items-center"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? "Edit Blog Article" : "Compose New Blog Article"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Getting Started with React 19"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Next.js, Backend, CSS"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E85D04] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Read Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5 min read"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E85D04] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
              Cover Image URL
            </label>
            <input
              type="url"
              placeholder="https://picsum.photos/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
              Excerpt / Short Summary *
            </label>
            <input
              type="text"
              required
              placeholder="Provide a quick 1-2 sentence hook..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
              Article Body Content *
            </label>
            <textarea
              required
              rows={8}
              placeholder="Write the full post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E85D04] transition-colors resize-none font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-900 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingBlog ? "Save Changes" : "Publish Post"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
