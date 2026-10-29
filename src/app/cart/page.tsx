'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Lock, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/formatCurrency';

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    setIsCheckoutModalOpen,
  } = useStore();

  const tax = cartSubtotal * 0.13;
  const shipping = cartSubtotal > 300 ? 0 : 49.0;
  const grandTotal = cartSubtotal + tax + shipping;

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0] min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} className="mb-6" />

        <div className="pb-6 border-b border-[#E3DFD6] flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#252522]">
              Shopping Cart & Order Estimate
            </h1>
            <p className="text-xs text-[#77766F] mt-1">
              Review selected materials, box quantities, and curbside freight delivery options.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#77766F] hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center bg-white border border-[#E3DFD6] p-8 space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto bg-[#F7F5F0] border border-[#E3DFD6] flex items-center justify-center text-[#77766F]">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#252522]">Your Cart is Currently Empty</h3>
              <p className="text-xs text-[#77766F] mt-1 leading-relaxed">
                Add box quantities directly from any product page or request up to 5 complimentary samples.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="primary" size="md" href="/shop" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Flooring
              </Button>
              <Button variant="secondary" size="md" href="/samples">
                Order 5 Free Samples
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Items Table */}
            <div className="lg:col-span-8 bg-white border border-[#E3DFD6] shadow-sm divide-y divide-[#E3DFD6]">
              {cart.map((item) => {
                const { product, quantity, sqftCalculated } = item;
                const itemPrice = product.coveragePerBox && product.unit === 'Sq.ft'
                  ? product.price * product.coveragePerBox
                  : product.price;
                const lineTotal = itemPrice * quantity;

                return (
                  <div key={product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Link
                        href={`/product/${product.slug}`}
                        className="w-20 h-20 bg-[#EEEAE2] relative shrink-0 border border-[#E3DFD6] overflow-hidden"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      <div>
                        <span className="text-[10px] uppercase font-semibold text-[#756B55]">
                          {product.categoryLabel}
                        </span>
                        <h3 className="font-serif text-base font-semibold text-[#252522]">
                          <Link href={`/product/${product.slug}`} className="hover:text-[#756B55]">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-[#77766F] mt-0.5">
                          {product.dimensions} • {formatCurrency(product.price, { showUnit: product.unit })}
                        </p>
                        {product.coveragePerBox && (
                          <p className="text-[11px] text-[#756B55] mt-0.5">
                            {product.coveragePerBox} sq.ft / box
                            {sqftCalculated ? ` (${sqftCalculated} sq.ft needed)` : ''}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E3DFD6]/60">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E3DFD6] bg-[#F7F5F0]">
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-[#252522] hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#252522]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          className="p-1.5 text-[#252522] hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#252522]">
                          {formatCurrency(lineTotal)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#77766F] hover:text-red-600 p-1.5 ml-2"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#E3DFD6] p-6 sm:p-8 space-y-5 shadow-sm sticky top-28">
                <h3 className="font-serif text-xl text-[#252522] pb-3 border-b border-[#E3DFD6]">
                  Order Financial Estimate
                </h3>

                <div className="space-y-2.5 text-xs text-[#77766F]">
                  <div className="flex justify-between">
                    <span>Material Subtotal</span>
                    <span className="font-semibold text-[#252522]">{formatCurrency(cartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Curbside Freight (GTA)</span>
                    <span className="font-semibold text-[#252522]">
                      {shipping === 0 ? 'FREE (GTA Promo)' : formatCurrency(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Ontario HST (13%)</span>
                    <span className="font-semibold text-[#252522]">{formatCurrency(tax)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#252522] pt-3 border-t border-[#E3DFD6]">
                    <span>Estimated Total (CAD)</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsCheckoutModalOpen(true)}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Simulated Checkout
                  </Button>
                </div>

                <div className="space-y-2 pt-2 text-[11px] text-[#77766F]">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#756B55] shrink-0" />
                    <span>Curbside liftgate delivery scheduled within 2-3 business days.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#756B55] shrink-0" />
                    <span>Frontend demo mode — no real charges incurred.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
