import { motion } from "framer-motion";
import { useMotionSafe, EASE, DUR } from "./motion/useMotionSafe";

/**
 * The illustrated hero scene: fruit falling in from the top right, a juice
 * splash rising on the left, leaves scattered along the top edge.
 *
 * Drawn rather than photographed. The gradient background leaves no room for
 * a cut-out photo, and vector art keeps the whole scene under 6KB with no
 * extra network requests on the most important paint of the page.
 *
 * Every element carries three separate transforms, one per layer, so they
 * never contend:
 *   outer - scroll parallax, supplied by the hero
 *   middle - the entrance (this file)
 *   inner - the idle drift (a CSS keyframe)
 */

/* Shared gradients. Rendered once; every shape below references them by id. */
export function ArtDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        {/* Body light comes from the upper left, so the gradient is radial and
            off-centre rather than a flat diagonal ramp. A linear ramp is what
            made the first pass read as a beach ball. */}
        <radialGradient id="mf-skin" cx="34%" cy="26%" r="86%">
          <stop offset="0%" stopColor="#FFF6C2" />
          <stop offset="26%" stopColor="#FFDE55" />
          <stop offset="58%" stopColor="#F9AE18" />
          <stop offset="84%" stopColor="#EE7C0C" />
          <stop offset="100%" stopColor="#C94A06" />
        </radialGradient>
        {/* The ripe flush a Kesar carries on its shoulder. */}
        <radialGradient id="mf-blush" cx="72%" cy="16%" r="52%">
          <stop offset="0%" stopColor="#E23B14" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E23B14" stopOpacity="0" />
        </radialGradient>
        {/* Specular highlight - soft, not a white blob. */}
        <radialGradient id="mf-spec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF0" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#FFF6C8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFF6C8" stopOpacity="0" />
        </radialGradient>
        {/* Contact shading along the lower right, away from the light. */}
        <radialGradient id="mf-occ" cx="72%" cy="80%" r="56%">
          <stop offset="0%" stopColor="#8A2E02" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#8A2E02" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mf-flesh" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="55%" stopColor="#FFC93C" />
          <stop offset="100%" stopColor="#F9A825" />
        </linearGradient>
        <linearGradient id="mf-juice" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE070" />
          <stop offset="60%" stopColor="#FDB90B" />
          <stop offset="100%" stopColor="#E56A0B" />
        </linearGradient>
        <linearGradient id="mf-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8FD447" />
          <stop offset="100%" stopColor="#1F6B0D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * A Kesar: broad at the shoulder, tapering to a blunt beak at the lower
 * left, with the flush on the sunward side. Built in layers the way the
 * fruit actually reads - body, flush, occlusion, then the specular last.
 */
function Mango({ className = "", style }) {
  const body =
    "M94 18c30 16 40 54 33 92-7 37-33 60-64 58-29-2-51-23-56-53-6-37 9-70 33-90 16-13 37-16 54-7z";

  return (
    <svg viewBox="0 0 140 180" className={className} style={style} aria-hidden="true">
      <path d={body} fill="url(#mf-skin)" />
      <path d={body} fill="url(#mf-blush)" />
      <path d={body} fill="url(#mf-occ)" />

      {/* the long soft catch-light down the shoulder */}
      <ellipse cx="58" cy="58" rx="19" ry="31" fill="url(#mf-spec)" transform="rotate(-24 58 58)" />
      {/* a tighter glint inside it */}
      <ellipse cx="52" cy="46" rx="7" ry="12" fill="#FFFEF6" opacity="0.55" transform="rotate(-26 52 46)" />

      {/* lenticels - the freckling that stops the skin reading as plastic */}
      <g fill="#B4550A" opacity="0.16">
        <circle cx="88" cy="62" r="1.6" />
        <circle cx="99" cy="86" r="1.3" />
        <circle cx="80" cy="104" r="1.5" />
        <circle cx="95" cy="122" r="1.2" />
        <circle cx="66" cy="128" r="1.4" />
      </g>

      {/* stem and a single leaf at the shoulder */}
      <path d="M86 20c1-7 5-12 12-15-1 8-4 13-9 16z" fill="#7A4A12" />
      <path d="M96 8c8-6 19-7 29-3-6 9-17 13-29 8z" fill="url(#mf-leaf)" />
    </svg>
  );
}

