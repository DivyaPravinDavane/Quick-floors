'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { ProductGrid } from '@/components/product/ProductGrid';
import { PRODUCTS, CATEGORIES_DATA } from '@/data/products';
import { FilterState, SortOption, FlooringCategory } from '@/types/flooring';

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = params.category as string;

  const currentCategory = CATEGORIES_DATA.find(
    (c) => c.id === categoryParam || c.slug === categoryParam
  ) || {
    id: categoryParam as FlooringCategory,
    title: categoryParam.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: 'Explore high-performance flooring surfaces for modern architectural and residential environments.',
    count: 20,
    image: '',
    slug: categoryParam,
  };

  const initialFilters: FilterState = {
    category: currentCategory.id,
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
      // Must match category
      if (product.category !== currentCategory.id) {
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
  }, [currentCategory.id, filters, sortOption]);

  return (
    <div className="py-10 sm:py-14 bg-[#F7F5F0] min-h-screen">
      <Container size="wide">
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: currentCategory.title },
          ]}
          className="mb-6"
        />

        {/* Category Header */}
        <div className="pb-8 border-b border-[#E3DFD6] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-1">
              Collection Category
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight">
              {currentCategory.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#77766F] mt-2 max-w-2xl leading-relaxed">
              {currentCategory.description}
            </p>
          </div>

          <ProductSort currentSort={sortOption} onChange={setSortOption} />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-3">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(initialFilters)}
              totalCount={filteredAndSorted.length}
            />
          </div>

          <div className="lg:col-span-9">
            <div className="mb-4 flex items-center justify-between text-xs text-[#77766F]">
              <span>Showing {filteredAndSorted.length} products in {currentCategory.title}</span>
            </div>

            <ProductGrid
              products={filteredAndSorted}
              emptyMessage={`No ${currentCategory.title} products match the current filters.`}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
