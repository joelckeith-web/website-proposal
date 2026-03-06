"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserFrame, PhoneFrame } from "../ui/DeviceFrame";
import { ScreenImage } from "../ui/ScreenImage";

gsap.registerPlugin(ScrollTrigger);

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

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
      }

      // Mouse cursor moves to the "Get My Free Consultation" submit button and clicks
      if (cursorRef.current && window.innerWidth >= 768) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: devicesRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          delay: 1.5,
        });

        // Cursor enters from off-screen, moves to the submit button
        tl.fromTo(
          cursorRef.current,
          { opacity: 0, left: "85%", top: "8%" },
          { opacity: 1, left: "65%", top: "89%", duration: 1.4, ease: "power2.inOut" }
        )
          // Click animation on the submit button
          .to(cursorRef.current, {
            scale: 0.85,
            duration: 0.12,
            yoyo: true,
            repeat: 1,
          })
          // Pause then fade out cursor
          .to(cursorRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 1.2,
          });
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
        <div ref={headingRef} className="mb-6 md:mb-16">
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
          className="flex flex-col lg:flex-row items-center justify-center gap-8"
        >
          {/* Laptop */}
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
          </div>

          {/* Phone with slow perpetual auto-scroll */}
          <div className="phone-wrapper w-[200px] lg:w-[240px] shrink-0">
            <PhoneFrame>
              <div className="phone-scroll-slow overflow-hidden" style={{ height: "100%" }}>
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
      </div>

    </section>
  );
}
