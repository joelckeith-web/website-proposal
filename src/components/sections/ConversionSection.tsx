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
    zoom: { scale: 2.24, origin: "88% 4%" },
  },
  {
    icon: MousePointerClick,
    title: "Strategic CTAs",
    description:
      '"Get a Consultation" buttons placed at every natural decision point throughout the site. Above the fold, after services, below reviews.',
    screenshot: "hero" as const,
    // Zoom into the CTA buttons below the hero text
    zoom: { scale: 1.54, origin: "35% 75%" },
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
  const hasEnteredView = useRef(false);

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

      // Gate the initial zoom — wait until the section is fully in view
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          hasEnteredView.current = true;
          // Fire initial zoom for whatever tab is active (default: Click-to-Call)
          const zoom = tabs[0].zoom;
          if (zoom && imageRef.current) {
            gsap.to(imageRef.current, {
              scale: zoom.scale,
              duration: 2,
              ease: "power2.out",
              delay: 0.5,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate panel + image zoom on tab change
  useEffect(() => {
    // Always kill running tweens and snap scale to 1 first
    // This prevents stale zoom + wrong transform-origin from previous tab
    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current);
      gsap.set(imageRef.current, { scale: 1 });
    }

    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    // Skip zoom on initial mount — ScrollTrigger onEnter handles that
    if (!hasEnteredView.current) return;

    // Animate the "push into" zoom on user tab clicks
    if (imageRef.current) {
      const zoom = tabs[activeTab].zoom;
      if (zoom) {
        gsap.to(imageRef.current, {
          scale: zoom.scale,
          duration: 2,
          ease: "power2.out",
          delay: 0.5,
        });
      }
      // Non-zoom tabs stay at scale 1 (already set above)
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
          {/* Tab buttons — stacked top-left */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-1.5 lg:w-60 shrink-0 self-start">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-all duration-300 w-full ${
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

                {/* Green highlighter swipe over "Westlake Hills" in hero heading */}
                {current.showHighlight && (
                  <div
                    key={activeTab}
                    className="absolute pointer-events-none z-10 highlighter-swipe"
                    style={{
                      top: "37%",
                      left: "21%",
                      width: "27%",
                      height: "4.5%",
                      background: "rgba(107, 143, 123, 0.4)",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>

    </section>
  );
}
