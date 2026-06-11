"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

function SkillBar({
  name,
  level,
  animate,
}: {
  name: string;
  level: number;
  animate: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-foreground/90">{name}</span>
        <span className="text-xs font-accent text-[#E85D04]">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E85D04] to-[#C64F03] rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${level}%` : "0%",
            boxShadow: animate ? "0 0 8px rgba(232, 93, 4, 0.4)" : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            onEnter: () => setAnimate(true),
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-8 lg:py-12relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="text-[#E85D04]">Skills</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#E85D04] rounded-full" />
        </div>

        {/* Updated Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {skillCategories.map((cat, index) => {
            const isLastTwo = index >= 3;

            return (
              <div
                key={cat.category}
                className={`skills-card bg-card border border-border rounded-2xl p-6 hover:border-[#E85D04]/30 transition-colors duration-300 w-full
                  ${isLastTwo ? "md:col-span-3" : "md:col-span-2"}
                `}
              >
                <h3 className="font-semibold text-[#E85D04] uppercase tracking-wider mb-5 font-accent">
                  {cat.category}
                </h3>
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} animate={animate} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
