import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMotionSafe } from "./useMotionSafe";

/**
 * Scroll-linked vertical drift for decorative layers.
 *
 * Only ever wrap imagery or ornament in this - body copy that slides at a
 * different speed than the column around it is hard to read, so headings
 * and paragraphs stay put.
 *
 * `distance` is in percent of the element's own height, kept small on
 * purpose so the foreground and background never visibly desync.
 */
export default function Parallax({
  children,
  distance = 12,
  className = "",
  offset = ["start end", "end start"],
}) {
  const ref = useRef(null);
  const animate = useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  if (!animate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Same idea, but the caller supplies the transform. Used by the hero, where
 * the image needs to drift and fade on one shared scroll progress.
 */
export function useSectionScroll(ref, offset = ["start start", "end start"]) {
  return useScroll({ target: ref, offset });
}
