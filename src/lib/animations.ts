import { Variants } from 'framer-motion';

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_SMOOTH,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE_SMOOTH,
    },
  },
};

export const imageReveal: Variants = {
  hidden: {
    clipPath: 'inset(10% 0% 10% 0%)',
    opacity: 0,
    scale: 1.05,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const subtleScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_SMOOTH,
    },
  },
};

export const headingReveal: Variants = {
  hidden: {
    opacity: 0,
    y: '40%',
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.7,
      ease: EASE_OUT_EXPO,
    },
  },
};
