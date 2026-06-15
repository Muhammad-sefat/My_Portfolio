import "./globals.css";
import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import Providers from "@/providers/Providers";
import CursorEffect from "@/components/common/CursorEffect";
import AnimatedBackground from "@/components/common/AnimatedBackground";
import BackToTop from "@/components/common/BackToTop";
import BlogModal from "@/features/blogs/components/BlogModal";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MS_Portfolio",
  description:
    "Portfolio of MS, a frontend developer building modern web experiences with React & Next.js, expanding into full-stack with the MERN stack.",
  metadataBase: new URL("https://myportfolio.com"),
  openGraph: {
    images: [{ url: "https://bolt.new/static/og_default.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://bolt.new/static/og_default.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>
          <AnimatedBackground />
          <CursorEffect />
          <div className="relative z-10">{children}</div>
          <BackToTop />
          <BlogModal />
        </Providers>
      </body>
    </html>
  );
}
