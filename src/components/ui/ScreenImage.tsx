"use client";

/**
 * Maps section variants to actual screenshot files in /public/screenshots/.
 * These were captured from the live Outdoor Renovations site via Puppeteer.
 */
const screenshotMap: Record<string, { src: string; alt: string }> = {
  hero: {
    src: "/screenshots/homepage-hero.png",
    alt: "Outdoor Renovations homepage hero section with video background",
  },
  services: {
    src: "/screenshots/homepage-services.png",
    alt: "Outdoor Renovations services carousel section",
  },
  about: {
    src: "/screenshots/homepage-about.png",
    alt: "Outdoor Renovations about section with company credentials",
  },
  reviews: {
    src: "/screenshots/homepage-reviews.png",
    alt: "Outdoor Renovations client testimonials carousel",
  },
  contact: {
    src: "/screenshots/contact-page.png",
    alt: "Outdoor Renovations contact page with form",
  },
  "contact-cta": {
    src: "/screenshots/homepage-contact-cta.png",
    alt: "Outdoor Renovations call-to-action section",
  },
  "service-detail": {
    src: "/screenshots/service-detail.png",
    alt: "Outdoor Renovations landscape design service page",
  },
  "mobile-home": {
    src: "/screenshots/mobile-homepage.png",
    alt: "Outdoor Renovations mobile homepage view",
  },
  "mobile-services": {
    src: "/screenshots/mobile-services.png",
    alt: "Outdoor Renovations mobile services view",
  },
  "mobile-service-detail": {
    src: "/screenshots/mobile-service-detail.png",
    alt: "Outdoor Renovations mobile service detail view",
  },
  "location-page": {
    src: "/screenshots/location-page.png",
    alt: "Outdoor Renovations Austin location page with local SEO content",
  },
  "homepage-cta-section": {
    src: "/screenshots/homepage-cta-section.png",
    alt: "Outdoor Renovations homepage call-to-action section",
  },
  "homepage-reviews-focused": {
    src: "/screenshots/homepage-reviews-focused.png",
    alt: "Outdoor Renovations client reviews carousel focused view",
  },
};

interface ScreenImageProps {
  variant: string;
  className?: string;
  priority?: boolean;
}

export function ScreenImage({
  variant,
  className = "",
  priority = false,
}: ScreenImageProps) {
  const screen = screenshotMap[variant];
  if (!screen) return null;

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      src={screen.src}
      alt={screen.alt}
      className={`w-full h-full object-cover object-top block ${className}`}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
