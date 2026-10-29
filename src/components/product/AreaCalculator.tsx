'use client';

import React, { useState } from 'react';
import { Calculator, ShoppingBag, Check, HelpCircle, Layers } from 'lucide-react';
import { Product } from '@/types/flooring';
import { calculateFlooring } from '@/lib/calculateFlooring';
import { formatCurrency } from '@/lib/formatCurrency';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/Button';

interface AreaCalculatorProps {
  product: Product;
}

export function AreaCalculator({ product }: AreaCalculatorProps) {
  const { addToCart } = useStore();
  const [length, setLength] = useState<number>(14);
  const [width, setWidth] = useState<number>(12);
  const [wastePercentage, setWastePercentage] = useState<number>(10);
  const [added, setAdded] = useState(false);

  const coveragePerBox = product.coveragePerBox || 20;

  const result = calculateFlooring({
    lengthFeet: length || 0,
    widthFeet: width || 0,
    wastePercentage,
    coveragePerBox,
  });

  const totalCost = result.boxesNeeded * coveragePerBox * product.price;

  const handleAddCalculated = () => {
    addToCart(product, result.boxesNeeded, result.totalAreaWithWasteSqFt);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#F7F5F0] border border-[#E3DFD6] p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-[#E3DFD6] pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#756B55]">
          <Calculator className="w-4 h-4 text-[#B28B61]" />
          <span>Square-Foot Room Calculator</span>
        </div>
        <span className="text-[11px] text-[#77766F]">
          {coveragePerBox} sq.ft / box
        </span>
      </div>

      {/* Input Dimensions */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#252522] mb-1">
            Room Length (Feet)
          </label>
          <input
            type="number"
            min="1"
            max="200"
            value={length || ''}
            onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-[#E3DFD6] px-3 py-2 text-sm text-[#252522] outline-none focus:border-[#756B55]"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#252522] mb-1">
            Room Width (Feet)
          </label>
          <input
            type="number"
            min="1"
            max="200"
            value={width || ''}
            onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-[#E3DFD6] px-3 py-2 text-sm text-[#252522] outline-none focus:border-[#756B55]"
          />
        </div>
      </div>

      {/* Waste Allowance Presets */}
      <div>
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#252522]">
            Recommended Waste Factor
          </span>
          <span className="text-[#756B55] font-medium">{wastePercentage}% allowance</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 10, label: '10% (Straight Lay)' },
            { value: 15, label: '15% (Diagonal / Rooms with Angles)' },
            { value: 20, label: '20% (Herringbone / Complex)' },
          ].map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setWastePercentage(preset.value)}
              className={`py-1.5 px-2 text-left text-[11px] border transition-colors ${
                wastePercentage === preset.value
                  ? 'bg-[#252522] text-white border-[#252522] font-semibold'
                  : 'bg-white text-[#77766F] border-[#E3DFD6] hover:bg-[#EEEAE2]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        <div className="bg-white p-3 border border-[#E3DFD6]">
          <span className="text-[10px] uppercase text-[#77766F] block">Net Area</span>
          <span className="text-sm sm:text-base font-semibold text-[#252522]">
            {result.baseAreaSqFt} <span className="text-xs font-normal">sq.ft</span>
          </span>
        </div>

        <div className="bg-white p-3 border border-[#E3DFD6]">
          <span className="text-[10px] uppercase text-[#77766F] block">Area + Waste</span>
          <span className="text-sm sm:text-base font-semibold text-[#252522]">
            {result.totalAreaWithWasteSqFt} <span className="text-xs font-normal">sq.ft</span>
          </span>
        </div>

        <div className="bg-white p-3 border border-[#E3DFD6]">
          <span className="text-[10px] uppercase text-[#77766F] block">Boxes Required</span>
          <span className="text-sm sm:text-base font-bold text-[#756B55]">
            {result.boxesNeeded} <span className="text-xs font-normal">boxes</span>
          </span>
        </div>

        <div className="bg-white p-3 border border-[#E3DFD6]">
          <span className="text-[10px] uppercase text-[#77766F] block">Est. Material Cost</span>
          <span className="text-sm sm:text-base font-bold text-[#252522]">
            {formatCurrency(totalCost)}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-[#77766F] flex items-start gap-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-[#756B55] shrink-0 mt-0.5" />
        <span>
          Includes {result.actualCoverageSqFt} sq.ft total coverage ({result.overageSqFt} sq.ft excess for cutting and future attic stock).
        </span>
      </div>

      {/* Action button */}
      <Button
        variant="primary"
        size="md"
        className="w-full"
        onClick={handleAddCalculated}
        disabled={result.boxesNeeded <= 0}
        icon={added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
      >
        {added
          ? `Added ${result.boxesNeeded} Boxes to Cart!`
          : `Add ${result.boxesNeeded} Boxes to Cart (${formatCurrency(totalCost)})`}
      </Button>
    </div>
  );
}
