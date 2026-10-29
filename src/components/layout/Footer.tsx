'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#252522] text-[#EEEAE2] border-t border-[#35372F] pt-16 sm:pt-20 pb-12">
      <Container size="wide">
        {/* Top Trust Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-14 border-b border-[#35372F]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#35372F] text-[#B28B61] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                5 Free Samples
              </h4>
              <p className="text-xs text-[#A8A59C] mt-1 leading-relaxed">
                Order up to 5 full-size flooring samples delivered direct to your door with zero shipping cost in GTA.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#35372F] text-[#B28B61] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                Curbside Delivery
              </h4>
              <p className="text-xs text-[#A8A59C] mt-1 leading-relaxed">
                Safe, scheduled curbside freight drop-off direct to your residence or job site across Ontario and Canada.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#35372F] text-[#B28B61] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                30 Years Experience
              </h4>
              <p className="text-xs text-[#A8A59C] mt-1 leading-relaxed">
                Curated from top global manufacturers with certified FloorScore, GreenGuard, and commercial ratings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#35372F] text-[#B28B61] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
                Trade Loyalty Program
              </h4>
              <p className="text-xs text-[#A8A59C] mt-1 leading-relaxed">
                Volume tier rebates, contractor pricing, and dedicated account support for design professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 py-14 border-b border-[#35372F]">
          {/* Brand & Story */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="inline-block mb-4 p-2.5 bg-white border border-[#35372F] group">
              <Image
                src="/quick-floors-logo.jpg"
                alt="Quick Floors Canada"
                width={170}
                height={42}
                className="h-8 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>
            <p className="text-xs leading-relaxed text-[#A8A59C] mb-6 max-w-sm">
              We’ll bring the showroom to you. Shop world-class luxury vinyl, grand format porcelain, marble, and wall tile 24/7 in the comfort of your home.
            </p>

            <div className="space-y-2.5 text-xs text-[#B8B4AA]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B28B61] shrink-0" />
                <a href="tel:+16477944836" className="hover:text-white transition-colors">
                  (647) 794-4836
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B28B61] shrink-0" />
                <span>orders@quickfloors.ca</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] leading-tight">
                <MapPin className="w-4 h-4 text-[#B28B61] shrink-0 mt-0.5" />
                <span>140 Guelph St, Unit 7, Georgetown ON L7G 4A5, Canada</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/Quick-Floors-Inc-101686084955867/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none bg-[#35372F] hover:bg-[#B28B61] text-[#EEEAE2] hover:text-white flex items-center justify-center transition-colors text-xs font-semibold"
                aria-label="Quick Floors on Facebook"
              >
                FB
              </a>
              <a
                href="https://www.instagram.com/quickfloorsinc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none bg-[#35372F] hover:bg-[#B28B61] text-[#EEEAE2] hover:text-white flex items-center justify-center transition-colors text-xs font-semibold"
                aria-label="Quick Floors on Instagram"
              >
                IG
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B28B61] mb-5">
              Shop Flooring
            </h5>
            <ul className="space-y-3 text-xs text-[#A8A59C]">
              <li>
                <Link href="/shop/luxury-vinyl" className="hover:text-white transition-colors">
                  Luxury Vinyl Tile (LVT)
                </Link>
              </li>
              <li>
                <Link href="/shop/porcelain" className="hover:text-white transition-colors">
                  Porcelain Tile
                </Link>
              </li>
              <li>
                <Link href="/shop/marble" className="hover:text-white transition-colors">
                  Marble Tile
                </Link>
              </li>
              <li>
                <Link href="/shop/slate" className="hover:text-white transition-colors">
                  Natural Slate
                </Link>
              </li>
              <li>
                <Link href="/shop/backsplash-wall" className="hover:text-white transition-colors">
                  Backsplash & Wall Tile
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-white transition-colors">
                  Accessories & Schluter
                </Link>
              </li>
              <li>
                <Link href="/diy" className="hover:text-white transition-colors">
                  D.I.Y Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B28B61] mb-5">
              Client Service
            </h5>
            <ul className="space-y-3 text-xs text-[#A8A59C]">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works (Pick → Click → Deliver)
                </Link>
              </li>
              <li>
                <Link href="/samples" className="hover:text-white transition-colors">
                  Free Flooring Samples
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Quick Floors
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="hover:text-white transition-colors">
                  Room Inspiration
                </Link>
              </li>
              <li>
                <Link href="/#visualizer" className="hover:text-white transition-colors">
                  3D Flooring Visualizer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Showroom Inquiries
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B28B61] mb-5">
              Stay Inspired
            </h5>
            <p className="text-xs text-[#A8A59C] mb-4 leading-relaxed">
              Receive new collection arrivals, architectural styling guides, and exclusive trade program announcements.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#35372F] border border-[#756B55] text-xs text-[#EEEAE2] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B28B61] shrink-0" />
                <span>Thank you for subscribing to Quick Floors updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#181817] border border-[#35372F] focus:border-[#B28B61] text-xs text-white px-3.5 py-3 pr-10 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 text-[#B28B61] hover:text-white transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
                <p className="text-[10px] text-[#77766F]">
                  Simulated newsletter subscription for frontend demonstration.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#77766F] gap-4">
          <p>
            © {new Date().getFullYear()} Quick Floors Inc. All rights reserved. Georgetown, Ontario, Canada.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/how-it-works" className="hover:text-[#EEEAE2] transition-colors">
              Curbside Shipping
            </Link>
            <Link href="/how-it-works" className="hover:text-[#EEEAE2] transition-colors">
              Sample Terms
            </Link>
            <Link href="/about" className="hover:text-[#EEEAE2] transition-colors">
              Georgetown Showroom
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
