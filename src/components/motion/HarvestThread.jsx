import { Children, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMotionSafe, SPRING } from "./useMotionSafe";

/**
 * The page's signature element.
 *
 * A single branch line drawn down the left edge of a section, growing as the
 * reader scrolls. A fruit node sits beside each item and ripens - green to
 * mango, small to full - the moment the line reaches it.
 *
 * It is not decoration: the line is the reading position, and the count of
 * fruit is the count of reasons. It only makes sense on a list where every
 * item carries equal weight, which is why it wraps the "why choose" reasons
 * and nothing else.
 */
export default function HarvestThread({ children, className = "" }) {
  const ref = useRef(null);
  const animate = useMotionSafe();
  const items = Children.toArray(children);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const grow = useSpring(scrollYProgress, { ...SPRING.glide, restDelta: 0.001 });

  return (
    <div ref={ref} className={"relative " + className}>
      {/* the branch: a dormant track with a living line drawn over it */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-[11px] top-2 hidden w-[2px] sm:block"
      >
        <div className="absolute inset-0 rounded-full bg-sage/30" />
        {animate ? (
          <motion.div
            className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-forest via-sage to-mango"
            style={{ scaleY: grow }}
          />
        ) : (
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-forest via-sage to-mango" />
        )}
      </div>

      <div className="space-y-5">
        {items.map((child, i) => (
          <ThreadNode
            key={child.key || i}
            index={i}
            count={items.length}
            progress={grow}
            animate={animate}
          >
            {child}
          </ThreadNode>
        ))}
      </div>
    </div>
  );
}

function ThreadNode({ index, count, progress, animate, children }) {
  // The node ripens over the slice of the branch it actually sits on.
  const at = count > 1 ? index / (count - 1) : 0;
  const span = 0.26;

  const scale = useTransform(progress, [Math.max(at - span, 0), at], [0.7, 1]);
  const hue = useTransform(
    progress,
    [Math.max(at - span, 0), at],
    ["#E78D3A", "#F7A21A"]
  );
  const ring = useTransform(
    progress,
    [Math.max(at - span, 0), at],
    ["rgba(231,141,58,0)", "rgba(247,162,26,0.24)"]
  );

  return (
    <div className="relative sm:pl-10">
      <div
        aria-hidden="true"
        className="absolute left-0 top-1 hidden h-6 w-6 place-items-center sm:grid"
      >
        {animate ? (
          <>
            <motion.span
              className="absolute h-6 w-6 rounded-full"
              style={{ backgroundColor: ring }}
            />
            <motion.span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: hue, scale }}
            />
          </>
        ) : (
          <span className="h-3 w-3 rounded-full bg-mango" />
        )}
      </div>
      {children}
    </div>
  );
}
