'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlooringPreview } from '@/components/three/FlooringPreview';

export function FlooringPreviewSection() {
  return (
    <section id="visualizer" className="py-20 lg:py-28 bg-[#F7F5F0] border-b border-[#E3DFD6] scroll-mt-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="Interactive 3D Visualizer"
          title="See Materials in Architectural Light"
          subtitle="Rotate perspectives, switch finishes, and test light interaction in real time"
          description="We created our lightweight 3D material viewer to help you visualize how wire-brushed natural oak, polished Calacatta marble, and cleft slate ground a contemporary room."
          align="center"
        />

        <div className="mt-10">
          <React.Suspense fallback={<div className="min-h-[500px] bg-[#EEEAE2] border border-[#E3DFD6] flex items-center justify-center text-xs text-[#77766F]">Loading 3D Studio...</div>}>
            <FlooringPreview />
          </React.Suspense>
        </div>
      </Container>
    </section>
  );
}
