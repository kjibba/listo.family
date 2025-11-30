"use client";

import { Check, X, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Gratis",
    price: "0",
    period: "i 30 dager",
    description: "Prøv alt Listo har å tilby – helt gratis",
    highlighted: false,
    features: [
      { text: "Full tilgang til alle funksjoner", included: true },
      { text: "AI-drevet måltidsplanlegging", included: true },
      { text: "Ubegrenset oppskrifter", included: true },
      { text: "Ubegrenset familiemedlemmer", included: true },
      { text: "Sanntidssynkronisering", included: true },
      { text: "Magisk import fra URL og bilde", included: true },
      { text: "Ingen kortinformasjon kreves", included: true },
      { text: "Avbryt når som helst", included: true },
    ],
    cta: "Start gratis prøveperiode",
    ctaLink: "#download",
  },
  {
    name: "Månedlig",
    price: "59",
    period: "kr/måned",
    description: "Fleksibelt – betal måned for måned",
    highlighted: true,
    badge: "Mest fleksibel",
    features: [
      { text: "Alt i prøveperioden, pluss:", included: true },
      { text: "Fortsett uten avbrudd", included: true },
      { text: "Personlige matforslag", included: true },
      { text: "Prioritert støtte", included: true },
      { text: "Nye funksjoner først", included: true },
      { text: "Støtter videre utvikling", included: true },
      { text: "Ingen bindingstid", included: true },
      { text: "Avbryt når som helst", included: true },
    ],
    cta: "Velg månedlig",
    ctaLink: "#download",
  },
  {
    name: "Årlig",
    price: "499",
    period: "kr/år",
    description: "Spar over 30% – kun 42 kr/mnd",
    highlighted: false,
    badge: "Best verdi",
    features: [
      { text: "Alt i månedlig, pluss:", included: true },
      { text: "Spar 209 kr i året", included: true },
      { text: "Lås inn prisen for 12 mnd", included: true },
      { text: "Prioritert tilgang til beta-funksjoner", included: true },
      { text: "Eksklusive oppskriftspakker", included: true },
      { text: "Ubegrenset familiemedlemmer", included: true },
      { text: "Prioritert støtte", included: true },
      { text: "Avbryt når som helst", included: true },
    ],
    cta: "Velg årlig og spar",
    ctaLink: "#download",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-4">
            Gratis i beta
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Gratis for beta-testere
          </h2>
          <p className="text-lg text-charcoal-light">
            Under beta-perioden er Listo helt gratis. Når vi lanserer, får beta-testere
            eksklusiv rabatt. Her er prisene vi planlegger:
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-squircle p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-charcoal to-charcoal-dark text-white shadow-2xl scale-105 z-10"
                  : "bg-white border border-charcoal/10 shadow-lg"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                    plan.highlighted
                      ? "bg-salmon-500 text-white"
                      : "bg-listo-400 text-white"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan info */}
              <div className="text-center mb-8">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.highlighted ? "text-white" : "text-charcoal"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-5xl font-bold ${
                      plan.highlighted ? "text-white" : "text-charcoal"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.highlighted ? "text-white/70" : "text-charcoal-light"
                    }
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`mt-2 ${
                    plan.highlighted ? "text-white/70" : "text-charcoal-light"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.highlighted ? "text-listo-400" : "text-listo-500"
                        }`}
                      />
                    ) : (
                      <X
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.highlighted ? "text-white/40" : "text-charcoal/30"
                        }`}
                      />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? plan.highlighted
                            ? "text-white"
                            : "text-charcoal"
                          : plan.highlighted
                          ? "text-white/40"
                          : "text-charcoal/40"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaLink}
                className={`block w-full text-center py-3 px-6 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-white text-charcoal hover:bg-cream-100 shadow-lg"
                    : "bg-listo-100 text-listo-700 hover:bg-listo-200"
                }`}
              >
                {plan.highlighted && (
                  <Sparkles className="w-4 h-4 inline mr-2" />
                )}
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Beta notice */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-alert-50 border border-alert-200 rounded-squircle-sm px-6 py-4">
            <p className="text-charcoal">
              <strong className="text-charcoal">🎉 Beta-testere får alt gratis</strong>
              <br />
              <span className="text-sm text-charcoal-light">Pluss eksklusiv rabatt når vi lanserer. Meld interesse i dag!</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
