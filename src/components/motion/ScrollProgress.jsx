import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionSafe } from "./useMotionSafe";

/**
 * A thin ripening bar across the very top of the window that fills from
 * green to mango as the page is read. It tells the visitor how much orchard
 * is left below the fold, which is the whole reason they keep scrolling.
 */
export default function ScrollProgress() {
  const animate = useMotionSafe();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  if (!animate) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-forest via-sage to-mango"
      style={{ scaleX }}
    />
  );
}
