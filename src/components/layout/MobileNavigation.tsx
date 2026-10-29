'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Heart,
  ShoppingBag,
  PackageCheck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const { wishlistCount, cartCount, sampleBagCount } = useStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#252522]/60 backdrop-blur-xs"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm bg-[#F7F5F0] shadow-2xl flex flex-col z-10 overflow-y-auto border-r border-[#E3DFD6]"
          >
            {/* Drawer Top */}
            <div className="p-4 sm:p-5 border-b border-[#E3DFD6] flex items-center justify-between bg-white">
              <Link href="/" onClick={onClose} className="flex items-center">
                <Image
                  src="/quick-floors-logo.jpg"
                  alt="Quick Floors Canada"
                  width={160}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-[#77766F] hover:text-[#252522]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Links Strip */}
            <div className="grid grid-cols-3 border-b border-[#E3DFD6] bg-white text-center py-3 text-xs font-semibold uppercase tracking-wider text-[#252522]">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex flex-col items-center gap-1 border-r border-[#E3DFD6]"
              >
                <span className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#756B55]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-[#B28B61] text-white text-[9px] flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span>Cart</span>
              </Link>

              <Link
                href="/samples"
                onClick={onClose}
                className="flex flex-col items-center gap-1 border-r border-[#E3DFD6]"
              >
                <span className="relative">
                  <PackageCheck className="w-4 h-4 text-[#756B55]" />
                  {sampleBagCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-[#252522] text-white text-[9px] flex items-center justify-center">
                      {sampleBagCount}
                    </span>
                  )}
                </span>
                <span>Samples</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex flex-col items-center gap-1"
              >
                <span className="relative">
                  <Heart className="w-4 h-4 text-[#756B55]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-[#756B55] text-white text-[9px] flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </span>
                <span>Wishlist</span>
              </Link>
            </div>

            {/* Navigation links */}
            <div className="flex-1 px-5 py-4 space-y-1">
              {/* Flooring Accordion */}
              <div className="border-b border-[#E3DFD6]/70 py-2">
                <button
                  onClick={() => toggleSection('flooring')}
                  className="w-full flex items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-[#252522]"
                >
                  <span>Flooring</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 text-[#77766F] ${
                      expandedSection === 'flooring' ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedSection === 'flooring' && (
                  <div className="pl-3 pb-3 pt-1 space-y-2 text-xs text-[#77766F]">
                    <Link href="/shop" onClick={onClose} className="block font-semibold text-[#252522] py-1">
                      Browse All Flooring
                    </Link>
                    <Link href="/shop/luxury-vinyl" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Luxury Vinyl Tile (LVT)
                    </Link>
                    <Link href="/shop/porcelain" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Porcelain Tile
                    </Link>
                    <Link href="/shop/marble" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Marble Tile
                    </Link>
                    <Link href="/shop/slate" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Natural Slate
                    </Link>
                    <Link href="/shop/engineered-hardwood" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Engineered Hardwood
                    </Link>
                    <Link href="/shop/laminate" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Laminate Flooring
                    </Link>
                  </div>
                )}
              </div>

              {/* Backsplash Accordion */}
              <div className="border-b border-[#E3DFD6]/70 py-2">
                <button
                  onClick={() => toggleSection('backsplash')}
                  className="w-full flex items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-[#252522]"
                >
                  <span>Backsplash & Wall Tile</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 text-[#77766F] ${
                      expandedSection === 'backsplash' ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedSection === 'backsplash' && (
                  <div className="pl-3 pb-3 pt-1 space-y-2 text-xs text-[#77766F]">
                    <Link href="/shop/backsplash-wall" onClick={onClose} className="block font-semibold text-[#252522] py-1">
                      View All Wall Tiles
                    </Link>
                    <Link href="/shop/backsplash-wall" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Specialty Shapes Wall Tile
                    </Link>
                    <Link href="/shop/backsplash-wall" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      River Pebbles
                    </Link>
                    <Link href="/shop/backsplash-wall" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Stacked Stone Panels
                    </Link>
                    <Link href="/shop/backsplash-wall" onClick={onClose} className="block py-1 hover:text-[#252522]">
                      Subway Tile
                    </Link>
                  </div>
                )}
              </div>

              {/* Accessories & DIY */}
              <div className="border-b border-[#E3DFD6]/70 py-2">
                <Link
                  href="/accessories"
                  onClick={onClose}
                  className="block py-2 text-sm font-semibold uppercase tracking-wider text-[#252522]"
                >
                  Accessories & Setting
                </Link>
              </div>

              <div className="border-b border-[#E3DFD6]/70 py-2">
                <Link
                  href="/diy"
                  onClick={onClose}
                  className="block py-2 text-sm font-semibold uppercase tracking-wider text-[#252522]"
                >
                  D.I.Y Tools
                </Link>
              </div>

              <div className="py-2">
                <Link
                  href="/inspiration"
                  onClick={onClose}
                  className="block py-2 text-sm font-semibold uppercase tracking-wider text-[#252522]"
                >
                  Room Inspiration
                </Link>
              </div>

              {/* Secondary Information Links */}
              <div className="pt-4 mt-2 border-t border-[#E3DFD6] space-y-2 text-xs text-[#77766F]">
                <div className="flex items-center gap-4">
                  <Link href="/how-it-works" onClick={onClose} className="hover:text-[#252522]">How It Works</Link>
                  <span>•</span>
                  <Link href="/about" onClick={onClose} className="hover:text-[#252522]">About</Link>
                  <span>•</span>
                  <Link href="/contact" onClick={onClose} className="hover:text-[#252522]">Contact</Link>
                </div>
              </div>

              {/* 3D Visualizer shortcut */}
              <div className="pt-4">
                <Link
                  href="/#visualizer"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#756B55] text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#B28B61]" />
                  <span>Interactive 3D Visualizer</span>
                </Link>
              </div>
            </div>

            {/* Bottom Contact Details */}
            <div className="p-5 border-t border-[#E3DFD6] bg-white text-xs text-[#77766F] space-y-2.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#756B55]" />
                <a href="tel:+16477944836" className="font-semibold text-[#252522] hover:underline">
                  (647) 794-4836
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#756B55]" />
                <span>orders@quickfloors.ca</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] leading-tight text-[#77766F]">
                <MapPin className="w-3.5 h-3.5 text-[#756B55] shrink-0 mt-0.5" />
                <span>140 Guelph St, Unit 7, Georgetown ON L7G 4A5, Canada</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
