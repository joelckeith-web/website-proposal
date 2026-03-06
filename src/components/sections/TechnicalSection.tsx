"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  { label: "SEO", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "Accessibility", value: 98 },
  { label: "Performance", value: 95 },
];

function AnimatedRing({ label, value }: { label: string; value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const startAnimation = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Animate the number count-up
    const counter = { val: 0 };
    gsap.to(counter, {
      val: value,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => setDisplayValue(Math.round(counter.val)),
    });

    // Animate the conic-gradient fill
    if (ringRef.current) {
      gsap.fromTo(
        ringRef.current,
        { "--ring-pct": "0" },
        {
          "--ring-pct": String(value),
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, [value]);

  useEffect(() => {
    if (!ringRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ringRef.current,
      start: "top 92%",
      onEnter: startAnimation,
    });

    return () => trigger.kill();
  }, [startAnimation]);

  return (
    <div className="metric-ring flex flex-col items-center">
      <div
        ref={ringRef}
        className="relative w-24 h-24 md:w-40 md:h-40 rounded-full flex items-center justify-center mb-3 md:mb-4"
        style={
          {
            "--ring-pct": "0",
            background: `conic-gradient(from 0deg, #2D4A3E 0%, #6B8F7B calc(var(--ring-pct) * 0.5%), #4CC9F0 calc(var(--ring-pct) * 1%), rgba(255,255,255,0.06) calc(var(--ring-pct) * 1%))`,
          } as React.CSSProperties
        }
      >
        <div className="w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full bg-background flex items-center justify-center">
          <span
            className="text-3xl md:text-4xl font-black"
            style={{
              background: "linear-gradient(135deg, #2D4A3E 0%, #6B8F7B 50%, #4CC9F0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {displayValue}
          </span>
        </div>
      </div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function TechnicalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
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
      }

      // Tech stack cards — only animate on desktop
      const features = featuresRef.current?.children;
      if (features && isDesktop) {
        gsap.fromTo(
          features,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 100%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 md:pt-32 pb-6 md:pb-16 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-4 md:mb-16">
          <span className="eyebrow mb-2 md:mb-4 block">Under the Hood</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            Engineered for
            <br />
            <span className="text-gradient">Performance</span>
          </h2>
          <p className="mt-3 md:mt-6 text-sm md:text-lg text-muted-foreground max-w-2xl">
            Built on modern infrastructure that loads fast, ranks high, and
            scales with your business.
          </p>
        </div>

        {/* Lighthouse Metrics — larger rings with count-up */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-16">
          {performanceMetrics.map(({ label, value }) => (
            <AnimatedRing key={label} label={label} value={value} />
          ))}
        </div>

        {/* Tech stack cards */}
        <div
          ref={featuresRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
        >
          {techFeatures.map(({ icon: Icon, title, description, tag }) => (
            <div key={title} className="card-showcase p-3 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 bg-brand/20">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-brand-light" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                    <h3 className="text-xs md:text-sm font-bold text-foreground">
                      {title}
                    </h3>
                    <span className="feature-tag text-[8px] md:text-[10px] py-0.5 px-1.5 md:px-2">
                      {tag}
                    </span>
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
