'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import gsap from 'gsap';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!btnRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(btnRef.current, {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 20,
      duration: 0.3,
      ease: 'power2.out',
      pointerEvents: visible ? 'auto' : 'none',
    });
  }, [visible]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      style={{ opacity: 0 }}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#E85D04] text-white flex items-center justify-center shadow-lg hover:bg-[#C64F03] transition-colors duration-200 glow-orange"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
