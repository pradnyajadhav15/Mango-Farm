import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getActivity, activities } from "../data/activities";
import Reveal from "../components/Reveal";

export default function FarmActivity() {
  const { slug } = useParams();
  const activity = getActivity(slug);

  if (!activity) return <Navigate to="/" replace />;

  const idx = activities.findIndex((a) => a.slug === slug);
  const prev = activities[(idx - 1 + activities.length) % activities.length];
  const next = activities[(idx + 1) % activities.length];

  return (
    <div className="bg-creamlight">
      {/* Image banner with title over it */}
      <div className="relative h-[42vh] min-h-[260px] overflow-hidden">
        <motion.img
          src={activity.image}
          alt={activity.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/35 to-ink/70" />
        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          {activity.icon && <div className="text-5xl">{activity.icon}</div>}
          <motion.h1
            className="mt-2 font-display text-4xl font-bold text-white drop-shadow-lg md:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {activity.title}
          </motion.h1>
          <motion.p
            className="mt-2 font-display text-lg italic text-white/90 drop-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {activity.tagline}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <section className="container-x grid items-start gap-10 py-16 md:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-blob border-2 border-sage/40" />
            <img
              src={activity.image}
              alt={activity.title}
              className="relative w-full rounded-blob shadow-warm"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-gray-700">{activity.intro}</p>
          </Reveal>
          <ul className="mt-7 space-y-4">
            {activity.points.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="flex gap-3 rounded-soft bg-white p-4 shadow-warm">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mango/20 text-sm font-bold text-mango">
                    &#10003;
                  </span>
                  <span className="text-gray-700">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>
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
          <Reveal>
            <h2 className="text-center font-display text-2xl font-bold text-forest">
              Explore Other Activities
            </h2>
            <div className="mx-auto mt-4 flex w-32 items-center gap-2">
              <span className="dot-rule flex-1 rounded-full opacity-70" />
              <span className="h-2 w-2 rotate-45 rounded-[2px] bg-mango" />
              <span className="dot-rule flex-1 rounded-full opacity-70" />
            </div>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {activities
              .filter((a) => a.slug !== slug)
              .map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.05} y={14}>
                  <Link
                    to={`/farm-activities/${a.slug}`}
                    className="inline-block rounded-full bg-white px-5 py-2 text-sm text-forest shadow-warm transition duration-300 hover:-translate-y-0.5 hover:bg-mango hover:text-white hover:shadow-lift"
                  >
                    {a.icon ? a.icon + " " : ""}
                    {a.title}
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}