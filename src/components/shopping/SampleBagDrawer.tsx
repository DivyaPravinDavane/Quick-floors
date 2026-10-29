'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ArrowRight, PackageCheck, CheckCircle, Info, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';

export function SampleBagDrawer() {
  const {
    sampleBag,
    isSampleBagOpen,
    setIsSampleBagOpen,
    removeFromSampleBag,
    clearSampleBag,
    freeSamplesRemaining,
  } = useStore();

  const [isOrdered, setIsOrdered] = React.useState(false);

  const handleRequestSamples = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#756B55', '#B28B61', '#35372F', '#EEEAE2'],
    });
    setIsOrdered(true);
  };

  const footerContent = sampleBag.length > 0 && !isOrdered ? (
    <div className="space-y-4">
      <div className="bg-[#EEEAE2]/80 p-3 text-xs text-[#252522] space-y-1 border border-[#E3DFD6]">
        <div className="flex items-center justify-between font-medium">
          <span>Sample Bag Total:</span>
          <span className="text-emerald-700 font-bold">
            {sampleBag.length <= 5 ? 'FREE ($0.00 CAD)' : '$20 CAD Freight Flat'}
          </span>
        </div>
        <p className="text-[11px] text-[#77766F] leading-tight">
          Delivered direct to your door in 2 business days. Full-sized tile cuts included.
        </p>
      </div>

      <div className="space-y-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleRequestSamples}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Confirm Sample Delivery
        </Button>
        <button
          onClick={clearSampleBag}
          className="w-full text-center text-xs text-[#77766F] hover:text-red-600 transition-colors py-1"
        >
          Clear Sample Bag
        </button>
      </div>
    </div>
  ) : null;

  return (
    <Drawer
      isOpen={isSampleBagOpen}
      onClose={() => {
        setIsSampleBagOpen(false);
        setIsOrdered(false);
      }}
      title="Sample Bag"
      subtitle="Evaluate colour, texture, and light in your actual space"
      footer={footerContent}
    >
      {/* Policy banner */}
      <div className="bg-[#F7F5F0] border border-[#E3DFD6] p-3.5 mb-5 flex items-start gap-2.5 text-xs">
        <Sparkles className="w-4 h-4 text-[#B28B61] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-[#252522]">
            {sampleBag.length <= 5 ? (
              <>
                You have <span className="text-[#756B55] font-bold">{freeSamplesRemaining}</span> free sample{freeSamplesRemaining === 1 ? '' : 's'} available
              </>
            ) : (
              'Maximum free tier reached (Additional items covered by GTA freight)'
            )}
          </p>
          <p className="text-[11px] text-[#77766F] mt-0.5">
            Quick Floors provides up to 5 complimentary samples per project with free GTA shipping.
          </p>
        </div>
      </div>

      {isOrdered ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-serif text-xl text-[#252522]">Sample Request Simulated</h4>
            <p className="text-xs text-[#77766F] mt-2 max-w-xs mx-auto leading-relaxed">
              Your {sampleBag.length} selected tile sample{sampleBag.length === 1 ? '' : 's'} have been staged. In live operations, a courier tracking number is emailed within 24 hours.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearSampleBag();
              setIsOrdered(false);
              setIsSampleBagOpen(false);
            }}
          >
            Continue Exploring Showroom
          </Button>
        </div>
      ) : sampleBag.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#F7F5F0] border border-[#E3DFD6] flex items-center justify-center text-[#77766F]">
            <PackageCheck className="w-8 h-8 stroke-1" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-[#252522]">Your Sample Bag is Empty</h4>
            <p className="text-xs text-[#77766F] mt-1 max-w-xs mx-auto">
              Click &quot;Get Free Sample&quot; on eligible tiles to compare finishes in your natural room lighting.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            href="/shop"
            onClick={() => setIsSampleBagOpen(false)}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Discover Materials
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-[#E3DFD6]">
          {sampleBag.map(({ product }) => (
            <div key={product.id} className="py-4 flex gap-3.5 group">
              <div className="w-16 h-16 bg-[#EEEAE2] relative shrink-0 border border-[#E3DFD6]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setIsSampleBagOpen(false)}
                      className="text-xs font-semibold text-[#252522] hover:text-[#756B55] truncate"
                    >
                      {product.name}
                    </Link>
                    <button
                      onClick={() => removeFromSampleBag(product.id)}
                      className="text-[#77766F] hover:text-red-600 p-1"
                      aria-label={`Remove ${product.name} sample`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#77766F] mt-0.5">
                    {product.finish} • {product.dimensions}
                  </p>
                  <span className="inline-block text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 mt-1 border border-emerald-200">
                    Complimentary Sample
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}
