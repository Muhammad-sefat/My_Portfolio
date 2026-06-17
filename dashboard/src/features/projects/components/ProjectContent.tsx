"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Plus, Search, Edit3, Trash2, ExternalLink, Github } from "lucide-react";
import { Project } from "../types";
import { projectService } from "../services/project.service";
import { ProjectEditorModal } from "@/components/common/modal/ProjectEditorModal";
import { ProjectDeleteModal } from "@/components/common/modal/ProjectDeleteModal";

export function ProjectContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string | number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadProjects = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load projects");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(true);
  }, []);

  // Reset pagination on search query change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const openAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string | number, projectTitle: string) => {
    setProjectToDelete({ id, title: projectTitle });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setDeleting(true);
    try {
      await projectService.deleteProject(String(projectToDelete.id));
      toast({
        title: "Project Deleted",
        description: `"${projectToDelete.title}" has been removed.`,
        variant: "destructive",
      });
      setIsDeleteModalOpen(false);
      await loadProjects();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleEditorSubmit = async (projectData: {
    title: string;
    description: string;
    image: string;
    liveUrl: string;
    githubUrl: string;
    tags: string[];
  }) => {
    try {
      if (editingProject) {
        const id = editingProject._id || String(editingProject.id || "");
        await projectService.updateProject(id, projectData);
        toast({
          title: "Project Updated",
          description: `"${projectData.title}" has been updated successfully.`,
          variant: "success",
        });
      } else {
        await projectService.createProject(projectData);
        toast({
          title: "Project Uploaded",
          description: `"${projectData.title}" has been added to showcase.`,
          variant: "success",
        });
      }
      setIsModalOpen(false);
      await loadProjects();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: editingProject ? "Failed to update project." : "Failed to upload project.",
        variant: "destructive",
      });
    }
  };

  // Filter projects by Search Query
  const filteredProjects = projects.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const activePage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground text-sm font-semibold">
        Loading projects...
      </div>
    );
  }
  if (error) {
    return <div className="flex justify-center py-10 text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-[#E85D04] transition-colors placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Upload Button */}
        <Button onClick={openAddModal} className="flex gap-2 items-center cursor-pointer">
          <Plus className="h-4 w-4" />
          Upload New Project
        </Button>
      </div>

      {/* Grid List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProjects.length === 0 ? (
          <div className="col-span-full py-16 text-center border border-dashed border-border rounded-2xl bg-card">
            <p className="text-muted-foreground text-sm">No projects match your search.</p>
          </div>
        ) : (
          paginatedProjects.map((project) => (
            <Card key={project._id || project.id} className="flex flex-col h-full overflow-hidden !p-0 border border-border" hoverEffect>
              {/* Image Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-background border-b border-border">
                <img
                  src={project.image || "https://picsum.photos/seed/default/800/600"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-2 rounded-xl bg-background/80 text-muted-foreground hover:text-foreground hover:bg-card border border-border backdrop-blur-md transition-colors cursor-pointer"
                    title="Edit project"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id || project.id || "", project.title)}
                    className="p-2 rounded-xl bg-background/80 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/20 backdrop-blur-md transition-colors animate-fade-in cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-base truncate">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-background text-muted-foreground border border-border px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 border-t border-border pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card hover:bg-background py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card hover:bg-background py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="h-3 w-3" />
                        GitHub
                      </a>
                    )}
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
              {Math.min(startIndex + itemsPerPage, filteredProjects.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{filteredProjects.length}</span> projects
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
      <ProjectEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEditorSubmit}
        editingProject={editingProject}
      />

      {/* Delete Confirmation Modal */}
      <ProjectDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        projectTitle={projectToDelete?.title}
        deleting={deleting}
      />
    </div>
  );
}
