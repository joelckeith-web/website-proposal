/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  SITE CONFIG — Single source of truth for the
 *  entire website showcase template.
 *
 *  To onboard a new client:
 *  1. Update colors, fonts, and business identity
 *  2. Update section content arrays
 *  3. Replace screenshots in /public/screenshots/
 *  4. npm run build && deploy
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// ─── Types ─────────────────────────────────────────

export interface ColorTokens {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  cream: string;
  accent: string;
  accentAlt: string;
  background: string;
  foreground: string;
  charcoal: string;
  muted: string;
  mutedForeground: string;
}

export interface FontConfig {
  name: string;
  weights: string[];
  fallback: string;
}

export interface SectionHeading {
  eyebrow: string;
  title: string;
  gradientText: string;
  titleAfter?: string;
  subtitle: string;
}

export interface Annotation {
  label: string;
  position: Record<string, string>;
  dotSide: "left" | "right" | "top";
  delay: number;
}

export interface MobilePhone {
  variant: string;
  isCenter: boolean;
  scrollImage?: { src: string; alt: string };
}

export interface ConversionTab {
  icon: string;
  title: string;
  description: string;
  screenshot: string;
  zoom: { scale: number; origin: string } | null;
}

export interface SiteConfig {
  colors: ColorTokens;
  fonts: { heading: FontConfig; body: FontConfig };
  business: {
    name: string;
    abbreviation: string;
    liveUrl: string;
    tagline: string;
    agency: string;
  };
  metadata: { title: string; description: string };
  navigation: { id: string; label: string }[];
  screenshots: Record<string, { src: string; alt: string }>;

  hero: {
    badge: string;
    titleLine1: string;
    titleGradient: string;
    subtitle: string;
    scrollCta: string;
    heroImage: { src: string; alt: string };
  };

  sections: {
    designPhilosophy: {
      heading: SectionHeading;
      paletteSwatches: { colorKey: keyof ColorTokens; label: string }[];
      principles: {
        icon: string;
        title: string;
        description: string;
        colorKey: keyof ColorTokens;
      }[];
    };

    homepageShowcase: {
      heading: SectionHeading;
      annotations: Annotation[];
    };

    servicesShowcase: {
      heading: SectionHeading;
      browserUrl: string;
      laptopScreenshot: string;
      scrollImage: { src: string; alt: string };
    };

    mobileExperience: {
      heading: SectionHeading;
      stats: { icon: string; value: string; label: string }[];
      phones: MobilePhone[];
    };

    trustSection: {
      heading: SectionHeading;
      browserUrl: string;
      reviewsImage: { src: string; alt: string };
      features: { icon: string; title: string; description: string }[];
    };

    conversionSection: {
      heading: SectionHeading;
      tabs: ConversionTab[];
    };

    technicalSection: {
      heading: SectionHeading;
      metrics: { label: string; value: number }[];
      features: {
        icon: string;
        title: string;
        description: string;
        tag: string;
      }[];
    };

    closingSection: {
      heading: SectionHeading;
      deliverables: string[];
      cta: { text: string; url: string };
      footer: { brand: string; description: string };
    };
  };
}

// ─── Outdoor Renovations Config ────────────────────

