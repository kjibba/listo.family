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
  Smartphone,
  WifiOff,
} from "lucide-react";

import Link from "next/link";

const features = [
  {
    icon: ShoppingCart,
    title: "Live-synk handleliste",
    description:
      "Handle sammen i sanntid. Se hva partneren din plukker mens du er i en annen gang. Aldri kjøp melk dobbelt igjen.",
    color: "listo",
    isNew: true,
  },
  {
    icon: Calendar,
    title: "Auto-generert handleliste",
    description:
      "Velg oppskrifter for uken, så lager handlelisten seg selv. Ingrediensene sorteres etter butikkens oppsett.",
    color: "listo",
  },
  {
    icon: Users,
    title: "Samværsplan & porsjoner",
    description:
      "Planlegger hvem som spiser hjemme når. Porsjoner justeres automatisk – perfekt for delt omsorg.",
    color: "salmon",
    link: "/samvaersplan",
  },
  {
    icon: CalendarDays,
    title: "Ukesplanlegger",
    description:
      "Se hele uken i ett blikk. Travle ettermiddager? Listo foreslår retter som tar under 20 minutter.",
    color: "salmon",
    link: "/middagsplanlegger",
  },
  {
    icon: CheckSquare,
    title: "Familieoppgaver",
    description:
      "Fordel hverdagsoppgaver. Roter automatisk på søppeltømming, rydding og andre gjøremål.",
    color: "magic",
  },
  {
    icon: BookOpen,
    title: "Oppskriftsbibliotek",
    description:
      "Importer fra nett med ett klikk, eller ta bilde av kokeboken. Oppskriftene dine, alltid tilgjengelig.",
    color: "magic",
  },
  {
    icon: Sparkles,
    title: "Smart assistent",
    description:
      "Spør om middagstips, porsjonsjusteringer eller hva du kan lage med det du har i kjøleskapet.",
    color: "sky",
    link: "/ai-logistikk",
  },
  {
    icon: Smartphone,
    title: "Tilgjengelig overalt",
    description:
      "Bruk i nettleseren på PC/Mac, iPhone, Android eller nettbrett. Alt synkroniseres automatisk mellom enheter.",
    color: "sky",
    isNew: true,
  },
  {
    icon: MapPin,
    title: "Steder & hytte",
    description:
      "Egne lister for hytta, båten eller ferieleiligheten. Aldri mer glem dopapir til hytta! 🏔️",
    color: "alert",
  },
  {
    icon: WifiOff,
    title: "Fungerer offline",
    description:
      "Ingen dekning i butikken? Null stress. Listo fungerer offline og synkroniserer så fort du er på nett igjen.",
    color: "magic",
    isNew: true,
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
