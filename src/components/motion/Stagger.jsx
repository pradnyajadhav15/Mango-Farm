import { createElement } from "react";
import { motion } from "framer-motion";
import { useMotionSafe, EASE, DUR, DIST, VIEWPORT } from "./useMotionSafe";

/**
 * Grid entrance: the group waits until it is properly in view, then hands
 * each child its turn.
 *
 * The stagger is short on purpose. A long one turns a four-card row into a
 * queue the reader has to wait out; 60ms reads as one gesture with internal
 * order, which is what a row of cards actually is.
 *
 * Both halves take an `as` so a staggered list can still be a real <ul>/<li>
 * rather than a pile of divs wearing list clothing.
 */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.06,
  delay = 0,
  amount,
  as = "div",
}) {
  const animate = useMotionSafe();

  if (!animate) return createElement(as, { className }, children);

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

const PRESETS = {
  rise: { hidden: { opacity: 0, y: DIST.md }, show: { opacity: 1, y: 0 } },
  scale: {
    hidden: { opacity: 0, y: DIST.sm, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -DIST.sm }, show: { opacity: 1, x: 0 } },
};

export function StaggerItem({
  children,
  className = "",
  preset = "rise",
  duration = DUR.md,
  as = "div",
}) {
  const animate = useMotionSafe();

  if (!animate) return createElement(as, { className }, children);

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      variants={PRESETS[preset] || PRESETS.rise}
      transition={{ duration, ease: EASE.out }}
    >
      {children}
    </Tag>
  );
}
