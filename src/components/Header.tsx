"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Funksjoner" },
  { href: "#ai", label: "AI-Assistenten" },
  { href: "#how-it-works", label: "Slik fungerer det" },
  { href: "#pricing", label: "Priser" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-50/90 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-squircle bg-gradient-to-br from-listo-500 to-listo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-charcoal">Listo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal-light hover:text-charcoal font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-charcoal-light hover:text-charcoal font-medium transition-colors"
            >
              Logg inn (beta)
            </Link>
            <Link
              href="#beta"
              className="px-5 py-2.5 bg-gradient-to-r from-listo-500 to-magic-500 hover:from-listo-600 hover:to-magic-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Meld interesse
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-charcoal/10">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-charcoal-light hover:text-charcoal font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-charcoal/10" />
              <Link
                href="/login"
                className="text-charcoal-light hover:text-charcoal font-medium transition-colors"
              >
                Logg inn (beta)
              </Link>
              <Link
                href="#beta"
                className="px-5 py-2.5 bg-gradient-to-r from-listo-500 to-magic-500 text-white font-semibold rounded-full text-center shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Meld interesse
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
