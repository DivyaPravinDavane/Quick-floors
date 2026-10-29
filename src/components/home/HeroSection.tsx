'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PackageCheck, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

export function HeroSection() {
  return (
    <section className="relative bg-[#F7F5F0] overflow-hidden border-b border-[#E3DFD6] pt-8 sm:pt-14 pb-16 lg:pb-24">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 z-10 space-y-6 sm:space-y-8">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EEEAE2] border border-[#E3DFD6] text-[11px] uppercase tracking-[0.22em] text-[#756B55] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#B28B61]" />
                <span>Canada&apos;s Digital Flooring Showroom</span>
              </div>
            </Reveal>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#252522] tracking-tight leading-[1.08]"
              >
                Beautiful Floors. <br />
                <span className="italic font-normal text-[#756B55]">A Better Way</span> to Shop.
              </motion.h1>
            </div>

            <Reveal direction="up" delay={0.25}>
              <p className="text-base sm:text-lg text-[#77766F] leading-relaxed max-w-xl font-normal">
                Discover flooring and tile for every space, with a convenient online showroom that helps you find the right material, finish, and style for your home.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.35}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  href="/shop"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Flooring
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  href="/samples"
                  icon={<PackageCheck className="w-4 h-4 text-[#756B55]" />}
                >
                  Order 5 Free Samples
                </Button>
              </div>

              <div className="pt-6 flex items-center gap-6 text-xs text-[#77766F]">
                <Link
                  href="/how-it-works"
                  className="hover:text-[#252522] transition-colors underline underline-offset-4 decoration-[#B28B61]"
                >
                  How Pick → Click → Deliver Works
                </Link>
                <span>•</span>
                <Link
                  href="/#visualizer"
                  className="hover:text-[#252522] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B28B61]" />
                  <span>Interactive 3D Visualizer</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Large Architectural Interior Photograph */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ clipPath: 'inset(12% 0% 12% 0%)', opacity: 0, scale: 0.98 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#EEEAE2] border border-[#E3DFD6] shadow-xl overflow-hidden group"
            >
              <Image
                src="/hero-luxury-interior.jpg"
                alt="Quick Floors Luxury Natural Oak & Limestone Interior Showroom"
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Architectural Overlay Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 border border-[#E3DFD6] shadow-lg">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#756B55] block">
                  Showroom Highlight
                </span>
                <p className="font-serif text-sm font-semibold text-[#252522] mt-0.5">
                  Natural Oak & Grand Porcelain
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E3DFD6]/60 text-[11px] text-[#77766F]">
                  <span>Starting CAD $4.49 / sq.ft</span>
                  <Link href="/shop" className="text-[#252522] font-semibold hover:text-[#756B55] flex items-center gap-0.5">
                    <span>Shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
