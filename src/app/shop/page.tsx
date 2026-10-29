'use client';

import React, { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { ProductGrid } from '@/components/product/ProductGrid';
import { PRODUCTS } from '@/data/products';
import { FilterState, SortOption } from '@/types/flooring';

export default function ShopPage() {
  const initialFilters: FilterState = {
    category: 'all',
    material: [],
    finish: [],
    finishGroup: [],
    thickness: [],
    priceRange: [0, 20],
    freeSampleOnly: false,
    searchQuery: '',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  const filteredAndSorted = useMemo(() => {
    let list = PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      // Material filter
      if (
        filters.material.length > 0 &&
        !filters.material.some((m) => product.material.toLowerCase().includes(m.toLowerCase()))
      ) {
        return false;
      }
      // Finish Group filter
      if (
        filters.finishGroup.length > 0 &&
        (!product.finishGroup || !filters.finishGroup.includes(product.finishGroup))
      ) {
        return false;
      }
      // Free sample filter
      if (filters.freeSampleOnly && !product.freeSampleEligible) {
        return false;
      }
      // Price range filter
      if (product.price > filters.priceRange[1]) {
        return false;
      }
      return true;
    });

    // Sort
    switch (sortOption) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        list = [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [filters, sortOption]);

  return (
    <div className="py-10 sm:py-14 bg-[#F7F5F0] min-h-screen">
      <Container size="wide">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Flooring Catalogue' }]} className="mb-6" />

        {/* Header Banner */}
        <div className="pb-8 border-b border-[#E3DFD6] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-1">
              Online Showroom
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight">
              All Flooring & Tile Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#77766F] mt-2 max-w-2xl leading-relaxed">
              Explore luxury vinyl planks, rectified grand format porcelain, and hand-selected natural slate tiles available for direct curbside delivery across Canada.
            </p>
          </div>

          <ProductSort currentSort={sortOption} onChange={setSortOption} />
        </div>

        {/* Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Left: Filter Sidebar */}
          <div className="lg:col-span-3">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(initialFilters)}
              totalCount={filteredAndSorted.length}
            />
          </div>

          {/* Right: Products Grid */}
          <div className="lg:col-span-9">
            <div className="mb-4 flex items-center justify-between text-xs text-[#77766F]">
              <span>Showing {filteredAndSorted.length} materials</span>
              {filters.freeSampleOnly && (
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  Filtering 5-Free Eligible Only
                </span>
              )}
            </div>

            <ProductGrid products={filteredAndSorted} />
          </div>
        </div>
      </Container>
    </div>
  );
}
