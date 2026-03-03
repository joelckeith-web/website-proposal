"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { LaptopFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const perspectiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge entrance
      gsap.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Heading entrance — opacity only, no y conflict with parallax
      gsap.from(headingRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });

      // Laptop 3D rotation: starts sideways (side profile) and spins to face viewer
      gsap.fromTo(
        laptopRef.current,
        {
          rotateY: -80,
          opacity: 0,
          scale: 0.85,
          x: -100,
        },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.7,
        }
      );

      // Parallax on scroll — y movement only, NO opacity fade
      // This ensures heading always reappears when scrolling back to top
      gsap.to(headingRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });

      gsap.to(laptopRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20">
        {/* Badge */}
        <div ref={badgeRef} className="mb-6">
          <span className="eyebrow">Website Showcase</span>
        </div>

        {/* Heading */}
        <div ref={headingRef}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black tracking-tight leading-[0.95]">
            <span className="text-foreground">Outdoor</span>
            <br />
            <span className="text-gradient">Renovations</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Your digital presence, designed to convert visitors into
            consultations.
          </p>

          {/* Tagline line */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="line-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Design &bull; Landscape &bull; Maintain
            </span>
            <div className="line-accent" />
          </div>
        </div>

        {/* 3D Perspective wrapper for laptop spin */}
        <div ref={perspectiveRef} className="mt-12 w-full max-w-5xl px-4" style={{ perspective: "1200px" }}>
          <div ref={laptopRef} style={{ transformStyle: "preserve-3d" }}>
            <LaptopFrame>
              <div className="aspect-video relative overflow-hidden">
                <div className="ken-burns-anim w-full h-full">
                  <ScreenImage variant="hero" priority />
                </div>
              </div>
            </LaptopFrame>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-brand-light" />
      </div>
    </section>
  );
}
