'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PackageCheck, Truck, ShieldCheck, HelpCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export default function HowItWorksPage() {
  const faqs = [
    {
      q: 'How do I order samples?',
      a: 'You can easily order samples by simply clicking the "Get Free Sample" button under any eligible tile or flooring photo. Up to 5 samples can be added to your bag for free. Additional samples can be ordered at a small cost, which is credited toward any full order placed within 30 days.',
    },
    {
      q: 'How much do samples cost?',
      a: 'We offer 5 free samples for each of your projects; shipping is also completely free within the Greater Toronto Area. Orders for delivery outside the GTA are charged at a flat rate of $20 per order.',
    },
    {
      q: 'What sizes do samples come in?',
      a: 'Unless stated otherwise in the product description, you can expect to receive a full-sized tile as a sample. For tile formats bigger than one foot in length or width, or delicate mosaics, we reserve the right to provide generous cut swatches so you can evaluate true tone and texture.',
    },
    {
      q: 'When will I receive my sample(s)?',
      a: 'In most cases, samples will arrive at your door in 2 business days via courier.',
    },
    {
      q: 'How does curbside delivery work for full orders?',
      a: 'Once you finalize your project selection, input your square footage on the product page. Delivery of your flooring product is scheduled curbside with liftgate service directly to your driveway or commercial receiving bay within 2-3 business days.',
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0]">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'How It Works' }]} className="mb-6" />

        {/* Editorial Introduction */}
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-2">
            The Digital Showroom Experience
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight leading-[1.12]">
            Simplifying the Flooring Shopping Experience
          </h1>
          <p className="text-sm sm:text-base text-[#77766F] mt-4 leading-relaxed font-normal">
            At Quick Floors, the showroom comes to you. You can shop our vast flooring selection 24/7 in the safety and comfort of your home or office. We offer world-class products, dedicated customer service, and pricing unmatched in the industry.
          </p>
        </div>

        {/* The Three Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-[#E3DFD6]">
          {/* Step 1 */}
          <div className="bg-white border border-[#E3DFD6] p-8 space-y-4 shadow-xs">
            <span className="text-4xl font-serif text-[#756B55] block">01</span>
            <div className="relative aspect-[16/10] bg-[#F7F5F0] border border-[#E3DFD6] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                alt="Pick your flooring in digital showroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="font-serif text-xl text-[#252522] font-semibold">PICK</h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Explore our online showroom 24/7. Filter by material, stone look, finish, or thickness. Our interactive 3D visualizer lets you preview light interaction before requesting samples.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#E3DFD6] p-8 space-y-4 shadow-xs">
            <span className="text-4xl font-serif text-[#756B55] block">02</span>
            <div className="relative aspect-[16/10] bg-[#F7F5F0] border border-[#E3DFD6] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                alt="Click and request 5 free samples"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="font-serif text-xl text-[#252522] font-semibold">CLICK</h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Request up to 5 complimentary samples with zero shipping cost in the Greater Toronto Area. In 2 business days, physical tiles arrive at your door to inspect in your home’s natural lighting.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#E3DFD6] p-8 space-y-4 shadow-xs">
            <span className="text-4xl font-serif text-[#756B55] block">03</span>
            <div className="relative aspect-[16/10] bg-[#F7F5F0] border border-[#E3DFD6] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Curbside freight delivery to your door"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="font-serif text-xl text-[#252522] font-semibold">DELIVER</h3>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Revisit our website, enter your square footage into our built-in area calculator, and check out securely. Scheduled curbside freight drop-off arrives at your driveway or job site.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-16 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-1">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl text-[#252522]">
              Sampling, Shipping & Logistics
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-[#E3DFD6] p-6 space-y-2">
                <h4 className="font-serif text-lg text-[#252522] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#756B55] shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-12 p-8 bg-white border border-[#E3DFD6] text-center space-y-4">
            <h3 className="font-serif text-2xl text-[#252522]">
              Ready to Discover Your Flooring?
            </h3>
            <p className="text-xs text-[#77766F] max-w-md mx-auto">
              Browse our complete flooring catalogue or contact our team in Georgetown, Ontario for bespoke trade inquiries.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button variant="primary" size="md" href="/shop" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Flooring Catalogue
              </Button>
              <Button variant="secondary" size="md" href="/samples">
                Order 5 Free Samples
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
