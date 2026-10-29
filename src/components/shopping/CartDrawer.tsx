'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/formatCurrency';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    setIsCheckoutModalOpen,
  } = useStore();

  const footerContent = cart.length > 0 ? (
    <div className="space-y-4">
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-[#77766F]">
          <span>Estimated Subtotal (CAD)</span>
          <span className="font-semibold text-[#252522]">{formatCurrency(cartSubtotal)}</span>
        </div>
        <div className="flex justify-between text-[#77766F]">
          <span>Curbside Freight (GTA)</span>
          <span className="text-[#35372F] font-medium">Free for standard orders</span>
        </div>
        <div className="flex justify-between text-[11px] text-[#77766F] pt-2 border-t border-[#E3DFD6]">
          <span>Taxes (HST/GST)</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => {
            setIsCartOpen(false);
            setIsCheckoutModalOpen(true);
          }}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Proceed to Order Summary
        </Button>

        <Button
          variant="secondary"
          size="md"
          className="w-full text-xs"
          href="/cart"
          onClick={() => setIsCartOpen(false)}
        >
          View Full Cart Page
        </Button>
      </div>

      <p className="text-[10px] text-center text-[#77766F] flex items-center justify-center gap-1.5">
        <Truck className="w-3.5 h-3.5 text-[#756B55]" />
        <span>Curbside delivery drops directly at your driveway or loading bay</span>
      </p>
    </div>
  ) : null;

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      title="Shopping Cart"
      subtitle={`${cart.length} unique material${cart.length === 1 ? '' : 's'} selected`}
      footer={footerContent}
    >
      {cart.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#F7F5F0] border border-[#E3DFD6] flex items-center justify-center text-[#77766F]">
            <ShoppingBag className="w-8 h-8 stroke-1" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#252522]">Your Cart is Empty</h4>
            <p className="text-xs text-[#77766F] mt-1 max-w-xs mx-auto">
              Explore our curated flooring catalogue and sample program to begin your project.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            href="/shop"
            onClick={() => setIsCartOpen(false)}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Explore Flooring
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-[#E3DFD6]">
          {cart.map((item) => {
            const { product, quantity, sqftCalculated } = item;
            const itemPrice = product.coveragePerBox && product.unit === 'Sq.ft'
              ? product.price * product.coveragePerBox
              : product.price;
            const lineTotal = itemPrice * quantity;

            return (
              <div key={product.id} className="py-4 flex gap-3.5 group">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => setIsCartOpen(false)}
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
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-semibold text-[#252522] hover:text-[#756B55] truncate"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#77766F] hover:text-red-600 p-1 transition-colors"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#77766F] mt-0.5">
                      {product.dimensions} • {formatCurrency(product.price, { showUnit: product.unit })}
                    </p>
                    {product.coveragePerBox && (
                      <p className="text-[10px] text-[#756B55]">
                        {product.coveragePerBox} sq.ft / box
                        {sqftCalculated ? ` (${sqftCalculated} sq.ft requested)` : ''}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#E3DFD6] bg-[#F7F5F0]">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-1 text-[#252522] hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-medium text-[#252522]">
                        {quantity} {product.unit === 'Sq.ft' ? 'box' : 'item'}{quantity > 1 ? 'es' : ''}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="p-1 text-[#252522] hover:bg-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#252522]">
                      {formatCurrency(lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Drawer>
  );
}
