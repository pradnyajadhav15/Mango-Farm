/**
 * The motion scale.
 *
 * Every duration, easing, distance and spring on the site resolves to one of
 * these. Before this file there were eight spring configurations and two
 * competing curves, which is why the page felt assembled rather than directed:
 * no two things arrived the same way.
 *
 * Rules of thumb encoded here:
 *   - One entrance curve. Everything that enters uses EASE.out.
 *   - Nothing overshoots. Every spring is critically or over-damped, so
 *     motion settles rather than bounces.
 *   - Short distances. Premium motion moves a little, slowly; cheap motion
 *     moves a lot, fast.
 */

/** Entrance curve: fast departure, long settle. The house curve. */
export const EASE = {
  /** Everything that enters the frame. */
  out: [0.22, 1, 0.36, 1],
  /** Large surfaces - hero imagery, pinned cards - where the settle is longer. */
  soft: [0.32, 0.72, 0, 1],
  /** Reversible state changes (open/close, hover in/out). */
  inOut: [0.65, 0, 0.35, 1],
};

/** Durations in seconds. Reveals sit at md; only the hero image gets xl. */
export const DUR = {
  xs: 0.28,
  sm: 0.45,
  md: 0.65,
  lg: 0.85,
  xl: 1.4,
};

/**
 * Travel distances in px. An element that slides more than ~20px reads as
 * being thrown into place; under 20px it reads as settling.
 */
export const DIST = {
  xs: 8,
  sm: 12,
  md: 18,
};

/**
 * Springs, all damped past the point of overshoot.
 * glide  - smooths scroll-linked values; overdamped, never rings
 * press  - pointer feedback; settles immediately, no visible bounce
 * drift  - magnetic pull; overdamped so the control tracks without wobble
 */
export const SPRING = {
  glide: { stiffness: 90, damping: 24, mass: 0.55 },
  press: { stiffness: 300, damping: 30 },
  drift: { stiffness: 140, damping: 26, mass: 0.4 },
};

/**
 * Shared viewport trigger. The old settings fired at 15% visibility, so
 * elements animated while still at the very edge of the screen and the
 * motion was half over by the time it was worth looking at. This waits
 * until the element is properly in the frame.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -10% 0px",
};
