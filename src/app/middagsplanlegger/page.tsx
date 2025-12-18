"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  Sparkles,
  ShoppingCart,
  Users,
  ArrowRight,
  Check,
  ChefHat,
  Zap,
  Heart,
} from "lucide-react";

export default function Middagsplanlegger() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-cream-50 via-white to-listo-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-listo-200/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-40 w-80 h-80 bg-salmon-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                Gratis middagsplanlegger
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
                Planlegg ukens middager på{" "}
                <span className="gradient-text-magic">under 5 minutter</span>
              </h1>

              <p className="text-xl text-charcoal-light mb-8 leading-relaxed">
                Listo er den smarte middagsplanleggeren som hjelper norske familier
                med å planlegge ukemenyen, lage handlelister automatisk, og aldri
                mer lure på &quot;hva skal vi ha til middag?&quot;
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/#beta"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Prøv gratis nå
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-charcoal-light">
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-listo-500" />
                  100% gratis i beta
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-listo-500" />
                  Ingen kredittkort
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-listo-500" />
                  Synk med familien
                </span>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-80 animate-float">
                <div className="bg-charcoal rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-cream-50 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                    <Image
                      src="/screenshots/planner.png"
                      alt="listo.family middagsplanlegger app"
                      width={320}
                      height={693}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -left-8 top-20 bg-white rounded-squircle p-4 shadow-xl animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📅</span>
                    <div>
                      <p className="font-semibold text-charcoal">Hele uken planlagt!</p>
                      <p className="text-sm text-charcoal-light">7 middager klar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              Kjenner du igjen dette?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Problems */}
            <div className="bg-red-50 rounded-squircle p-8 border border-red-100">
              <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                <span className="text-2xl">😫</span> Uten middagsplanlegger
              </h3>
              <ul className="space-y-4">
                {[
                  "\"Hva skal vi ha til middag?\" - hver eneste dag",
                  "Stressende handleturer uten oversikt",
                  "Mat som kastes fordi det ikke blir brukt",
                  "Takeaway og ferdigmat når tiden ikke strekker til",
                  "Krangling om hvem som skal lage middag",
                ].map((problem, i) => (
                  <li key={i} className="flex items-start gap-3 text-red-800">
                    <span className="text-red-400 mt-1">✕</span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-listo-50 rounded-squircle p-8 border border-listo-100">
              <h3 className="text-xl font-bold text-listo-700 mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span> Med Listo middagsplanlegger
              </h3>
              <ul className="space-y-4">
                {[
                  "Hele uken planlagt på 5 minutter søndag kveld",
                  "Automatisk handleliste basert på ukesplanen",
                  "Mindre matsvinn med smarte forslag",
                  "Varierte middager som passer hele familien",
                  "Alle i familien kan se og bidra til planen",
                ].map((solution, i) => (
                  <li key={i} className="flex items-start gap-3 text-listo-800">
                    <Check className="w-5 h-5 text-listo-500 mt-0.5 flex-shrink-0" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-4">
              Hvordan det fungerer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              En middagsplanlegger som faktisk gjør hverdagen enklere
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "1. Planlegg uken",
                description: "Dra og slipp oppskrifter til hver dag. La AI-en foreslå middager basert på hva familien liker.",
                color: "listo",
              },
              {
                icon: ShoppingCart,
                title: "2. Handlelisten lages automatisk",
                description: "Alle ingredienser fra ukesplanen samles i én smart handleliste, sortert etter butikkens layout.",
                color: "salmon",
              },
              {
                icon: ChefHat,
                title: "3. Lag mat uten stress",
                description: "Se dagens oppskrift med steg-for-steg instruksjoner. Hele familien vet hva som er planen.",
                color: "magic",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-squircle p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-squircle-sm flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{feature.title}</h3>
                <p className="text-charcoal-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              Hvorfor norske familier elsker Listo
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Spar 3+ timer/uke", desc: "Slutt på daglig planlegging og stresshopping" },
              { icon: Heart, title: "Mindre matsvinn", desc: "Kjøp bare det du trenger til ukens middager" },
              { icon: Users, title: "Hele familien deltar", desc: "Sanntidssynk så alle vet hva som skjer" },
              { icon: Zap, title: "AI-assistert", desc: "Smarte forslag når du trenger inspirasjon" },
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-listo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-listo-600" />
                </div>
                <h3 className="font-bold text-charcoal mb-2">{benefit.title}</h3>
                <p className="text-sm text-charcoal-light">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-12 text-center">
            Ofte stilte spørsmål om middagsplanlegging
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Er Listo middagsplanlegger gratis?",
                a: "Ja! Under beta-perioden er alle funksjoner helt gratis. Etter lansering vil grunnfunksjonene fortsatt være gratis, mens avanserte AI-funksjoner vil kreve Premium.",
              },
              {
                q: "Kan hele familien bruke middagsplanleggeren sammen?",
                a: "Absolutt! Det er hele poenget med Listo. Alle familiemedlemmer kan legge til oppskrifter, planlegge middager, og oppdatere handlelisten – alt synkroniseres i sanntid.",
              },
              {
                q: "Hvordan hjelper AI-en med middagsplanleggingen?",
                a: "AI-en lærer hva familien din liker, og kan foreslå middager basert på preferanser, tilgjengelig tid, og hva dere har spist tidligere. Den kan også generere nye oppskrifter på forespørsel.",
              },
              {
                q: "Fungerer det på både mobil og PC?",
                a: "Ja! Listo fungerer på web (PC/Mac), og native apper for iOS og Android kommer snart. Alt synkroniserer automatisk mellom enhetene.",
              },
              {
                q: "Kan jeg importere mine egne oppskrifter?",
                a: "Ja! Du kan lime inn lenker fra matblogger, og AI-en henter automatisk ingredienser og fremgangsmåte. Du kan også legge inn oppskrifter manuelt.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-squircle p-6 border border-charcoal/10">
                <h3 className="font-bold text-charcoal mb-2">{faq.q}</h3>
                <p className="text-charcoal-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-listo-500 to-listo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Klar til å gjøre middagsplanleggingen enklere?
          </h2>
          <p className="text-xl text-listo-100 mb-8">
            Meld deg på beta og bli blant de første som opplever en enklere hverdag. Si farvel til &quot;hva skal vi ha til middag?&quot;
          </p>
          <Link
            href="/#beta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-cream-50 text-listo-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
          >
            <Sparkles className="w-5 h-5" />
            Start gratis nå
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
