"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";
import { Phone, MousePointerClick, FileText, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    icon: Phone,
    title: "Click-to-Call",
    description:
      "Sticky header with phone number on every page. One tap from any screen to connect directly with the business.",
    screenshot: "hero" as const,
    highlight: "top-right",
  },
  {
    icon: MousePointerClick,
    title: "Strategic CTAs",
    description:
      '"Get a Consultation" buttons placed at every natural decision point throughout the site. Above the fold, after services, below reviews.',
    screenshot: "contact-cta" as const,
    highlight: "center",
  },
  {
    icon: FileText,
    title: "Smart Contact Forms",
    description:
      "React Hook Form with field validation, designed for quick mobile completion. Name, phone, service type — three fields to a lead.",
    screenshot: "contact" as const,
    highlight: "center",
  },
  {
    icon: MapPin,
    title: "10+ Location Pages",
    description:
      "City-specific landing pages targeting local search intent across the Austin metro area. Each page is SEO-optimized for that city.",
    screenshot: "services" as const,
    highlight: "full",
  },
];

export function ConversionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

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

      gsap.from(contentRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate panel on tab change
  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const current = tabs[activeTab];
  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="eyebrow mb-4 block">Conversion Engine</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            Every Page Drives
            <br />
            <span className="text-gradient">One Action</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a consultation. That&apos;s the goal of every button, form, and
            call-to-action across the entire site.
          </p>
        </div>

        {/* Apple-style tabs + content panel */}
        <div ref={contentRef}>
          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    i === activeTab
                      ? "bg-brand text-cream shadow-lg shadow-brand/20"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
                  }`}
                  style={
                    i === activeTab
                      ? { background: "linear-gradient(135deg, #2D4A3E, #6B8F7B)" }
                      : undefined
                  }
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.title}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div
            ref={panelRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Text side */}
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-brand/20">
                <Icon className="w-7 h-7 text-brand-light" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {current.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Screenshot side */}
            <div>
              <BrowserFrame url="outdoor-renovations.vercel.app">
                <div className="aspect-video">
                  <ScreenImage variant={current.screenshot} />
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
    </section>
  );
}
