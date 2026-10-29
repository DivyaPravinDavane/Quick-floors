import React from 'react';
import { PackageCheck, Truck, ShieldCheck, Home, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function ServiceHighlights() {
  const highlights = [
    {
      icon: <PackageCheck className="w-5 h-5 text-[#B28B61]" />,
      title: '5 Free Samples',
      desc: 'Delivered in 2 business days to evaluate in your space.',
    },
    {
      icon: <Truck className="w-5 h-5 text-[#B28B61]" />,
      title: 'Curbside Freight',
      desc: 'Safe, scheduled delivery to your driveway or site.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#B28B61]" />,
      title: 'Verified Quality',
      desc: 'FloorScore & GreenGuard Gold certified materials.',
    },
    {
      icon: <Clock className="w-5 h-5 text-[#B28B61]" />,
      title: '24/7 Showroom',
      desc: 'Explore collections anytime with instant specs & pricing.',
    },
  ];

  return (
    <div className="bg-white border-b border-[#E3DFD6] py-8 sm:py-10">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E3DFD6]/70">
          {highlights.map((item, idx) => (
            <div key={idx} className={`flex items-start gap-3.5 ${idx !== 0 ? 'sm:pl-6 pt-4 sm:pt-0' : ''}`}>
              <div className="p-2.5 bg-[#F7F5F0] border border-[#E3DFD6] shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#252522]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#77766F] mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
