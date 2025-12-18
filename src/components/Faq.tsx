"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Er listo.family bare for middagsplanlegging?",
    answer:
      "Nei! listo.family er en komplett familieorganisator. I tillegg til middager har du aktivitetskalender for fotballtrening og foreldremøter, oppgavelister for \"ta ut søppelet\" og \"vaske klær\", handleliste, og oppskriftsbibliotek. Alt synkronisert i sanntid mellom hele familien.",
  },
  {
    question: "Er listo.family virkelig gratis?",
    answer:
      "Ja! Grunnleggende funksjoner som ukesplanlegger, handleliste, oppgaver, aktiviteter og opptil 20 oppskrifter er helt gratis – for alltid. Premium-funksjoner som AI-forslag og ubegrenset lagring krever abonnement.",
  },
  {
    question: "Kan hele familien bruke appen?",
    answer:
      "Absolutt! Med gratisversjonen kan 2 medlemmer dele familien. Med Premium får dere ubegrenset antall medlemmer – besteforeldre, au pair, tenåringer, alle er velkomne.",
  },
  {
    question: "Hvordan fungerer sanntidssynkroniseringen?",
    answer:
      "Når noen i familien legger til en vare på handlelisten, en oppgave, eller endrer ukesplanen, ser alle andre det umiddelbart – uten å trenge å oppdatere. Det fungerer på mobil, nettbrett og web.",
  },
  {
    question: "Kan jeg fordele oppgaver mellom familiemedlemmer?",
    answer:
      "Ja! Du kan tildele hvem som er ansvarlig for middagen, hvem som tar ut søppelet, og hvem som skal på foreldremøtet. Alle ser sine oppgaver i sin egen oversikt.",
  },
  {
    question: "Fungerer appen uten internett?",
    answer:
      "Ja, listo.family er bygget for offline-bruk. Du kan se ukesplanen, krysse av handlelisten og lese oppskrifter uten nett. Endringer synkroniseres automatisk når du er tilbake online.",
  },
  {
    question: "Hva slags AI bruker dere?",
    answer:
      "Vi bruker Google Gemini, en av verdens mest avanserte AI-modeller. Den er trent på å forstå mat, preferanser og familielogistikk – og blir bedre jo mer du bruker appen.",
  },
  {
    question: "Er dataene mine trygge?",
    answer:
      "Vi tar personvern på alvor. All data lagres sikkert i Firebase (Google Cloud), kryptert både under overføring og lagring. Vi selger aldri data til tredjeparter. Les mer i vår personvernerklæring.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
            Ofte stilte spørsmål
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Har du spørsmål?
          </h2>
          <p className="text-lg text-charcoal-light">
            Her er svar på det folk lurer mest på. Finner du ikke svaret?{" "}
            <a href="mailto:hei@listo.family" className="text-listo-600 underline hover:text-listo-700">
              Send oss en melding
            </a>
            .
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-charcoal/10 rounded-squircle overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-cream-50 transition-colors"
                >
                  <span className="font-semibold text-charcoal pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-charcoal-light flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-charcoal-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
