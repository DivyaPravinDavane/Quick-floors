'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { INSPIRATION_ROOMS } from '@/data/inspiration';
import { Reveal } from '@/components/motion/Reveal';

export function InspirationSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentRoom = INSPIRATION_ROOMS[activeIdx];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E3DFD6]">
      <Container size="wide">
        <SectionHeading
          eyebrow="Editorial Showroom"
          title="Find Your Floor. Imagine Your Space."
          subtitle="Explore curated interior environments designed around our finishes"
          description="Click across interior archetypes to see how different textures, plank scales, and tones define living rooms, bespoke kitchens, master sanctuaries, and creative commercial studios."
          align="split"
          action={
            <Link
              href="/inspiration"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#252522] hover:text-[#756B55] group"
            >
              <span>View All 5 Editorial Spaces</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* Room Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mt-8 text-xs font-semibold uppercase tracking-wider">
          {INSPIRATION_ROOMS.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 border whitespace-nowrap transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-[#252522] text-white border-[#252522] shadow-xs'
                  : 'bg-[#F7F5F0] text-[#77766F] border-[#E3DFD6] hover:bg-[#EEEAE2] hover:text-[#252522]'
              }`}
            >
              {room.title.split(' ')[0]} {room.category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Featured Big Split Space Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6 items-center">
          {/* Left: Large Editorial Room Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-[#EEEAE2] border border-[#E3DFD6] overflow-hidden group">
            <Image
              src={currentRoom.image}
              alt={currentRoom.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#756B55] border border-[#E3DFD6]">
              {currentRoom.category} Design Study
            </div>
          </div>

          {/* Right: Architectural Details */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-1">
                Material Focus
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#252522] tracking-tight leading-snug">
                {currentRoom.title}
              </h3>
              <p className="text-xs text-[#756B55] font-serif italic mt-1">
                {currentRoom.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              {currentRoom.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#E3DFD6]">
              <span className="text-[11px] uppercase font-semibold text-[#252522] block">
                Design Features:
              </span>
              <ul className="space-y-1.5 text-xs text-[#77766F]">
                {currentRoom.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B28B61]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#F7F5F0] border border-[#E3DFD6] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#77766F]">Flooring Featured:</span>
                <span className="font-semibold text-[#252522]">{currentRoom.flooringUsed}</span>
              </div>
              <Link
                href={`/product/${currentRoom.productSlug}`}
                className="w-full py-2.5 bg-[#252522] hover:bg-[#35372F] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Featured Tile Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
