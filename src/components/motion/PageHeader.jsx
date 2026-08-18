import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { DrawnRule } from "./SectionHeading";
import { useMotionSafe, EASE, DUR, DIST } from "./useMotionSafe";

/**
 * The banner every inner page opens with: the same single-line rise as the
 * section headings, just larger. Word-by-word splitting is reserved for the
 * two image heroes, so these read as arrivals rather than as events.
 */
export default function PageHeader({ title, subtitle, className = "" }) {
  const animate = useMotionSafe();

  return (
    <div className={"bg-orchard py-14 text-center " + className}>
      <MaskReveal
        as="h1"
        text={title}
        trigger="load"
        duration={DUR.lg}
        className="font-display text-4xl font-bold text-forest md:text-5xl"
      />
      {subtitle ? (
        <motion.p
          className="mt-2 text-gray-600"
          initial={animate ? { opacity: 0, y: DIST.xs } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.md, delay: 0.3, ease: EASE.out }}
        >
          {subtitle}
        </motion.p>
      ) : null}
      <DrawnRule />
    </div>
  );
}
