"use client";

import { useEffect, useRef, useState } from "react";
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
  const phoneScreenRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");

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

      // Auto-scroll phone content
      if (phoneScreenRef.current) {
        const img = phoneScreenRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: devicesRef.current,
              start: "top 60%",
              end: "bottom 30%",
              scrub: 2,
            },
          });
        }
      }

      // Mouse cursor moves to Full Name field, clicks, then types "John Doe"
      if (cursorRef.current && typingRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: devicesRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: 1.5,
        });

        // Cursor enters from off-screen, moves to the Full Name form field
        tl.fromTo(
          cursorRef.current,
          { opacity: 0, left: "85%", top: "8%" },
          { opacity: 1, left: "74%", top: "48%", duration: 1.2, ease: "power2.inOut" }
        )
          // Click animation
          .to(cursorRef.current, {
            scale: 0.85,
            duration: 0.12,
            yoyo: true,
            repeat: 1,
          })
          // Show typing overlay after click
          .to(typingRef.current, { opacity: 1, duration: 0.1 })
          // Type "John Doe" character by character
          .to(
            { length: 0 },
            {
              length: 8,
              duration: 1.2,
              ease: "steps(8)",
              onUpdate: function () {
                const len = Math.round(this.targets()[0].length);
                setTypedText("John Doe".slice(0, len));
              },
            }
          )
          // Pause then fade out cursor and text
          .to(cursorRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 1,
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
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32"
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

        {/* Device preview: Laptop + Phone — larger frames */}
        <div
          ref={devicesRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16"
        >
          {/* Larger laptop */}
          <div className="laptop-wrapper w-full max-w-3xl relative">
            <BrowserFrame url="outdoor-renovations.vercel.app/services/landscape-design">
              <div className="aspect-video">
                <ScreenImage variant="service-detail" />
              </div>
            </BrowserFrame>
            {/* Fake mouse cursor — positioned absolutely, GSAP animates left/top */}
            <div
              ref={cursorRef}
              className="absolute pointer-events-none z-20"
              style={{ top: "8%", left: "85%", opacity: 0 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 3l14 8-6.5 2L9 19.5z"
                  fill="white"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Typing text overlay — appears where the Full Name field is */}
            <div
              ref={typingRef}
              className="absolute pointer-events-none z-20"
              style={{ top: "49%", left: "66%", opacity: 0 }}
            >
              <span className="text-[11px] font-sans text-gray-700 bg-white/90 px-1 rounded-sm">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>

          {/* Larger phone with auto-scroll */}
          <div className="phone-wrapper w-[240px] shrink-0">
            <PhoneFrame>
              <div ref={phoneScreenRef} className="overflow-hidden" style={{ height: "100%" }}>
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src="/screenshots/mobile-homepage-full.png"
                  alt="Mobile homepage - scrolling"
                  className="w-full"
                  loading="lazy"
                />
              </div>
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

    </section>
  );
}
