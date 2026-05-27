import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="container-x grid gap-8 py-12 md:grid-cols-3">
        {/* Column 1 — Logo + contact */}
        <div>
          <Link to="/" className="flex items-center">
            <img src="/images/logofooter.png" alt="Mango Farm" className="h-14 w-auto" />
          </Link>
          <p className="mt-3 text-sm text-cream/80 leading-relaxed">
            Mango Farm<br />
            Kini Village, Akkalkot Taluka,<br />
            Solapur District, Maharashtra (413216), India.
          </p>
          <p className="mt-3 text-sm"> 8766977048</p>
          <p className="text-sm"> mangofarm@gmail.com</p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li><Link to="/" className="hover:text-mango">Home</Link></li>
            <li><Link to="/about" className="hover:text-mango">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-mango">Photo Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-mango">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3 — Visit Us */}
        <div>
          <h4 className="font-semibold">Visit Us</h4>
          <p className="mt-3 text-sm text-cream/80 leading-relaxed">
            Open all days · 8:00 AM – 10:00 PM<br />
            Fresh organic Kesar mangoes,<br />
            farm to your doorstep.
          </p>
          <p className="mt-4 text-xs text-cream/60">
            Certified by APEDA &amp; PGS-India Green
          </p>
        </div>
      </div>

      <div className="border-t border-cream/20 py-4 text-center text-xs text-cream/70">
        © {new Date().getFullYear()} Mango Farm. All rights reserved.
      </div>
    </footer>
  );
}