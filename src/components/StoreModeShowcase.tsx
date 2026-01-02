"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Users, CheckCircle, Bell, ChevronRight, Zap } from "lucide-react";

const storeModeFeatures = [
    {
        id: "live-sync",
        icon: Users,
        title: "Handle sammen",
        shortDesc: "Se hverandre i sanntid",
        description:
            "Du og partneren din kan handle i hver deres gang. Se hvem som plukker hva, og unngå å kjøpe det samme. Varer forsvinner fra listen i det øyeblikket de plukkes.",
        screenshot: "/screenshots/shopping.png",
    },
    {
        id: "category-sort",
        icon: ShoppingCart,
        title: "Butikksortering",
        shortDesc: "Følg butikkens oppsett",
        description:
            "Definer rekkefølgen på kategoriene for hver butikk du handler i. Varene vises i riktig rekkefølge når du går gjennom butikken.",
        screenshot: "/screenshots/shopping.png",
    },
    {
        id: "progress",
        icon: CheckCircle,
        title: "Fremdrift",
        shortDesc: "Se hvor langt du har kommet",
        description:
            "En visuell fremdriftslinje viser hvor mange varer som er plukket. Perfekt for å vite hvor mye som gjenstår.",
        screenshot: "/screenshots/shopping.png",
    },
    {
        id: "done",
        icon: Bell,
        title: "Ferdig-varsling",
        shortDesc: "Alle varer plukket",
        description:
            "Når alle varer er huket av, får du en bekreftelse. Listen nullstilles automatisk, eller du kan velge å beholde avhukede varer til neste gang.",
        screenshot: "/screenshots/shopping.png",
    },
];

export default function StoreModeShowcase() {
    const [activeFeature, setActiveFeature] = useState(storeModeFeatures[0]);

    return (
        <section id="butikkmodus" className="py-24 bg-gradient-to-b from-cream-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-listo-100 to-listo-200 text-listo-700 rounded-full text-sm font-medium mb-4">
                        <Zap className="w-4 h-4" />
                        Butikkmodus
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
                        Handle sammen,{" "}
                        <span className="gradient-text-magic">i sanntid</span>
                    </h2>
                    <p className="text-lg text-charcoal-light">
                        Ingen andre apper har dette. Med butikkmodus kan to personer handle
                        samtidig og se hverandres fremgang live. Kutt handletiden i to.
                    </p>
                </div>

                {/* Feature showcase */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Feature list */}
                    <div className="space-y-3">
                        {storeModeFeatures.map((feature) => {
                            const Icon = feature.icon;
                            const isActive = activeFeature.id === feature.id;

                            return (
                                <button
                                    key={feature.id}
                                    onClick={() => setActiveFeature(feature)}
                                    className={`w-full text-left p-5 rounded-squircle border transition-all ${isActive
                                        ? "bg-white border-listo-300 shadow-lg"
                                        : "bg-transparent border-transparent hover:bg-white/50 hover:border-charcoal/10"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-squircle-sm flex items-center justify-center flex-shrink-0 ${isActive
                                                ? "bg-gradient-to-br from-listo-500 to-listo-600 text-white"
                                                : "bg-listo-100 text-listo-600"
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

                    {/* Right: Demo area with two phones */}
                    <div className="relative flex justify-center">
                        {/* Main phone */}
                        <div className="relative z-10">
                            <div className="bg-charcoal rounded-[3rem] p-3 shadow-2xl max-w-[280px]">
                                <div className="bg-cream-50 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                                    <Image
                                        src={activeFeature.screenshot}
                                        alt={activeFeature.title}
                                        width={280}
                                        height={607}
                                        className="w-full h-full object-cover transition-opacity duration-300"
                                    />
                                </div>
                            </div>
                            {/* Label */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-listo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                Din telefon
                            </div>
                        </div>

                        {/* Secondary phone (partner) */}
                        <div className="absolute right-0 top-8 -rotate-6 opacity-90">
                            <div className="bg-charcoal-light rounded-[2.5rem] p-2.5 shadow-xl max-w-[240px]">
                                <div className="bg-cream-50 rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                                    <Image
                                        src="/screenshots/shopping.png"
                                        alt="Partners telefon"
                                        width={240}
                                        height={520}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            {/* Label */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-salmon-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                Partners telefon
                            </div>
                        </div>

                        {/* Sync indicator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="bg-white rounded-full p-3 shadow-xl border-2 border-listo-200 animate-pulse">
                                <Zap className="w-6 h-6 text-listo-500" />
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-listo-200/30 rounded-full blur-3xl" />
                        <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-salmon-200/40 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
