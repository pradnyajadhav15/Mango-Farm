import { motion } from "framer-motion";
import { useMotionSafe, EASE, DUR, VIEWPORT } from "./useMotionSafe";

/**
 * Reveals a headline word by word, each word rising out of its own mask.
 *
 * Reserved for the two image heroes. Everything else on the site uses
 * MaskReveal, which rises as one line - so when this does run, it reads as
 * the page's opening statement rather than as the way headings behave.
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
  stagger = 0.07,
  duration = DUR.lg,
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
      ? { whileInView: "show", viewport: VIEWPORT }
      : { animate: "show" };

  return (
    <Tag className={className}>
      {/* The orchestration lives in the parent's own variants. Passing
          staggerChildren through a bare `transition` prop looks equivalent
          but is silently ignored: with no variants map of its own, the
          parent never resolves a variant to attach the timing to, and the
          words appear all at once instead of rising in sequence. */}
      <motion.span
        className="inline"
        initial="hidden"
        {...motionProps}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
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
                transition={{ duration, ease: EASE.out }}
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
