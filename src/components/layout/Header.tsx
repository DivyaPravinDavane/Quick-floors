'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  PackageCheck,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { AnnouncementBar } from './AnnouncementBar';
import { MegaMenu } from './MegaMenu';
import { MobileNavigation } from './MobileNavigation';

export function Header() {
  const pathname = usePathname();
  const {
    cartCount,
    wishlistCount,
    sampleBagCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSampleBagOpen,
    setIsSearchOpen,
  } = useStore();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Flooring', key: 'flooring', href: '/shop' },
    { label: 'Backsplash & Tile', key: 'backsplash', href: '/shop/backsplash-wall' },
    { label: 'Accessories', key: 'accessories', href: '/accessories' },
    { label: 'D.I.Y Tools', href: '/diy' },
    { label: 'Inspiration', href: '/inspiration' },
  ];

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E3DFD6]'
            : 'bg-[#F7F5F0] border-b border-[#E3DFD6]/60'
        }`}
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-6">
              <Link href="/" className="group flex items-center gap-3">
                <Image
                  src="/quick-floors-logo.jpg"
                  alt="Quick Floors Canada Logo"
                  width={210}
                  height={52}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const hasMega = !!link.key;
                const isActive = link.key ? activeMenu === link.key : pathname === link.href;

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (hasMega) setActiveMenu(link.key || null);
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'text-[#756B55]'
                          : 'text-[#252522] hover:text-[#756B55]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {hasMega && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            activeMenu === link.key ? 'rotate-180 text-[#756B55]' : 'text-[#77766F]'
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* 3D Visualizer shortcut button */}
              <Link
                href="/#visualizer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[#756B55] hover:text-[#252522] bg-[#EEEAE2]/80 hover:bg-[#EEEAE2] border border-[#E3DFD6] transition-colors"
                title="Launch 3D Room Visualizer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B28B61]" />
                <span>3D Preview</span>
              </Link>

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-[#252522] hover:text-[#756B55] hover:bg-[#EEEAE2] transition-colors"
                aria-label="Search flooring catalogue"
                title="Search (Cmd+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2.5 text-[#252522] hover:text-[#756B55] hover:bg-[#EEEAE2] transition-colors relative"
                aria-label="View wishlist"
                title="Saved Items"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#756B55] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Sample Bag Trigger (Crucial for Quick Floors Canada) */}
              <button
                onClick={() => setIsSampleBagOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-[#252522] hover:text-[#756B55] hover:bg-[#EEEAE2] transition-colors border border-[#E3DFD6] relative"
                aria-label="View sample bag"
                title="Sample Bag"
              >
                <PackageCheck className="w-4 h-4 text-[#756B55]" />
                <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider">Samples</span>
                <span className="w-5 h-5 rounded-full bg-[#252522] text-white text-[10px] font-bold flex items-center justify-center ml-0.5">
                  {sampleBagCount}
                </span>
              </button>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 text-[#252522] hover:text-[#756B55] hover:bg-[#EEEAE2] transition-colors relative"
                aria-label="View shopping cart"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B28B61] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2.5 text-[#252522] hover:bg-[#EEEAE2] transition-colors ml-1"
                aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
