'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';

export default function DiyPage() {
  const diyTools = PRODUCTS.filter((p) => p.category === 'diy-tools');

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0] min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'D.I.Y Tools' }]} className="mb-6" />

        <div className="pb-8 border-b border-[#E3DFD6] max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-1">
            Professional Equipment
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight">
            D.I.Y & Contractor Tile Installation Tools
          </h1>
          <p className="text-xs sm:text-sm text-[#77766F] mt-2 leading-relaxed">
            From precision ball-bearing manual tile cutters to anti-lippage leveling clips and tapping blocks, get the proper tools to achieve flat, lippage-free floors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {diyTools.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <div className="mt-16 p-8 bg-white border border-[#E3DFD6] text-center max-w-xl mx-auto space-y-3">
          <h3 className="font-serif text-xl text-[#252522]">
            Pair with Any Flooring Order
          </h3>
          <p className="text-xs text-[#77766F] leading-relaxed">
            Bundle tools and tile together for single-shipment curbside freight delivery to your residence or job site.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-wider text-[#756B55] hover:text-[#252522] underline underline-offset-4"
            >
              Browse Flooring Materials
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
