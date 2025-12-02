"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown, Search, HelpCircle, Sparkles, Users, Shield, CreditCard } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    name: "Generelt",
    icon: HelpCircle,
    color: "listo",
    faqs: [
      {
        question: "Er Listo gratis?",
        answer:
          "Ja! Under beta-perioden er alle funksjoner i Listo helt gratis – inkludert AI-forslag, ubegrenset antall oppskrifter og familiemedlemmer. Etter lansering vil grunnfunksjoner forbli gratis for alltid, mens avanserte AI-funksjoner vil kreve et Premium-abonnement.",
      },
      {
        question: "Hvilke enheter støtter Listo?",
        answer:
          "Listo fungerer på web (PC, Mac, nettbrett) allerede nå. Native apper for iOS (iPhone/iPad) og Android er under utvikling og kommer snart. Alt synkroniserer automatisk mellom enhetene dine.",
      },
      {
        question: "Fungerer Listo uten internett?",
        answer:
          "Ja, Listo har offline-støtte. Du kan se ukeplanen, krysse av på handlelisten og lese oppskrifter selv uten internettforbindelse. Endringer du gjør synkroniseres automatisk når du er tilbake online.",
      },
    ],
  },
  {
    id: "family",
    name: "Familie & Deling",
    icon: Users,
    color: "salmon",
    faqs: [
      {
        question: "Kan hele familien bruke Listo sammen?",
        answer:
          "Absolutt! Familiedelingsfunksjonen er kjernen i Listo. Alle familiemedlemmer kan logge inn og se samme ukeplan, handleliste og oppskrifter. Endringer synkroniseres i sanntid – når noen legger til en vare på handlelisten, ser alle det umiddelbart.",
      },
      {
        question: "Hvordan inviterer jeg familiemedlemmer?",
        answer:
          "I appen finner du en invitasjonskode under familieinnstillinger. Del denne koden med familiemedlemmer, så kan de bli med ved å taste den inn når de registrerer seg eller logger inn.",
      },
      {
        question: "Kan barn bruke Listo?",
        answer:
          "Ja! Barn over 13 år kan opprette egen konto og bli med i familien. For yngre barn anbefaler vi at de bruker en forelders enhet. Tenåringer kan for eksempel se hva som er planlagt til middag og legge til ønsker på handlelisten.",
      },
    ],
  },
  {
    id: "ai",
    name: "AI & Forslag",
    icon: Sparkles,
    color: "magic",
    faqs: [
      {
        question: "Hvordan fungerer AI-forslagene?",
        answer:
          "Listo bruker Google Gemini AI til å generere personlige middagsforslag. AI-en kan foreslå ukemenyer basert på hva familien liker, tilgjengelig tid, og hva dere har spist tidligere. Den kan også generere nye oppskrifter og importere oppskrifter fra nettsider automatisk.",
      },
      {
        question: "Kan jeg importere oppskrifter fra nettsider?",
        answer:
          "Ja! Med Listo kan du lime inn en lenke fra hvilken som helst matblogg eller oppskriftsside, og AI-en henter automatisk ut ingredienser og fremgangsmåte. Du kan også legge inn oppskrifter manuelt eller ta bilde av en kokebokside.",
      },
      {
        question: "Hvordan lager Listo handlelisten automatisk?",
        answer:
          "Når du legger til middager i ukeplanen, samler Listo automatisk alle ingredienser fra oppskriftene og legger dem til handlelisten. Listen sorteres etter butikkens layout (frukt/grønt, kjøtt, meieri osv.) for enklere handling.",
      },
      {
        question: "Blir forslagene bedre over tid?",
        answer:
          "Ja! Listo lærer hvilke oppskrifter familien bruker ofte, hva dere liker, og hvilke dager dere foretrekker bestemte retter. Denne innsikten brukes til å gi AI-en bedre instrukser, slik at forslagene blir mer treffsikre over tid. Du kan også gi thumbs up/down på oppskrifter for å finjustere.",
      },
    ],
  },
  {
    id: "security",
    name: "Personvern & Sikkerhet",
    icon: Shield,
    color: "sky",
    faqs: [
      {
        question: "Er mine data trygge?",
        answer:
          "Ja, vi tar personvern på alvor. All data lagres sikkert i Firebase (Google Cloud), kryptert både under overføring og lagring. Vi selger aldri data til tredjeparter. Du kan når som helst slette all din data fra appen.",
      },
      {
        question: "Hva brukes dataene mine til?",
        answer:
          "Dine data brukes kun til å levere Listo-tjenesten til deg og familien din. Vi analyserer aggregert, anonymisert data for å forbedre appen, men individuelle data deles aldri med tredjeparter.",
      },
      {
        question: "Kan jeg slette kontoen min?",
        answer:
          "Ja, du kan når som helst slette kontoen din og all tilknyttet data fra innstillingene i appen. Dette er permanent og kan ikke angres.",
      },
    ],
  },
  {
    id: "billing",
    name: "Priser & Abonnement",
    icon: CreditCard,
    color: "alert",
    faqs: [
      {
        question: "Hva er forskjellen mellom gratis og Premium?",
        answer:
          "Gratisversjonen inkluderer ukeplanlegger, handleliste, opptil 20 oppskrifter og 2 familiemedlemmer. Premium gir ubegrenset antall oppskrifter og familiemedlemmer, AI-genererte middagsforslag, oppskriftsimport fra nettsider, og prioritert support.",
      },
      {
        question: "Når koster Listo penger?",
        answer:
          "Under beta-perioden (nå) er alt gratis. Etter offisiell lansering vil gratisversjonen fortsatt være gratis, mens Premium vil ha en månedlig eller årlig kostnad. Betabrukere vil få spesielle fordeler ved lansering.",
      },
      {
        question: "Hvordan avslutter jeg abonnementet?",
        answer:
          "Du kan avbestille når som helst direkte i appen eller via App Store/Google Play. Ingen bindingstid, ingen spørsmål. Du beholder tilgang til Premium-funksjoner til perioden du har betalt for er over.",
      },
      {
        question: "Må alle i familien betale?",
        answer:
          "Nei! Med Premium trenger bare én person i familien å betale. Hele familien får da tilgang til alle Premium-funksjoner gjennom familiekontoen.",
      },
    ],
  },
];

