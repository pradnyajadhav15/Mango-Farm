import { motion } from "framer-motion";
import { useMotionSafe, EASE, DUR, VIEWPORT } from "./useMotionSafe";

/**
 * A line of type rising once, as a single unit, from behind a clipped edge.
 *
 * This is the section-heading entrance. It used to be a word-by-word split,
 * on all eight headings - which meant the hero's split headline was just the
 * loudest instance of something the page did constantly, instead of the one
 * moment that earns it. Splitting is now hero-only, and everything else
 * arrives this way: quieter, and over in two thirds of a second.
 */
export default function MaskReveal({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  duration = DUR.md,
  trigger = "view",
}) {
  const animate = useMotionSafe();

  if (!animate) return <Tag className={className}>{text}</Tag>;

  const motionProps =
    trigger === "view"
      ? { whileInView: "show", viewport: VIEWPORT }
      : { animate: "show" };

  return (
    <Tag className={className}>
      <span
        className="inline-block overflow-hidden align-bottom"
        style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
      >
        <motion.span
          className="inline-block"
          initial="hidden"
          {...motionProps}
          variants={{
            hidden: { y: "108%" },
            show: { y: "0%" },
          }}
          transition={{ duration, delay, ease: EASE.out }}
        >
          {text}
        </motion.span>
      </span>
    </Tag>
  );
}
