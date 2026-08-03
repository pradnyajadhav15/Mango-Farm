import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-forest text-cream">
      {/* Dotted band echoing the section rules */}
      <div className="dot-rule opacity-25" />

      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        {/* Logo + contact */}
        <div>
          <Link to="/" className="inline-flex items-center">
            <img src="/images/logofooter.png" alt="Mango Farm" className="h-14 w-auto" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Mango Farm<br />
            Kini Village, Akkalkot Taluka,<br />
            Solapur District, Maharashtra (413216), India.
          </p>
          <a href="tel:+918766977048" className="mt-4 flex items-center gap-2 text-sm transition hover:text-mango">
            <span aria-hidden="true">&#9742;</span> 8766977048
          </a>
          <a href="mailto:mangofarm@gmail.com" className="flex items-center gap-2 text-sm transition hover:text-mango">
            <span aria-hidden="true">&#9993;</span> mangofarm@gmail.com
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold">Quick Links</h4>
          <span className="mt-2 block h-[2px] w-10 rounded-full bg-mango" />
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/gallery", label: "Photo Gallery" },
              { to: "/contact", label: "Contact Us" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="group inline-flex items-center gap-2 transition hover:text-mango">
                  <span className="h-1 w-1 rounded-full bg-mango opacity-0 transition group-hover:opacity-100" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h4 className="font-display text-lg font-semibold">Visit Us</h4>
          <span className="mt-2 block h-[2px] w-10 rounded-full bg-mango" />
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Open all days &middot; 8:00 AM &ndash; 10:00 PM<br />
            Fresh organic Kesar mangoes,<br />
            farm to your doorstep.
          </p>
          <p className="mt-4 inline-block rounded-full bg-cream/10 px-3 py-1 text-xs text-cream/70">
            Certified by APEDA &amp; PGS-India Green
          </p>
        </div>
      </div>

      <div className="border-t border-cream/20 py-4 text-center text-xs text-cream/70">
        &copy; {new Date().getFullYear()} Mango Farm. All rights reserved.
      </div>
    </footer>
  );
}