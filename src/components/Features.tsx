"use client";

import {
  Calendar,
  ShoppingCart,
  BookOpen,
  Users,
  Sparkles,
  Bell,
  RefreshCw,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Ukeplanlegger",
    description:
      "Planlegg hele ukens måltider på få minutter. Dra og slipp retter, og la AI-en fylle tomme dager.",
    color: "salmon",
  },
  {
    icon: ShoppingCart,
    title: "Smart handleliste",
    description:
      "Automatisk sortert etter butikkens layout. Hele familien kan legge til varer i sanntid.",
    color: "sky",
  },
  {
    icon: BookOpen,
    title: "Oppskriftsbibliotek",
    description:
      "Importer fra hvilken som helst nettside eller ta bilde av kokeboken. AI-en digitaliserer alt.",
    color: "magic",
  },
  {
    icon: Users,
    title: "Familiesynk",
    description:
      "Alle i familien ser endringer umiddelbart. Tildel ansvar for middager og oppgaver.",
    color: "listo",
  },
  {
    icon: Sparkles,
    title: "AI-forslag",
    description:
      "Personlige måltidsforslag basert på hva dere liker, har i kjøleskapet, og hvor mye tid dere har.",
    color: "magic",
  },
  {
    icon: Bell,
    title: "Smarte påminnelser",
    description:
      "Morgenbriefing med dagens middag. Søndagsvarsel for ukeplanlegging. Aldri glem noe.",
    color: "alert",
  },
  {
    icon: RefreshCw,
    title: "Synk overalt",
    description:
      "Fungerer på mobil, nettbrett og web. Start på telefonen, fortsett på datamaskinen.",
    color: "sky",
  },
  {
    icon: Smartphone,
    title: "Butikkmodus",
    description:
      "Spesialvisning for handleturen med stor tekst, ingen slett-knapper, og skjermen holder seg våken.",
    color: "salmon",
  },
];

const colorClasses = {
  salmon: {
    bg: "bg-salmon-100",
    icon: "text-salmon-600",
    border: "border-salmon-200",
  },
  sky: {
    bg: "bg-sky-100",
    icon: "text-sky-600",
    border: "border-sky-200",
  },
  magic: {
    bg: "bg-magic-100",
    icon: "text-magic-600",
    border: "border-magic-200",
  },
  listo: {
    bg: "bg-listo-100",
    icon: "text-listo-600",
    border: "border-listo-200",
  },
  alert: {
    bg: "bg-alert-100",
    icon: "text-alert-600",
    border: "border-alert-200",
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-4">
            Funksjoner
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Alt familien trenger, samlet på ett sted
          </h2>
          <p className="text-lg text-charcoal-light">
            Fra ukens måltidsplanlegging til handleturen i butikken – Listo
            gjør hverdagslogistikken til en lek.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`group p-6 rounded-squircle border ${colors.border} bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 ${colors.bg} rounded-squircle-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
