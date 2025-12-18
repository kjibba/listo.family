import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål (FAQ) | listo.family",
  description:
    "Finn svar på vanlige spørsmål om listo.family. Lær om funksjoner, priser, familiesynkronisering, AI-forslag og mer.",
  keywords: [
    "listo faq",
    "listo spørsmål",
    "middagsplanlegger app",
    "familieapp",
    "måltidsplanlegger hjelp",
    "listo pris",
    "listo gratis",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Ofte stilte spørsmål (FAQ) | listo.family",
    description:
      "Finn svar på vanlige spørsmål om listo.family.",
    url: "https://listo.family/faq",
    siteName: "listo.family",
    locale: "nb_NO",
    type: "website",
  },
};

// FAQ Schema for Google Featured Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Er listo.family gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Under beta-perioden er alle funksjoner i listo.family helt gratis – inkludert AI-forslag, ubegrenset antall oppskrifter og familiemedlemmer. Etter lansering vil grunnfunksjoner forbli gratis for alltid, mens avanserte AI-funksjoner vil kreve et Premium-abonnement.",
      },
    },
    {
      "@type": "Question",
      name: "Kan hele familien bruke listo.family sammen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutt! Familiedelingsfunksjonen er kjernen i listo.family. Alle familiemedlemmer kan logge inn og se samme ukesplan, handleliste og oppskrifter. Endringer synkroniseres i sanntid – når noen legger til en vare på handlelisten, ser alle det umiddelbart.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan fungerer AI-forslagene i listo.family?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "listo.family bruker Google Gemini AI til å generere personlige middagsforslag. AI-en kan foreslå ukemenyer basert på hva familien liker, tilgjengelig tid, og hva dere har spist tidligere. Den kan også generere nye oppskrifter og importere oppskrifter fra nettsider automatisk.",
      },
    },
    {
      "@type": "Question",
      name: "Fungerer listo.family uten internett?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, listo.family har offline-støtte. Du kan se ukesplanen, krysse av på handlelisten og lese oppskrifter selv uten internettforbindelse. Endringer du gjør synkroniseres automatisk når du er tilbake online.",
      },
    },
    {
      "@type": "Question",
      name: "Hvilke enheter støtter listo.family?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "listo.family fungerer på web (PC, Mac, nettbrett) allerede nå. Native apper for iOS (iPhone/iPad) og Android er under utvikling og kommer snart. Alt synkroniserer automatisk mellom enhetene dine.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jeg importere oppskrifter fra andre nettsider?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Med listo.family kan du lime inn en lenke fra hvilken som helst matblogg eller oppskriftsside, og AI-en henter automatisk ut ingredienser og fremgangsmåte. Du kan også legge inn oppskrifter manuelt eller ta bilde av en kokebokside.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan lager listo.family handlelisten automatisk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Når du legger til middager i ukesplanen, samler listo.family automatisk alle ingredienser fra oppskriftene og legger dem til handlelisten. Listen sorteres etter butikkens layout (frukt/grønt, kjøtt, meieri osv.) for enklere handling.",
      },
    },
    {
      "@type": "Question",
      name: "Er mine data trygge i listo.family?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, vi tar personvern på alvor. All data lagres sikkert i Firebase (Google Cloud), kryptert både under overføring og lagring. Vi selger aldri data til tredjeparter. Du kan når som helst slette all din data fra appen.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan avslutter jeg abonnementet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du kan avbestille når som helst direkte i appen eller via App Store/Google Play. Ingen bindingstid, ingen spørsmål. Du beholder tilgang til Premium-funksjoner til perioden du har betalt for er over.",
      },
    },
    {
      "@type": "Question",
      name: "Hva er forskjellen mellom gratis og Premium?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gratisversjonen inkluderer ukesplanlegger, handleliste, opptil 20 oppskrifter og 2 familiemedlemmer. Premium gir ubegrenset antall oppskrifter og familiemedlemmer, AI-genererte middagsforslag, oppskriftsimport fra nettsider, og prioritert support.",
      },
    },
  ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
