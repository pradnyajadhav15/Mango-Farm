import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { getActivity, activities } from "../data/activities";
import Reveal from "../components/Reveal";
import {
  SplitText,
  SectionHeading,
  Parallax,
  StaggerGroup,
  StaggerItem,
  useMotionSafe,
  EASE,
  EASE_SOFT,
} from "../components/motion";

export default function FarmActivity() {
  const { slug } = useParams();
  const activity = getActivity(slug);
  const bannerRef = useRef(null);
  const animate = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 34, mass: 0.5 });
  const bannerY = useTransform(eased, [0, 1], ["0%", "18%"]);
  const bannerScale = useTransform(eased, [0, 1], [1, 1.1]);
  const titleY = useTransform(eased, [0, 1], ["0%", "42%"]);
  const titleFade = useTransform(eased, [0, 0.7], [1, 0]);

  if (!activity) return <Navigate to="/" replace />;

  const idx = activities.findIndex((a) => a.slug === slug);
  const prev = activities[(idx - 1 + activities.length) % activities.length];
  const next = activities[(idx + 1) % activities.length];

  return (
    <div className="bg-creamlight">
      {/* Image banner with title over it - same three-speed frame as the
          home hero, so an activity page opens on familiar ground */}
      <div ref={bannerRef} className="relative h-[42vh] min-h-[260px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={animate ? { scale: 1.12 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: EASE_SOFT }}
        >
          <motion.img
            src={activity.image}
            alt={activity.title}
            className="h-full w-full object-cover"
            style={animate ? { y: bannerY, scale: bannerScale } : undefined}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/35 to-ink/70" />
        <motion.div
          className="relative flex h-full flex-col items-center justify-center px-5 text-center"
          style={animate ? { y: titleY, opacity: titleFade } : undefined}
        >
          {activity.icon && (
            <motion.div
              className="text-5xl"
              initial={animate ? { opacity: 0, scale: 0.6 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {activity.icon}
            </motion.div>
          )}
          <SplitText
            as="h1"
            text={activity.title}
            delay={0.2}
            stagger={0.06}
            className="mt-2 font-display text-4xl font-bold text-white drop-shadow-lg md:text-5xl"
          />
          <SplitText
            text={activity.tagline}
            delay={0.5}
            stagger={0.03}
            className="mt-2 block font-display text-lg italic text-white/90 drop-shadow"
          />
        </motion.div>
      </div>

      {/* Content */}
      <section className="container-x grid items-start gap-10 py-16 md:grid-cols-2">
        <Reveal preset="mask" duration={0.8}>
          <Parallax distance={9}>
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-blob border-2 border-sage/40" />
              <img
                src={activity.image}
                alt={activity.title}
                className="relative w-full rounded-blob shadow-warm"
              />
            </div>
          </Parallax>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-gray-700">{activity.intro}</p>
          </Reveal>
          <StaggerGroup as="ul" className="mt-7 space-y-4" stagger={0.08} delay={0.1}>
            {activity.points.map((p, i) => (
              <StaggerItem
                key={i}
                as="li"
                preset="left"
                className="flex gap-3 rounded-soft bg-white p-4 shadow-warm"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mango/20 text-sm font-bold text-mango">
                  &#10003;
                </span>
                <span className="text-gray-700">{p}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Prev / next */}
      <section className="container-x pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to={`/farm-activities/${prev.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-forest shadow-warm transition hover:text-mango"
          >
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            {prev.title}
          </Link>
          <Link
            to={`/farm-activities/${next.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-forest shadow-warm transition hover:text-mango"
          >
            {next.title}
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Other activities */}
      <section className="bg-cream py-14">
        <div className="container-x">
          <SectionHeading headingClassName="text-2xl">Explore Other Activities</SectionHeading>
          <StaggerGroup
            className="mt-8 flex flex-wrap justify-center gap-3"
            stagger={0.05}
            amount={0.3}
          >
            {activities
              .filter((a) => a.slug !== slug)
              .map((a) => (
                <StaggerItem key={a.slug} preset="scale" duration={0.45}>
                  <Link
                    to={`/farm-activities/${a.slug}`}
                    className="inline-block rounded-full bg-white px-5 py-2 text-sm text-forest shadow-warm transition duration-300 hover:-translate-y-0.5 hover:bg-mango hover:text-white hover:shadow-lift"
                  >
                    {a.icon ? a.icon + " " : ""}
                    {a.title}
                  </Link>
                </StaggerItem>
              ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
}