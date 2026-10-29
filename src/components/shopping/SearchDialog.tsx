'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';
import { formatCurrency } from '@/lib/formatCurrency';

export function SearchDialog() {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#252522]/60 backdrop-blur-xs">
      <div
        className="fixed inset-0"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white border border-[#E3DFD6] shadow-2xl z-10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-[#E3DFD6] flex items-center gap-3 bg-[#F7F5F0]/50">
          <Search className="w-5 h-5 text-[#756B55] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flooring, porcelain, marble, LVT, or finishes..."
            className="w-full bg-transparent text-sm sm:text-base text-[#252522] placeholder-[#77766F] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#77766F] hover:text-[#252522]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase font-semibold text-[#756B55] hover:text-[#252522] ml-2 px-2 py-1"
          >
            ESC
          </button>
        </div>

        {/* Quick category filters */}
        <div className="p-3 border-b border-[#E3DFD6] bg-white flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#77766F] font-medium shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3 text-[#756B55]" />
            Suggestions:
          </span>
          {['Luxury Vinyl', 'Porcelain', 'Marble', 'Slate', 'Waterproof', 'Arabesque'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#F7F5F0] hover:bg-[#EEEAE2] text-[#252522] text-[11px] font-medium border border-[#E3DFD6] shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results view */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#E3DFD6]/60">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-xs text-[#77766F]">
              <p className="font-serif text-lg text-[#252522] mb-1">Discover Considered Flooring</p>
              <p>Type above to search through our verified product catalogue.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#77766F]">
              <p className="font-serif text-base text-[#252522] mb-1">No products found</p>
              <p>Try searching for "Porcelain", "Oak", "Marble", or "Slate".</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="py-3 flex items-center justify-between gap-4 group hover:bg-[#F7F5F0]/60 -mx-4 px-4 transition-colors"
              >
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <div className="w-14 h-14 bg-[#EEEAE2] relative shrink-0 border border-[#E3DFD6]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-semibold text-[#756B55] tracking-wider">
                      {product.categoryLabel}
                    </p>
                    <h4 className="text-sm font-medium text-[#252522] truncate group-hover:text-[#756B55] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#77766F]">
                      {product.dimensions} • {formatCurrency(product.price, { showUnit: product.unit })}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="text-xs uppercase font-semibold text-[#756B55] hover:text-[#252522] px-2.5 py-1 border border-[#E3DFD6] bg-white hover:bg-[#F7F5F0]"
                  >
                    Quick View
                  </button>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1.5 text-[#252522] hover:text-[#756B55]"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
