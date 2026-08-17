import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionSafe } from "./useMotionSafe";

/**
 * Pulls a control a few pixels toward the cursor while it is hovered, then
 * springs back on leave. The pull is capped well below the control's own
 * padding so the pointer never falls outside the thing it is dragging.
 *
 * Pointer-only: touch devices and reduced-motion users get the plain control,
 * which is the right call - there is no cursor to be magnetic toward.
 */
export default function Magnetic({ children, strength = 14, className = "" }) {
  const ref = useRef(null);
  const animate = useMotionSafe();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.35 });

  if (!animate) {
    return <div className={"inline-block " + className}>{children}</div>;
  }

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
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
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  );
}
