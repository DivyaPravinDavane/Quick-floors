import React from 'react';
import { AnimatedHeading } from '@/components/motion/AnimatedHeading';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'split';
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'left',
  action,
  className,
  titleClassName,
}: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <div className={cn('flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E3DFD6]', className)}>
        <div className="max-w-2xl">
          {eyebrow && (
            <Reveal direction="up" delay={0.05}>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#756B55] font-semibold mb-3 block">
                {eyebrow}
              </span>
            </Reveal>
          )}
          <AnimatedHeading as="h2" className={cn('text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#252522] leading-[1.15]', titleClassName)}>
            {title}
          </AnimatedHeading>
          {subtitle && (
            <p className="mt-2 text-lg text-[#756B55] font-serif italic">
              {subtitle}
            </p>
          )}
          {description && (
            <Reveal direction="up" delay={0.15}>
              <p className="mt-3 text-sm sm:text-base text-[#77766F] leading-relaxed max-w-xl">
                {description}
              </p>
            </Reveal>
          )}
        </div>
        {action && (
          <Reveal direction="up" delay={0.2} className="shrink-0">
            {action}
          </Reveal>
        )}
      </div>
    );
  }

  const isCenter = align === 'center';

  return (
    <div className={cn('mb-10 lg:mb-14', isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl', className)}>
      {eyebrow && (
        <Reveal direction="up" delay={0.05}>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#756B55] font-semibold mb-3 block">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <AnimatedHeading as="h2" className={cn('text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#252522] leading-[1.15]', titleClassName)}>
        {title}
      </AnimatedHeading>
      {subtitle && (
        <p className="mt-2 text-lg text-[#756B55] font-serif italic">
          {subtitle}
        </p>
      )}
      {description && (
        <Reveal direction="up" delay={0.15}>
          <p className="mt-4 text-sm sm:text-base text-[#77766F] leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
      {action && (
        <Reveal direction="up" delay={0.2} className="mt-6">
          {action}
        </Reveal>
      )}
    </div>
  );
}
