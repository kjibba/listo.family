import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import { Sparkles, ShoppingCart, Calendar, Brain, Zap, Clock, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "AI-drevet Logistikk | listo.family",
    description: "Få mer gjort med mindre innsats. Listo bruker AI for å koble kalenderen din mot handlelisten og middagsplanen.",
};

export default function AiLogistikkPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-magic-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-magic-100 text-magic-700 rounded-full text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                Intelligent familie-assistent
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
                                Appen som <br />
                                <span className="gradient-text-magic">tenker for deg</span>
                            </h1>
                            <p className="text-lg text-charcoal-light mb-8">
                                Hvorfor skal du bruke tid på å sjekke om du har ingredienser til middag når appen kan gjøre det?
                                Listo kobler prikkene mellom ukesplanen, kalenderen og handlekurven.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#prøv"
                                    className="px-8 py-4 bg-gradient-to-r from-magic-500 to-magic-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                                >
                                    Begynn din prøveperiode
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white p-4 rounded-[2rem] shadow-2xl skew-y-1">
                                <Image
                                    src="/images/ai-logistikk-hero.png"
                                    alt="AI Logistikk i Listo"
                                    width={600}
                                    height={400}
                                    className="rounded-[1.5rem]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logic Flow Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold text-charcoal mb-4">Fra kaos til kontroll på sekunder</h2>
                        <p className="text-charcoal-light">Slik fungerer den intelligente logistikk-motoren i Listo Premium.</p>
                    </div>

                    <div className="relative">
                        {/* Connection line (desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-magic-200 to-transparent -translate-y-1/2" />

                        <div className="grid lg:grid-cols-3 gap-12 relative">
                            <div className="bg-white p-8 rounded-squircle border border-charcoal/5 shadow-sm relative">
                                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                                    <Calendar className="text-sky-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">1. Kalenderen sjekkes</h3>
                                <p className="text-sm text-charcoal-light">
                                    Listo ser at Jon har fotballtrening kl 17:30 på tirsdag.
                                    Appen forstår at middagen må være ferdig på 15 minutter.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-squircle border border-magic-200 shadow-xl relative scale-105 z-10">
                                <div className="w-12 h-12 bg-magic-100 rounded-full flex items-center justify-center mb-6">
                                    <Brain className="text-magic-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">2. AI-en velger</h3>
                                <p className="text-sm text-charcoal-light">
                                    "Magic Fill" foreslår *Pølser i brød* eller *Wraps* i stedet for *Lapskaus* den dagen.
                                    Basert på barnas favoritter og tiden dere har til rådighet.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-squircle border border-charcoal/5 shadow-sm relative">
                                <div className="w-12 h-12 bg-salmon-100 rounded-full flex items-center justify-center mb-6">
                                    <ShoppingCart className="text-salmon-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">3. Handlelisten oppdateres</h3>
                                <p className="text-sm text-charcoal-light">
                                    Ingrediensene legges automatisk i handlelisten, sortert etter layouten i din faste butikk.
                                    Du sparer tid i butikken på rekordtid.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature List */}
            <section className="py-24 bg-charcoal text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-8">Hvorfor kaste bort tid på manuelt arbeid?</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-magic-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Zap className="text-magic-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Sanntids-synkronisering</h4>
                                        <p className="text-sm text-white/70">Når du legger til en banan på listen, popper den opp hos partneren din umiddelbart. Slutt på "kjøpte du melk?"-meldinger.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-magic-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="text-magic-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2">Tidsbesparelse</h4>
                                        <p className="text-sm text-white/70">Familiene våre sparer i gjennomsnitt 45 minutter i uken bare på selve planleggingen. Det er nesten to fulle dager i året!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-squircle border border-white/10">
                            <h3 className="text-xl font-bold mb-6">Premium-fordeler</h3>
                            <ul className="space-y-4">
                                {["Ubegrenset AI-søk", "Avansert lagerstyring", "Prioritert tilgang til nye modeller", "Smarte påminnelser før varer går ut på dato"].map((f, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="text-magic-400 w-5 h-5" />
                                        <span className="text-sm text-white/80">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Cta />
            <Footer />
        </main>
    );
}
