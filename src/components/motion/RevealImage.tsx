'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface RevealImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  delay?: number;
}

export function RevealImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  imageClassName = '',
  aspectRatio,
  delay = 0,
}: RevealImageProps) {
  const reducedMotion = useReducedMotionPreference();

  if (reducedMotion) {
    return (
      <div className={`overflow-hidden relative ${className}`} style={{ aspectRatio }}>
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={`object-cover ${imageClassName}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 400}
            priority={priority}
            className={`w-full h-auto object-cover ${imageClassName}`}
          />
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ clipPath: 'inset(10% 0% 10% 0%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`overflow-hidden relative ${className}`}
      style={{ aspectRatio }}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 1.1,
          delay: delay + 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full h-full"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${imageClassName}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 400}
            priority={priority}
            className={`w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 ${imageClassName}`}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
