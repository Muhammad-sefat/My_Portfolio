"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail } from "lucide-react";

const socials = [
  { icon: FaGithub, href: "https://github.com/ms", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/ms", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com/ms", label: "Twitter" },
  { icon: Mail, href: "mailto:ms@email.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#E85D04] hover:border-[#E85D04] transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#E85D04] font-medium">MS</span>. Built with
          Next.js & ❤️
        </p>
      </div>
    </footer>
  );
}
