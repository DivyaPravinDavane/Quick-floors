'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, MapPin, Phone, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0]">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'About Us' }]} className="mb-6" />

        {/* Hero Editorial Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-2">
            Showroom Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight leading-[1.12]">
            Transforming How Canada Buys Flooring
          </h1>
          <p className="text-sm sm:text-base text-[#77766F] mt-4 leading-relaxed font-normal">
            Quick Floors is changing the way we purchase flooring and tile. We want to give you beautiful, exceptionally high-quality flooring products that provide lasting beauty, durability, and unmatched value.
          </p>
        </div>

        {/* Story Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white border border-[#E3DFD6] p-8 sm:p-12 shadow-sm mb-14">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-1">
                Experience & Heritage
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#252522]">
                Inspiration and Experience
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              We shop the world to give you the finest and most elegant flooring products from only the best manufacturers. With a combined 30 years in the flooring industry, we are inspired each and every day to make all your renovation and commercial projects exceptional.
            </p>

            <div className="pt-4 border-t border-[#E3DFD6] space-y-4">
              <div>
                <h3 className="font-serif text-lg text-[#252522]">
                  Simplifying Tile Shopping
                </h3>
                <p className="text-xs text-[#77766F] mt-1 leading-relaxed">
                  Quick Floors brings the showroom to you. You can shop our designs 24 hours a day, 7 days a week. Our dedicated customer service staff is readily available to chat by phone and email. Samples for all our products are delivered quickly, easily, and free.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg text-[#252522]">
                  Our Commitment to You
                </h3>
                <p className="text-xs text-[#77766F] mt-1 leading-relaxed">
                  We are absolutely committed to making sure that you have an exceptional shopping experience with us: from your first visit to our digital showroom, through securely ordering online, to the moment your freight arrives curbside at your home or business.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] bg-[#EEEAE2] border border-[#E3DFD6] overflow-hidden">
            <Image
              src="https://www.quickfloors.ca/image/cache/catalog/aaa/web-header-open-v3-3-1365x525.jpg"
              alt="Quick Floors Canadian Interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white border border-[#E3DFD6] p-6 space-y-2">
            <Compass className="w-5 h-5 text-[#B28B61]" />
            <h3 className="font-serif text-lg text-[#252522]">Curated Global Sourcing</h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              We select tiles from certified Italian, Brazilian, and North American mills for maximum durability and low-VOC indoor air safety.
            </p>
          </div>

          <div className="bg-white border border-[#E3DFD6] p-6 space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#B28B61]" />
            <h3 className="font-serif text-lg text-[#252522]">Unmatched Value</h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              By removing expensive retail showroom overheads, we pass direct contractor pricing along to homeowners, designers, and builders.
            </p>
          </div>

          <div className="bg-white border border-[#E3DFD6] p-6 space-y-2">
            <HeartHandshake className="w-5 h-5 text-[#B28B61]" />
            <h3 className="font-serif text-lg text-[#252522]">Personal Project Support</h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Call our Georgetown specialist team for coverage estimations, Schluter system advice, or custom freight logistics.
            </p>
          </div>
        </div>

        {/* Georgetown Hub Info Card */}
        <div className="bg-[#252522] text-[#EEEAE2] p-8 sm:p-12 border border-[#35372F] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase tracking-widest text-[#B28B61] font-semibold">
              Canadian Operations Hub
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Based in Georgetown, Ontario
            </h3>
            <p className="text-xs text-[#A8A59C] leading-relaxed">
              140 Guelph St, Unit 7, Georgetown ON L7G 4A5, Canada • Telephone: (647) 794-4836 • Email: orders@quickfloors.ca
            </p>
          </div>

          <Button variant="primary" size="md" href="/contact" className="bg-[#B28B61] hover:bg-[#8F6A44] text-white shrink-0">
            Contact Showroom Team
          </Button>
        </div>
      </Container>
    </div>
  );
}
