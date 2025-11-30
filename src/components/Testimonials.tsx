"use client";

import { Heart, Users, Lightbulb, MessageSquare } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    title: "Bygget med kjærlighet",
    description:
      "Listo er laget av en familie, for familier. Vi bruker appen selv hver eneste dag og vet hvor frustrerende middagsplanlegging kan være.",
    color: "salmon",
  },
  {
    icon: Users,
    title: "Dine behov først",
    description:
      "Vi bygger ikke funksjoner for å imponere investorer. Vi bygger det som faktisk hjelper deg i hverdagen – basert på tilbakemeldinger fra ekte brukere.",
    color: "listo",
  },
  {
    icon: Lightbulb,
    title: "Alltid ærlige",
    description:
      "Ingen falske anmeldelser, ingen oppblåste tall. Vi er en ny app som vokser organisk fordi produktet fungerer – ikke på grunn av markedsføringstricks.",
    color: "alert",
  },
  {
    icon: MessageSquare,
    title: "Vi lytter",
    description:
      "Send oss en melding, og du får svar fra teamet – ikke en bot. Dine forslag former direkte hvordan Listo utvikler seg.",
    color: "magic",
  },
];

const colorClasses = {
  salmon: { bg: "bg-salmon-100", icon: "text-salmon-600" },
  listo: { bg: "bg-listo-100", icon: "text-listo-600" },
  alert: { bg: "bg-alert-100", icon: "text-alert-600" },
  magic: { bg: "bg-magic-100", icon: "text-magic-600" },
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-salmon-100 text-salmon-700 rounded-full text-sm font-medium mb-4">
            Våre verdier
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            En app du kan stole på
          </h2>
          <p className="text-lg text-charcoal-light">
            Vi er en ny app, og vi har ikke tusenvis av anmeldelser ennå. Men vi
            har noe viktigere: ærlighet og et genuint ønske om å gjøre hverdagen
            din enklere.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            const colors = colorClasses[value.color as keyof typeof colorClasses];
            return (
              <div
                key={index}
                className="bg-cream-50 rounded-squircle p-8 border border-cream-200"
              >
                <div className={`w-12 h-12 rounded-squircle-sm ${colors.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA to be early adopter */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-listo-50 to-magic-50 rounded-squircle p-8 border border-listo-100">
            <h3 className="text-xl font-semibold text-charcoal mb-3">
              Bli beta-tester 🚀
            </h3>
            <p className="text-charcoal-light mb-6 max-w-lg">
              Vi åpner snart for et begrenset antall familier. Som beta-tester 
              får du gratis tilgang, direkte kontakt med teamet, og dine 
              tilbakemeldinger vil forme fremtiden til Listo.
            </p>
            <Link
              href="#beta"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Meld interesse for beta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
