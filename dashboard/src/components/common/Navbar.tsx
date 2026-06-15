"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useDashboard } from "@/providers/DashboardProvider";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const { contacts, theme, toggleTheme } = useDashboard();

  // Determine page title based on path
  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Overview";
      case "/projects":
        return "Project Management";
      case "/blogs":
        return "Blog Management";
      case "/contacts":
        return "Messages / Contacts";
      default:
        return "Dashboard";
    }
  };

  const unreadMessages = contacts.filter((c) => !c.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/60 backdrop-blur-md px-6 transition-colors duration-200">
      {/* Left: Hamburger & Dynamic Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted-foreground hover:bg-card hover:text-foreground lg:hidden transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right: Theme Toggle, Notifications & Profile Icon */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
          aria-label="Toggle Theme"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-amber-500 animate-pulse" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          {unreadMessages > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E85D04] text-[9px] font-bold text-white ring-2 ring-background">
              {unreadMessages}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* User Badge */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#E85D04] to-orange-500 font-bold text-white text-xs shadow-md shadow-[#E85D04]/10">
            S
          </div>
          <span className="hidden text-xs font-semibold text-muted-foreground sm:inline-block">
            Sefat
          </span>
        </div>
      </div>
    </header>
  );
}
