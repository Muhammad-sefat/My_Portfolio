'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedBackground() {
  const blobsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;
      gsap.to(blob, {
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200,
        duration: 12 + i * 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 2,
      });
    });
  }, []);

  const blobs = [
    { top: '10%', left: '-5%', size: 500, color: 'rgba(232, 93, 4, 0.06)' },
    { top: '50%', right: '-10%', size: 600, color: 'rgba(150, 80, 20, 0.05)' },
    { bottom: '15%', left: '20%', size: 450, color: 'rgba(232, 93, 4, 0.04)' },
    { top: '30%', left: '50%', size: 350, color: 'rgba(100, 50, 10, 0.05)' },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) blobsRef.current[i] = el;
          }}
          className="blob absolute"
          style={{
            width: blob.size,
            height: blob.size,
            top: (blob as { top?: string }).top,
            left: (blob as { left?: string }).left,
            right: (blob as { right?: string }).right,
            bottom: (blob as { bottom?: string }).bottom,
            background: `radial-gradient(circle, ${blob.color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}
