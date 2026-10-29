'use client';

import React from 'react';
import { Product } from '@/types/flooring';
import { ProductCard } from './ProductCard';
import { Reveal } from '@/components/motion/Reveal';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = 'No products match the selected criteria.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center bg-white border border-[#E3DFD6] p-8 space-y-3">
        <h4 className="font-serif text-xl text-[#252522]">No Materials Found</h4>
        <p className="text-xs text-[#77766F] max-w-sm mx-auto leading-relaxed">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, idx) => (
        <Reveal key={product.id} direction="up" delay={Math.min(idx * 0.05, 0.4)}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
