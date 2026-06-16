import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { DashboardProvider } from "@/providers/DashboardProvider";
import { DashboardLayout } from "@/components/common/DashboardLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MS | Admin Portfolio Dashboard",
  description: "Manage projects, blogs, and contact messages for MS Portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col antialiased transition-colors duration-200">
        <ToastProvider>
          <DashboardProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </DashboardProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
