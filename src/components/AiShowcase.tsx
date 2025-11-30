"use client";

import { useState } from "react";
import Image from "next/image";
import { Brain, Wand2, Camera, MessageSquare, ChevronRight, Sparkles } from "lucide-react";

const aiFeatures = [
  {
    id: "magic-fill",
    icon: Wand2,
    title: "Magic Fill",
    shortDesc: "Ett klikk for full ukeplan",
    description:
      "Med bare ett trykk fyller AI-en ut hele ukeplanen basert på familiens preferanser, hva som er på tilbud, og hva dere ikke har spist på en stund. Den tar hensyn til travle dager og foreslår enkle retter når kalenderen er full.",
    screenshot: "/screenshots/planner.png",
  },
  {
    id: "recipe-import",
    icon: Camera,
    title: "Smart import",
    shortDesc: "Importer fra bilde eller URL",
    description:
      "Lim inn en lenke fra hvilken som helst matblogg, og AI-en henter ut kun ingredienser og fremgangsmåte – uten reklame og lange historier. Eller ta bilde av en kokebokside, og se den digitaliseres på sekunder.",
    screenshot: "/screenshots/recipe.png",
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat med kokken",
    shortDesc: "Spør om hva som helst",
    description:
      "Trenger du inspirasjon til fredagskvelden? Vil du gjøre en rett melkefri? Spør AI-assistenten om hva som helst matrelatert. Den kjenner oppskriftene dine og familiens preferanser.",
    screenshot: "/screenshots/ai-chat.png",
  },
  {
    id: "learn",
    icon: Brain,
    title: "Lærer av deg",
    shortDesc: "Blir smartere over tid",
    description:
      "Jo mer dere bruker Listo, jo bedre blir den. Den lærer at barna elsker taco på fredager, at dere liker sterk mat i helgene, og at pasta alltid er en vinner på travle hverdager.",
    screenshot: "/screenshots/planner.png",
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
            Listo bruker avansert AI for å forstå familiens rytme og gjøre
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
                  className={`w-full text-left p-5 rounded-squircle border transition-all ${
                    isActive
                      ? "bg-white border-magic-300 shadow-lg"
                      : "bg-transparent border-transparent hover:bg-white/50 hover:border-charcoal/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-squircle-sm flex items-center justify-center flex-shrink-0 ${
                        isActive
                          ? "bg-gradient-to-br from-magic-500 to-magic-600 text-white"
                          : "bg-magic-100 text-magic-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-charcoal">
                          {feature.title}
                        </h3>
                        <ChevronRight
                          className={`w-5 h-5 text-charcoal/40 transition-transform ${
                            isActive ? "rotate-90" : ""
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
