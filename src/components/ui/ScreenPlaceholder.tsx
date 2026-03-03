"use client";

/**
 * Placeholder component that simulates the Outdoor Renovations website sections.
 * Replace these with actual screenshots captured from the live site.
 *
 * Screenshot paths should go in: /public/screenshots/
 * Then use <Image src="/screenshots/filename.png" ... />
 */

interface ScreenPlaceholderProps {
  variant:
    | "hero"
    | "services"
    | "about"
    | "reviews"
    | "contact"
    | "service-detail"
    | "mobile-home"
    | "mobile-services";
  className?: string;
}

const variants: Record<
  string,
  { bg: string; title: string; subtitle: string; elements: string[] }
> = {
  hero: {
    bg: "linear-gradient(135deg, #1B3128 0%, #2D4A3E 40%, #1A1A1A 100%)",
    title: "Transform Your Outdoor Space",
    subtitle: "Design | Landscape | Maintain",
    elements: [
      "Licensed & Insured",
      "200+ Projects",
      "16+ Years",
      "99% Satisfaction",
    ],
  },
  services: {
    bg: "linear-gradient(180deg, #0d0d0d 0%, #1B3128 50%, #0d0d0d 100%)",
    title: "Our Services",
    subtitle: "8 Expert Service Categories",
    elements: [
      "Landscape Design",
      "Hardscaping",
      "Custom Carpentry",
      "Softscaping",
    ],
  },
  about: {
    bg: "linear-gradient(135deg, #F0EBE3 0%, #e6e0d6 50%, #F0EBE3 100%)",
    title: "About Outdoor Renovations",
    subtitle: "16+ Years of Excellence",
    elements: [
      "Licensed Contractor",
      "Fully Bonded",
      "Service Guarantee",
      "Military Discount",
    ],
  },
  reviews: {
    bg: "linear-gradient(135deg, #1B3128 0%, #2D4A3E 100%)",
    title: "Client Testimonials",
    subtitle: "200+ Five-Star Reviews",
    elements: [],
  },
  contact: {
    bg: "linear-gradient(135deg, #0d0d0d 0%, #1B3128 100%)",
    title: "Get a Consultation",
    subtitle: "(512) 743-0570",
    elements: ["Name", "Email", "Phone", "Message"],
  },
  "service-detail": {
    bg: "linear-gradient(135deg, #1B3128 0%, #2D4A3E 50%, #0d0d0d 100%)",
    title: "Landscape Design",
    subtitle: "Custom Plans & 3D Renderings",
    elements: ["Process", "Gallery", "FAQ", "Contact CTA"],
  },
  "mobile-home": {
    bg: "linear-gradient(180deg, #1B3128 0%, #2D4A3E 40%, #0d0d0d 100%)",
    title: "Mobile Homepage",
    subtitle: "Responsive Design",
    elements: [],
  },
  "mobile-services": {
    bg: "linear-gradient(180deg, #0d0d0d 0%, #1B3128 100%)",
    title: "Mobile Services",
    subtitle: "Touch-Optimized",
    elements: [],
  },
};

export function ScreenPlaceholder({
  variant,
  className = "",
}: ScreenPlaceholderProps) {
  const v = variants[variant] || variants.hero;
  const isDark = variant !== "about";

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}
      style={{ background: v.bg }}
    >
      {/* Simulated nav bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
        <div
          className="text-xs font-bold"
          style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
        >
          Outdoor Renovations
        </div>
        <div className="flex gap-3">
          {["Services", "About", "Contact"].map((item) => (
            <span
              key={item}
              className="text-[9px]"
              style={{
                color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="text-center px-6">
        <h3
          className="text-sm md:text-base font-heading font-bold mb-1"
          style={{ color: isDark ? "#F0EBE3" : "#1B3128" }}
        >
          {v.title}
        </h3>
        <p
          className="text-[10px] md:text-xs"
          style={{
            color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
          }}
        >
          {v.subtitle}
        </p>
      </div>

      {/* Simulated elements */}
      {v.elements.length > 0 && (
        <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-2 px-4">
          {v.elements.map((el) => (
            <span
              key={el}
              className="text-[8px] px-2 py-1 rounded-full"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)",
                color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
              }}
            >
              {el}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
