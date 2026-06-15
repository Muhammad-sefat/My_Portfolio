"use client";

import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail, ChevronRight, Eye } from "lucide-react";
import gsap from "gsap";

const socials = [
  { icon: FaGithub, href: "https://github.com/ms", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/ms", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com/ms", label: "Twitter" },
  { icon: Mail, href: "mailto:ms@email.com", label: "Email" },
];

export default function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Page load entrance
      gsap.fromTo(
        ".banner-content > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.3,
        },
      );

      // Image entrance
      gsap.fromTo(
        ".banner-image",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
          delay: 0.5,
        },
      );

      // Floating shapes
      floatRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: -12 - i * 4,
          rotation: 45 + i * 20,
          duration: 2.5 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
          {/* Left — Text */}
          <div className="banner-content flex flex-col gap-5 order-2 lg:order-1">
            {/* Available badge */}
            <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10">
              <span className="w-1 h-1 rounded-full bg-orange-500 pulse-dot" />
              <span className="text-xs text-orange-400 font-medium">
                Available for Opportunities
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Hi, I&apos;m{" "}
                <span className="text-[#E85D04] relative">
                  Sefat
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#E85D04] to-transparent rounded-full" />
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground font-medium font-accent">
              Frontend Developer & Aspiring Software Engineer
            </p>

            {/* Bio */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              I craft modern, performant web experiences with React & Next.js.
              Currently expanding into full-stack development with the MERN
              stack. Passionate about clean code, great UI, and continuous
              learning.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#E85D04] hover:border-[#E85D04] hover:bg-[#E85D04]/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleNav("#projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E85D04] text-white font-semibold hover:bg-[#C64F03] transition-all duration-200 shadow-lg shadow-[#E85D04]/30 hover:shadow-[#E85D04]/50 hover:-translate-y-0.5"
              >
                <Eye className="w-4 h-4" />
                View Projects
              </button>
              <button
                onClick={() => handleNav("#contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E85D04] text-[#E85D04] font-semibold hover:bg-[#E85D04]/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ChevronRight className="w-4 h-4" />
                Contact Me
              </button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="banner-image flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Rotating ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, #E85D04, #C64F03, transparent, #E85D04)",
                  padding: "3px",
                  borderRadius: "50%",
                }}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </div>

              {/* Profile image */}
              <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-[#E85D04]/30 glow-orange">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E85D04] to-[#1A1A1A] flex items-center justify-center">
                  <span className="text-white text-7xl font-bold tracking-tighter select-none">
                    MS
                  </span>
                </div>
              </div>

              {/* Floating shapes */}
              {[
                { top: "5%", left: "-8%", size: 12, delay: 0 },
                { top: "20%", right: "-10%", size: 10, delay: 0.3 },
                { bottom: "10%", left: "-5%", size: 8, delay: 0.6 },
                { bottom: "5%", right: "-5%", size: 14, delay: 0.9 },
              ].map((pos, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) floatRef.current[i] = el;
                  }}
                  className="absolute bg-[#E85D04]/30 rounded-sm border border-[#E85D04]/50"
                  style={{
                    width: pos.size,
                    height: pos.size,
                    top: pos.top,
                    left: (pos as { left?: string }).left,
                    right: (pos as { right?: string }).right,
                    bottom: (pos as { bottom?: string }).bottom,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
