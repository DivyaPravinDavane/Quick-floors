'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';
import { Reveal } from '@/components/motion/Reveal';

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'all' | 'porcelain' | 'luxury-vinyl' | 'stone'>('all');

  const filtered = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return p.isFeatured;
    if (activeTab === 'porcelain') return p.category === 'porcelain';
    if (activeTab === 'luxury-vinyl') return p.category === 'luxury-vinyl';
    if (activeTab === 'stone') return p.category === 'slate' || p.category === 'marble';
    return true;
  });

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E3DFD6]">
      <Container size="wide">
        <SectionHeading
          eyebrow="Showroom Highlights"
          title="Considered Materials. Beautiful Spaces."
          subtitle="Curated surfaces with verified pricing and sample availability"
          description="Every product is sourced for architectural character, residential warmth, and proven longevity. Browse specifications or request 5 complimentary samples."
          align="split"
          action={
            <div className="flex items-center gap-1.5 p-1 bg-[#F7F5F0] border border-[#E3DFD6]">
              {[
                { id: 'all', label: 'All Featured' },
                { id: 'porcelain', label: 'Porcelain' },
                { id: 'luxury-vinyl', label: 'Luxury Vinyl' },
                { id: 'stone', label: 'Natural Stone' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#252522] text-white shadow-xs'
                      : 'text-[#77766F] hover:text-[#252522]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          }
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {filtered.slice(0, 8).map((product, idx) => (
            <Reveal key={product.id} direction="up" delay={idx * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#252522] text-xs font-semibold uppercase tracking-widest text-[#252522] hover:bg-[#252522] hover:text-white transition-all duration-300"
          >
            <span>View All Showroom Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
