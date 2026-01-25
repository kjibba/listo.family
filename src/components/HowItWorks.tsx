"use client";

import Image from "next/image";
import { UserPlus, CalendarDays, ShoppingBag, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Opprett familien",
    description:
      "Samle flokken din i appen. Legg inn hva barna liker (og ikke liker), så husker Listo det for deg.",
    screenshot: "/screenshots/planner.png",
    color: "listo",
  },
  {
    step: 2,
    icon: CalendarDays,
    title: "Planlegg uken",
    description:
      "Fyll ukesplanen med middager og aktiviteter. Når fotballtreningen krasjer med middagen, foreslår vi løsninger som sparer tid.",
    screenshot: "/screenshots/planner.png",
    color: "salmon",
  },
  {
    step: 3,
    icon: ShoppingBag,
    title: "Handle smart",
    description:
      "Handlelisten skriver seg selv basert på ukesplanen. Og det beste? Listen sorteres automatisk etter butikken du står i.",
    screenshot: "/screenshots/store-mode.png",
    color: "sky",
  },
  {
    step: 4,
    icon: UtensilsCrossed,
    title: "Lag maten",
    description:
      "Når det er din tur til å lage middag, har du alt du trenger: Oppskrift, porsjoner og fremgangsmåte – rett på skjermen.",
    screenshot: "/screenshots/recipe.png",
    color: "magic",
  },
];

const colorClasses = {
  listo: { bg: "bg-listo-500", light: "bg-listo-100", text: "text-listo-600", blob: "bg-listo-200/40" },
  salmon: { bg: "bg-salmon-500", light: "bg-salmon-100", text: "text-salmon-600", blob: "bg-salmon-200/40" },
  sky: { bg: "bg-sky-500", light: "bg-sky-100", text: "text-sky-600", blob: "bg-sky-200/40" },
  magic: { bg: "bg-magic-500", light: "bg-magic-100", text: "text-magic-600", blob: "bg-magic-200/40" },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-charcoal rounded-full text-sm font-medium mb-4 shadow-sm">
            Slik hjelper Listo deg
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Få oversikten tilbake
          </h2>
          <p className="text-lg text-charcoal-light">
            Fire enkle steg for å samle trådene.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 lg:space-y-24">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;
            const colors = colorClasses[item.color as keyof typeof colorClasses];

            return (
              <div
                key={item.step}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"
                  }`}
              >
                {/* Content */}
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${colors.bg} text-white flex items-center justify-center font-bold text-lg`}>
                      {item.step}
                    </div>
                    <div className={`w-10 h-10 rounded-squircle-sm ${colors.light} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-charcoal-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Image */}
                <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <div className="relative flex justify-center">
                    <div className="bg-charcoal rounded-[2.5rem] p-2.5 shadow-2xl w-56 sm:w-64">
                      <div className="bg-cream-50 rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                        <Image
                          src={item.screenshot}
                          alt={item.title}
                          width={256}
                          height={554}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Decorative blob */}
                    <div
                      className={`absolute -z-10 w-48 h-48 rounded-full blur-3xl ${isEven
                        ? `-bottom-8 -right-8 ${colors.blob}`
                        : `-bottom-8 -left-8 ${colors.blob}`
                        }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
