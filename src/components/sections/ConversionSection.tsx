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
    // Zoom into the phone number in the top-right nav
    zoom: { scale: 3.2, origin: "88% 4%" },
  },
  {
    icon: MousePointerClick,
    title: "Strategic CTAs",
    description:
      '"Get a Consultation" buttons placed at every natural decision point throughout the site. Above the fold, after services, below reviews.',
    screenshot: "hero" as const,
    // Zoom into the CTA buttons below the hero text
    zoom: { scale: 2.2, origin: "35% 75%" },
  },
  {
    icon: FileText,
    title: "Smart Contact Forms",
    description:
      "React Hook Form with field validation, designed for quick mobile completion. Name, phone, service type — three fields to a lead.",
    screenshot: "service-detail" as const,
    zoom: null,
  },
  {
    icon: MapPin,
    title: "10+ Location Pages",
    description:
      "City-specific landing pages targeting local search intent across the Austin metro area. Each page is SEO-optimized for that city.",
    screenshot: "location-page" as const,
    zoom: null,
    showHighlight: true,
  },
];

export function ConversionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate panel + image zoom on tab change
  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    // Animate the "push into" zoom
    if (imageRef.current) {
      const zoom = tabs[activeTab].zoom;
      if (zoom) {
        // Reset to normal first, then push in
        gsap.set(imageRef.current, { scale: 1 });
        gsap.to(imageRef.current, {
          scale: zoom.scale,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        });
      } else {
        // Reset to normal view
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    }
  }, [activeTab]);

  const current = tabs[activeTab];
  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 md:pt-16 pb-6 md:pb-32 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-4 md:mb-16">
          <span className="eyebrow mb-4 block">Conversion Engine</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            Every Page Drives
            <br />
            <span className="text-gradient">One Action</span>
          </h2>
          <p className="mt-3 md:mt-6 text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a consultation. That&apos;s the goal of every button, form, and
            call-to-action across the entire site.
          </p>
        </div>

        {/* Vertical tabs on left + content panel on right */}
        <div ref={contentRef} className="flex flex-col lg:flex-row gap-6">
          {/* Tab buttons — compact pills */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:w-44 shrink-0">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all duration-300 w-full ${
                    i === activeTab
                      ? "text-cream shadow-lg shadow-brand/20"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
                  }`}
                  style={
                    i === activeTab
                      ? { background: "linear-gradient(135deg, #2D4A3E, #6B8F7B)" }
                      : undefined
                  }
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  {tab.title}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div ref={panelRef} className="flex-1 min-w-0">
            <div className="space-y-3 md:space-y-6 mb-4 md:mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-brand/20 shrink-0">
                  <Icon className="w-7 h-7 text-brand-light" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    {current.title}
                  </h3>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {current.description}
              </p>
            </div>

            {/* Screenshot with zoom + highlight overlays */}
            <BrowserFrame url="outdoor-renovations.vercel.app">
              <div className="aspect-video overflow-hidden relative">
                <div
                  ref={imageRef}
                  className="w-full h-full"
                  style={{
                    transformOrigin: current.zoom?.origin || "center center",
                  }}
                >
                  <ScreenImage variant={current.screenshot} />
                </div>

                {/* Green highlighter for Location Pages tab */}
                {current.showHighlight && (
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      top: "24%",
                      left: "6%",
                      padding: "2px 8px",
                      background: "rgba(107, 143, 123, 0.45)",
                      borderRadius: "3px",
                    }}
                  >
                    <span
                      className="text-white font-bold whitespace-nowrap"
                      style={{ fontSize: "clamp(6px, 1.2vw, 14px)" }}
                    >
                      Westlake Hills
                    </span>
                  </div>
                )}
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>

    </section>
  );
}
