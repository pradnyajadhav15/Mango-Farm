import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMotionSafe, useFinePointer, SPRING } from "./useMotionSafe";

/**
 * Scroll-linked vertical drift for imagery.
 *
 * Deliberately small - 7% of the element's height, down from 12. Parallax
 * works when you notice the depth and not the effect; past roughly 10% the
 * layer visibly slides against everything around it, which is the point at
 * which it stops reading as a photograph sitting behind the page.
 *
 * Off entirely below tablet width. On a phone the viewport is short enough
 * that a layer moving against the scroll reads as a rendering fault, and it
 * costs a compositor layer on the device least able to spare one.
 *
 * Only ever wrap imagery or ornament in this. Body copy that slides at a
 * different speed than its own column is hard to read.
 */
export default function Parallax({
  children,
  distance = 7,
  className = "",
  offset = ["start end", "end start"],
}) {
  const ref = useRef(null);
  const animate = useMotionSafe();
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, SPRING.glide);

  // One element tree either way - see SpotlightCard for why.
  const active = animate && fine;

  return (
    <div ref={ref} className={className}>
      <motion.div style={active ? { y, willChange: "transform" } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}
