import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionSafe } from "./useMotionSafe";

/**
 * Card that tips a few degrees toward the cursor and carries a soft warm
 * spotlight under the pointer. Both are capped low - the card should feel
 * like it is catching light, not like it is being thrown around.
 *
 * Everything is driven by transform and a background layer, so the card never
 * triggers layout while the pointer moves across it.
 */
export default function SpotlightCard({ children, className = "", max = 6 }) {
  const ref = useRef(null);
  const animate = useMotionSafe();
  const [lit, setLit] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 20,
  });

  const glowX = useTransform(px, (v) => v * 100 + "%");
  const glowY = useTransform(py, (v) => v * 100 + "%");

  if (!animate) return <div className={className}>{children}</div>;

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    if (!lit) setLit(true);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setLit(false);
  };

  return (
    <motion.div
      ref={ref}
      className={"relative [transform-style:preserve-3d] " + className}
      style={{ perspective: 1000, rotateX: rx, rotateY: ry }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-blob transition-opacity duration-300"
        style={{
          opacity: lit ? 1 : 0,
          background: "radial-gradient(220px circle at var(--gx) var(--gy), rgba(232,160,76,0.20), transparent 65%)",
          "--gx": glowX,
          "--gy": glowY,
        }}
      />
    </motion.div>
  );
}
