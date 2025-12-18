"use client";

import { useState } from "react";
import Image from "next/image";
import { Brain, Wand2, Camera, MessageSquare, ChevronRight, Sparkles } from "lucide-react";

const aiFeatures = [
  {
    id: "magic-fill",
    icon: Wand2,
    title: "Magic Fill",
    shortDesc: "Generer hele ukesplanen",
    description:
      "Med ett klikk fyller AI-en ut hele ukesplanen basert på familiens preferanser, tidligere valg, og travle dager. Den foreslår enkle retter når kalenderen er full.",
    screenshot: "/screenshots/planner.png",
    comingSoon: false,
  },
  {
    id: "recipe-import",
    icon: Camera,
    title: "Smart import",
    shortDesc: "Fra nett og kokebok",
    description:
      "Ta bilde av en oppskrift fra kokeboken, eller importer direkte fra matprat.no, tine.no og andre oppskriftssider. AI-en strukturerer ingredienser og fremgangsmåte automatisk.",
    screenshot: "/screenshots/recipe.png",
    comingSoon: false,
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat med kokken",
    shortDesc: "Spør om hva som helst",
    description:
      "Trenger du inspirasjon til fredagskvelden? Vil du gjøre en rett melkefri? Spør AI-assistenten om hva som helst matrelatert. Den kjenner oppskriftene dine og familiens preferanser.",
    screenshot: "/screenshots/ai-chat.png",
    comingSoon: false,
  },
  {
    id: "learn",
    icon: Brain,
    title: "Lærer av deg",
    shortDesc: "Husker preferansene",
    description:
      "Rate oppskrifter med 1-5 stjerner, og AI-en lærer hva familien liker. Den husker at barna elsker taco på fredager og at pasta er en vinner på travle hverdager.",
    screenshot: "/screenshots/planner.png",
    comingSoon: false,
  },
];

export default function AiShowcase() {
  const [activeFeature, setActiveFeature] = useState(aiFeatures[0]);

  return (
    <section id="ai" className="py-24 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-magic-100 to-salmon-100 text-magic-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-drevet
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Kunstig intelligens som{" "}
            <span className="gradient-text-magic">faktisk hjelper</span>
          </h2>
          <p className="text-lg text-charcoal-light">
            listo.family bruker avansert AI for å forstå familiens rytme og gjøre
            hverdagen enklere – ikke bare litt, men dramatisk enklere.
          </p>
        </div>

        {/* AI Feature showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature list */}
          <div className="space-y-3">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature.id === feature.id;

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  className={`w-full text-left p-5 rounded-squircle border transition-all ${isActive
                    ? "bg-white border-magic-300 shadow-lg"
                    : "bg-transparent border-transparent hover:bg-white/50 hover:border-charcoal/10"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-squircle-sm flex items-center justify-center flex-shrink-0 ${isActive
                        ? "bg-gradient-to-br from-magic-500 to-magic-600 text-white"
                        : "bg-magic-100 text-magic-600"
                        }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-charcoal">
                            {feature.title}
                          </h3>
                          {feature.comingSoon && (
                            <span className="text-xs px-2 py-0.5 bg-magic-100 text-magic-600 rounded-full font-medium">
                              Kommer snart
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-charcoal/40 transition-transform ${isActive ? "rotate-90" : ""
                            }`}
                        />
                      </div>
                      <p className="text-sm text-charcoal-light mt-0.5">
                        {feature.shortDesc}
                      </p>
                      {isActive && (
                        <p className="text-charcoal-light mt-3 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Demo area */}
          <div className="relative">
            <div className="bg-charcoal rounded-[3rem] p-3 shadow-2xl max-w-xs mx-auto">
              <div className="bg-cream-50 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                <Image
                  src={activeFeature.screenshot}
                  alt={activeFeature.title}
                  width={320}
                  height={693}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-magic-200/30 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-salmon-200/40 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
