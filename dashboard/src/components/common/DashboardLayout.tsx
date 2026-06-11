"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {/* Sticky Top Header */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="p-6 flex-1 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
