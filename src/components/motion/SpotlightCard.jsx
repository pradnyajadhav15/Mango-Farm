import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionSafe, useFinePointer, SPRING } from "./useMotionSafe";

/**
 * Card that tips fractionally toward the cursor and carries a soft warm
 * spotlight under the pointer.
 *
 * Two things changed here. The tilt is 3 degrees rather than 6 - past about
 * four the card stops catching light and starts wobbling. And the lift on
 * hover is gone from this component: it used to run a spring here while the
 * CSS `card-lift` class ran a transition on the same card, so two systems
 * fought over one transform. The lift is now CSS only, everywhere.
 *
 * Mounts as a plain wrapper without a fine pointer, so phones carry none of
 * this and no springs are left running against a touch that cannot tilt.
 */
export default function SpotlightCard({ children, className = "", max = 3 }) {
  const ref = useRef(null);
  const animate = useMotionSafe();
  const fine = useFinePointer();
  const [lit, setLit] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING.drift);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING.drift);

  const glowX = useTransform(px, (v) => v * 100 + "%");
  const glowY = useTransform(py, (v) => v * 100 + "%");

  // The wrapper is always the same element. Swapping between a plain div and
  // a motion.div once the pointer query resolves would remount the card and
  // flash its image, so only the handlers and the transform are conditional.
  const active = animate && fine;

  const onMove = (e) => {
    if (!active) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    if (!lit) setLit(true);
  };

  const onLeave = () => {
    if (!active) return;
    px.set(0.5);
    py.set(0.5);
    setLit(false);
  };

  return (
    <motion.div
      ref={ref}
      className={"relative " + (active ? "[transform-style:preserve-3d] " : "") + className}
      style={active ? { perspective: 1200, rotateX: rx, rotateY: ry } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {active && <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-blob transition-opacity duration-500"
        style={{
          opacity: lit ? 1 : 0,
          background:
            "radial-gradient(240px circle at var(--gx) var(--gy), rgba(247,162,26,0.15), transparent 70%)",
          "--gx": glowX,
          "--gy": glowY,
        }}
      />}
    </motion.div>
  );
}
