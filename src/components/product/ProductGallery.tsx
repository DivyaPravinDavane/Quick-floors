'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const displayImages = images.length > 0 ? images : ['/images/placeholder.jpg'];
  const activeImage = displayImages[activeIdx] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Large Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] bg-[#EEEAE2] border border-[#E3DFD6] overflow-hidden group">
        <Image
          src={activeImage}
          alt={`${productName} view ${activeIdx + 1}`}
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-104 cursor-zoom-in"
          onClick={() => setIsFullscreen(true)}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Zoom Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-xs text-[#252522] hover:bg-white shadow-sm border border-[#E3DFD6] transition-colors"
          aria-label="View fullscreen image"
          title="Fullscreen Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 h-20 bg-[#EEEAE2] border-2 transition-all shrink-0 overflow-hidden cursor-pointer ${
                activeIdx === idx
                  ? 'border-[#252522] shadow-xs'
                  : 'border-[#E3DFD6] opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      <Modal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        size="full"
        title={productName}
      >
        <div className="relative w-full h-[75vh] flex items-center justify-center bg-[#181817]">
          <Image
            src={activeImage}
            alt={productName}
            fill
            className="object-contain"
            sizes="95vw"
          />
        </div>
      </Modal>
    </div>
  );
}
