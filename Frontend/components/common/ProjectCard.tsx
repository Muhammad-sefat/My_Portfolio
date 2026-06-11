'use client';

import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative rounded-xl overflow-hidden border border-border hover:border-[#E85D04]/60 transition-all duration-300 cursor-pointer bg-card"
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <h3 className="text-white font-bold text-lg text-center px-4">{project.title}</h3>
          <p className="text-gray-300 text-xs text-center px-6 leading-relaxed">{project.description}</p>
        </div>
      </div>

      {/* Tags row */}
      <div className="px-4 py-2 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/20 font-accent"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expandable links */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pb-4 pt-1 flex gap-3 border-t border-border/50">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-[#E85D04] hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
