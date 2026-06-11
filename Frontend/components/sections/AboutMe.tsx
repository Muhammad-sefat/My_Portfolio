"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "1+", label: "Years of Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "Technologies" },
  { value: "∞", label: "Passion for Learning" },
];

const learning = ["Node.js", "Express.js", "MongoDB", "REST APIs", "Redux"];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-8 lg:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="about-anim mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            About <span className="text-[#E85D04]">Me</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#E85D04] rounded-full" />
        </div>

        {/* Main card */}
        <div className="about-anim bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left — bio */}
            <div className="lg:col-span-3 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border">
              <p className="text-muted-foreground leading-8 text-base">
                I&apos;m{" "}
                <span className="text-foreground font-semibold">MS</span>, a
                frontend developer based in{" "}
                <span className="text-foreground font-medium">
                  Bangladesh 🇧🇩
                </span>
                . I love building things for the web — from pixel-perfect UIs to
                smooth interactions. I&apos;m currently on a journey to become a
                full-stack Software Engineer, diving deep into Node.js, Express,
                and MongoDB alongside my professional frontend work. When
                I&apos;m not coding, I&apos;m probably learning something new or
                exploring design trends.
              </p>

              {/* Currently learning */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Currently Learning
                </p>
                <div className="flex flex-wrap gap-2">
                  {learning.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1.5 rounded-full border border-[#E85D04] text-[#E85D04] font-accent font-medium hover:bg-[#E85D04]/10 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — stats */}
            <div className="lg:col-span-2 p-8 lg:p-10">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
                Quick Stats
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl bg-background border border-border hover:border-[#E85D04]/50 transition-colors duration-200 text-center group"
                  >
                    <div className="text-3xl font-bold text-[#E85D04] group-hover:scale-110 transition-transform duration-200 inline-block">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 leading-tight">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
