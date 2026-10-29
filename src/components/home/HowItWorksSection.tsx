'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'PICK',
      tagline: 'Discover & Compare',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      desc: 'Browse our curated collection of luxury vinyl, Italian porcelain, natural slate, and marble from the comfort of your home 24/7.',
    },
    {
      number: '02',
      title: 'CLICK',
      tagline: 'Order 5 Free Samples',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      desc: 'Select up to 5 full-sized tile samples. We package them carefully and deliver them directly to your door in 2 business days.',
    },
    {
      number: '03',
      title: 'DELIVER',
      tagline: 'Curbside Freight Drop',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      desc: 'Once your selection is finalized, input your room square footage. We arrange curbside liftgate delivery straight to your driveway.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E3DFD6]">
      <Container size="wide">
        <SectionHeading
          eyebrow="The Quick Floors Advantage"
          title="We'll Bring the Showroom to You"
          subtitle="A simplified three-step journey to extraordinary floors"
          description="Traditional tile showrooms require weekend visits, heavy lifting, and guessing how colours look under store spotlights. We redesigned the journey around your home."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 relative">
          {steps.map((step, idx) => (
            <Reveal key={step.number} direction="up" delay={idx * 0.12} className="relative">
              <div className="bg-[#F7F5F0] border border-[#E3DFD6] p-6 sm:p-8 flex flex-col justify-between h-full group hover:border-[#756B55]/60 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#E3DFD6]">
                    <span className="font-serif text-3xl font-light text-[#756B55]">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#252522]">
                      {step.title}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] my-6 bg-white overflow-hidden border border-[#E3DFD6]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <h3 className="font-serif text-xl text-[#252522]">
                    {step.tagline}
                  </h3>

                  <p className="text-xs text-[#77766F] mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E3DFD6]/60 flex items-center gap-1.5 text-xs font-semibold text-[#756B55]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Quick Floors standard</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#252522] hover:text-[#756B55] group"
          >
            <span>Read Complete Shopping & Delivery Details</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
