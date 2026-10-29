'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CATEGORIES_DATA } from '@/data/products';
import { Reveal } from '@/components/motion/Reveal';

export function CategoryShowcase() {
  const featuredCats = [
    {
      ...CATEGORIES_DATA[0], // Luxury Vinyl Tile
      aspect: 'aspect-[16/10]',
      gridSpan: 'lg:col-span-8',
      tag: '100% Waterproof SPC',
    },
    {
      ...CATEGORIES_DATA[1], // Porcelain Tile
      aspect: 'aspect-square',
      gridSpan: 'lg:col-span-4',
      tag: 'Grand Format',
    },
    {
      ...CATEGORIES_DATA[2], // Backsplash & Wall Tile
      aspect: 'aspect-square',
      gridSpan: 'lg:col-span-4',
      tag: 'Arabesque & Stacked Stone',
    },
    {
      ...CATEGORIES_DATA[3], // Slate Flooring
      aspect: 'aspect-square',
      gridSpan: 'lg:col-span-4',
      tag: 'Natural Split Surface',
    },
    {
      ...CATEGORIES_DATA[4], // Marble Tile
      aspect: 'aspect-square',
      gridSpan: 'lg:col-span-4',
      tag: 'Crystalline Veining',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5F0]">
      <Container size="wide">
        <SectionHeading
          eyebrow="Flooring Collections"
          title="Considered Materials by Category"
          subtitle="Engineered for everyday endurance and architectural elegance"
          description="Explore our primary collections from waterproof rigid core vinyl to grand format Italian porcelain and hand-cleaved natural slate."
          align="split"
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#252522] hover:text-[#756B55] group"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-10">
          {featuredCats.map((cat, idx) => (
            <Reveal
              key={cat.id}
              direction="up"
              delay={idx * 0.08}
              className={`${cat.gridSpan} group`}
            >
              <Link
                href={`/shop/${cat.id}`}
                className={`relative block ${cat.aspect} bg-[#EEEAE2] border border-[#E3DFD6] overflow-hidden group shadow-xs hover:shadow-md transition-all duration-500`}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#EEEAE2] mb-1">
                    {cat.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-[#F7F5F0] transition-colors font-medium">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#E3DFD6] mt-2 line-clamp-2 max-w-md font-light leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
