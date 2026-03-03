"use client";

import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { DesignPhilosophy } from "@/components/sections/DesignPhilosophy";
import { HomepageShowcase } from "@/components/sections/HomepageShowcase";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { MobileExperience } from "@/components/sections/MobileExperience";
import { TrustSection } from "@/components/sections/TrustSection";
import { ConversionSection } from "@/components/sections/ConversionSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function WebsiteShowcase() {
  return (
    <main>
      <ScrollProgress />
      <Navigation />

      <div id="hero">
        <HeroSection />
      </div>

      <div id="philosophy">
        <DesignPhilosophy />
      </div>

      <div id="homepage">
        <HomepageShowcase />
      </div>

      <div id="services">
        <ServicesShowcase />
      </div>

      <div id="mobile">
        <MobileExperience />
      </div>

      <div id="trust">
        <TrustSection />
      </div>

      <div id="conversion">
        <ConversionSection />
      </div>

      <div id="technical">
        <TechnicalSection />
      </div>

      <div id="closing">
        <ClosingSection />
      </div>
    </main>
  );
}
