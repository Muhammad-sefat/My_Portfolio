"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Plus, Search, Edit3, Trash2, Calendar, Clock, BookOpen } from "lucide-react";
import { Blog } from "@/types";

export function BlogContent() {
  const { blogs, addBlog, editBlog, deleteBlog } = useDashboard();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form Fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [readTime, setReadTime] = useState("");

  // Reset pagination on search query change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
        date: editingBlog.date,
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

  // Filter blogs by Search Query
  const filteredBlogs = blogs.filter((b) => {
    const query = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query) ||
      b.excerpt.toLowerCase().includes(query)
    );
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const activePage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles by title, excerpt or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Add Blog Button */}
        <Button onClick={openAddModal} className="flex gap-2 items-center">
          <Plus className="h-4 w-4" />
          Write New Blog
        </Button>
      </div>

      {/* Blogs 3-column Grid Display */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedBlogs.length === 0 ? (
          <div className="col-span-full py-16 text-center border border-dashed border-border rounded-2xl bg-card">
            <p className="text-muted-foreground text-sm">No blog posts found matching criteria.</p>
          </div>
        ) : (
          paginatedBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="flex flex-col h-full overflow-hidden !p-0 border border-border"
              hoverEffect
            >
              {/* Blog Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-background border-b border-border">
                <img
                  src={blog.image || "https://picsum.photos/seed/default/800/400"}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold bg-[#E85D04]/90 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                    {blog.category}
                  </span>
                </div>

                {/* Edit & Delete Overlays */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="p-2 rounded-xl bg-background/80 text-muted-foreground hover:text-foreground hover:bg-card border border-border backdrop-blur-md transition-colors"
                    title="Edit blog"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    className="p-2 rounded-xl bg-background/80 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/20 backdrop-blur-md transition-colors"
                    title="Delete blog"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {blog.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-base line-clamp-1 leading-snug">{blog.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
                  <span className="text-[10px] text-muted-foreground font-mono">ID: {blog.id}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(blog)}
                      className="flex gap-1 items-center !px-2.5 !py-1 text-xs"
                    >
                      <Edit3 className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="flex gap-1 items-center !px-2.5 !py-1 text-xs"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-6 mt-6">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Showing <span className="font-semibold text-foreground">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(startIndex + itemsPerPage, filteredBlogs.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{filteredBlogs.length}</span> articles
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={activePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <div className="flex items-center justify-center px-3 text-xs font-semibold text-foreground">
              Page {activePage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={activePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? "Edit Blog Article" : "Compose New Blog Article"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Getting Started with React 19"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Next.js, Backend, CSS"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Read Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5 min read"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Cover Image URL
            </label>
            <input
              type="url"
              placeholder="https://picsum.photos/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Excerpt / Short Summary *
            </label>
            <input
              type="text"
              required
              placeholder="Provide a quick 1-2 sentence hook..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Article Body Content *
            </label>
            <textarea
              required
              rows={8}
              placeholder="Write the full post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors resize-none font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
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
