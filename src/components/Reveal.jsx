import { motion } from "framer-motion";
import { useMotionSafe, EASE } from "./motion/useMotionSafe";

/**
 * Wraps any block and fades/slides it in when it scrolls into view.
 * Content inside is never touched - this is purely a motion wrapper.
 *
 * <Reveal delay={0.1}>...your existing markup...</Reveal>
 *
 * `preset` picks how the block arrives:
 *   rise  - lifts from below (the page default)
 *   mask  - wipes upward from behind a clipped edge, for imagery
 *   scale - settles in from slightly small, for cards that need weight
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  preset = "rise",
  duration = 0.6,
  amount = 0.15,
}) {
  const animate = useMotionSafe();

  if (!animate) return <div className={className}>{children}</div>;

  const presets = {
    rise: {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
    },
    mask: {
      initial: { opacity: 0, clipPath: "inset(18% 0 0 0)", y: y * 0.5 },
      whileInView: { opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0 },
    },
    scale: {
      initial: { opacity: 0, y: y * 0.6, scale: 0.965 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
    },
  };

  const v = presets[preset] || presets.rise;

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