export const siteConfig: SiteConfig = {
  // ── Brand Colors ──────────────────────────────────
  colors: {
    primary: "#2D4A3E",
    primaryDark: "#1B3128",
    primaryLight: "#6B8F7B",
    cream: "#F0EBE3",
    accent: "#4CC9F0",
    accentAlt: "#9F4CFF",
    background: "#000000",
    foreground: "#f5f5f5",
    charcoal: "#1A1A1A",
    muted: "#111111",
    mutedForeground: "#8a8a8a",
  },

  // ── Fonts ─────────────────────────────────────────
  fonts: {
    heading: {
      name: "Playfair Display",
      weights: ["400", "600", "700", "800", "900"],
      fallback: "serif",
    },
    body: {
      name: "Poppins",
      weights: ["400", "500", "600", "700", "800", "900"],
      fallback: "sans-serif",
    },
  },

  // ── Business Identity ─────────────────────────────
  business: {
    name: "Outdoor Renovations",
    abbreviation: "OR",
    liveUrl: "outdoor-renovations.vercel.app",
    tagline: "Design \u2022 Landscape \u2022 Maintain",
    agency: "ASP \u2014 Assess. Strategize. Perform.",
  },

  // ── Metadata ──────────────────────────────────────
  metadata: {
    title: "Outdoor Renovations | Website Showcase",
    description:
      "A premium website presentation showcasing the design, functionality, and craftsmanship built for Outdoor Renovations.",
  },

  // ── Navigation ────────────────────────────────────
  navigation: [
    { id: "hero", label: "Intro" },
    { id: "philosophy", label: "Philosophy" },
    { id: "homepage", label: "Homepage" },
    { id: "services", label: "Services" },
    { id: "mobile", label: "Mobile" },
    { id: "trust", label: "Trust" },
    { id: "conversion", label: "Conversion" },
    { id: "technical", label: "Technical" },
    { id: "closing", label: "Launch" },
  ],

  // ── Screenshots ───────────────────────────────────
  screenshots: {
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
  },

  // ── Hero Section ──────────────────────────────────
  hero: {
    badge: "Website Showcase",
    titleLine1: "Outdoor",
    titleGradient: "Renovations",
    subtitle:
      "Your digital presence, designed to convert visitors into consultations.",
    scrollCta: "Scroll to explore",
    heroImage: {
      src: "/images/hero-macbook.png",
      alt: "Outdoor Renovations website displayed on MacBook Pro",
    },
  },

  // ── Section Content ───────────────────────────────
  sections: {
    // ── Design Philosophy ────────────────────────────
    designPhilosophy: {
      heading: {
        eyebrow: "Design Philosophy",
        title: "Crafted with",
        gradientText: "Purpose",
        subtitle:
          "Every design decision serves one goal: turning visitors into booked consultations for Outdoor Renovations.",
      },
      paletteSwatches: [
        { colorKey: "primaryDark", label: "Dark Green" },
        { colorKey: "primary", label: "Primary" },
        { colorKey: "primaryLight", label: "Light Green" },
        { colorKey: "cream", label: "Cream" },
        { colorKey: "charcoal", label: "Charcoal" },
      ],
      principles: [
        {
          icon: "Palette",
          title: "Earth-Toned Luxury",
          description:
            "A warm, organic palette of deep greens, creams, and charcoal that reflects the natural beauty of outdoor living.",
          colorKey: "primary",
        },
        {
          icon: "Eye",
          title: "Trust-First Design",
          description:
            "Licensing badges, project counts, and star ratings placed above the fold \u2014 credibility before the first scroll.",
          colorKey: "primaryLight",
        },
        {
          icon: "Smartphone",
          title: "Mobile-First Architecture",
          description:
            "Built for the 70% of visitors who arrive on a phone. Every tap, swipe, and scroll is intentional.",
          colorKey: "accent",
        },
        {
          icon: "Zap",
          title: "Conversion-Engineered",
          description:
            "Every page drives one action: book a consultation. CTAs, click-to-call, and contact forms at every touchpoint.",
          colorKey: "cream",
        },
      ],
    },

    // ── Homepage Showcase ────────────────────────────
    homepageShowcase: {
      heading: {
        eyebrow: "Homepage",
        title: "First Impressions",
        gradientText: "That Convert",
        subtitle:
          "A cinematic hero with video background, trust badges above the fold, and a services carousel that drives exploration.",
      },
      annotations: [
        {
          label: "Video hero to show quality of work",
          position: { top: "40%", left: "-14%" },
          dotSide: "right",
          delay: 0,
        },
        {
          label: "Click-to-call CTA",
          position: { top: "7%", right: "-10%" },
          dotSide: "left",
          delay: 0.2,
        },
        {
          label: "Immediate credibility metrics",
          position: {
            bottom: "-4%",
            left: "50%",
            transform: "translateX(-50%)",
          },
          dotSide: "top",
          delay: 0.4,
        },
      ],
    },

    // ── Services Showcase ────────────────────────────
    servicesShowcase: {
      heading: {
        eyebrow: "Service Pages",
        title: "8 Expert Services,",
        gradientText: "Each with Its Own Stage",
        subtitle:
          "Every service has a dedicated page with detailed content, FAQs, project galleries, and a clear path to booking a consultation.",
      },
      browserUrl: "outdoor-renovations.vercel.app/services/landscape-design",
      laptopScreenshot: "service-detail",
      scrollImage: {
        src: "/screenshots/mobile-homepage-full.png",
        alt: "Mobile homepage - scrolling",
      },
    },

    // ── Mobile Experience ────────────────────────────
    mobileExperience: {
      heading: {
        eyebrow: "Mobile Experience",
        title: "Built for the",
        gradientText: "Thumb-First",
        titleAfter: " Generation",
        subtitle:
          "70% of your visitors will arrive on a phone. Every interaction is optimized for touch, speed, and instant action.",
      },
      stats: [
        { icon: "Smartphone", value: "70%", label: "Mobile Visitors" },
        { icon: "Fingerprint", value: "< 2s", label: "Load Time" },
        { icon: "Gauge", value: "95+", label: "Mobile Score" },
        { icon: "Globe", value: "100%", label: "Responsive" },
      ],
      phones: [
        { variant: "mobile-home", isCenter: false },
        {
          variant: "mobile-service-detail",
          isCenter: true,
          scrollImage: {
            src: "/screenshots/mobile-service-detail-full.png",
            alt: "Mobile service detail - scrolling",
          },
        },
        { variant: "mobile-services", isCenter: false },
      ],
    },

    // ── Trust & Social Proof ─────────────────────────
    trustSection: {
      heading: {
        eyebrow: "Trust & Social Proof",
        title: "Credibility",
        gradientText: "Before the First Scroll",
        subtitle:
          "Trust signals are woven into every page \u2014 reviews, badges, certifications, and guarantees that turn skeptics into clients.",
      },
      browserUrl: "outdoor-renovations.vercel.app/#reviews",
      reviewsImage: {
        src: "/screenshots/homepage-reviews-focused.png",
        alt: "Outdoor Renovations client testimonials carousel",
      },
      features: [
        {
          icon: "Shield",
          title: "Licensed & Insured",
          description: "Full licensing verification displayed prominently",
        },
        {
          icon: "Star",
          title: "5.0 Star Rating",
          description:
            "200+ verified reviews showcased with auto-scrolling carousel",
        },
        {
          icon: "Award",
          title: "16+ Years Experience",
          description: "Credentials and track record above the fold",
        },
        {
          icon: "Users",
          title: "200+ Projects",
          description: "Social proof through completed project count",
        },
        {
          icon: "Clock",
          title: "1-Year Guarantee",
          description: "Service warranty badge building buyer confidence",
        },
        {
          icon: "Heart",
          title: "Military Discount",
          description: "Community commitment highlighted in footer",
        },
      ],
    },

    // ── Conversion Engine ────────────────────────────
    conversionSection: {
      heading: {
        eyebrow: "Conversion Engine",
        title: "Every Page Drives",
        gradientText: "One Action",
        subtitle:
          "Book a consultation. That\u2019s the goal of every button, form, and call-to-action across the entire site.",
      },
      tabs: [
        {
          icon: "Phone",
          title: "Click-to-Call",
          description:
            "Sticky header with phone number on every page. One tap from any screen to connect directly with the business.",
          screenshot: "hero",
          zoom: { scale: 2.24, origin: "88% 4%" },
        },
        {
          icon: "MousePointerClick",
          title: "Strategic CTAs",
          description:
            '"Get a Consultation" buttons placed at every natural decision point throughout the site. Above the fold, after services, below reviews.',
          screenshot: "hero",
          zoom: { scale: 1.54, origin: "35% 75%" },
        },
        {
          icon: "FileText",
          title: "Smart Contact Forms",
          description:
            "React Hook Form with field validation, designed for quick mobile completion. Name, phone, service type \u2014 three fields to a lead.",
          screenshot: "service-detail",
          zoom: null,
        },
        {
          icon: "MapPin",
          title: "10+ Location Pages",
          description:
            "City-specific landing pages targeting local search intent across the Austin metro area. Each page is SEO-optimized for that city.",
          screenshot: "location-page",
          zoom: null,
        },
      ],
    },

    // ── Technical / Under the Hood ───────────────────
    technicalSection: {
      heading: {
        eyebrow: "Under the Hood",
        title: "Engineered for",
        gradientText: "Performance",
        subtitle:
          "Built on modern infrastructure that loads fast, ranks high, and scales with your business.",
      },
      metrics: [
        { label: "SEO", value: 100 },
        { label: "Best Practices", value: 100 },
        { label: "Accessibility", value: 98 },
        { label: "Performance", value: 95 },
      ],
      features: [
        {
          icon: "Code2",
          title: "Next.js 14",
          description:
            "React server components, app router, and automatic code splitting",
          tag: "Framework",
        },
        {
          icon: "Layers",
          title: "Tailwind CSS",
          description:
            "Utility-first styling with custom design tokens for brand consistency",
          tag: "Styling",
        },
        {
          icon: "Database",
          title: "Sanity CMS",
          description:
            "Headless CMS with real-time content editing and image optimization",
          tag: "CMS",
        },
        {
          icon: "Search",
          title: "SEO-Ready",
          description:
            "Meta tags, Open Graph, sitemap, robots.txt \u2014 all pre-configured",
          tag: "SEO",
        },
        {
          icon: "FileJson",
          title: "Schema Markup",
          description:
            "JSON-LD structured data for local business, services, and reviews",
          tag: "Structured Data",
        },
        {
          icon: "Shield",
          title: "TypeScript",
          description:
            "Full type safety across components, config, and data layer",
          tag: "Language",
        },
      ],
    },

    // ── Closing / Launch ─────────────────────────────
    closingSection: {
      heading: {
        eyebrow: "What's Included",
        title: "Ready to",
        gradientText: "Launch",
        subtitle:
          "A complete digital presence engineered to generate leads for Outdoor Renovations from day one.",
      },
      deliverables: [
        "Custom-designed responsive website",
        "8 dedicated service pages with FAQs",
        "10+ city-specific location pages",
        "Auto-scrolling review carousel",
        "Click-to-call and contact forms on every page",
        "SEO-ready structure with schema markup",
        "Sanity CMS for content management",
        "Vercel deployment with global CDN",
      ],
      cta: {
        text: "View the Live Website",
        url: "https://outdoor-renovations.vercel.app",
      },
      footer: {
        brand: "ASP \u2014 Assess. Strategize. Perform.",
        description:
          "Website showcase presentation for Outdoor Renovations",
      },
    },
  },
};

