"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";

gsap.registerPlugin(ScrollTrigger);

const annotations = [
  {
    label: "Video hero with trust signals",
    position: { top: "8%", left: "-10%" },
    dotSide: "right" as const,
    delay: 0,
  },
  {
    label: "Click-to-call CTA",
    position: { top: "8%", right: "-10%" },
    dotSide: "left" as const,
    delay: 0.2,
  },
  {
    label: "Immediate credibility metrics",
    position: { bottom: "12%", left: "50%", transform: "translateX(-50%)" },
    dotSide: "top" as const,
    delay: 0.4,
  },
];

export function HomepageShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const annotationsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade in
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

      // Browser frame scales up
      gsap.from(browserRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: browserRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      // Annotations fly in from sides
      annotationsRef.current.forEach((el, i) => {
        if (!el) return;
        const fromLeft = i % 2 === 0;
        gsap.from(el, {
          x: fromLeft ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          delay: annotations[i].delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: browserRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
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
          <span className="eyebrow mb-4 block">Homepage</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            First Impressions
            <br />
            <span className="text-gradient">That Convert</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A cinematic hero with video background, trust badges above the fold,
            and a services carousel that drives exploration.
          </p>
        </div>

        {/* Browser with annotations */}
        <div className="relative max-w-5xl mx-auto">
          {/* Annotations with ripple dots (desktop only) */}
          {annotations.map((ann, i) => {
            const dotPos =
              ann.dotSide === "right"
                ? { top: "50%", right: "-16px", transform: "translateY(-50%)" }
                : ann.dotSide === "left"
                  ? { top: "50%", left: "-16px", transform: "translateY(-50%)" }
                  : { top: "-16px", left: "50%", transform: "translateX(-50%)" };

            return (
              <div
                key={ann.label}
                ref={(el) => { annotationsRef.current[i] = el; }}
                className="annotation hidden lg:block"
                style={ann.position as React.CSSProperties}
              >
                {/* Ripple ping dot */}
                <span className="absolute" style={dotPos as React.CSSProperties}>
                  <span className="ripple-dot" />
                  <span className="ripple-ping" />
                </span>
                {ann.label}
              </div>
            );
          })}

          {/* Browser frame */}
          <div ref={browserRef}>
            <BrowserFrame>
              <div className="aspect-video">
                <ScreenImage variant="hero" />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
    </section>
  );
}
