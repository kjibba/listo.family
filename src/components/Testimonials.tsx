"use client";

import { Heart, Users, Lightbulb, MessageSquare, Clock, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Bygget av en familie",
    description:
      "Vi bruker Listo selv hver dag. Appen er laget for å løse ekte problemer vi møter i vår egen hverdag.",
    color: "salmon",
  },
  {
    icon: Clock,
    title: "Sparetid er målet",
    description:
      "Alt vi bygger har ett formål: å gi deg mer tid til det som betyr noe. Mindre planlegging, mer familietid.",
    color: "listo",
  },
  {
    icon: MessageSquare,
    title: "Vi lytter",
    description:
      "Send oss en melding, og du får svar fra teamet – ikke en bot. Dine forslag former hvordan Listo utvikler seg.",
    color: "magic",
  },
  {
    icon: Shield,
    title: "Ærlige fra dag én",
    description:
      "Ingen falske anmeldelser eller oppblåste tall. Vi er ny app som vokser organisk fordi produktet fungerer.",
    color: "alert",
  },
];

const colorClasses = {
  salmon: { bg: "bg-salmon-100", icon: "text-salmon-600" },
  listo: { bg: "bg-listo-100", icon: "text-listo-600" },
  magic: { bg: "bg-magic-100", icon: "text-magic-600" },
  alert: { bg: "bg-alert-100", icon: "text-alert-600" },
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Hvorfor Listo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            En app du kan stole på
          </h2>
          <p className="text-lg text-charcoal-light">
            Vi er en ny app uten tusenvis av anmeldelser ennå. Men vi har noe viktigere:
            ærlighet og et genuint ønske om å gjøre hverdagen din enklere.
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
                className="bg-white rounded-squircle p-8 border border-cream-200 shadow-sm"
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-charcoal-light mb-6">
            Klar til å prøve selv?
          </p>
          <a
            href="#beta"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Prøv gratis i 14 dager
          </a>
        </div>
      </div>
    </section>
  );
}
