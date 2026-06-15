'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveDot = gsap.quickTo(dot, 'top', { duration: 0.1, ease: 'power2.out' });
    const moveDotX = gsap.quickTo(dot, 'left', { duration: 0.1, ease: 'power2.out' });
    const moveRing = gsap.quickTo(ring, 'top', { duration: 0.35, ease: 'power2.out' });
    const moveRingX = gsap.quickTo(ring, 'left', { duration: 0.35, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      moveDot(e.clientY);
      moveDotX(e.clientX);
      moveRing(e.clientY);
      moveRingX(e.clientX);
    };

    const onMouseEnterInteractive = () => {
      ring?.classList.add('cursor-hover');
    };

    const onMouseLeaveInteractive = () => {
      ring?.classList.remove('cursor-hover');
    };

    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
