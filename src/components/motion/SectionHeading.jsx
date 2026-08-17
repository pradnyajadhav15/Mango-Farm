import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { useMotionSafe, EASE, DUR, VIEWPORT } from "./useMotionSafe";

/**
 * Every section opens the same way: the heading rises once out of its mask,
 * then the dotted rule draws outward from the mango pip beneath it.
 *
 * Two beats, in order - not three things at once. The rule waits for the
 * heading to land rather than racing it, which is most of the difference
 * between "animated" and "directed".
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
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.sm, ease: EASE.out }}
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <MaskReveal
        as={as}
        text={children}
        className={"font-display font-bold leading-tight text-forest " + headingClassName}
      />

      <DrawnRule centered={centered} />
    </div>
  );
}

/** The dotted rule, drawn outward from its centre pip once the heading lands. */
export function DrawnRule({ centered = true }) {
  const animate = useMotionSafe();
  const line = "dot-rule h-[14px] flex-1 rounded-full opacity-70";

  const grow = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: DUR.md, ease: EASE.out, delay: 0.34 },
    },
  };

  return (
    <motion.div
      aria-hidden="true"
      className={"mt-4 flex w-32 items-center gap-2 " + (centered ? "mx-auto" : "")}
      initial={animate ? "hidden" : false}
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.span className={line} style={{ originX: 1 }} variants={grow} />
      <motion.span
        className="h-2 w-2 rotate-45 rounded-[2px] bg-mango"
        variants={{
          hidden: { scale: 0 },
          show: { scale: 1, transition: { duration: DUR.sm, ease: EASE.out, delay: 0.28 } },
        }}
      />
      <motion.span className={line} style={{ originX: 0 }} variants={grow} />
    </motion.div>
  );
}
