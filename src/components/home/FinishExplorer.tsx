'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';
import { FLOORING_MATERIALS } from '@/data/flooringMaterials';

export function FinishExplorer() {
  const [selectedFinish, setSelectedFinish] = useState<string>('natural-oak');

  const activeMaterial = FLOORING_MATERIALS.find((m) => m.id === selectedFinish) || FLOORING_MATERIALS[0];

  const matchingProducts = PRODUCTS.filter((p) => p.finishGroup === selectedFinish);

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5F0] border-b border-[#E3DFD6]">
      <Container size="wide">
        <SectionHeading
          eyebrow="Finish Discovery"
          title="Curated by Tone and Texture"
          subtitle="Explore matching materials designed to coordinate across rooms"
          description="Whether you are looking for wire-brushed natural oak warmth, honed limestone tranquillity, or grand polished marble light reflection, browse by finish archetype."
          align="split"
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#252522] hover:text-[#756B55]"
            >
              <span>View All Finishes in Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        {/* Finish Swatch Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
          {FLOORING_MATERIALS.map((mat) => {
            const isSelected = mat.id === selectedFinish;

            return (
              <button
                key={mat.id}
                onClick={() => setSelectedFinish(mat.id)}
                className={`p-3.5 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#252522] shadow-sm ring-1 ring-[#252522]'
                    : 'bg-[#EEEAE2]/60 border-[#E3DFD6] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-none border border-[#252522]/20 shadow-xs"
                    style={{ backgroundColor: mat.thumbnailColor }}
                  />
                  {isSelected && <Check className="w-4 h-4 text-[#756B55]" />}
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#252522]">{mat.name}</p>
                  <p className="text-[10px] text-[#77766F] uppercase mt-0.5">{mat.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Finish Details Banner */}
        <div className="mt-8 p-5 bg-white border border-[#E3DFD6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#756B55]">
              Active Finish Palette
            </span>
            <h4 className="font-serif text-lg text-[#252522] mt-0.5">
              {activeMaterial.name} ({matchingProducts.length} Products Available)
            </h4>
            <p className="text-xs text-[#77766F] mt-1 max-w-xl">
              {activeMaterial.description}
            </p>
          </div>

          <Link
            href="/#visualizer"
            className="px-4 py-2 border border-[#756B55] text-xs font-semibold uppercase tracking-wider text-[#756B55] hover:bg-[#756B55] hover:text-white transition-colors shrink-0"
          >
            Preview in 3D Studio
          </Link>
        </div>

        {/* Matching Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {matchingProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </section>
  );
}
