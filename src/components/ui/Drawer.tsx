'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'right' | 'left';
  widthClass?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  side = 'right',
  widthClass = 'max-w-md',
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const slideVariants = {
    closed: {
      x: side === 'right' ? '100%' : '-100%',
      transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] as const },
    },
    open: {
      x: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#252522]/50 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className={`fixed inset-y-0 ${side === 'right' ? 'right-0' : 'left-0'} flex max-w-full`}>
            <motion.div
              variants={slideVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className={`w-screen ${widthClass} bg-white shadow-2xl flex flex-col z-10 border-${side === 'right' ? 'l' : 'r'} border-[#E3DFD6]`}
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#E3DFD6] flex items-center justify-between bg-[#F7F5F0]/60">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#252522] tracking-tight">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-[#77766F] mt-1">{subtitle}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#77766F] hover:text-[#252522] hover:bg-white transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="p-5 sm:p-6 border-t border-[#E3DFD6] bg-[#F7F5F0]/80">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
