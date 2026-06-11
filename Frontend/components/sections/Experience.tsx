"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/experiences";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-anim",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-8 lg:py-12 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="exp-anim mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="text-[#E85D04]">Experience</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#E85D04] rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-12">
          {/* Vertical line */}
          <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#E85D04] via-[#E85D04]/50 to-transparent" />

          {experiences.map((exp) => (
            <div key={exp.id} className="exp-anim relative mb-8 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute -left-5 sm:-left-7 top-6 w-4 h-4 rounded-full bg-[#E85D04] border-4 border-background glow-orange-sm" />

              {/* Card */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-[#E85D04]/40 transition-colors duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      {exp.current && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E85D04]/15 text-[#E85D04] border border-[#E85D04]/30 font-medium">
                          Currently Here
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground font-accent">
                      {exp.duration}
                    </span>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">
                      {exp.type}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-7 mb-5">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-md bg-background border border-border text-muted-foreground font-accent hover:border-[#E85D04]/40 hover:text-[#E85D04] transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
