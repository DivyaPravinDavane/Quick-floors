'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  activeMenu: string | null;
  onClose: () => void;
}

export function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  if (!activeMenu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-[#E3DFD6] shadow-xl z-40"
    >
      <div className="max-w-[1536px] mx-auto px-6 lg:px-12 py-8">
        {activeMenu === 'flooring' && (
          <div className="grid grid-cols-12 gap-8">
            {/* Column 1: Core Categories */}
            <div className="col-span-3 border-r border-[#E3DFD6]/60 pr-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                Flooring Materials
              </span>
              <ul className="space-y-2.5">
                {[
                  { name: 'Luxury Vinyl Tile (LVT)', href: '/shop/luxury-vinyl', badge: '100% Waterproof' },
                  { name: 'Porcelain Tile', href: '/shop/porcelain', badge: 'Grand Format' },
                  { name: 'Marble Tile', href: '/shop/marble' },
                  { name: 'Ceramic Flooring', href: '/shop/ceramic' },
                  { name: 'Granite Flooring', href: '/shop/granite' },
                  { name: 'Natural Slate', href: '/shop/slate' },
                  { name: 'Engineered Hardwood', href: '/shop/engineered-hardwood' },
                  { name: 'Laminate Flooring', href: '/shop/laminate' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between text-sm text-[#252522] hover:text-[#756B55] transition-colors py-1"
                    >
                      <span className="font-medium group-hover:translate-x-1 transition-transform">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] uppercase font-semibold text-[#756B55] bg-[#F7F5F0] px-1.5 py-0.5 rounded-none border border-[#E3DFD6]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-[#E3DFD6]">
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#252522] hover:text-[#756B55]"
                >
                  <span>View Full Flooring Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Column 2: Popular Collections */}
            <div className="col-span-3 border-r border-[#E3DFD6]/60 pr-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                Signature Series
              </span>
              <ul className="space-y-3">
                {[
                  {
                    title: 'AquaShield Core 6mm',
                    desc: '20 mil commercial wear layer with acoustic IXPE pad',
                    href: '/product/aquashield-sandcastle-6mm',
                  },
                  {
                    title: 'Cyrus Rigid Core SPC',
                    desc: 'CrystaLux™ scratch shield with natural wire-brushed oak',
                    href: '/product/cyrus-dunite-oak',
                  },
                  {
                    title: 'Dynamic 7MM Series',
                    desc: '9" x 60" grand format wide plank luxury vinyl',
                    href: '/product/dynamic-dominion-7mm',
                  },
                  {
                    title: 'Trecento Stone-Look LVT',
                    desc: 'Calacatta & marble visuals with click ease',
                    href: '/product/trecento-calacatta-marbella',
                  },
                ].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block p-2 -mx-2 hover:bg-[#F7F5F0] transition-colors group"
                    >
                      <h4 className="text-xs font-semibold text-[#252522] group-hover:text-[#756B55]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#77766F] mt-0.5 line-clamp-1">
                        {item.desc}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Featured Visual - Authentic Quick Floors Tile */}
            <div className="col-span-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                Featured Porcelain
              </span>
              <Link
                href="/product/paonazzo-24x48-polished"
                onClick={onClose}
                className="group block relative overflow-hidden aspect-[4/3] bg-[#EEEAE2] border border-[#E3DFD6]"
              >
                <Image
                  src="https://www.quickfloors.ca/image/cache/catalog/paonazzo/PAONAZZO_FACE3_600x-300x300.jpg"
                  alt="Paonazzo 24x48 Polished"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#EEEAE2]">Grand Format</span>
                  <p className="font-serif text-base font-medium">Paonazzo 24x48 Polished</p>
                  <p className="text-xs text-[#E3DFD6]">CAD $7.188 / Sq.ft</p>
                </div>
              </Link>
            </div>

            {/* Column 4: 3D Visualizer Callout */}
            <div className="col-span-3 bg-[#F7F5F0] p-6 border border-[#E3DFD6] flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B28B61]" />
                  Interactive Studio
                </span>
                <h4 className="font-serif text-lg text-[#252522] tracking-tight">
                  3D Flooring Visualizer
                </h4>
                <p className="text-xs text-[#77766F] mt-2 leading-relaxed">
                  Switch between natural oak, warm walnut, honed stone, and polished marble in our real-time virtual room preview.
                </p>
              </div>
              <Link
                href="/#visualizer"
                onClick={onClose}
                className="mt-4 inline-flex items-center justify-between text-xs font-semibold text-[#252522] hover:text-[#756B55] pt-3 border-t border-[#E3DFD6]"
              >
                <span>Launch Room Preview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {activeMenu === 'backsplash' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 border-r border-[#E3DFD6]/60 pr-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                Backsplash & Wall Tile
              </span>
              <ul className="space-y-2.5">
                {[
                  { name: 'Specialty Shapes Wall Tile', href: '/shop/backsplash-wall?sub=specialty' },
                  { name: 'River Pebbles & Shower Floors', href: '/shop/backsplash-wall?sub=pebbles' },
                  { name: 'Stacked Stone Ledger Panels', href: '/shop/backsplash-wall?sub=stacked' },
                  { name: 'Decorative Blends & Mosaics', href: '/shop/backsplash-wall?sub=blends' },
                  { name: 'Subway Tile Collection', href: '/shop/backsplash-wall?sub=subway' },
                  { name: 'Kenzzi Moroccan Geometric', href: '/shop/backsplash-wall?sub=kenzzi' },
                  { name: '3-Dimensional Sculptural Tile', href: '/shop/backsplash-wall?sub=3d' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-sm text-[#252522] hover:text-[#756B55] transition-colors py-1 block font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 border-r border-[#E3DFD6]/60 pr-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                Designer Accents
              </span>
              <Link
                href="/product/specialty-almond-arabesque"
                onClick={onClose}
                className="group block relative overflow-hidden aspect-[16/10] bg-[#EEEAE2] border border-[#E3DFD6] mb-3"
              >
                <Image
                  src="https://www.quickfloors.ca/image/cache/catalog/specialty%20shapes/almond-glossy-arabesque-mosaic-150x150.jpg"
                  alt="Almond Glossy Arabesque"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3 text-white">
                  <p className="font-serif text-sm">Almond Glossy Arabesque</p>
                  <p className="text-[11px] text-[#E3DFD6]">CAD $12.99 / Sq.ft</p>
                </div>
              </Link>
              <p className="text-xs text-[#77766F]">
                Mesh-mounted Moroccan lantern tiles designed for luxury backsplashes and feature walls.
              </p>
            </div>

            <div className="col-span-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                Natural Stone Panels
              </span>
              <Link
                href="/product/alaska-gray-stacked-stone"
                onClick={onClose}
                className="group block relative overflow-hidden aspect-[16/10] bg-[#EEEAE2] border border-[#E3DFD6] mb-3"
              >
                <Image
                  src="https://www.quickfloors.ca/image/cache/catalog/stacked%20stone/alaska-gray-stacked-stone-anew-410x410.jpg"
                  alt="Alaska Gray Stacked Stone"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3 text-white">
                  <p className="font-serif text-sm">Alaska Gray Stacked Stone</p>
                  <p className="text-[11px] text-[#E3DFD6]">CAD $11.80 / Sq.ft</p>
                </div>
              </Link>
              <p className="text-xs text-[#77766F]">
                Cleaved marble ledger panels for dramatic fireplace and exterior accents.
              </p>
            </div>
          </div>
        )}

        {activeMenu === 'accessories' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 border-r border-[#E3DFD6]/60 pr-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                Accessories & Installation
              </span>
              <ul className="space-y-2.5">
                {[
                  { name: 'Schluter Systems Waterproofing', href: '/accessories' },
                  { name: 'LVT Acoustic Underlayments', href: '/accessories' },
                  { name: 'Setting Materials & Grouts', href: '/accessories' },
                  { name: 'Baseboards & Quarter Rounds', href: '/accessories' },
                  { name: 'Stair Nosing & Reducer Trims', href: '/accessories' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-sm text-[#252522] hover:text-[#756B55] transition-colors py-1 block font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 border-r border-[#E3DFD6]/60 pr-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-4">
                D.I.Y Tools
              </span>
              <ul className="space-y-2.5">
                {[
                  { name: 'Professional Tile Cutters (Up to 36")', href: '/diy' },
                  { name: 'Anti-Lippage Tile Leveling Clips', href: '/diy' },
                  { name: 'Notched Trowels & Floats', href: '/diy' },
                  { name: 'Diamond Core Hole Saws', href: '/diy' },
                  { name: 'Vinyl Plank Tapping Blocks & Pull Bars', href: '/diy' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-sm text-[#252522] hover:text-[#756B55] transition-colors py-1 block font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 bg-[#F7F5F0] p-6 border border-[#E3DFD6]">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55] block mb-2">
                Need Guidance?
              </span>
              <h4 className="font-serif text-lg text-[#252522]">
                Curbside Delivery to Your Job Site
              </h4>
              <p className="text-xs text-[#77766F] mt-2 leading-relaxed">
                Order tiles and accessories together. Everything needed for a seamless professional installation delivered in one shipment.
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#252522] hover:text-[#756B55]"
              >
                <span>Talk to a Flooring Specialist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
