'use client';

import React from 'react';
import Image from 'next/image';

interface PreviewFallbackProps {
  materialName: string;
  isLoading?: boolean;
}

export function PreviewFallback({
  materialName,
  isLoading = false,
}: PreviewFallbackProps) {
  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#EEEAE2] overflow-hidden flex items-center justify-center border border-[#E3DFD6]">
      <Image
        src="https://www.quickfloors.ca/image/cache/catalog/aaa/web-header-open-v3-2-1365x525.jpg"
        alt="Quick Floors Room Preview"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />

      <div className="absolute inset-0 bg-[#252522]/30 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center text-white">
        {isLoading ? (
          <div className="space-y-3">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg tracking-tight">Initializing 3D Lighting & Materials...</p>
            <p className="text-xs text-[#EEEAE2]">Loading {materialName}</p>
          </div>
        ) : (
          <div className="space-y-2 bg-[#252522]/80 p-5 max-w-sm border border-white/20">
            <p className="text-xs uppercase tracking-widest text-[#B28B61] font-semibold">Architectural Room</p>
            <p className="font-serif text-xl">{materialName}</p>
            <p className="text-xs text-[#EEEAE2]">
              WebGL hardware acceleration mode active. Rotate to explore ambient illumination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
