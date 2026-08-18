import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export { EASE, DUR, DIST, SPRING, VIEWPORT } from "./tokens";

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

/**
 * True only for a real pointer on a screen wide enough for the effect to
 * land. Guards the two effects that have no meaning without a cursor -
 * magnetic pull and card tilt - and keeps scroll-linked parallax off phones,
 * where a layer sliding against the scroll reads as a rendering fault rather
 * than as depth.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fine;
}
