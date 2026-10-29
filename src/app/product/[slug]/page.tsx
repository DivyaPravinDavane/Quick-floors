'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  PackageCheck,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AreaCalculator } from '@/components/product/AreaCalculator';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const {
    addToCart,
    addToSampleBag,
    toggleWishlist,
    isInWishlist,
    isInSampleBag,
  } = useStore();

  const [boxQuantity, setBoxQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const isWish = isInWishlist(product.id);
  const isSampled = isInSampleBag(product.id);

  const coveragePerBox = product.coveragePerBox || 20;
  const totalCoverage = boxQuantity * coveragePerBox;
  const totalPrice = product.coveragePerBox && product.unit === 'Sq.ft'
    ? product.price * coveragePerBox * boxQuantity
    : product.price * boxQuantity;

  const handleAddToCart = () => {
    addToCart(product, boxQuantity, totalCoverage);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-10 sm:py-14 bg-[#F7F5F0]">
      <Container size="wide">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.categoryLabel, href: `/shop/${product.category}` },
            { label: product.name },
          ]}
          className="mb-8"
        />

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white border border-[#E3DFD6] p-6 sm:p-10 lg:p-12 shadow-sm">
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.gallery} productName={product.name} />

            {/* 3D Visualizer Trigger Banner */}
            <div className="mt-8 p-5 bg-[#F7F5F0] border border-[#E3DFD6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white border border-[#E3DFD6] text-[#756B55]">
                  <Sparkles className="w-5 h-5 text-[#B28B61]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#252522]">
                    Preview in 3D Architectural Space
                  </h4>
                  <p className="text-xs text-[#77766F] mt-0.5">
                    See representative {product.finish} tones under ambient light.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                href="/#visualizer"
                className="shrink-0 text-xs"
              >
                Launch 3D Room
              </Button>
            </div>
          </div>

          {/* Right: Info, Price & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#756B55] font-semibold mb-2">
                <span className="uppercase tracking-[0.2em]">{product.categoryLabel}</span>
                <span className="text-[#77766F]">SKU: QF-{product.id}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] tracking-tight leading-[1.15]">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-sm text-[#756B55] font-serif italic mt-1">
                  {product.subtitle}
                </p>
              )}

              {/* Price Banner */}
              <div className="mt-5 pb-5 border-b border-[#E3DFD6] flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#252522]">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs text-[#77766F] ml-1.5 font-medium">CAD / {product.unit}</span>
                </div>

                {product.coveragePerBox && (
                  <span className="text-xs text-[#77766F] bg-[#F7F5F0] px-2.5 py-1 border border-[#E3DFD6]">
                    {formatCurrency(product.price * product.coveragePerBox)} / box ({product.coveragePerBox} sq.ft)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#77766F] mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Core Attributes Pill Grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-5 text-xs bg-[#F7F5F0] p-4 border border-[#E3DFD6]">
                <div>
                  <span className="text-[10px] uppercase text-[#77766F] block">Dimensions</span>
                  <span className="font-semibold text-[#252522]">{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#77766F] block">Surface Finish</span>
                  <span className="font-semibold text-[#252522]">{product.finish}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#77766F] block">Thickness</span>
                  <span className="font-semibold text-[#252522]">{product.thickness || '9mm'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#77766F] block">Stock Status</span>
                  <span className="font-semibold text-emerald-800">Verified Available</span>
                </div>
              </div>

              {/* Box Quantity Purchase Selector */}
              <div className="mt-6 pt-6 border-t border-[#E3DFD6] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold uppercase tracking-wider text-[#252522]">
                    Order Quantity (Boxes)
                  </label>
                  <span className="text-[#77766F]">
                    Covers {totalCoverage.toFixed(1)} sq.ft total
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center border border-[#E3DFD6] bg-[#F7F5F0] w-36">
                    <button
                      type="button"
                      onClick={() => setBoxQuantity(Math.max(1, boxQuantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg hover:bg-white transition-colors"
                      aria-label="Decrease box quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={boxQuantity}
                      onChange={(e) => setBoxQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center bg-transparent text-sm font-semibold outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setBoxQuantity(boxQuantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg hover:bg-white transition-colors"
                      aria-label="Increase box quantity"
                    >
                      +
                    </button>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    icon={addedNotice ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  >
                    {addedNotice ? 'Added to Cart!' : `Add ${boxQuantity} Box${boxQuantity > 1 ? 'es' : ''} (${formatCurrency(totalPrice)})`}
                  </Button>
                </div>
              </div>

              {/* Sample & Wishlist Actions */}
              <div className="flex gap-2.5 mt-3">
                {product.freeSampleEligible && (
                  <Button
                    variant={isSampled ? 'secondary' : 'accent'}
                    size="md"
                    className="flex-1"
                    onClick={() => addToSampleBag(product)}
                    icon={isSampled ? <Check className="w-4 h-4" /> : <PackageCheck className="w-4 h-4" />}
                  >
                    {isSampled ? 'Sample in Bag' : 'Order Free Sample'}
                  </Button>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 border transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
                    isWish
                      ? 'bg-[#756B55] text-white border-[#756B55]'
                      : 'bg-white text-[#252522] border-[#E3DFD6] hover:bg-[#F7F5F0]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{isWish ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Logistics Trust Strip */}
              <div className="mt-6 pt-5 border-t border-[#E3DFD6] space-y-2 text-xs text-[#77766F]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#756B55] shrink-0" />
                  <span>Free curbside liftgate delivery across the Greater Toronto Area.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#756B55] shrink-0" />
                  <span>Backed by manufacturer commercial warranty & certified low emissions.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Square-Foot Calculator Section */}
        <div className="mt-14">
          <div className="max-w-3xl mx-auto">
            <AreaCalculator product={product} />
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-14 bg-white border border-[#E3DFD6] p-6 sm:p-10 shadow-sm">
          <h3 className="font-serif text-2xl text-[#252522] pb-4 border-b border-[#E3DFD6]">
            Technical Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 divide-y sm:divide-y-0 text-xs">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="py-3 flex justify-between border-b border-[#E3DFD6]/60">
                <span className="text-[#77766F] font-medium">{key}</span>
                <span className="font-semibold text-[#252522] text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DFD6] mb-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#252522]">
                Related Materials in Collection
              </h3>
              <Link
                href={`/shop/${product.category}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#756B55] hover:text-[#252522] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
