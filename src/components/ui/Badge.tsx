import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'stone' | 'outline' | 'success';
}

export function Badge({
  children,
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-[#EEEAE2] text-[#252522] border-transparent',
    accent: 'bg-[#756B55] text-white border-transparent',
    stone: 'bg-[#F7F5F0] text-[#756B55] border-[#E3DFD6]',
    outline: 'bg-transparent text-[#252522] border-[#252522]/30',
    success: 'bg-[#35372F] text-[#F7F5F0] border-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 border',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
