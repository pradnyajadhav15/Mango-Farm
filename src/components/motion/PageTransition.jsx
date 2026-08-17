import { motion } from "framer-motion";
import { useMotionSafe, EASE } from "./useMotionSafe";

/**
 * Route change: the outgoing page falls away, the incoming one lifts in.
 * Short on purpose - a transition longer than about a third of a second
 * reads as the site being slow rather than as the site being considered.
 */
export default function PageTransition({ children }) {
  const animate = useMotionSafe();

  if (!animate) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