// ─── Helpers ───────────────────────────────────────

/** Convert hex (#RRGGBB) to space-separated RGB for Tailwind alpha */
export function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** Build CSS custom properties from config (injected on <html>) */
export function buildCssVariables(): Record<string, string> {
  const c = siteConfig.colors;
  return {
    // Hex values
    "--color-primary": c.primary,
    "--color-primary-dark": c.primaryDark,
    "--color-primary-light": c.primaryLight,
    "--color-cream": c.cream,
    "--color-accent": c.accent,
    "--color-accent-alt": c.accentAlt,
    "--color-background": c.background,
    "--color-foreground": c.foreground,
    "--color-charcoal": c.charcoal,
    "--color-muted": c.muted,
    "--color-muted-foreground": c.mutedForeground,
    // RGB (space-separated for Tailwind alpha)
    "--color-primary-rgb": hexToRgb(c.primary),
    "--color-primary-dark-rgb": hexToRgb(c.primaryDark),
    "--color-primary-light-rgb": hexToRgb(c.primaryLight),
    "--color-cream-rgb": hexToRgb(c.cream),
    "--color-accent-rgb": hexToRgb(c.accent),
    "--color-accent-alt-rgb": hexToRgb(c.accentAlt),
    "--color-background-rgb": hexToRgb(c.background),
    "--color-foreground-rgb": hexToRgb(c.foreground),
    // Font families
    "--font-heading": `"${siteConfig.fonts.heading.name}", ${siteConfig.fonts.heading.fallback}`,
    "--font-body": `"${siteConfig.fonts.body.name}", ${siteConfig.fonts.body.fallback}`,
  };
}

/** Build Google Fonts <link> URL from config */
export function buildGoogleFontsUrl(): string {
  const families = [siteConfig.fonts.heading, siteConfig.fonts.body]
    .map((f) => {
      const name = f.name.replace(/ /g, "+");
      const weights = f.weights.join(";");
      return `family=${name}:wght@${weights}`;
    })
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
