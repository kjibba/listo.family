"use client";

import {
  Calendar,
  CalendarDays,
  ShoppingCart,
  BookOpen,
  Users,
  Sparkles,
  CheckSquare,
  MapPin,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Ukesplanlegger",
    description:
      "Se hele uken i ett blikk. Premium-autofill planlegger middager basert på hva dere liker og har i skapet. 🎉",
    color: "salmon",
    link: "/ai-logistikk",
  },
  {
    icon: ShoppingCart,
    title: "Smart handleliste",
    description:
      "AI-sortert etter butikk. Premium-brukere får automatisk lagt til ingredienser fra ukesplanen.",
    color: "salmon",
    link: "/ai-logistikk",
  },
  {
    icon: Users,
    title: "Delt omsorg & besøk",
    description:
      "Porsjoner beregnes automatisk basert på hvem som faktisk spiser hjemme. Perfekt for delt bosted!",
    color: "listo",
    isNew: true,
    link: "/samvaersplan",
  },
  {
    icon: CheckSquare,
    title: "Familieoppgaver",
    description:
      "Fordel hverdagsoppgaver. Premium-versjonen roterer automatisk på hvem det er sin tur til å gå med søppelet.",
    color: "listo",
  },
  {
    icon: BookOpen,
    title: "Oppskriftsbibliotek",
    description:
      "Importer fra nett med ett klikk, eller ta bilde av kokeboken. AI-en lærer hva familien din elsker.",
    color: "magic",
  },
  {
    icon: Sparkles,
    title: "AI-assistent (Brain)",
    description:
      "Chat med din personlige prosjektleder. Hun husker allergier, budsjett og hvilke dager dere har dårlig tid.",
    color: "magic",
  },
  {
    icon: CalendarDays,
    title: "Aktivitetskalender",
    description:
      "Koble aktiviteter mot mat. Listo foreslår kjappe middager når ettermiddagen er full av treninger.",
    color: "sky",
    isNew: true,
    link: "/ai-logistikk",
  },
  {
    icon: MapPin,
    title: "Steder & hytte",
    description:
      "Egne pakkelister og lagerstyring for hytta eller båten. Aldri mer glem dopapir til hytta! 🏔️",
    color: "alert",
    isNew: true,
    link: "/familie-hub",
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
            Middager, oppgaver og aktiviteter – alt på ett sted
          </h2>
          <p className="text-lg text-charcoal-light">
            Fra ukens middagsplanlegging til hvem som tar ut søppelet og når fotballtreningen starter –
            listo.family gir hele familien full oversikt.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            const Icon = feature.icon;

            return (
              <Link
                key={index}
                href={(feature as any).link || "#"}
                className={`group p-6 rounded-squircle border ${colors.border} bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative block`}
              >
                {(feature as { isNew?: boolean }).isNew && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-listo-500 to-listo-600 text-white text-xs font-bold rounded-full shadow-md">
                    NY
                  </span>
                )}
                <div
                  className={`w-12 h-12 ${colors.bg} rounded-squircle-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                {(feature as any).link && (
                  <div className="flex items-center text-xs font-bold text-listo-600 group-hover:gap-2 transition-all">
                    LES MER <ArrowRight size={14} className="ml-1" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
