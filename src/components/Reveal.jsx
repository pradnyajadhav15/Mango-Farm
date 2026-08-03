import { motion } from "framer-motion";

/**
 * Wraps any block and fades/slides it in when it scrolls into view.
 * Content inside is never touched - this is purely a motion wrapper.
 *
 * <Reveal delay={0.1}>...your existing markup...</Reveal>
 */
export default function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}