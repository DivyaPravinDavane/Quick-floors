'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { fadeUp } from '@/lib/animations';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotionPreference();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getCustomVariant = () => {
    if (direction === 'none') {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.55, delay } },
      };
    }

    const yOffset = direction === 'up' ? 20 : direction === 'down' ? -20 : 0;
    const xOffset = direction === 'left' ? 24 : direction === 'right' ? -24 : 0;

    return {
      hidden: { opacity: 0, y: yOffset, x: xOffset },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      },
    };
  };

  return (
    <motion.div
      variants={getCustomVariant()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
