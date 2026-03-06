"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";
import { siteConfig } from "@/lib/site.config";
import { getIcon } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger);

export function MobileExperience() {
  const cfg = siteConfig.sections.mobileExperience;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
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

        // Stats stagger
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
        <div ref={headingRef} className="text-center mb-6 md:mb-16">
          <span className="eyebrow mb-4 block">{cfg.heading.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            {cfg.heading.title}
            <br />
            <span className="text-gradient">{cfg.heading.gradientText}</span>{cfg.heading.titleAfter}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {cfg.heading.subtitle}
          </p>
        </div>

        {/* Phone array */}
        <div
          ref={phonesRef}
          className="flex justify-center items-end gap-3 md:gap-8 mb-10 md:mb-16"
        >
          {cfg.phones.map((phone) => (
            <div
              key={phone.variant}
              className={`phone-item ${phone.isCenter ? "w-[140px] md:w-[220px] z-10" : "w-[100px] md:w-[180px]"}`}
              style={{ transformOrigin: "bottom center" }}
            >
              <PhoneFrame>
                {phone.isCenter && phone.scrollImage ? (
                  <div className="phone-scroll-slow" style={{ height: "100%", overflow: "hidden" }}>
                    {/* eslint-disable @next/next/no-img-element */}
                    <img
                      src={phone.scrollImage.src}
                      alt={phone.scrollImage.alt}
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <ScreenImage variant={phone.variant} />
                )}
              </PhoneFrame>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {cfg.stats.map(({ icon: iconName, value, label }) => {
            const Icon = getIcon(iconName);
            return (
              <div key={label} className="metric-card">
                <Icon className="w-5 h-5 text-brand-light mx-auto mb-3" />
                <div className="metric-value text-gradient-brand">{value}</div>
                <div className="metric-label">{label}</div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
