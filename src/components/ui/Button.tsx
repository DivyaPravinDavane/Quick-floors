import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantClasses = {
    primary:
      'bg-[#252522] text-[#F7F5F0] hover:bg-[#35372F] focus-visible:ring-[#252522] shadow-sm active:scale-[0.99]',
    secondary:
      'bg-white text-[#252522] border border-[#E3DFD6] hover:bg-[#F7F5F0] hover:border-[#756B55]/40 focus-visible:ring-[#756B55] shadow-xs active:scale-[0.99]',
    outline:
      'bg-transparent text-[#252522] border border-[#252522] hover:bg-[#252522] hover:text-[#F7F5F0] focus-visible:ring-[#252522]',
    accent:
      'bg-[#756B55] text-white hover:bg-[#5C5340] focus-visible:ring-[#756B55] shadow-sm',
    ghost:
      'bg-transparent text-[#252522] hover:bg-[#EEEAE2] hover:text-[#181817] focus-visible:ring-[#252522]',
  };

  const sizeClasses = {
    sm: 'text-xs uppercase tracking-wider px-3.5 py-2 gap-1.5 rounded-none',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-none',
    lg: 'text-base px-7 py-3.5 gap-2.5 rounded-none',
  };

  const content = (
    <>
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], 'group', className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], 'group', className)}
      {...props}
    >
      {content}
    </button>
  );
}
