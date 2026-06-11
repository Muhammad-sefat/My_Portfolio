'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleMobileMenu, closeMobileMenu } from '@/lib/store/slices/uiSlice';
import ThemeToggle from '@/components/common/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    dispatch(closeMobileMenu());
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-1 group"
            >
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {'<'}
              </span>
              <span className="text-2xl font-bold text-[#E85D04]">MS</span>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {'/>'}
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#E85D04] bg-[#E85D04]/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="/resume.pdf"
                download
                title="Download Resume"
                className="p-2 rounded-md text-muted-foreground hover:text-[#E85D04] hover:bg-[#E85D04]/10 transition-all duration-200 group relative"
              >
                <Download className="w-4 h-4" />
                <span className="absolute -bottom-8 right-0 text-xs bg-foreground text-background px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Download Resume
                </span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => dispatch(closeMobileMenu())}
        />
        <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.3s ease ${i * 0.05}s`,
              }}
              className={`text-2xl font-semibold py-3 px-8 rounded-xl transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-[#E85D04]'
                  : 'text-foreground hover:text-[#E85D04]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
