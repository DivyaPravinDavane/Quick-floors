'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, PackageCheck, Heart, Sparkles, Check } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/formatCurrency';

export function ProductQuickView() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    addToSampleBag,
    toggleWishlist,
    isInWishlist,
    isInSampleBag,
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);
  const isSampled = isInSampleBag(product.id);

  return (
    <Modal
      isOpen={!!quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Product Image */}
        <div className="relative aspect-square bg-[#EEEAE2] border border-[#E3DFD6] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          {product.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge variant="stone">Showroom Feature</Badge>
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55]">
                {product.categoryLabel}
              </span>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-1.5 rounded-none border transition-colors ${
                  isWish
                    ? 'bg-[#756B55] text-white border-[#756B55]'
                    : 'bg-white text-[#77766F] border-[#E3DFD6] hover:text-[#252522]'
                }`}
                aria-label={isWish ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>

            <h3 className="font-serif text-2xl text-[#252522] tracking-tight">
              {product.name}
            </h3>

            {product.subtitle && (
              <p className="text-xs text-[#77766F] mt-0.5">{product.subtitle}</p>
            )}

            <div className="mt-4 pb-4 border-b border-[#E3DFD6] flex items-baseline gap-2">
              <span className="font-serif text-2xl font-semibold text-[#252522]">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-[#77766F]">CAD / {product.unit}</span>
            </div>

            <p className="text-xs text-[#77766F] mt-3 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-[#F7F5F0] p-3 border border-[#E3DFD6]">
              <div>
                <span className="text-[#77766F] text-[10px] uppercase block">Dimensions</span>
                <span className="font-medium text-[#252522]">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-[#77766F] text-[10px] uppercase block">Finish</span>
                <span className="font-medium text-[#252522]">{product.finish}</span>
              </div>
              <div>
                <span className="text-[#77766F] text-[10px] uppercase block">Thickness</span>
                <span className="font-medium text-[#252522]">{product.thickness || '9mm'}</span>
              </div>
              <div>
                <span className="text-[#77766F] text-[10px] uppercase block">Lead Time</span>
                <span className="font-medium text-[#252522]">{product.leadTime}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2.5">
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => {
                  addToCart(product, 1);
                  setQuickViewProduct(null);
                }}
                icon={<ShoppingBag className="w-4 h-4" />}
              >
                Add 1 Box to Cart
              </Button>

              {product.freeSampleEligible && (
                <Button
                  variant={isSampled ? 'secondary' : 'accent'}
                  size="md"
                  onClick={() => addToSampleBag(product)}
                  icon={isSampled ? <Check className="w-4 h-4" /> : <PackageCheck className="w-4 h-4" />}
                >
                  {isSampled ? 'Sample Added' : 'Get Free Sample'}
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              href={`/product/${product.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="w-full text-xs"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Complete Specifications & Calculator
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