const colorClasses: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
  listo: {
    bg: "bg-listo-100",
    icon: "text-listo-600",
    border: "border-listo-200",
    hover: "hover:bg-listo-50",
  },
  salmon: {
    bg: "bg-salmon-100",
    icon: "text-salmon-600",
    border: "border-salmon-200",
    hover: "hover:bg-salmon-50",
  },
  magic: {
    bg: "bg-magic-100",
    icon: "text-magic-600",
    border: "border-magic-200",
    hover: "hover:bg-magic-50",
  },
  sky: {
    bg: "bg-sky-100",
    icon: "text-sky-600",
    border: "border-sky-200",
    hover: "hover:bg-sky-50",
  },
  alert: {
    bg: "bg-amber-100",
    icon: "text-amber-600",
    border: "border-amber-200",
    hover: "hover:bg-amber-50",
  },
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("general-0");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter FAQs based on search
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          searchQuery === "" ||
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  // Further filter by active category
  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.id === activeCategory)
    : filteredCategories;

  return (
    <main className="min-h-screen bg-cream-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-4">
            Hjelp & Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-6">
            Ofte stilte spørsmål
          </h1>
          <p className="text-lg text-charcoal-light mb-8">
            Finn svar på de vanligste spørsmålene om Listo. Finner du ikke det
            du leter etter?{" "}
            <a
              href="mailto:hei@listo.family"
              className="text-listo-600 underline hover:text-listo-700"
            >
              Kontakt oss
            </a>
            .
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Søk i spørsmål..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-listo-500 focus:ring-2 focus:ring-listo-200 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 bg-cream-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === null
                  ? "bg-charcoal text-white"
                  : "bg-white text-charcoal hover:bg-gray-100"
              }`}
            >
              Alle kategorier
            </button>
            {faqCategories.map((category) => {
              const colors = colorClasses[category.color];
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? `${colors.bg} ${colors.icon}`
                      : `bg-white text-charcoal ${colors.hover}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal-light text-lg">
                Ingen spørsmål matcher søket ditt.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="mt-4 text-listo-600 hover:text-listo-700 font-medium"
              >
                Nullstill søk
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {displayCategories.map((category) => {
                const colors = colorClasses[category.color];
                const Icon = category.icon;

                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      <h2 className="text-2xl font-bold text-charcoal">
                        {category.name}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {category.faqs.map((faq, index) => {
                        const key = `${category.id}-${index}`;
                        const isOpen = openIndex === key;

                        return (
                          <div
                            key={key}
                            className={`border ${colors.border} rounded-xl overflow-hidden bg-white`}
                          >
                            <button
                              onClick={() => setOpenIndex(isOpen ? null : key)}
                              className={`w-full flex items-center justify-between p-5 text-left ${colors.hover} transition-colors`}
                            >
                              <span className="font-semibold text-charcoal pr-4">
                                {faq.question}
                              </span>
                              <ChevronDown
                                className={`w-5 h-5 text-charcoal-light flex-shrink-0 transition-transform ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5">
                                <p className="text-charcoal-light leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            Fant du ikke svaret du lette etter?
          </h2>
          <p className="text-charcoal-light mb-8">
            Vi er her for å hjelpe! Send oss en melding, så svarer vi så fort vi kan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hei@listo.family"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-listo-500 hover:bg-listo-600 text-white font-semibold rounded-full transition-colors"
            >
              Send oss en e-post
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-charcoal/20 hover:bg-gray-50 text-charcoal font-semibold rounded-full transition-colors"
            >
              Tilbake til forsiden
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
