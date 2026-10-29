'use client';

import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { FlooringMaterial } from '@/data/flooringMaterials';

interface MaterialSelectorProps {
  materials: FlooringMaterial[];
  selectedId: string;
  onSelect: (material: FlooringMaterial) => void;
}

export function MaterialSelector({
  materials,
  selectedId,
  onSelect,
}: MaterialSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#756B55]">
          Select Representative Finish
        </label>
        <span className="text-[11px] text-[#77766F] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#B28B61]" />
          Instant Real-Time Preview
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {materials.map((mat) => {
          const isSelected = mat.id === selectedId;

          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelect(mat)}
              aria-pressed={isSelected}
              className={`p-3 text-left border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#252522] shadow-sm ring-1 ring-[#252522]'
                  : 'bg-[#F7F5F0] border-[#E3DFD6] hover:bg-white hover:border-[#756B55]/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Visual Swatch */}
                <div
                  className="w-7 h-7 rounded-none shrink-0 border border-[#252522]/20 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: mat.thumbnailColor }}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        mat.id === 'dark-stone' ? 'text-white' : 'text-[#252522]'
                      }`}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#252522] truncate">
                    {mat.name}
                  </p>
                  <p className="text-[10px] text-[#77766F] truncate">
                    {mat.category.toUpperCase()} • {mat.sampleTag}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
