'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart, ShoppingBag, PackageCheck, Check, Sparkles } from 'lucide-react';
import { Product } from '@/types/flooring';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/formatCurrency';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const {
    addToCart,
    addToSampleBag,
    toggleWishlist,
    isInWishlist,
    isInSampleBag,
    setQuickViewProduct,
  } = useStore();

  const isWish = isInWishlist(product.id);
  const isSampled = isInSampleBag(product.id);

  return (
    <div
      className={`group relative bg-white border border-[#E3DFD6] hover:border-[#756B55]/50 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#EEEAE2] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isFeatured && <Badge variant="stone">Featured</Badge>}
          {product.freeSampleEligible && (
            <Badge variant="success">Free Sample</Badge>
          )}
        </div>

        {/* Top Right Wishlist button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 z-10 p-2 border transition-all ${
            isWish
              ? 'bg-[#756B55] text-white border-[#756B55]'
              : 'bg-white/90 text-[#252522] border-[#E3DFD6] hover:bg-white hover:text-[#756B55]'
          }`}
          aria-label={isWish ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View overlay button */}
        <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-1.5">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-[#252522] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm border border-[#E3DFD6] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#756B55]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#756B55] font-semibold mb-1">
            <span>{product.categoryLabel}</span>
            <span>{product.dimensions}</span>
          </div>

          <h3 className="font-serif text-base sm:text-lg text-[#252522] group-hover:text-[#756B55] transition-colors font-medium leading-snug">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-[#77766F] mt-1 line-clamp-1">
            {product.finish} • {product.material}
          </p>

          <div className="mt-3 pt-3 border-t border-[#E3DFD6]/60 flex items-baseline justify-between">
            <div>
              <span className="font-serif text-lg font-semibold text-[#252522]">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-[#77766F] ml-1">/ {product.unit}</span>
            </div>

            {product.coveragePerBox && (
              <span className="text-[11px] text-[#77766F]">
                {product.coveragePerBox} sq.ft/box
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 mt-2 space-y-1.5 border-t border-[#E3DFD6]/50">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="py-2 px-2.5 bg-[#252522] hover:bg-[#35372F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Box</span>
            </button>

            {product.freeSampleEligible ? (
              <button
                onClick={() => addToSampleBag(product)}
                className={`py-2 px-2 text-xs font-semibold flex items-center justify-center gap-1 border transition-colors cursor-pointer ${
                  isSampled
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-[#F7F5F0] hover:bg-[#EEEAE2] text-[#756B55] border-[#E3DFD6]'
                }`}
              >
                {isSampled ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>In Bag</span>
                  </>
                ) : (
                  <>
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Free Sample</span>
                  </>
                )}
              </button>
            ) : (
              <Link
                href={`/product/${product.slug}`}
                className="py-2 px-2 text-xs font-semibold flex items-center justify-center border border-[#E3DFD6] hover:bg-[#F7F5F0] text-[#252522]"
              >
                Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
