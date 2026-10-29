'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function LoyaltyProgramSection() {
  const benefits = [
    'Exclusive trade & professional wholesale discounts',
    'Expedited complimentary sample kits for client presentations',
    'Volume project rebates for builders and contractors',
    'Tailored account manager and scheduled job-site logistics',
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5F0] border-b border-[#E3DFD6]">
      <Container size="wide">
        <div className="bg-white border border-[#E3DFD6] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[360px] bg-[#EEEAE2] border-b lg:border-b-0 lg:border-r border-[#E3DFD6]">
              <Image
                src="/trade-program-interior.jpg"
                alt="Quick Floors Trade & Architect Specification Studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
              <Reveal direction="up">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55]">
                  <Award className="w-4 h-4 text-[#B28B61]" />
                  <span>Trade & Designer Membership</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#252522] tracking-tight leading-snug">
                  Quick Floors Loyalty Program
                </h3>
                <p className="text-sm sm:text-base text-[#756B55] font-serif italic mt-1">
                  Our professional program is designed specifically for you.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                  Enjoy member-only benefits including tiered trade discounts, free full-size samples for client mood boards, volume rebates, and tailored service by joining our free professional program.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#252522]">
                      <CheckCircle2 className="w-4 h-4 text-[#756B55] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.4}>
                <div className="pt-4 flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href="/contact?type=trade"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Apply for Trade Program
                  </Button>
                  <span className="text-xs text-[#77766F]">
                    Free enrollment • Verified Canadian businesses
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