/**
 * A cut cheek, flesh toward the viewer: a thin skin rim, then flesh that
 * lightens toward the centre where the knife went deepest. The concentric
 * ovals of the first pass looked like a target, so the flesh is offset from
 * the rim and lit from the same upper left as everything else.
 */
function MangoSlice({ className = "", style }) {
  return (
    <svg viewBox="0 0 130 150" className={className} style={style} aria-hidden="true">
      {/* skin rim */}
      <path
        d="M66 4c36 0 60 36 60 74 0 40-26 68-60 68S6 118 6 78C6 40 30 4 66 4z"
        fill="url(#mf-skin)"
      />
      {/* cut face, sitting slightly high and left of the rim */}
      <path
        d="M63 15c30 0 50 30 50 62 0 33-21 56-50 56S14 110 14 77c0-32 19-62 49-62z"
        fill="url(#mf-flesh)"
      />
      {/* the softer, wetter centre */}
      <ellipse cx="57" cy="70" rx="30" ry="40" fill="#FFF0B8" opacity="0.62" />
      <ellipse cx="52" cy="58" rx="14" ry="20" fill="#FFFAE2" opacity="0.5" />
    </svg>
  );
}

function Leaf({ className = "", style }) {
  return (
    <svg viewBox="0 0 64 40" className={className} style={style} aria-hidden="true">
      <path d="M4 30C14 6 40 0 60 4c-2 22-24 34-56 26z" fill="url(#mf-leaf)" />
      <path d="M8 29C22 18 40 10 58 6" stroke="#1F5C0B" strokeWidth="1.6" fill="none" opacity="0.4" />
    </svg>
  );
}

/**
 * The pour on the left: a ribbon of juice curling down, thrown droplets
 * around it.
 *
 * The first version was a single fat teardrop, which at this scale read as
 * an enormous leaf. A ribbon works because liquid is legible by its edge -
 * a curved band of varying width with a bright inner rim, not a blob.
 */
function Splash({ className = "", style }) {
  return (
    <svg viewBox="0 0 240 340" className={className} style={style} aria-hidden="true">
      {/* the falling band, wide at the lip and tapering as it drops */}
      <path
        d="M172 4c-46 34-80 76-96 126-17 54-8 106 24 148-52-28-82-88-72-150C39 68 96 24 172 4z"
        fill="url(#mf-juice)"
      />
      {/* the curl where it turns back on itself */}
      <path
        d="M100 278c26 26 62 38 100 34-20 20-52 26-84 14-16-6-28-16-36-28z"
        fill="url(#mf-juice)"
      />
      {/* bright inner rim - the edge that makes it read as liquid */}
      <path
        d="M150 34c-34 30-58 66-70 108-12 42-7 82 13 116-28-28-40-74-30-124C72 96 106 58 150 34z"
        fill="#FFF6D2"
        opacity="0.34"
      />
      {/* thrown droplets, sized down as they travel out */}
      <circle cx="188" cy="74" r="10" fill="url(#mf-juice)" />
      <circle cx="206" cy="132" r="6" fill="url(#mf-juice)" />
      <circle cx="180" cy="196" r="12" fill="url(#mf-juice)" />
      <circle cx="212" cy="238" r="5" fill="url(#mf-juice)" />
      <circle cx="46" cy="112" r="8" fill="url(#mf-juice)" />
      <circle cx="30" cy="182" r="5" fill="url(#mf-juice)" />
      <circle cx="74" cy="318" r="7" fill="url(#mf-juice)" />
    </svg>
  );
}

