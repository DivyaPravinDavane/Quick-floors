'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { INSPIRATION_ROOMS } from '@/data/inspiration';
import { Reveal } from '@/components/motion/Reveal';

export default function InspirationPage() {
  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0]">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'Room Inspiration' }]} className="mb-6" />

        <div className="max-w-3xl mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-2">
            Architectural Lookbook
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight">
            Curated Spaces & Finished Interiors
          </h1>
          <p className="text-sm sm:text-base text-[#77766F] mt-3 leading-relaxed">
            See how considered flooring choices ground living rooms, kitchen islands, spa ensuite bathrooms, and creative studio spaces.
          </p>
        </div>

        <div className="space-y-16">
          {INSPIRATION_ROOMS.map((room, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <Reveal key={room.id} direction="up" delay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-[#E3DFD6] p-6 sm:p-10 shadow-sm items-center">
                  <div
                    className={`lg:col-span-7 relative aspect-[16/10] bg-[#EEEAE2] border border-[#E3DFD6] overflow-hidden group ${
                      isReversed ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] uppercase font-semibold text-[#756B55] tracking-wider">
                      {room.category}
                    </div>
                  </div>

                  <div className={`lg:col-span-5 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#756B55]">
                        Space Study 0{idx + 1}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-[#252522] mt-1">
                        {room.title}
                      </h2>
                      <p className="text-xs text-[#756B55] font-serif italic mt-0.5">
                        {room.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                      {room.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-[#E3DFD6]">
                      <span className="text-[11px] uppercase font-semibold text-[#252522] block">
                        Signature Materials:
                      </span>
                      <p className="text-xs font-medium text-[#252522]">
                        {room.flooringUsed}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        href={`/product/${room.productSlug}`}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        View Material Details
                      </Button>
                      <Button
                        variant="outline"
                        size="md"
                        href="/#visualizer"
                      >
                        3D Studio
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
