import Reveal from "../components/Reveal";
import {
  PageHeader,
  SectionHeading,
  SplitText,
  Parallax,
  StaggerGroup,
  StaggerItem,
} from "../components/motion";

const promises = [
  {
    title: "100% Organic",
    text: "Grown with Gaumutra of Gir cows, native manure and vermicompost — completely free from chemical fertilizers and pesticides.",
  },
  {
    title: "Naturally Ripened",
    text: "No carbide or chemical ripening. Our Kesar mangoes are harvested at full maturity and ripen naturally for pure, authentic taste.",
  },
];

export default function About() {
  return (
    <div className="bg-creamlight">
      <PageHeader title="About Us" subtitle="The story of Mango Farm" />

      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
        <Reveal preset="mask" duration={0.8}>
          <Parallax distance={9}>
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-blob border-2 border-sage/40" />
              <img
                src="/images/about-farm.jpg"
                alt="Farm"
                className="relative h-80 w-full rounded-blob object-cover shadow-warm"
              />
            </div>
          </Parallax>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 className="font-display text-3xl font-bold leading-tight text-forest">
            <SplitText text="Hi, Welcome to" trigger="view" />{" "}
            <SplitText text="Mango Farm" trigger="view" delay={0.16} className="text-kesar" />
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            Kesar mangoes of Mango Farm are a combination of nature and agriculture,
            a collaboration of natural factors, noble ideas and the excellent creation of hard work.
            The farm is scientifically developed with 100+ Kesar mango trees in Kini Village,
            Akkalkot Taluka, Solapur District, Maharashtra, using 100% organic farming methods.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream py-16">
        <div className="container-x">
          <SectionHeading>Meet Our Founder</SectionHeading>
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
            <Reveal preset="mask" duration={0.8}>
              <Parallax distance={8}>
                <img
                  src="/images/founder1.jpg"
                  alt="Mr. Suresh Jadhav"
                  className="h-80 w-full rounded-blob object-cover shadow-warm"
                />
              </Parallax>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="font-display text-2xl font-bold text-forest">Mr. Suresh Jadhav</h3>
              <p className="mt-1 inline-block rounded-full bg-mango/15 px-3 py-1 text-sm font-medium text-mango">
                Founder
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                Mr. Suresh Jadhav is the creator and visionary behind Mango Farm. With hard work,
                persistence and dedication to organic farming, he has come to be known for his
                high-quality, delicious Kesar mangoes. He grows his mango trees using 100% organic
                methods in Kini Village, Akkalkot, Solapur, and has inspired many farmers in the region.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading headingClassName="text-2xl">Our Promise</SectionHeading>
        <StaggerGroup className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2" stagger={0.1}>
          {promises.map((p) => (
            <StaggerItem key={p.title} preset="scale" className="h-full">
              <div className="h-full rounded-blob bg-white p-7 shadow-warm card-lift">
                <div className="mb-3 h-1.5 w-10 rounded-full bg-mango" />
                <h3 className="font-display text-lg font-semibold text-forest">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
  );
}