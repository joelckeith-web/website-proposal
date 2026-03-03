"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Code2,
  Database,
  Shield,
  FileJson,
  Layers,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const techFeatures = [
  {
    icon: Code2,
    title: "Next.js 14",
    description: "React server components, app router, and automatic code splitting",
    tag: "Framework",
  },
  {
    icon: Layers,
    title: "Tailwind CSS",
    description: "Utility-first styling with custom design tokens for brand consistency",
    tag: "Styling",
  },
  {
    icon: Database,
    title: "Sanity CMS",
    description: "Headless CMS with real-time content editing and image optimization",
    tag: "CMS",
  },
  {
    icon: Search,
    title: "SEO-Ready",
    description: "Meta tags, Open Graph, sitemap, robots.txt — all pre-configured",
    tag: "SEO",
  },
  {
    icon: FileJson,
    title: "Schema Markup",
    description: "JSON-LD structured data for local business, services, and reviews",
    tag: "Structured Data",
  },
  {
    icon: Shield,
    title: "TypeScript",
    description: "Full type safety across components, config, and data layer",
    tag: "Language",
  },
];

const performanceMetrics = [
  { label: "Performance", value: 95, color: "#2D4A3E" },
  { label: "Accessibility", value: 98, color: "#6B8F7B" },
  { label: "Best Practices", value: 100, color: "#4CC9F0" },
  { label: "SEO", value: 100, color: "#F0EBE3" },
];

export function TechnicalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

      // Metrics animate in with counter effect
      const metrics = metricsRef.current?.querySelectorAll(".metric-ring");
      if (metrics) {
        metrics.forEach((metric, i) => {
          gsap.from(metric, {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Feature cards stagger
      const features = featuresRef.current?.children;
      if (features) {
        gsap.from(features, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 92%",
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
        <div ref={headingRef} className="mb-16">
          <span className="eyebrow mb-4 block">Under the Hood</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            Engineered for
            <br />
            <span className="text-gradient">Performance</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Built on modern infrastructure that loads fast, ranks high, and
            scales with your business.
          </p>
        </div>

        {/* Lighthouse Metrics */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {performanceMetrics.map(({ label, value, color }) => (
            <div key={label} className="metric-ring flex flex-col items-center">
              <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center mb-3"
                style={{
                  background: `conic-gradient(${color} ${value}%, rgba(255,255,255,0.06) ${value}%)`,
                }}
              >
                <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
                  <span className="text-2xl font-black" style={{ color }}>
                    {value}
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Tech stack cards */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {techFeatures.map(({ icon: Icon, title, description, tag }) => (
            <div key={title} className="card-showcase p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-brand/20">
                  <Icon className="w-5 h-5 text-brand-light" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-foreground">
                      {title}
                    </h3>
                    <span className="feature-tag text-[10px] py-0.5 px-2">
                      {tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
    </section>
  );
}
