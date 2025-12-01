import Link from "next/link";
import { Mail, MapPin, Brain } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Funksjoner", href: "#features" },
    { label: "AI-Assistenten", href: "#ai" },
    { label: "Priser", href: "#pricing" },
    { label: "Blogg", href: "/blogg" },
  ],
  legal: [
    { label: "Personvern", href: "/privacy" },
    { label: "Vilkår", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-squircle-sm bg-white flex items-center justify-center">
                <img src="/images/listo-logo.svg" alt="Listo" className="w-full h-full" />
              </div>
              <span className="text-2xl font-bold text-white">Listo</span>
            </Link>
            <p className="text-white/50 mb-6 max-w-sm">
              Familiens smarte hverdagsassistent for måltidsplanlegging,
              handlelister og oppskrifter. Gjør hverdagen enklere – sammen.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hei@listo.family"
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hei@listo.family
              </a>
              <div className="flex items-center gap-2 text-white/50">
                <MapPin className="w-4 h-4" />
                Bergen, Norge
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produkt</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Juridisk</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Listo. Alle rettigheter reservert.
          </p>
          <p className="flex items-center gap-1.5 text-white/40 text-sm">
            Laget med <Brain className="w-4 h-4" /> i Norge
          </p>
        </div>
      </div>
    </footer>
  );
}
