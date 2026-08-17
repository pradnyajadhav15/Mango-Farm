import { useMotionSafe } from "./useMotionSafe";

/**
 * Seamless ticker. The row is repeated enough times to overrun the widest
 * screen, that block is rendered twice, and the track slides by exactly half
 * its own width - so the loop has no seam and never jumps.
 *
 * Driven by a CSS animation rather than JS so the pause on hover and on
 * focus-within (see .marquee in index.css) costs nothing, and so it holds
 * still under prefers-reduced-motion even before React has hydrated.
 *
 * When motion is off the row is shown once, centred. Repeating the same
 * sentence across a static strip would just read as a mistake.
 */
export default function Marquee({
  children,
  speed = 26,
  reverse = false,
  className = "",
  fade = false,
  repeat = 3,
}) {
  const animate = useMotionSafe();

  if (!animate) {
    return (
      <div className={"flex flex-wrap items-center justify-center gap-10 " + className}>
        {children}
      </div>
    );
  }

  const half = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: repeat }, (_, i) => (
        <div key={i} className="flex shrink-0 items-center gap-10 pr-10">
          {children}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={
        "marquee relative flex overflow-hidden " + (fade ? "marquee-fade " : "") + className
      }
    >
      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={{
          animationName: "marquee",
          animationDuration: speed + "s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {half}
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {half}
        </div>
      </div>
    </div>
  );
}
