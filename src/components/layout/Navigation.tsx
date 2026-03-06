"use client";

import { useEffect, useState, useCallback } from "react";
import { siteConfig } from "@/lib/site.config";

const SECTIONS = siteConfig.navigation;

export function Navigation() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map((s) => document.getElementById(s.id));
      let current = 0;

      sections.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          current = index;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Fixed top nav */}
      <header
        className={`fixed top-[2px] left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-3 transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-heading font-bold text-gradient-brand tracking-tight">
            {siteConfig.business.abbreviation}
          </span>
          <span className="hidden md:inline text-xs text-muted-foreground font-medium">
            Website Showcase
          </span>
        </div>

        {/* Center nav dots (desktop) */}
        <nav
          className="hidden lg:flex items-center gap-2"
          aria-label="Section navigation"
        >
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-center p-1"
              aria-label={`Go to: ${section.label}`}
              aria-current={activeSection === index ? "true" : undefined}
            >
              <span
                className={`absolute -bottom-8 whitespace-nowrap rounded-sm px-2 py-1 text-[10px] font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                  activeSection === index
                    ? "text-brand-light"
                    : "text-muted-foreground"
                }`}
                style={{ background: "rgba(0, 0, 0, 0.8)" }}
              >
                {section.label}
              </span>
              <span
                className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${
                  activeSection === index
                    ? "bg-brand-light shadow-[0_0_10px_rgba(107,143,123,0.4)]"
                    : "bg-white/20 hover:bg-brand-light/50"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Section counter */}
        <span className="text-xs font-mono tabular-nums">
          <span className="font-bold text-white/40">
            {String(activeSection + 1).padStart(2, "0")}
          </span>
          <span className="text-brand-light/40"> / </span>
          <span className="text-white/40">{SECTIONS.length}</span>
        </span>
      </header>
    </>
  );
}
