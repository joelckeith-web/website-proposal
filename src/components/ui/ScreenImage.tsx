"use client";

import { siteConfig } from "@/lib/site.config";

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
  const screen = siteConfig.screenshots[variant];
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
