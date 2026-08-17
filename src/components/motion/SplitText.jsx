import { motion } from "framer-motion";
import { useMotionSafe, EASE } from "./useMotionSafe";

/**
 * Reveals a headline word by word, each word rising out of its own mask.
 * The text is never re-written or re-cased - it is split on spaces only,
 * so Hindi and Marathi headlines split exactly the same way English does.
 *
 * The sentence appears in the DOM exactly once, in reading order, with real
 * spaces between the words rather than a second hidden copy. A crawler and a
 * screen reader both get one clean headline; the masks are pure presentation.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.055,
  duration = 0.75,
  y = "110%",
  trigger = "load",
}) {
  const animate = useMotionSafe();
  const words = String(text).split(/\s+/).filter(Boolean);

  if (!animate) {
    return <Tag className={className}>{text}</Tag>;
  }

  const motionProps =
    trigger === "view"
      ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : { animate: "show" };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        {...motionProps}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={word + i}>
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y, opacity: 0 },
                  show: { y: "0%", opacity: 1 },
                }}
                transition={{ duration, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
