"use client";

import { Check, Sparkles, Gift, Heart } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-4">
            Priser
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Ett abonnement for <span className="gradient-text-magic">hele familien</span>
          </h2>
          <p className="text-lg text-charcoal-light">
            Slipp utfordringene med flere brukerkontoer og betalinger. Med Listo betaler én person,
            og alle i husstanden får full tilgang til alle premium-funksjoner.{" "}
            <Link href="/familie-hub" className="text-listo-500 hover:underline">
              Les hvordan Hub-modellen fungerer &rarr;
            </Link>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="relative rounded-squircle p-8 bg-white border border-charcoal/10 shadow-lg hover:shadow-xl transition-all">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-charcoal">Månedlig</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-bold text-charcoal">59,-</span>
                <span className="text-charcoal-light">/mnd</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "14 dagers gratis prøve (Gullbillett)",
                "Full tilgang for hele familien",
                "Ubegrenset AI-hjelp",
                "Alle steder og huskelister",
                "Ingen bindingstid",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 text-listo-500" />
                  <span className="text-sm text-charcoal-light">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#beta"
              className="block w-full text-center py-3 px-6 rounded-full font-semibold transition-all border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
            >
              Start prøveperiode
            </Link>
          </div>

          {/* Yearly Plan - Featured */}
          <div className="relative rounded-squircle p-8 bg-gradient-to-br from-charcoal to-charcoal-dark text-white shadow-2xl scale-105">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-semibold bg-salmon-500 text-white shadow-lg">
              Mest populær – Spar 17%
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">Årlig</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-bold text-white">589,-</span>
                <span className="text-white/70">/år</span>
              </div>
              <p className="text-xs text-salmon-200 mt-1">Svarer til kun 49,- per måned</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "14 dagers gratis prøve (Gullbillett)",
                "Full tilgang for hele familien",
                "Alt fra månedsabonnementet",
                "Prioritert support",
                "Garantert lavest pris",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 text-listo-400" />
                  <span className="text-sm text-white/90">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#beta"
              className="block w-full text-center py-3 px-6 rounded-full font-semibold transition-all bg-white text-charcoal hover:bg-cream-100 shadow-lg"
            >
              <Sparkles className="w-4 h-4 inline mr-2 text-magic-600" />
              Sikre deg Gullbilletten
            </Link>
          </div>
        </div>

        {/* Future pricing hint / Trial info */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-listo-50 border border-listo-100 rounded-squircle p-6">
            <h4 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-listo-500" />
              Slik fungerer "Gullbilletten"
            </h4>
            <p className="text-charcoal-light text-sm mb-4">
              Når du oppretter en familie i Listo, får dere automatisk <strong>14 dagers full tilgang</strong> til alt.
              Dette kaller vi Gullbilletten. Ingen kredittkort kreves for å starte. Etter 14 dager kan dere velge å fortsette med
              Premium, eller gå over til en begrenset gratisversjon.
            </p>
            <div className="flex items-start gap-3 bg-white/50 rounded-lg p-4">
              <Heart className="w-5 h-5 text-salmon-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-charcoal">
                <strong>Ingen binding:</strong> Du kan når som helst kansellere eller endre abonnementet.
                Vi vil bare at hverdagen din skal bli litt mindre kaotisk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
