import { useReducedMotion } from "framer-motion";

/**
 * One place to decide whether motion should run.
 *
 * Every primitive in this folder calls this and, when it returns false,
 * renders the finished state immediately instead of animating toward it.
 * That keeps the page readable for people who ask their OS to reduce motion,
 * and keeps crawlers from ever meeting an invisible-by-default element.
 */
export function useMotionSafe() {
  return !useReducedMotion();
}

/** Shared easing so every reveal on the page shares one hand. */
export const EASE = [0.22, 1, 0.36, 1];

/** Slower, heavier easing for large surfaces (hero image, pinned cards). */
export const EASE_SOFT = [0.16, 1, 0.3, 1];
