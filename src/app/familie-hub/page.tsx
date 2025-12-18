import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import { Users, Crown, CreditCard, ShieldCheck, Check, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Familie-Hub: Ett abonnement for alle | listo.family",
    description: "Enkelt og greit. Med Listo Premium betaler én person for hele husstanden. Oversiktlig, privat og rimelig.",
};

export default function FamilieHubPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-listo-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-6">
                                Hub & Spoke Modellen
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
                                Én for alle, <br />
                                <span className="gradient-text-magic">alle for én</span>
                            </h1>
                            <p className="text-lg text-charcoal-light mb-8">
                                Glem utfordringer med invitasjoner som krever at alle må betale hver for seg.
                                I Listo betaler én voksen (Hub-en), og resten av familien (eikene) flyter gratis med.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#prøv"
                                    className="px-8 py-4 bg-listo-500 text-white font-semibold rounded-full shadow-lg hover:bg-listo-600 transition-all"
                                >
                                    Start din familie-hub
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white p-8 rounded-squircle shadow-2xl relative">
                                <div className="flex flex-col items-center">
                                    {/* Visual representation of Hub & Spoke */}
                                    <div className="w-24 h-24 bg-listo-500 rounded-full flex items-center justify-center text-white shadow-xl z-20 border-4 border-white mb-4">
                                        <Crown size={40} />
                                    </div>
                                    <div className="relative flex justify-center w-full h-32">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="absolute w-12 h-12 bg-charcoal-light rounded-full flex items-center justify-center text-white border-2 border-white shadow-md transition-transform"
                                                style={{
                                                    transform: `rotate(${i * 72 - 36}deg) translateY(60px)`
                                                }}
                                            >
                                                <Users size={20} />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm font-bold text-charcoal mt-8">Premium Hub</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <div>
                            <div className="w-12 h-12 bg-listo-100 rounded-lg flex items-center justify-center mb-6">
                                <CreditCard className="text-listo-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Ingen skjulte kostnader</h3>
                            <p className="text-sm text-charcoal-light leading-relaxed">
                                Vi tar ikke betalt per bruker. Enten dere er 2 eller 6 i familien,
                                er prisen den samme. Full kontroll på hverdagsøkonomien.
                            </p>
                        </div>

                        <div>
                            <div className="w-12 h-12 bg-salmon-100 rounded-lg flex items-center justify-center mb-6">
                                <ShieldCheck className="text-salmon-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Sentralisert Styring</h3>
                            <p className="text-sm text-charcoal-light leading-relaxed">
                                Som administrator kan du legge til eller fjerne medlemmer,
                                styre hvem som har tilgang til Steder, og holde oversikt over abonnementet.
                            </p>
                        </div>

                        <div>
                            <div className="w-12 h-12 bg-magic-100 rounded-lg flex items-center justify-center mb-6">
                                <Zap className="text-magic-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Øyeblikkelig Tilgang</h3>
                            <p className="text-sm text-charcoal-light leading-relaxed">
                                Så snart Hub-en oppgraderer, låses Premium-funksjonene opp for alle andre.
                                Ingen ventetid, ingen kredittkort-kaos for barna.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 bg-cream-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-12">Enkel vs. Familie-hub</h2>
                    <div className="bg-white rounded-squircle shadow-xl overflow-hidden border border-charcoal/5">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-charcoal text-white">
                                    <th className="p-6">Funksjon</th>
                                    <th className="p-6 text-center">Gratis</th>
                                    <th className="p-6 text-center">Premium Hub</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-charcoal/10">
                                {[
                                    { n: "Brukere", f: "Ubegrenset", p: "Ubegrenset" },
                                    { n: "AI-assistent", f: "5 søk/mnd", p: "Ubegrenset" },
                                    { n: "Antall Steder", f: "1", p: "Ubegrenset" },
                                    { n: "Premium til alle", f: "Nei", p: "Ja!" },
                                    { n: "Autofill matplan", f: "Nei", p: "Ja!" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-cream-50 transition-colors">
                                        <td className="p-6 font-medium text-charcoal">{row.n}</td>
                                        <td className="p-6 text-center text-sm text-charcoal-light">{row.f}</td>
                                        <td className="p-6 text-center font-bold text-listo-600">{row.p}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Cta />
            <Footer />
        </main>
    );
}
