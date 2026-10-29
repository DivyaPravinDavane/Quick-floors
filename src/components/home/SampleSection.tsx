'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PackageCheck, ArrowRight, Check, Sparkles, Clock, Truck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';
import { Reveal } from '@/components/motion/Reveal';

export function SampleSection() {
  const { addToSampleBag, isInSampleBag, sampleBagCount, setIsSampleBagOpen } = useStore();

  const sampleEligible = PRODUCTS.filter((p) => p.freeSampleEligible).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#EEEAE2] border-b border-[#E3DFD6]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Sample Policy & Counter */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E3DFD6] text-[11px] uppercase tracking-[0.2em] text-[#756B55] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#B28B61]" />
                <span>Sample-First Shopping</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight leading-[1.12]">
                See It. Feel It. <br />
                <span className="italic text-[#756B55]">Make It Yours.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-sm sm:text-base text-[#77766F] leading-relaxed">
                Seeing flooring in a showroom is one thing, but having physical samples in hand to evaluate actual grain, texture, and shade under your morning and evening light is essential before you buy.
              </p>
            </Reveal>

            {/* Quick Floors Authentic Sample Rules List */}
            <Reveal direction="up" delay={0.3}>
              <div className="space-y-3 pt-2 text-xs text-[#252522]">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-[#252522] text-white shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="font-semibold block">5 Free Samples per Project</strong>
                    <span className="text-[#77766F]">No cost for materials or shipping within the Greater Toronto Area.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-[#252522] text-white shrink-0 mt-0.5">
                    <Clock className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="font-semibold block">2-Business-Day Delivery</strong>
                    <span className="text-[#77766F]">Carefully packed and delivered directly to your doorstep in a clean, timely manner.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 bg-[#252522] text-white shrink-0 mt-0.5">
                    <Truck className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="font-semibold block">Full Order Credit</strong>
                    <span className="text-[#77766F]">Any additional sample shipping costs are credited back toward orders placed within 30 days.</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="pt-4 flex items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsSampleBagOpen(true)}
                  icon={<PackageCheck className="w-4 h-4" />}
                >
                  View Sample Bag ({sampleBagCount}/5)
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  href="/samples"
                >
                  Read Full Policy
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right: Curated Sample Gallery Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sampleEligible.map((prod) => {
                const inBag = isInSampleBag(prod.id);

                return (
                  <div
                    key={prod.id}
                    className="bg-white p-4 border border-[#E3DFD6] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video bg-[#F7F5F0] overflow-hidden border border-[#E3DFD6] mb-3">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover"
                          sizes="300px"
                        />
                        <div className="absolute top-2 left-2 bg-[#252522] text-white text-[9px] uppercase font-semibold px-2 py-0.5">
                          Free Sample Eligible
                        </div>
                      </div>

                      <span className="text-[10px] uppercase tracking-wider text-[#756B55] font-semibold">
                        {prod.categoryLabel}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#252522] mt-0.5">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-[#77766F] mt-0.5">
                        {prod.finish} • Full-size cut
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E3DFD6] flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                        FREE SAMPLE
                      </span>

                      <button
                        onClick={() => addToSampleBag(prod)}
                        className={`text-xs font-semibold px-3 py-1.5 border transition-colors cursor-pointer flex items-center gap-1 ${
                          inBag
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-[#252522] text-white border-[#252522] hover:bg-[#35372F]'
                        }`}
                      >
                        {inBag ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Sample Bag</span>
                          </>
                        ) : (
                          <>
                            <PackageCheck className="w-3.5 h-3.5" />
                            <span>Get Free Sample</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
