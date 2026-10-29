'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { useStore } from '@/context/StoreContext';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0] min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} className="mb-6" />

        <div className="pb-6 border-b border-[#E3DFD6] flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#252522]">
              Saved Project Shortlist
            </h1>
            <p className="text-xs text-[#77766F] mt-1">
              {wishlist.length} material{wishlist.length === 1 ? '' : 's'} saved for comparison and sampling.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-[#756B55] hover:text-[#252522] flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-24 text-center bg-white border border-[#E3DFD6] p-8 space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto bg-[#F7F5F0] border border-[#E3DFD6] flex items-center justify-center text-[#77766F]">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#252522]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#77766F] mt-1 leading-relaxed">
                Click the heart icon on any tile or vinyl plank while exploring our showroom to save it here.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" href="/shop" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Showroom Materials
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
