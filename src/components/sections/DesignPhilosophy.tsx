"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site.config";
import { getIcon } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger);

export function DesignPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  const cfg = siteConfig.sections.designPhilosophy;

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

      // Swatches — only animate on desktop
      const swatches = paletteRef.current?.querySelectorAll(".palette-swatch");
      if (swatches && isDesktop) {
        gsap.fromTo(
          swatches,
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: paletteRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards — only animate on desktop
      const cards = cardsRef.current?.children;
      if (cards && isDesktop) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      className="relative py-8 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-4 md:mb-12">
          <span className="eyebrow mb-4 block">{cfg.heading.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            {cfg.heading.title}
            <br />
            <span className="text-gradient">{cfg.heading.gradientText}</span>
          </h2>
          <p className="mt-3 md:mt-6 text-sm md:text-lg text-muted-foreground max-w-2xl">
            {cfg.heading.subtitle}
          </p>
        </div>

        {/* Color Palette — large swatches with hex codes */}
        <div ref={paletteRef} className="mb-6 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 md:mb-6">
            Brand Palette
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
            {cfg.paletteSwatches.map((swatch) => {
              const color = siteConfig.colors[swatch.colorKey];
              return (
                <div
                  key={swatch.label}
                  className="palette-swatch flex flex-col items-center gap-1.5 md:gap-3"
                >
                  <div
                    className="w-full aspect-[2/1] md:aspect-[3/2] rounded-xl md:rounded-2xl border border-white/10 transition-transform duration-300 hover:scale-105"
                    style={{ background: color }}
                  />
                  <div className="text-center">
                    <span className="block text-sm font-semibold text-foreground">
                      {swatch.label}
                    </span>
                    <span className="block text-xs font-mono text-muted-foreground mt-0.5">
                      {color}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Principle Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {cfg.principles.map(({ icon: iconName, title, description, colorKey }) => {
            const Icon = getIcon(iconName);
            const color = siteConfig.colors[colorKey];
            return (
              <div key={title} className="card-showcase p-4 md:p-6">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-2 md:mb-4"
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
            );
          })}
        </div>
      </div>

    </section>
  );
}
