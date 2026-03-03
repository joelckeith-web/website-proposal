"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  "Custom-designed responsive website",
  "8 dedicated service pages with FAQs",
  "10+ city-specific location pages",
  "Auto-scrolling review carousel",
  "Click-to-call and contact forms on every page",
  "SEO-ready structure with schema markup",
  "Sanity CMS for content management",
  "Vercel deployment with global CDN",
];

export function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      const items = listRef.current?.children;
      if (items) {
        gsap.from(items, {
          x: -40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }

      gsap.from(ctaRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45, 74, 62, 0.2) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <span className="eyebrow mb-4 block">What&apos;s Included</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black tracking-tight leading-[1.1]">
            Ready to
            <br />
            <span className="text-gradient">Launch</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete digital presence engineered to generate leads for Outdoor
            Renovations from day one.
          </p>
        </div>

        {/* Deliverables list */}
        <div
          ref={listRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-4xl mx-auto mb-16"
        >
          {deliverables.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 py-3 px-5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-brand/30">
                <Check className="w-4 h-4 text-brand-light" />
              </div>
              <span className="text-base font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="space-y-6">
          <a
            href="https://outdoor-renovations.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #2D4A3E 0%, #6B8F7B 100%)",
              color: "#F0EBE3",
              boxShadow: "0 8px 30px rgba(45, 74, 62, 0.3)",
            }}
          >
            View the Live Website
            <ArrowUpRight className="w-5 h-5" />
          </a>

          <p className="text-sm text-muted-foreground">
            outdoor-renovations.vercel.app
          </p>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="line-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              ASP &mdash; Assess. Strategize. Perform.
            </span>
            <div className="line-accent" />
          </div>
          <p className="text-xs text-muted-foreground/50">
            Website showcase presentation for Outdoor Renovations
          </p>
        </div>
      </div>
    </section>
  );
}
