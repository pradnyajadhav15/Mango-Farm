import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { useMotionSafe, EASE } from "./useMotionSafe";

/**
 * Every section on the page opens the same way: the heading rises out of its
 * mask word by word, then the dotted rule draws outward from the mango pip in
 * the middle. Repeating one entrance across the page is what makes the hero's
 * bigger version read as the exception rather than as noise.
 */
export default function SectionHeading({
  children,
  eyebrow,
  className = "",
  headingClassName = "text-3xl",
  align = "center",
  as = "h2",
}) {
  const animate = useMotionSafe();
  const centered = align === "center";

  return (
    <div className={(centered ? "text-center " : "") + className}>
      {eyebrow ? (
        <motion.p
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-mango"
          initial={animate ? { opacity: 0, y: 10 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <SplitText
        as={as}
        text={children}
        trigger="view"
        stagger={0.045}
        duration={0.66}
        className={"font-display font-bold leading-tight text-forest " + headingClassName}
      />

      <DrawnRule centered={centered} />
    </div>
  );
}

/** The dotted rule, drawn outward from its centre pip. */
export function DrawnRule({ centered = true }) {
  const animate = useMotionSafe();
  const line = "dot-rule h-[14px] flex-1 rounded-full opacity-70";

  const grow = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
  };

  return (
    <motion.div
      aria-hidden="true"
      className={"mt-4 flex w-32 items-center gap-2 " + (centered ? "mx-auto" : "")}
      initial={animate ? "hidden" : false}
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.span className={line} style={{ originX: 1 }} variants={grow} />
      <motion.span
        className="h-2 w-2 rotate-45 rounded-[2px] bg-mango"
        variants={{
          hidden: { scale: 0 },
          show: { scale: 1, transition: { duration: 0.4, ease: EASE } },
        }}
      />
      <motion.span className={line} style={{ originX: 0 }} variants={grow} />
    </motion.div>
  );
}
