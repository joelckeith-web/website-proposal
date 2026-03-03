"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";
import { Phone, MousePointerClick, FileText, MapPin, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const conversionPoints = [
  {
    icon: Phone,
    title: "Click-to-Call on Every Page",
    description: "Sticky header with phone number. One tap to connect.",
  },
  {
    icon: MousePointerClick,
    title: "Strategic CTA Placement",
    description:
      "\"Get a Consultation\" buttons placed at every natural decision point.",
  },
  {
    icon: FileText,
    title: "Smart Contact Forms",
    description:
      "React Hook Form with validation, designed for quick mobile completion.",
  },
  {
    icon: MapPin,
    title: "10+ Location Pages",
    description:
      "City-specific landing pages targeting local search intent across Austin metro.",
  },
];

export function ConversionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

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

      gsap.from(browserRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: browserRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      const points = pointsRef.current?.children;
      if (points) {
        gsap.from(points, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pointsRef.current,
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

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conversion points */}
          <div ref={pointsRef} className="space-y-6">
            {conversionPoints.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-brand/20 group-hover:bg-brand/30 transition-colors">
                  <Icon className="w-6 h-6 text-brand-light" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    {title}
                    <ArrowRight className="w-4 h-4 text-brand-light opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Browser showing contact page */}
          <div ref={browserRef}>
            <BrowserFrame url="outdoor-renovations.vercel.app/contact">
              <div className="aspect-video">
                <ScreenImage variant="contact" />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
    </section>
  );
}
