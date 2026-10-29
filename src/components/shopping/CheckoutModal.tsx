'use client';

import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Truck, Lock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/formatCurrency';

export function CheckoutModal() {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    clearCart,
  } = useStore();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Toronto',
    province: 'Ontario',
    postalCode: 'M5V 2T6',
    deliveryInstructions: 'Curbside drop at driveway or front loading entrance.',
  });
  const [orderNumber, setOrderNumber] = useState('');

  const tax = cartSubtotal * 0.13; // Ontario HST 13%
  const shipping = cartSubtotal > 300 ? 0 : 49.0;
  const grandTotal = cartSubtotal + tax + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNumber = `QF-ON-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNumber);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#756B55', '#B28B61', '#35372F', '#252522'],
    });
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setTimeout(() => setStep('form'), 300);
  };

  return (
    <Modal
      isOpen={isCheckoutModalOpen}
      onClose={handleClose}
      title={step === 'form' ? 'Simulated Order Checkout' : 'Order Placed Successfully'}
      size="lg"
    >
      {step === 'form' ? (
        <div>
          {/* Frontend Demo Notice */}
          <div className="bg-[#EEEAE2] p-3.5 border border-[#E3DFD6] flex items-start gap-2.5 mb-6 text-xs text-[#252522]">
            <ShieldAlert className="w-4 h-4 text-[#756B55] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-semibold block">Frontend Demonstration Order</strong>
              This is a demonstration interface representing the Quick Floors shopping workflow. No actual financial transaction will be charged or live order placed.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#756B55] mb-3">
                1. Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#77766F] mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jane"
                    className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#77766F] mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#77766F] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane.doe@example.com"
                    className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#77766F] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(416) 555-0199"
                    className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                  />
                </div>
              </div>
            </div>

            {/* Canadian Delivery Address */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#756B55] mb-3">
                2. Canadian Curbside Delivery Address
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#77766F] mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="120 Bay Street, Suite 400"
                    className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#77766F] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#77766F] mb-1">Province *</label>
                    <input
                      type="text"
                      required
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#77766F] mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#77766F] mb-1">Freight Drop Notes</label>
                  <input
                    type="text"
                    value={formData.deliveryInstructions}
                    onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                    className="w-full border border-[#E3DFD6] bg-[#F7F5F0]/60 p-2 text-xs outline-none focus:border-[#756B55]"
                  />
                </div>
              </div>
            </div>

            {/* Order Financial Summary */}
            <div className="p-4 bg-[#F7F5F0] border border-[#E3DFD6] space-y-2 text-xs">
              <div className="flex justify-between text-[#77766F]">
                <span>Material Subtotal:</span>
                <span className="font-medium text-[#252522]">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#77766F]">
                <span>Curbside Freight Delivery:</span>
                <span className="font-medium text-[#252522]">
                  {shipping === 0 ? 'FREE (GTA Promo)' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-[#77766F]">
                <span>Ontario HST (13%):</span>
                <span className="font-medium text-[#252522]">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#252522] pt-2 border-t border-[#E3DFD6]">
                <span>Total Estimated (CAD):</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-[11px] text-[#77766F]">
                <Lock className="w-3.5 h-3.5 text-[#756B55]" />
                <span>Simulated 256-bit SSL encryption</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Place Simulated Order
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="py-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#756B55] block mb-1">
              Order Confirmation
            </span>
            <h4 className="font-serif text-2xl text-[#252522]">
              Thank You, {formData.firstName || 'Customer'}!
            </h4>
            <p className="text-sm font-mono font-bold text-[#252522] mt-2">
              Order Reference: {orderNumber}
            </p>
            <p className="text-xs text-[#77766F] mt-2 max-w-md mx-auto leading-relaxed">
              A simulated order confirmation has been prepared. In production, our Georgetown fulfillment hub coordinates curbside liftgate dispatch within 2-3 business days.
            </p>
          </div>

          <div className="bg-[#F7F5F0] p-4 border border-[#E3DFD6] max-w-sm mx-auto text-left text-xs space-y-1">
            <p className="font-semibold text-[#252522] flex items-center gap-1.5 mb-2">
              <Truck className="w-4 h-4 text-[#756B55]" />
              <span>Delivery Destination:</span>
            </p>
            <p className="text-[#77766F]">{formData.address || '120 Bay Street'}</p>
            <p className="text-[#77766F]">{formData.city}, {formData.province} {formData.postalCode}</p>
            <p className="text-[#252522] font-medium pt-1">Total: {formatCurrency(grandTotal)}</p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleClose}
          >
            Return to Showroom
          </Button>
        </div>
      )}
    </Modal>
  );
}
