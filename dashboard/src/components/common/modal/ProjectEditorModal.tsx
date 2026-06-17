"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Project } from "@/features/projects/types";

interface ProjectEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    title: string;
    description: string;
    image: string;
    liveUrl: string;
    githubUrl: string;
    tags: string[];
  }) => void | Promise<void>;
  editingProject: Project | null;
}

export function ProjectEditorModal({ isOpen, onClose, onSubmit, editingProject }: ProjectEditorModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // Sync state with editingProject when modal opens/changes
  useEffect(() => {
    if (isOpen) {
      if (editingProject) {
        setTitle(editingProject.title || "");
        setDescription(editingProject.description || "");
        setImage(editingProject.image || "");
        setLiveUrl(editingProject.liveUrl || "");
        setGithubUrl(editingProject.githubUrl || "");
        setTagsInput(editingProject.tags ? editingProject.tags.join(", ") : "");
      } else {
        setTitle("");
        setDescription("");
        setImage("https://picsum.photos/seed/newproject/800/600");
        setLiveUrl("https://example.com");
        setGithubUrl("https://github.com");
        setTagsInput("React, Tailwind");
      }
    }
  }, [isOpen, editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    onSubmit({
      title,
      description,
      image: image.trim() || "https://picsum.photos/seed/default/800/600",
      liveUrl: liveUrl.trim(),
      githubUrl: githubUrl.trim(),
      tags: tagsArray,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingProject ? "Edit Project Details" : "Upload New Project"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Project Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Portfolio Website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Description *
          </label>
          <textarea
            required
            rows={3}
            placeholder="Describe what the project does, key features..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors resize-none"
          />
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Live URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              GitHub Repository URL
            </label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Tags (Comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Next.js, React, Tailwind, Prisma"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
          <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button type="submit" className="cursor-pointer">
            {editingProject ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