/* Entrance wrapper: one element per decorative piece.
 *
 * The resting angle is a prop rather than a Tailwind `rotate-*` class:
 * framer writes an inline transform, which would silently win over the
 * class and flatten every piece to zero degrees.
 *
 * `float` names the CSS idle animation applied to the inner layer, which
 * takes over once the entrance has landed. */
function Piece({ from, delay, duration = DUR.xl, rotate = 0, className, float, children }) {
  const animate = useMotionSafe();

  return (
    <motion.div
      className={"absolute " + className}
      initial={animate ? { ...from, rotate: from.rotate ?? rotate } : false}
      animate={{ opacity: 1, x: 0, y: 0, rotate, scale: 1 }}
      transition={{ duration, delay, ease: EASE.soft }}
    >
      <div className={float}>{children}</div>
    </motion.div>
  );
}

export default function HeroArt() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden [&_svg]:[filter:drop-shadow(0_14px_22px_rgba(124,48,0,0.28))]"
      aria-hidden="true"
    >
      <ArtDefs />

      {/* leaves along the top edge - they drop first and fastest */}
      <Piece from={{ opacity: 0, y: -34, rotate: -18 }} delay={0.15} duration={DUR.lg}
        className="left-[13%] top-[14%] w-12 md:w-16" float="animate-driftC">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -30, rotate: 40 }} delay={0.22} duration={DUR.lg} rotate={18}
        className="left-[27%] top-[9%] w-10 md:w-14" float="animate-driftB">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -36, rotate: -2 }} delay={0.3} duration={DUR.lg} rotate={-24}
        className="left-[44%] top-[12%] w-11 md:w-14" float="animate-driftC">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -32, rotate: 54 }} delay={0.38} duration={DUR.lg} rotate={32}
        className="right-[30%] top-[10%] hidden w-12 sm:block md:w-16" float="animate-driftB">
        <Leaf />
      </Piece>
      <Piece from={{ opacity: 0, y: -28, rotate: 6 }} delay={0.46} duration={DUR.lg} rotate={-14}
        className="right-[22%] top-[17%] hidden w-10 sm:block md:w-14" float="animate-driftC">
        <Leaf />
      </Piece>

      {/* the fruit, falling in from the top right */}
      <Piece from={{ opacity: 0, y: -90, rotate: -12 }} delay={0.3} rotate={14}
        className="right-[3%] top-[9%] w-24 md:w-40" float="animate-driftA">
        <Mango />
      </Piece>
      <Piece from={{ opacity: 0, y: -110, rotate: 4 }} delay={0.44} rotate={-18}
        className="right-[16%] top-[30%] hidden w-20 sm:block md:w-32" float="animate-driftB">
        <Mango />
      </Piece>
      <Piece from={{ opacity: 0, y: -80, rotate: 2 }} delay={0.56} rotate={28}
        className="right-[7%] top-[50%] w-16 md:w-28" float="animate-driftB">
        <Mango />
      </Piece>

      {/* the pour on the left, with two cut cheeks riding it */}
      <Piece from={{ opacity: 0, x: -40, scale: 0.9 }} delay={0.35} duration={1.5}
        className="-left-[4%] top-[16%] hidden w-44 md:block lg:w-60" float="animate-driftB">
        <Splash />
      </Piece>
      <Piece from={{ opacity: 0, x: -30, y: 24, rotate: -34 }} delay={0.5} rotate={-16}
        className="left-[6%] top-[44%] hidden w-24 md:block lg:w-28" float="animate-driftC">
        <MangoSlice />
      </Piece>
      <Piece from={{ opacity: 0, x: -24, y: 30, rotate: 40 }} delay={0.62} rotate={22}
        className="left-[15%] top-[64%] hidden w-16 lg:block" float="animate-driftA">
        <MangoSlice />
      </Piece>
    </div>
  );
}
