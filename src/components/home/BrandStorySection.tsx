'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function BrandStorySection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E3DFD6]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Brand Story Content */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal direction="up">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55]">
                Our Philosophy
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight leading-[1.12]">
                Transforming How We <br />
                <span className="italic text-[#756B55]">Experience Flooring</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-sm sm:text-base text-[#77766F] leading-relaxed">
                Quick Floors is changing the way Canadians purchase flooring. We want to give you beautiful, exceptionally high-quality flooring products that provide lasting quality and exceptional value.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                <div className="p-4 bg-[#F7F5F0] border border-[#E3DFD6]">
                  <Compass className="w-5 h-5 text-[#B28B61] mb-2" />
                  <h4 className="font-serif text-base font-medium text-[#252522]">
                    30 Years Combined
                  </h4>
                  <p className="text-xs text-[#77766F] mt-1 leading-relaxed">
                    We shop the world to bring you the finest and most elegant surfaces from premier manufacturers.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F5F0] border border-[#E3DFD6]">
                  <HeartHandshake className="w-5 h-5 text-[#B28B61] mb-2" />
                  <h4 className="font-serif text-base font-medium text-[#252522]">
                    End-to-End Care
                  </h4>
                  <p className="text-xs text-[#77766F] mt-1 leading-relaxed">
                    Dedicated phone and email support from your first sample request to final curbside drop-off.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="md"
                  href="/about"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Read Our Full Story
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right: Asymmetric Editorial Image Layout */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] bg-[#EEEAE2] border border-[#E3DFD6] shadow-xl overflow-hidden group">
              <Image
                src="/brand-story-interior.jpg"
                alt="Quick Floors French Herringbone Oak Parquet Architecture"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-4 border border-[#E3DFD6] max-w-xs shadow-md">
                <p className="text-[10px] uppercase font-semibold text-[#756B55] tracking-widest">
                  Georgetown Ontario Hub
                </p>
                <p className="font-serif text-sm font-semibold text-[#252522] mt-0.5">
                  Direct Canadian Showroom Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
