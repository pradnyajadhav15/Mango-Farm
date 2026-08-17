import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionSafe, useFinePointer, SPRING } from "./useMotionSafe";

/**
 * Pulls a control a few pixels toward the cursor while it is hovered, then
 * settles back on leave.
 *
 * The spring is overdamped, so the control tracks the pointer and stops -
 * the earlier one was light enough to ring slightly after a fast exit, which
 * is the difference between a control that feels weighted and one that feels
 * springy. The pull is also capped well below the control's own padding, so
 * the pointer never falls outside the thing it is dragging.
 */
export default function Magnetic({ children, strength = 10, className = "" }) {
  const ref = useRef(null);
  const animate = useMotionSafe();
  const fine = useFinePointer();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING.drift);
  const y = useSpring(my, SPRING.drift);

  // One element tree either way - see SpotlightCard for why.
  const active = animate && fine;

  const onMove = (e) => {
    if (!active) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={"inline-block " + className}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  );
}
