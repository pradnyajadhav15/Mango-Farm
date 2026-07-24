import { useParams, Link, Navigate } from "react-router-dom";
import { getActivity, activities } from "../data/activities";

export default function FarmActivity() {
  const { slug } = useParams();
  const activity = getActivity(slug);

  if (!activity) return <Navigate to="/" replace />;

  return (
    <div className="bg-creamlight">
      {/* Header */}
      <div className="bg-cream py-12 text-center">
        <div className="text-5xl">{activity.icon}</div>
        <h1 className="mt-3 font-display text-4xl font-bold text-forest">{activity.title}</h1>
        <p className="mt-2 text-gray-600">{activity.tagline}</p>
      </div>

      {/* Content */}
      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
        <img src={activity.image} alt={activity.title} className="rounded-2xl shadow-md" />
        <div>
          <p className="text-lg text-gray-700 leading-relaxed">{activity.intro}</p>
          <ul className="mt-6 space-y-3">
            {activity.points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 text-mango">✔</span>
                <span className="text-gray-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other activities */}
      <section className="bg-cream py-12">
        <div className="container-x">
          <h2 className="text-center font-display text-2xl font-bold text-forest">Explore Other Activities</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {activities.filter((a) => a.slug !== slug).map((a) => (
              <Link key={a.slug} to={`/farm-activities/${a.slug}`}
                className="rounded-full bg-white px-5 py-2 text-sm text-forest shadow-sm transition hover:bg-mango hover:text-white">
                {a.icon} {a.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
