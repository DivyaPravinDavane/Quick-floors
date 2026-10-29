import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServiceHighlights } from '@/components/home/ServiceHighlights';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { FlooringPreviewSection } from '@/components/home/FlooringPreviewSection';
import { InspirationSection } from '@/components/home/InspirationSection';
import { FinishExplorer } from '@/components/home/FinishExplorer';
import { SampleSection } from '@/components/home/SampleSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { LoyaltyProgramSection } from '@/components/home/LoyaltyProgramSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Trust & Service Strip */}
      <ServiceHighlights />

      {/* 3. Explore by Category */}
      <CategoryShowcase />

      {/* 4. Featured Showroom Products */}
      <FeaturedProducts />

      {/* 5. 3D Interactive Flooring Visualizer */}
      <FlooringPreviewSection />

      {/* 6. Immersive Room Inspiration */}
      <InspirationSection />

      {/* 7. Product Discovery by Finish Palette */}
      <FinishExplorer />

      {/* 8. Sample-First Shopping (5 Free Samples) */}
      <SampleSection />

      {/* 9. How It Works (Pick -> Click -> Deliver) */}
      <HowItWorksSection />

      {/* 10. Trade & Loyalty Program */}
      <LoyaltyProgramSection />

      {/* 11. Authentic Brand Story */}
      <BrandStorySection />

      {/* 12. Minimal Newsletter */}
      <NewsletterSection />
    </>
  );
}
