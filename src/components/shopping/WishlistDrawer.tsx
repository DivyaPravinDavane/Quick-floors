'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/formatCurrency';

export function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    addToSampleBag,
  } = useStore();

  const footerContent = wishlist.length > 0 ? (
    <Button
      variant="secondary"
      size="md"
      className="w-full text-xs"
      href="/wishlist"
      onClick={() => setIsWishlistOpen(false)}
      icon={<ArrowRight className="w-4 h-4" />}
    >
      View Dedicated Wishlist Page
    </Button>
  ) : null;

  return (
    <Drawer
      isOpen={isWishlistOpen}
      onClose={() => setIsWishlistOpen(false)}
      title="Saved Materials"
      subtitle={`${wishlist.length} item${wishlist.length === 1 ? '' : 's'} on your project shortlist`}
      footer={footerContent}
    >
      {wishlist.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#F7F5F0] border border-[#E3DFD6] flex items-center justify-center text-[#77766F]">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#252522]">Your Wishlist is Empty</h4>
            <p className="text-xs text-[#77766F] mt-1 max-w-xs mx-auto">
              Save materials while browsing to compare textures, prices, and dimensions side-by-side.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            href="/shop"
            onClick={() => setIsWishlistOpen(false)}
          >
            Explore Catalogue
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-[#E3DFD6]">
          {wishlist.map((product) => (
            <div key={product.id} className="py-4 flex gap-3.5 group">
              <Link
                href={`/product/${product.slug}`}
                onClick={() => setIsWishlistOpen(false)}
                className="w-20 h-20 bg-[#EEEAE2] relative shrink-0 border border-[#E3DFD6] overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="80px"
                />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="text-xs font-semibold text-[#252522] hover:text-[#756B55] truncate"
                    >
                      {product.name}
                    </Link>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-[#77766F] hover:text-red-600 p-1"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#77766F] mt-0.5">
                    {product.dimensions} • {formatCurrency(product.price, { showUnit: product.unit })}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      setIsWishlistOpen(false);
                    }}
                    className="flex-1 py-1.5 px-2 bg-[#252522] hover:bg-[#35372F] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>

                  {product.freeSampleEligible && (
                    <button
                      onClick={() => {
                        addToSampleBag(product);
                        setIsWishlistOpen(false);
                      }}
                      className="py-1.5 px-2 border border-[#E3DFD6] hover:bg-[#F7F5F0] text-[#756B55] text-[11px] font-semibold transition-colors"
                    >
                      Sample
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}
