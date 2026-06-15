'use client';

import { useEffect, useRef } from 'react';
import { X, Clock, Calendar, Tag } from 'lucide-react';
import gsap from 'gsap';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setActiveBlogId } from '@/lib/store/slices/uiSlice';
import { blogs } from '../data/blogs';

export default function BlogModal() {
  const dispatch = useAppDispatch();
  const activeBlogId = useAppSelector((s) => s.ui.activeBlogId);
  const blog = blogs.find((b) => b.id === activeBlogId) ?? null;
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (blog) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [blog]);

  const close = () => dispatch(setActiveBlogId(null));

  if (!blog) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && close()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div
        ref={cardRef}
        className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
      >
        {/* Header image */}
        <div className="relative h-48 rounded-t-2xl overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute bottom-4 left-4 text-xs font-medium bg-[#E85D04] text-white px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3">{blog.title}</h2>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {blog.category}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{blog.excerpt}</p>
          <div className="w-12 h-px bg-[#E85D04] mb-4" />
          <p className="text-foreground/90 text-sm leading-7">{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
