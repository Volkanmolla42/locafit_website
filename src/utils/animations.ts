import { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const slideIn: Variants = {
  hidden: (direction: 'left' | 'right' = 'right') => ({
    x: direction === 'left' ? -100 : 100,
    opacity: 0
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const rotateIn: Variants = {
  hidden: { rotate: -180, opacity: 0, scale: 0.8 },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const bounceIn: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: {
    scale: [0.3, 1.1, 0.9, 1],
    opacity: 1,
    transition: { duration: 0.6, times: [0, 0.6, 0.8, 1] }
  }
}
