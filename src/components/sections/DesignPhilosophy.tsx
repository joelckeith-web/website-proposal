"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Eye, Smartphone, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    icon: Palette,
    title: "Earth-Toned Luxury",
    description:
      "A warm, organic palette of deep greens, creams, and charcoal that reflects the natural beauty of outdoor living.",
    color: "#2D4A3E",
  },
  {
    icon: Eye,
    title: "Trust-First Design",
    description:
      "Licensing badges, project counts, and star ratings placed above the fold — credibility before the first scroll.",
    color: "#6B8F7B",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Architecture",
    description:
      "Built for the 70% of visitors who arrive on a phone. Every tap, swipe, and scroll is intentional.",
    color: "#4CC9F0",
  },
  {
    icon: Zap,
    title: "Conversion-Engineered",
    description:
      "Every page drives one action: book a consultation. CTAs, click-to-call, and contact forms at every touchpoint.",
    color: "#F0EBE3",
  },
];

export function DesignPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

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

      // Chain reaction: swatches animate left-to-right
      const swatches = paletteRef.current?.querySelectorAll(".palette-swatch");
      if (swatches) {
        gsap.from(swatches, {
          y: 50,
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: paletteRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 section-glow"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <span className="eyebrow mb-4 block">Design Philosophy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            Crafted with
            <br />
            <span className="text-gradient">Purpose</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Every design decision serves one goal: turning visitors into booked
            consultations for Outdoor Renovations.
          </p>
        </div>

        {/* Color Palette — large swatches with hex codes */}
        <div ref={paletteRef} className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Brand Palette
          </p>
          <div className="grid grid-cols-5 gap-4">
            {[
              { color: "#1B3128", label: "Dark Green" },
              { color: "#2D4A3E", label: "Primary" },
              { color: "#6B8F7B", label: "Light Green" },
              { color: "#F0EBE3", label: "Cream" },
              { color: "#1A1A1A", label: "Charcoal" },
            ].map((swatch) => (
              <div
                key={swatch.label}
                className="palette-swatch flex flex-col items-center gap-3"
              >
                <div
                  className="w-full aspect-[3/2] rounded-2xl border border-white/10 transition-transform duration-300 hover:scale-105"
                  style={{ background: swatch.color }}
                />
                <div className="text-center">
                  <span className="block text-sm font-semibold text-foreground">
                    {swatch.label}
                  </span>
                  <span className="block text-xs font-mono text-muted-foreground mt-0.5">
                    {swatch.color}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Principle Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {principles.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="card-showcase p-6">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
    </section>
  );
}
