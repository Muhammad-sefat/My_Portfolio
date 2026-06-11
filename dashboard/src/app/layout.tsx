import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { DashboardProvider } from "@/context/DashboardContext";
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
      <body className="min-h-full bg-black text-neutral-100 flex flex-col antialiased">
        <ToastProvider>
          <DashboardProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </DashboardProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
