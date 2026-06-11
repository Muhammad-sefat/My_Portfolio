"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleProjectsExpanded } from "@/lib/store/slices/uiSlice";
import ProjectCard from "@/components/common/ProjectCard";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_COUNT = 6;

export default function Projects() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((s) => s.ui.projectsExpanded);
  const sectionRef = useRef<HTMLElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-initial",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!expanded || !extraRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = extraRef.current.querySelectorAll(".project-extra");
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    );
  }, [expanded]);

  const visible = projects.slice(0, INITIAL_COUNT);
  const hidden = projects.slice(INITIAL_COUNT);

  return (
    <section id="projects" ref={sectionRef} className="py-8 lg:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="text-[#E85D04]">Projects</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#E85D04] rounded-full" />
        </div>

        {/* Initial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => (
            <div key={project.id} className="project-initial">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Expanded grid */}
        {hidden.length > 0 && (
          <div
            ref={extraRef}
            className={`overflow-hidden transition-all duration-500 ${
              expanded ? "max-h-[2000px] mt-6" : "max-h-0"
            }`}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hidden.map((project) => (
                <div key={project.id} className="project-extra">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle button */}
        {hidden.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => dispatch(toggleProjectsExpanded())}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-[#E85D04] hover:border-[#E85D04] transition-all duration-200"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show More ({hidden.length} more)
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
