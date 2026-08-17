import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { DrawnRule } from "./SectionHeading";
import { useMotionSafe, EASE } from "./useMotionSafe";

/**
 * The banner every inner page opens with. It is the section heading from the
 * home page at a larger size, so arriving on About or Gallery feels like
 * staying inside the same site rather than landing somewhere else.
 */
export default function PageHeader({ title, subtitle, className = "" }) {
  const animate = useMotionSafe();

  return (
    <div className={"bg-orchard py-14 text-center " + className}>
      <SplitText
        as="h1"
        text={title}
        stagger={0.06}
        duration={0.8}
        className="font-display text-4xl font-bold text-forest md:text-5xl"
      />
      {subtitle ? (
        <motion.p
          className="mt-2 text-gray-600"
          initial={animate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      ) : null}
      <DrawnRule />
    </div>
  );
}
