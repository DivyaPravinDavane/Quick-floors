'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PackageCheck, Sparkles, Check, ArrowRight, Truck, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export default function SamplesPage() {
  const { sampleBagCount, freeSamplesRemaining, setIsSampleBagOpen } = useStore();

  const sampleEligible = PRODUCTS.filter((p) => p.freeSampleEligible);

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0]">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'Sample Program' }]} className="mb-6" />

        {/* Hero Header */}
        <div className="bg-white border border-[#E3DFD6] p-8 sm:p-12 mb-12 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B28B61]" />
              5 Free Samples per Project
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight">
              Order Free Physical Samples Direct to Your Door
            </h1>
            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              Experience the actual tactile grain, colour richness, and ambient reflectance in your project space. We provide 5 complimentary samples with zero shipping cost in the Greater Toronto Area.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsSampleBagOpen(true)}
                icon={<PackageCheck className="w-4 h-4" />}
              >
                View Your Sample Bag ({sampleBagCount}/5)
              </Button>
              <span className="text-xs text-[#756B55] font-semibold bg-[#F7F5F0] px-3 py-2 border border-[#E3DFD6]">
                {freeSamplesRemaining} free sample{freeSamplesRemaining === 1 ? '' : 's'} remaining
              </span>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white border border-[#E3DFD6] p-6 space-y-2">
            <Clock className="w-5 h-5 text-[#B28B61] mb-1" />
            <h3 className="font-serif text-base font-semibold text-[#252522]">
              2-Business-Day Delivery
            </h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Dispatched swiftly via courier directly to your doorstep in clean, protective packaging.
            </p>
          </div>

          <div className="bg-white border border-[#E3DFD6] p-6 space-y-2">
            <PackageCheck className="w-5 h-5 text-[#B28B61] mb-1" />
            <h3 className="font-serif text-base font-semibold text-[#252522]">
              Full-Size Cuts Included
            </h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              We send full-size planks or representative cut tiles so you can verify bevels, grain, and finish.
            </p>
          </div>

          <div className="bg-white border border-[#E3DFD6] p-6 space-y-2">
            <Truck className="w-5 h-5 text-[#B28B61] mb-1" />
            <h3 className="font-serif text-base font-semibold text-[#252522]">
              100% Shipping Credit
            </h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Any sample costs outside GTA are credited back toward full orders placed within 30 days.
            </p>
          </div>
        </div>

        {/* Eligible Materials Gallery */}
        <div className="pb-6 border-b border-[#E3DFD6] flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#252522]">
              Sample-Eligible Flooring & Tiles
            </h2>
            <p className="text-xs text-[#77766F] mt-1">
              Click &quot;Get Free Sample&quot; to add up to 5 items to your project bag.
            </p>
          </div>

          <span className="text-xs text-[#77766F]">{sampleEligible.length} available materials</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleEligible.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
}
