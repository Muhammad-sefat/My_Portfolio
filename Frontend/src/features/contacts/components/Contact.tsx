"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "../services/contact.service";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "ms@email.com",
    href: "mailto:ms@email.com",
  },
  { icon: MapPin, label: "Location", value: "Bangladesh", href: null },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ms",
    href: "https://github.com/ms",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ms",
    href: "https://linkedin.com/in/ms",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await contactService.submitContact({
        name: data.name,
        email: data.email,
        subject: data.subject || "General Inquiry",
        message: data.message,
      });
      reset();
      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission Error",
        description: "Failed to send message. Please check your network or try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-8 lg:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="contact-anim mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Contact <span className="text-[#E85D04]">Me</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#E85D04] rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <div className="contact-anim">
            <h3 className="text-2xl font-bold mb-3">
              Let&apos;s Work Together
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I&apos;m open to freelance work, collaborations, and full-time
              opportunities. Drop me a message!
            </p>

            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E85D04]/10 border border-[#E85D04]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#E85D04]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-foreground hover:text-[#E85D04] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-anim">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Name</label>
                <input
                  {...register("name")}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04]/50 transition-colors placeholder:text-muted-foreground/50"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04]/50 transition-colors placeholder:text-muted-foreground/50"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04]/50 transition-colors resize-none placeholder:text-muted-foreground/50"
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E85D04] text-white font-semibold hover:bg-[#C64F03] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-[#E85D04]/20 hover:shadow-[#E85D04]/40"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
