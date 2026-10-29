'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';

export default function AccessoriesPage() {
  const accessories = PRODUCTS.filter((p) => p.category === 'accessories');

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0] min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'Accessories & Setting Materials' }]} className="mb-6" />

        <div className="pb-8 border-b border-[#E3DFD6] max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-1">
            Installation Essentials
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight">
            Flooring Accessories & Schluter Systems
          </h1>
          <p className="text-xs sm:text-sm text-[#77766F] mt-2 leading-relaxed">
            Ensure long-term structural integrity with certified sound-dampening acoustic underlayments, waterproof KERDI membranes, trims, and setting materials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {accessories.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <div className="mt-16 bg-white border border-[#E3DFD6] p-8 text-center max-w-xl mx-auto space-y-3">
          <h3 className="font-serif text-xl text-[#252522]">
            Matching Trims & Moldings
          </h3>
          <p className="text-xs text-[#77766F] leading-relaxed">
            Every LVT and tile collection in our showroom has coordinating reducers, T-moldings, and stair nosings available. Contact us with your square footage for an exact trim schedule.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="text-xs font-semibold uppercase tracking-wider text-[#756B55] hover:text-[#252522] underline underline-offset-4"
            >
              Request Custom Trim Match
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
