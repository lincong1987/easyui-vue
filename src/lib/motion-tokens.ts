/**
 * EasyUI Vue — Motion Design Tokens
 * Same spring philosophy as the upstream (soft + physical + immediate + controlled).
 * Values are consumed by motion-v's useSpring / motion components.
 */
export const motionTransitions = {
  springGentle: { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 },
  springSmooth: { type: 'spring', stiffness: 200, damping: 28, mass: 0.85 },
  springSnappy: { type: 'spring', stiffness: 380, damping: 30, mass: 0.5 },
  springMorph: { type: 'spring', stiffness: 220, damping: 32, mass: 1.0 },
  springResponsive: { type: 'spring', stiffness: 320, damping: 24, mass: 0.7 },
  springSoft: { type: 'spring', stiffness: 150, damping: 22, mass: 0.9 },
  easeSoft: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  easeFast: { duration: 0.2, ease: [0.2, 0, 0, 1] },
} as const;

export type MotionTransition = (typeof motionTransitions)[keyof typeof motionTransitions];
