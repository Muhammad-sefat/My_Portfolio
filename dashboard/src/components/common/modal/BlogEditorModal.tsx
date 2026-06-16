"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Blog } from "@/features/blogs/types";

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (blogData: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    readTime: string;
  }) => void | Promise<void>;
  editingBlog: Blog | null;
}

export function BlogEditorModal({ isOpen, onClose, onSubmit, editingBlog }: BlogEditorModalProps) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [readTime, setReadTime] = useState("");

  // Sync state with editingBlog when modal opens/changes
  useEffect(() => {
    if (isOpen) {
      if (editingBlog) {
        setTitle(editingBlog.title || "");
        setExcerpt(editingBlog.excerpt || "");
        setContent(editingBlog.content || "");
        setCategory(editingBlog.category || "");
        setImage(editingBlog.image || "");
        setReadTime(editingBlog.readTime || "");
      } else {
        setTitle("");
        setExcerpt("");
        setContent("");
        setCategory("Development");
        setImage("https://picsum.photos/seed/newblog/800/400");
        setReadTime("5 min read");
      }
    }
  }, [isOpen, editingBlog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      excerpt,
      content,
      category: category.trim() || "General",
      image: image.trim() || "https://picsum.photos/seed/default/800/400",
      readTime: readTime.trim() || "3 min read",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">
            {editingBlog ? "Save Changes" : "Publish Post"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
