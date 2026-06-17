"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Clock, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  toggleBlogsExpanded,
  setActiveBlogId,
  setBlogs as setReduxBlogs,
} from "@/lib/store/slices/uiSlice";
import Image from "next/image";
import { Blog } from "../types";
import { blogService } from "../services/blog.service";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_COUNT = 6;

export default function Blogs() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((s) => s.ui.blogsExpanded);
  const sectionRef = useRef<HTMLElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);

  const [blogs, setBlogsState] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await blogService.getBlogs();
        setBlogsState(data);
        dispatch(setReduxBlogs(data));
      } catch (err) {
        console.error(err);
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, [dispatch]);

  useEffect(() => {
    if (loading || blogs.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-initial",
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
  }, [loading, blogs]);

  useEffect(() => {
    if (!expanded || !extraRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = extraRef.current.querySelectorAll(".blog-extra");
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    );
  }, [expanded]);

  const visible = blogs.slice(0, INITIAL_COUNT);
  const hidden = blogs.slice(INITIAL_COUNT);

  return (
    <section id="blogs" ref={sectionRef} className="py-8 lg:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="text-[#E85D04]">Blog</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#E85D04] rounded-full" />
        </div>

        {/* Initial grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm font-semibold">
            Loading articles...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 font-semibold">
            {error}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((blog) => (
              <BlogCard
                key={blog._id || blog.id}
                blog={blog}
                className="blog-initial"
                onClick={() => dispatch(setActiveBlogId(blog._id || blog.id || null))}
              />
            ))}
          </div>
        )}

        {/* Expanded */}
        {!loading && !error && hidden.length > 0 && (
          <div
            ref={extraRef}
            className={`overflow-hidden transition-all duration-500 ${
              expanded ? "max-h-[2000px] mt-6" : "max-h-0"
            }`}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hidden.map((blog) => (
                <BlogCard
                  key={blog._id || blog.id}
                  blog={blog}
                  className="blog-extra"
                  onClick={() => dispatch(setActiveBlogId(blog._id || blog.id || null))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Toggle */}
        {!loading && !error && hidden.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => dispatch(toggleBlogsExpanded())}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-[#E85D04] hover:border-[#E85D04] transition-all duration-200 cursor-pointer"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show More
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

interface BlogCardProps {
  blog: Blog;
  className?: string;
  onClick: () => void;
}

function BlogCard({ blog, className = "", onClick }: BlogCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-[#E85D04]/50 hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={blog.image || "https://picsum.photos/seed/default/800/400"}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 text-xs font-medium bg-[#E85D04] text-white px-3 py-1 rounded-full">
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-[#E85D04] transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {blog.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {blog.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {blog.date}
          </span>
        </div>
      </div>
    </div>
  );
}
