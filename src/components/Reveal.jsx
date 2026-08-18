import { motion } from "framer-motion";
import { useMotionSafe, EASE, DUR, DIST, VIEWPORT } from "./motion/useMotionSafe";

/**
 * Wraps any block and settles it into place when it scrolls into view.
 * Content inside is never touched - this is purely a motion wrapper.
 *
 * <Reveal delay={0.1}>...your existing markup...</Reveal>
 *
 * `preset` picks how the block arrives:
 *   rise  - lifts a short way from below (the page default)
 *   mask  - wipes upward from behind a clipped edge, for imagery
 *   scale - settles in from fractionally small, for cards that need weight
 *
 * Travel is deliberately small. The earlier version moved 28px and fired at
 * 15% visibility, so blocks were still sliding while barely on screen; now
 * they wait until they are properly in frame and move 18px.
 */
export default function Reveal({
  children,
  delay = 0,
  y = DIST.md,
  className = "",
  preset = "rise",
  duration = DUR.md,
  amount,
}) {
  const animate = useMotionSafe();

  if (!animate) return <div className={className}>{children}</div>;

  const presets = {
    rise: {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
    },
    mask: {
      initial: { opacity: 0, clipPath: "inset(12% 0 0 0)", y: y * 0.4 },
      whileInView: { opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0 },
    },
    scale: {
      initial: { opacity: 0, y: y * 0.5, scale: 0.985 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
    },
  };

  const v = presets[preset] || presets.rise;

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
      transition={{ duration, delay, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}
