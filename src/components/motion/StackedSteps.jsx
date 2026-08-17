import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionSafe, EASE, DUR, DIST, VIEWPORT } from "./useMotionSafe";

/**
 * The ordering flow, dealt out as a deck.
 *
 * Each step pins to the top and the one before it settles back a little, so
 * the reader moves through the three steps in order and can only be looking
 * at one at a time. The numbering is real here - this is a sequence, and the
 * order is information the reader needs.
 *
 * Only one section on the page pins; stacking is desktop-only, because on a
 * phone it fights the native scroll far more than it helps.
 */
export default function StackedSteps({ steps, renderStep, topOffset = 132 }) {
  const ref = useRef(null);
  const animate = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // No motion means no deck - the steps go back to sitting side by side,
  // which is the clearest way to read three short cards without animation.
  if (!animate) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n}>{renderStep(s, i)}</div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Phones: a plain, fully readable column. */}
      <div className="grid gap-6 md:hidden">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={animate ? { opacity: 0, y: DIST.md } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.md, ease: EASE.out }}
          >
            {renderStep(s, i)}
          </motion.div>
        ))}
      </div>

      <div ref={ref} className="hidden md:block">
        {steps.map((s, i) => (
          <StepCard
            key={s.n}
            index={i}
            total={steps.length}
            progress={scrollYProgress}
            topOffset={topOffset}
            animate={animate}
          >
            {renderStep(s, i)}
          </StepCard>
        ))}
      </div>
    </>
  );
}

function StepCard({ index, total, progress, topOffset, animate, children }) {
  // Each card owns one slice of the section's scroll. Once the next card
  // starts covering it, this one settles back and dims a little.
  const start = index / total;
  const end = (index + 1) / total;

  // The card behind settles back rather than shrinking away: 3% of scale and
  // a light dim is enough to read as depth. The earlier 6% and 45% dim made
  // the deck feel like it was collapsing.
  const scale = useTransform(progress, [start, end], [1, 0.97]);
  const opacity = useTransform(progress, [start, end], [1, 0.72]);
  const last = index === total - 1;

  return (
    <div
      className="sticky"
      style={{
        // Clears the fixed navbar, plus the season banner when it is showing.
        top: "calc(var(--mf-banner-h, 0px) + " + (topOffset + index * 16) + "px)",
        marginBottom: last ? 0 : "16vh",
        zIndex: index + 1,
      }}
    >
      {/* outer layer answers to the scroll, inner layer handles the entrance,
          so the two never write to the same transform at once */}
      <motion.div
        style={
          animate && !last
            ? { scale, opacity, transformOrigin: "top center" }
            : undefined
        }
      >
        <motion.div
          initial={animate ? { opacity: 0, y: DIST.md } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.lg, ease: EASE.soft }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
