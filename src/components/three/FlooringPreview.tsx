'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Sparkles, ArrowRight, Rotate3d, CheckCircle2, PackageCheck } from 'lucide-react';
import { FLOORING_MATERIALS, FlooringMaterial } from '@/data/flooringMaterials';
import { MaterialSelector } from './MaterialSelector';
import { PreviewFallback } from './PreviewFallback';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';

// Dynamically import Three.js scene to keep initial critical render path light
const DynamicFlooringScene = dynamic(
  () => import('./FlooringScene').then((mod) => mod.FlooringScene),
  {
    ssr: false,
    loading: () => <PreviewFallback materialName="Natural White Oak" isLoading={true} />,
  }
);

interface FlooringPreviewProps {
  initialMaterialId?: string;
  className?: string;
}

export function FlooringPreview({
  initialMaterialId = 'natural-oak',
  className = '',
}: FlooringPreviewProps) {
  const { addToSampleBag } = useStore();
  const [selectedMaterial, setSelectedMaterial] = useState<FlooringMaterial>(
    FLOORING_MATERIALS.find((m) => m.id === initialMaterialId) || FLOORING_MATERIALS[0]
  );

  // Find linked product in catalogue if exists
  const matchedProduct = PRODUCTS.find((p) => p.slug === selectedMaterial.productMatchSlug);

  return (
    <div className={`bg-white border border-[#E3DFD6] shadow-sm overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: 3D Architectural Scene */}
        <div className="lg:col-span-7 relative bg-[#F7F5F0] border-b lg:border-b-0 lg:border-r border-[#E3DFD6] min-h-[420px] sm:min-h-[500px] flex items-center justify-center">
          <React.Suspense fallback={<PreviewFallback materialName={selectedMaterial.name} isLoading={true} />}>
            <DynamicFlooringScene material={selectedMaterial} />
          </React.Suspense>

          {/* Interaction Hint Overlay */}
          <div className="absolute bottom-3 left-3 bg-[#252522]/80 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 flex items-center gap-2 pointer-events-none border border-white/10">
            <Rotate3d className="w-3.5 h-3.5 text-[#B28B61]" />
            <span>Drag to rotate ambient room perspective</span>
          </div>

          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#252522] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border border-[#E3DFD6]">
            3D Studio Mode
          </div>
        </div>

        {/* Right: Controls & Storytelling */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B28B61]" />
              <span>Materiality & Light Visualizer</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#252522] tracking-tight leading-snug">
              Imagine Your Space
            </h3>

            <p className="text-xs sm:text-sm text-[#77766F] mt-2 leading-relaxed">
              Explore how distinct materials alter room atmosphere. Switch between light Scandinavian oak, grand Italian marble, and architectural cleft slate.
            </p>

            {/* Material Selector Component */}
            <div className="mt-6 pt-6 border-t border-[#E3DFD6]">
              <MaterialSelector
                materials={FLOORING_MATERIALS}
                selectedId={selectedMaterial.id}
                onSelect={(mat) => setSelectedMaterial(mat)}
              />
            </div>

            {/* Active Material Description Card */}
            <div className="mt-5 p-4 bg-[#F7F5F0] border border-[#E3DFD6] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#252522]">
                  {selectedMaterial.name}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#756B55] bg-white px-2 py-0.5 border border-[#E3DFD6]">
                  {selectedMaterial.category}
                </span>
              </div>
              <p className="text-[#77766F] text-[11px] leading-relaxed">
                {selectedMaterial.description}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#E3DFD6] space-y-3">
            {matchedProduct ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#77766F]">Matching Showroom Tile:</span>
                  <Link
                    href={`/product/${matchedProduct.slug}`}
                    className="font-semibold text-[#252522] hover:text-[#756B55] flex items-center gap-1 group"
                  >
                    <span>{matchedProduct.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    href={`/product/${matchedProduct.slug}`}
                  >
                    View Product Specs
                  </Button>

                  <Button
                    variant="accent"
                    size="md"
                    onClick={() => addToSampleBag(matchedProduct)}
                    icon={<PackageCheck className="w-4 h-4" />}
                  >
                    Get Free Sample
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                href="/shop"
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Browse Matching Collections
              </Button>
            )}

            <p className="text-[10px] text-center text-[#77766F]">
              Representative visualization. Order physical samples for precise dye-lot and texture verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
