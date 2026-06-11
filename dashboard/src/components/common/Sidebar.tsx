"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, Mail, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "Blogs", href: "/blogs", icon: FileText },
    { name: "Contacts", href: "/contacts", icon: Mail },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-45 flex w-64 flex-col bg-sidebar border-r border-border transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="text-xl font-bold text-foreground tracking-wide font-sans">
              &lt;<span className="text-[#E85D04]">MS</span> /&gt;
            </span>
            <span className="text-xs uppercase text-muted-foreground bg-card px-2 py-0.5 rounded-full font-mono border border-border">
              Admin
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-card hover:text-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#E85D04]/10 text-[#E85D04] border-l-2 border-[#E85D04] px-[14px]"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isActive ? "text-[#E85D04]" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-card p-3 border border-border">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-sm font-bold text-[#E85D04]">
              MS
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-foreground truncate">Sefat</p>
              <p className="text-[10px] text-muted-foreground truncate">
                Frontend Developer
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
