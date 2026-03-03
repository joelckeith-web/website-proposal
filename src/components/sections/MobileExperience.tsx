"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";
import { Smartphone, Fingerprint, Gauge, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Smartphone, value: "70%", label: "Mobile Visitors" },
  { icon: Fingerprint, value: "< 2s", label: "Load Time" },
  { icon: Gauge, value: "95+", label: "Mobile Score" },
  { icon: Globe, value: "100%", label: "Responsive" },
];

export function MobileExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Phones fan out from center
      const phones = phonesRef.current?.querySelectorAll(".phone-item");
      if (phones) {
        phones.forEach((phone, i) => {
          const angle = (i - 1) * 8; // -8, 0, 8 degrees
          const xOffset = (i - 1) * 40;

          gsap.from(phone, {
            y: 150,
            opacity: 0,
            rotation: 0,
            x: 0,
            scale: 0.8,
            duration: 1.2,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: phonesRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          // Fan out on further scroll
          gsap.to(phone, {
            rotation: angle,
            x: xOffset,
            ease: "none",
            scrollTrigger: {
              trigger: phonesRef.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 1,
            },
          });
        });
      }

      // Stats stagger — use fromTo with aggressive trigger
      const statCards = statsRef.current?.children;
      if (statCards) {
        gsap.fromTo(
          statCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 98%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Fallback: ensure cards become visible after 3s even without scroll trigger
      gsap.to(statCards || [], {
        opacity: 1,
        y: 0,
        delay: 3,
        duration: 0.5,
        overwrite: false,
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
          <span className="eyebrow mb-4 block">Mobile Experience</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            Built for the
            <br />
            <span className="text-gradient">Thumb-First</span> Generation
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            70% of your visitors will arrive on a phone. Every interaction is
            optimized for touch, speed, and instant action.
          </p>
        </div>

        {/* Phone array */}
        <div
          ref={phonesRef}
          className="flex justify-center items-end gap-4 md:gap-8 mb-16"
        >
          {(["mobile-home", "mobile-service-detail", "mobile-services"] as const).map(
            (variant, i) => (
              <div
                key={variant}
                className={`phone-item ${i === 1 ? "w-[180px] md:w-[220px] z-10" : "w-[140px] md:w-[180px]"}`}
                style={{ transformOrigin: "bottom center" }}
              >
                <PhoneFrame>
                  {i === 1 ? (
                    /* Center phone: perpetual looping scroll */
                    <div className="phone-scroll-anim" style={{ height: "100%", overflow: "hidden" }}>
                      {/* eslint-disable @next/next/no-img-element */}
                      <img
                        src="/screenshots/mobile-service-detail-full.png"
                        alt="Mobile service detail - scrolling"
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <ScreenImage variant={variant} />
                  )}
                </PhoneFrame>
              </div>
            )
          )}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="metric-card">
              <Icon className="w-5 h-5 text-brand-light mx-auto mb-3" />
              <div className="metric-value text-gradient-brand">{value}</div>
              <div className="metric-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
