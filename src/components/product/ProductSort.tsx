'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types/flooring';

interface ProductSortProps {
  currentSort: SortOption;
  onChange: (sort: SortOption) => void;
}

export function ProductSort({ currentSort, onChange }: ProductSortProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured Showroom' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'rating-desc', label: 'Highest Rated' },
  ];

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-[#77766F] font-medium hidden sm:inline flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5 text-[#756B55]" />
        Sort:
      </span>
      <select
        value={currentSort}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-white border border-[#E3DFD6] px-3 py-2 text-xs font-medium text-[#252522] outline-none focus:border-[#756B55] cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
