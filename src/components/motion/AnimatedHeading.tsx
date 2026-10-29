'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  children: React.ReactNode;
  className?: string;
  delay?: number;
  maskReveal?: boolean;
}

export function AnimatedHeading({
  as: Component = 'h2',
  children,
  className = '',
  delay = 0,
  maskReveal = true,
}: AnimatedHeadingProps) {
  const reducedMotion = useReducedMotionPreference();

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  if (maskReveal) {
    return (
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{
            duration: 0.75,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Component className={className}>{children}</Component>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Component className={className}>{children}</Component>
    </motion.div>
  );
}
