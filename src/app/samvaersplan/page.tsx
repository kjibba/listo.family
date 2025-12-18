import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import { Users, Heart, Calendar, Sparkles, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Samværsplan & Delt Bosted | listo.family",
    description: "Gjør delt omsorg enklere med listo.family. Automatiske porsjoner, samværsplan og felles oversikt for moderne familier.",
};

export default function SamvaersplanPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-cream-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-salmon-100 text-salmon-700 rounded-full text-sm font-medium mb-6">
                                For familier med delt bosted
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
                                Delt omsorg skal ikke være <br />
                                <span className="gradient-text-magic">tidkrevende logistikk</span>
                            </h1>
                            <p className="text-lg text-charcoal-light mb-8">
                                Hvem er hjemme til middag? Hvor mange porsjoner skal jeg handle?
                                Listo automatiserer logistikken i delt bosted, så dere kan fokusere på barna.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#prøv"
                                    className="px-8 py-4 bg-listo-500 text-white font-semibold rounded-full shadow-lg hover:bg-listo-600 transition-all"
                                >
                                    Start din Gullbillett
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white p-4 rounded-[2rem] shadow-2xl rotate-2">
                                <Image
                                    src="/images/samvaersplan-hero.png"
                                    alt="Delt omsorg i Listo"
                                    width={600}
                                    height={400}
                                    className="rounded-[1.5rem]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-charcoal mb-4">Hvorfor Listo er perfekt for delt omsorg</h2>
                        <p className="text-charcoal-light">Vi har bygget Listo med moderne familiestrukturer i tankene, ikke som en ettertanke.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-squircle bg-cream-50 border border-charcoal/5">
                            <div className="w-12 h-12 bg-salmon-100 rounded-full flex items-center justify-center mb-6">
                                <Users className="text-salmon-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Smarte porsjoner</h3>
                            <p className="text-sm text-charcoal-light">
                                Når du planlegger middag, vet Listo hvem som er hjemme. Appen justerer automatisk
                                porsjonsstørrelsen og handlelisten basert på samværsplanen.
                            </p>
                        </div>

                        <div className="p-8 rounded-squircle bg-cream-50 border border-charcoal/5">
                            <div className="w-12 h-12 bg-listo-100 rounded-full flex items-center justify-center mb-6">
                                <Calendar className="text-listo-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Felles kilde til sannhet</h3>
                            <p className="text-sm text-charcoal-light">
                                Begge foreldre kan se barnas aktiviteter, lekser og avtaler.
                                Ingen flere "glemte" info-mailer eller misforståelser om henting.
                            </p>
                        </div>

                        <div className="p-8 rounded-squircle bg-cream-50 border border-charcoal/5">
                            <div className="w-12 h-12 bg-magic-100 rounded-full flex items-center justify-center mb-6">
                                <Heart className="text-magic-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Mindre mental last</h3>
                            <p className="text-sm text-charcoal-light">
                                Listo fungerer som en nøytral part som holder orden på logistikken.
                                Det reduserer behovet for konstant koordinering og fjerner friksjon.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Feature */}
            <section className="py-24 bg-cream-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <Image
                                src="/images/samvaersplan-detail.png"
                                alt="Detaljer om samværsplan"
                                width={500}
                                height={600}
                                className="rounded-squircle shadow-xl"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-8 text-charcoal">Hvordan det fungerer i hverdagen</h2>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 bg-listo-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="text-white w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-charcoal">Sett opp samværsplanen én gang</h4>
                                        <p className="text-sm text-charcoal-light">Legg inn turnus (f.eks. 50/50 eller 40/60). Listo husker hvem som er hvor.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 bg-listo-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="text-white w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-charcoal">Automatisert ukesplan</h4>
                                        <p className="text-sm text-charcoal-light">Når barna drar til den andre forelderen, skjules deres oppgaver og middagsbehov automatisk fra din visning.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 bg-listo-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="text-white w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-charcoal">Ett abonnement dekker alle</h4>
                                        <p className="text-sm text-charcoal-light">Hub & Spoke-modellen betyr at én person betaler, men alle involverte foreldre og barn får Premium-fordelene.</p>
                                    </div>
                                </li>
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
