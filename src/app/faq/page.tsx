'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export default function FaqPage() {
  const sections = [
    {
      title: 'Sampling Program',
      items: [
        {
          q: 'How many samples can I order for free?',
          a: 'Quick Floors provides up to 5 complimentary samples per renovation or building project. Shipping is completely free within the Greater Toronto Area.',
        },
        {
          q: 'What is the shipping cost outside the GTA?',
          a: 'Orders outside the Greater Toronto Area are charged a flat rate of $20 CAD. This $20 amount is fully credited toward your full flooring purchase placed within 30 days.',
        },
        {
          q: 'What size are the samples?',
          a: 'You can expect to receive a full-sized plank or tile whenever possible. For oversized tiles exceeding 12x24 inches or intricate mosaic sheets, representative cut pieces are provided so you can evaluate the true tone, surface relief, and edge bevel.',
        },
      ],
    },
    {
      title: 'Curbside Freight & Delivery',
      items: [
        {
          q: 'How does curbside delivery work?',
          a: 'Full orders are packed on pallets and dispatched via specialized liftgate freight trucks. The driver lowers the pallet safely to your driveway or commercial curbside loading entrance.',
        },
        {
          q: 'What is the standard delivery timeline?',
          a: 'Standard deliveries arrive in 2 to 3 business days from order placement across Southern Ontario. Expedited and remote Canadian destinations are scheduled with our dispatch team.',
        },
      ],
    },
    {
      title: 'Installation, Area Calculation & Technical',
      items: [
        {
          q: 'How much extra flooring should I order for waste?',
          a: 'We strongly recommend adding 10% waste allowance for standard straight-lay patterns, and 15% to 20% for diagonal, herringbone, or complex room layouts with multiple angled cuts.',
        },
        {
          q: 'Are your luxury vinyl planks 100% waterproof?',
          a: 'Yes, our Everlife and AquaShield SPC Rigid Core series feature 100% waterproof construction suitable for kitchens, basements, laundry rooms, and high-traffic commercial interiors.',
        },
      ],
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0]">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} className="mb-6" />

        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-2">
            Support Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#77766F] mt-2 leading-relaxed">
            Everything you need to know about sampling, curbside deliveries, square footage calculation, and trade perks.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-[#252522] pb-2 border-b border-[#E3DFD6]">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <div key={idx} className="bg-white border border-[#E3DFD6] p-5 space-y-1.5 shadow-xs">
                    <h3 className="text-sm font-semibold text-[#252522] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#756B55] shrink-0" />
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-xs text-[#77766F] leading-relaxed pl-6">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions banner */}
        <div className="mt-14 p-8 bg-white border border-[#E3DFD6] text-center space-y-4 shadow-sm">
          <h3 className="font-serif text-2xl text-[#252522]">
            Still Have Questions?
          </h3>
          <p className="text-xs text-[#77766F] max-w-md mx-auto">
            Our team in Georgetown, Ontario is ready to assist with technical specifications, trim selections, and project quotes.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button variant="primary" size="md" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Contact Showroom Team
            </Button>
            <a
              href="tel:+16477944836"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E3DFD6] text-xs font-semibold uppercase tracking-wider text-[#252522] hover:bg-[#F7F5F0]"
            >
              <Phone className="w-4 h-4 text-[#756B55]" />
              <span>(647) 794-4836</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
