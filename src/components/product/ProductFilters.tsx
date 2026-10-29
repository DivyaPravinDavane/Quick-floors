'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { FilterState } from '@/types/flooring';
import { CATEGORIES_DATA } from '@/data/products';

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  totalCount,
}: ProductFiltersProps) {
  const materials = ['Glazed Porcelain', 'SPC Rigid Core Vinyl', 'Natural Slate', 'Natural Marble', 'Ceramic Mosaic'];
  const finishes = ['Mirror Polished', 'Natural Gauged Split', 'Embossed In Register (EIR)', 'Wire-Brushed Matte Oak', 'Soft Silky Matte', 'Smooth Tumbled Organic'];
  const finishGroups = [
    { id: 'natural-oak', label: 'Natural Oak' },
    { id: 'warm-walnut', label: 'Warm Walnut' },
    { id: 'light-stone', label: 'Light Stone' },
    { id: 'marble', label: 'Marble' },
    { id: 'dark-stone', label: 'Dark Stone' },
  ];

  const toggleArrayItem = (key: 'material' | 'finish' | 'finishGroup', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.material.length > 0 ||
    filters.finish.length > 0 ||
    filters.finishGroup.length > 0 ||
    filters.freeSampleOnly ||
    filters.priceRange[1] < 20;

  return (
    <div className="bg-white border border-[#E3DFD6] p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E3DFD6]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#252522]">
          <Filter className="w-4 h-4 text-[#756B55]" />
          <span>Filters ({totalCount})</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-[11px] text-[#756B55] hover:text-[#252522] flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Free Sample Only Switch */}
      <div className="bg-[#F7F5F0] p-3 border border-[#E3DFD6]">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-[#252522] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B28B61]" />
              Free Sample Eligible
            </span>
            <span className="text-[10px] text-[#77766F] block">Show 5-free eligible tiles</span>
          </div>
          <input
            type="checkbox"
            checked={filters.freeSampleOnly}
            onChange={(e) => onChange({ ...filters, freeSampleOnly: e.target.checked })}
            className="w-4 h-4 accent-[#756B55] cursor-pointer"
          />
        </label>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#756B55] block">
          Category
        </label>
        <div className="space-y-1 text-xs">
          <button
            type="button"
            onClick={() => onChange({ ...filters, category: 'all' })}
            className={`w-full text-left px-2 py-1.5 transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'bg-[#252522] text-white font-medium'
                : 'text-[#77766F] hover:bg-[#F7F5F0] hover:text-[#252522]'
            }`}
          >
            All Collections
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange({ ...filters, category: cat.id })}
              className={`w-full text-left px-2 py-1.5 transition-colors cursor-pointer ${
                filters.category === cat.id
                  ? 'bg-[#252522] text-white font-medium'
                  : 'text-[#77766F] hover:bg-[#F7F5F0] hover:text-[#252522]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Finish Palette */}
      <div className="space-y-2 pt-3 border-t border-[#E3DFD6]">
        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#756B55] block">
          Finish Palette
        </label>
        <div className="space-y-1 text-xs">
          {finishGroups.map((fg) => {
            const isChecked = filters.finishGroup.includes(fg.id);
            return (
              <label
                key={fg.id}
                className="flex items-center gap-2 py-1 text-[#77766F] hover:text-[#252522] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem('finishGroup', fg.id)}
                  className="w-3.5 h-3.5 accent-[#756B55]"
                />
                <span className={isChecked ? 'text-[#252522] font-medium' : ''}>
                  {fg.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Material Types */}
      <div className="space-y-2 pt-3 border-t border-[#E3DFD6]">
        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#756B55] block">
          Material
        </label>
        <div className="space-y-1 text-xs">
          {materials.map((mat) => {
            const isChecked = filters.material.includes(mat);
            return (
              <label
                key={mat}
                className="flex items-center gap-2 py-1 text-[#77766F] hover:text-[#252522] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem('material', mat)}
                  className="w-3.5 h-3.5 accent-[#756B55]"
                />
                <span className={isChecked ? 'text-[#252522] font-medium' : ''}>
                  {mat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2 pt-3 border-t border-[#E3DFD6]">
        <div className="flex items-center justify-between text-xs">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-[#756B55]">
            Max Price / Sq.ft
          </label>
          <span className="font-semibold text-[#252522]">
            CAD ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="4"
          max="20"
          step="1"
          value={filters.priceRange[1]}
          onChange={(e) =>
            onChange({
              ...filters,
              priceRange: [filters.priceRange[0], parseFloat(e.target.value)],
            })
          }
          className="w-full accent-[#756B55] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#77766F]">
          <span>$4</span>
          <span>$12</span>
          <span>$20+</span>
        </div>
      </div>
    </div>
  );
}
