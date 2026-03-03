"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserFrame, PhoneFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";
import {
  PenTool,
  Layers,
  Hammer,
  Leaf,
  Droplets,
  Lightbulb,
  Cog,
  TreeDeciduous,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: PenTool, name: "Landscape Design" },
  { icon: Layers, name: "Hardscaping" },
  { icon: Hammer, name: "Custom Carpentry" },
  { icon: Leaf, name: "Softscaping & Planting" },
  { icon: Droplets, name: "Irrigation & Drainage" },
  { icon: Lightbulb, name: "Landscape Lighting" },
  { icon: Cog, name: "Metal Fabrication" },
  { icon: TreeDeciduous, name: "Property Management" },
];

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
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

      // Devices slide in from sides
      const laptop = devicesRef.current?.querySelector(".laptop-wrapper");
      const phone = devicesRef.current?.querySelector(".phone-wrapper");

      if (laptop) {
        gsap.from(laptop, {
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: devicesRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      if (phone) {
        gsap.from(phone, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: devicesRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Service cards stagger
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
          <span className="eyebrow mb-4 block">Service Pages</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            8 Expert Services,
            <br />
            <span className="text-gradient">Each with Its Own Stage</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Every service has a dedicated page with detailed content, FAQs,
            project galleries, and a clear path to booking a consultation.
          </p>
        </div>

        {/* Device preview: Laptop + Phone */}
        <div
          ref={devicesRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16"
        >
          <div className="laptop-wrapper w-full max-w-2xl">
            <BrowserFrame url="outdoor-renovations.vercel.app/services/landscape-design">
              <div className="aspect-video">
                <ScreenImage variant="service-detail" />
              </div>
            </BrowserFrame>
          </div>
          <div className="phone-wrapper w-[200px] shrink-0">
            <PhoneFrame>
              <ScreenImage variant="mobile-services" />
            </PhoneFrame>
          </div>
        </div>

        {/* Service list */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {services.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="card-showcase p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-brand/20">
                <Icon className="w-5 h-5 text-brand-light" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
    </section>
  );
}
