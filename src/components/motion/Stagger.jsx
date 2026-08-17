import { createElement } from "react";
import { motion } from "framer-motion";
import { useMotionSafe, EASE } from "./useMotionSafe";

/**
 * Grid entrance: the group waits until it is in view, then hands each child
 * its turn. Stagger stays under ~8 items per group so the last card never
 * feels like it is lagging behind the reader.
 *
 * Both halves take an `as` so a staggered list can still be a real <ul>/<li>
 * rather than a pile of divs wearing list clothing.
 */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
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
      viewport={{ once: true, amount }}
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
  rise: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, y: 18, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -22 }, show: { opacity: 1, x: 0 } },
};

export function StaggerItem({
  children,
  className = "",
  preset = "rise",
  duration = 0.6,
  as = "div",
}) {
  const animate = useMotionSafe();

  if (!animate) return createElement(as, { className }, children);

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      variants={PRESETS[preset] || PRESETS.rise}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
