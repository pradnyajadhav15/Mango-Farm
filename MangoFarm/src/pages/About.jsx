const founders = [
  {
    name: "Mr. Suresh Jadhav",
    role: "Founder",
    img: "/images/founder1.jpg",
    bio: "Mr. Suresh Jadhav is the creator and visionary behind Mango Farm. With hard work, persistence and dedication to organic farming, he has come to be known for his high-quality, delicious Kesar mangoes. He grows his mango trees using 100% organic methods in Kini Village, Akkalkot, Solapur, and has inspired many farmers in the region.",
  },
  {
    name: "Mrs. Pradnya Jadhav",
    role: "Co-Founder",
    img: "/images/founder2.jpg",
    bio: "Mrs. Pradnya Jadhav has provided the perfect supportive role in the development of Mango Farm. With her presence, it was possible to implement integrated organic farming by maintaining a productive Gaushala.",
  },
];

export default function About() {
  return (
    <div className="bg-creamlight">
      <div className="bg-cream py-12 text-center">
        <h1 className="font-display text-4xl font-bold text-forest">About Us</h1>
        <p className="mt-2 text-gray-600">The story of Mango Farm</p>
      </div>

      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
       <img src="/images/about-farm.jpg" alt="Farm" className="h-80 w-full rounded-2xl object-cover shadow-md" />
        <div>
          <h2 className="font-display text-3xl font-bold text-forest">Hi, Welcome to Mango Farm</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Kesar mangoes of Mango Farm are a combination of nature and agriculture,
            a collaboration of natural factors, noble ideas and the excellent creation of hard work.
            The farm is scientifically developed with 100+ Kesar mango trees in Kini Village,
            Akkalkot Taluka, Solapur District, Maharashtra, using 100% organic farming methods.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container-x">
          <h2 className="text-center font-display text-3xl font-bold text-forest">Meet Our Founders</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-mango" />
          <div className="mt-10 space-y-10">
            {founders.map((f, i) => (
              <div key={f.name} className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <img src={f.img} alt={f.name} className="h-80 w-full rounded-2xl object-cover shadow-md md:[direction:ltr]" />
                <div className="md:[direction:ltr]">
                  <h3 className="font-display text-2xl font-bold text-forest">{f.name}</h3>
                  <p className="font-medium text-mango">{f.role}</p>
                  <p className="mt-3 text-gray-700 leading-relaxed">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="text-center font-display text-2xl font-bold text-forest">Our Promise</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-forest">100% Organic</h3>
            <p className="mt-2 text-sm text-gray-600">Grown with Gaumutra of Gir cows, native manure and vermicompost — completely free from chemical fertilizers and pesticides.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-forest">Naturally Ripened</h3>
            <p className="mt-2 text-sm text-gray-600">No carbide or chemical ripening. Our Kesar mangoes are harvested at full maturity and ripen naturally for pure, authentic taste.</p>
          </div>
        </div>
      </section>
    </div>
  );
}