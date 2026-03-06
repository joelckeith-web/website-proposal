"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserFrame } from "../ui/DeviceFrame";
import { Star, Shield, Award, Users, Clock, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustFeatures = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full licensing verification displayed prominently",
  },
  {
    icon: Star,
    title: "5.0 Star Rating",
    description: "200+ verified reviews showcased with auto-scrolling carousel",
  },
  {
    icon: Award,
    title: "16+ Years Experience",
    description: "Credentials and track record above the fold",
  },
  {
    icon: Users,
    title: "200+ Projects",
    description: "Social proof through completed project count",
  },
  {
    icon: Clock,
    title: "1-Year Guarantee",
    description: "Service warranty badge building buyer confidence",
  },
  {
    icon: Heart,
    title: "Military Discount",
    description: "Community commitment highlighted in footer",
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const reviewsImgRef = useRef<HTMLDivElement>(null);

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

        gsap.from(browserRef.current, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: browserRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }

      // Reviews carousel: the CSS animation handles horizontal cycling automatically

      // Trust feature cards — only animate on desktop
      const features = featuresRef.current?.children;
      if (features && isDesktop) {
        gsap.fromTo(
          features,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
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
      className="relative pt-8 md:pt-32 pb-6 md:pb-16 px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-6 md:mb-16">
          <span className="eyebrow mb-4 block">Trust & Social Proof</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1]">
            Credibility
            <br />
            <span className="text-gradient">Before the First Scroll</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Trust signals are woven into every page — reviews, badges,
            certifications, and guarantees that turn skeptics into clients.
          </p>
        </div>

        {/* Bigger browser screenshot on top */}
        <div ref={browserRef} className="mb-12 max-w-5xl mx-auto">
          <BrowserFrame url="outdoor-renovations.vercel.app/#reviews">
            <div className="aspect-video overflow-hidden flex items-center" ref={reviewsImgRef}>
              {/* eslint-disable @next/next/no-img-element */}
              <div className="carousel-scroll-anim" style={{ width: "140%", maxWidth: "none", flexShrink: 0 }}>
                <img
                  src="/screenshots/homepage-reviews-focused.png"
                  alt="Outdoor Renovations client testimonials carousel"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </BrowserFrame>
        </div>

        {/* Trust features grid below */}
        <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {trustFeatures.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card-showcase p-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-brand/20">
                <Icon className="w-5 h-5 text-brand-light" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
