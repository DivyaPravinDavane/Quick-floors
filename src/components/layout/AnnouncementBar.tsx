'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Sparkles, MapPin } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-[#252522] text-[#EEEAE2] text-[11px] sm:text-xs py-2 px-4 border-b border-[#35372F] tracking-wide">
      <div className="max-w-[1536px] mx-auto flex items-center justify-between flex-wrap gap-2">
        {/* Left: Contact Info */}
        <div className="hidden md:flex items-center gap-5 text-[#B8B4AA]">
          <a
            href="tel:+16477944836"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#B28B61]" />
            <span>(647) 794-4836</span>
          </a>
          <span className="text-[#4E4D47]">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B28B61]" />
            <span>Georgetown, Ontario, Canada</span>
          </span>
        </div>

        {/* Center: Core Value Proposition */}
        <div className="mx-auto md:mx-0 flex items-center gap-2 font-medium text-center">
          <Sparkles className="w-3 h-3 text-[#B28B61] shrink-0" />
          <span>
            <strong className="text-white font-semibold">5 Free Samples</strong> Delivered to Your Door
            <span className="hidden sm:inline"> • Free Curbside Delivery on Qualifying Orders</span>
          </span>
        </div>

        {/* Right: Currency & Trade Program */}
        <div className="hidden lg:flex items-center gap-4 text-[#B8B4AA]">
          <Link
            href="/how-it-works"
            className="hover:text-white transition-colors underline decoration-[#B28B61]/50 underline-offset-4"
          >
            How Sampling Works
          </Link>
          <span className="text-[#4E4D47]">•</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#B28B61] inline-block" />
            CAD ($)
          </span>
        </div>
      </div>
    </div>
  );
}
