import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gratis Middagsplanlegger Uke | Planlegg ukemenyen | listo.family",
  description:
    "Den beste middagsplanlegger for uke! Planlegg 7 dagers middager på under 5 minutter. Automatisk handleliste, AI-forslag, og sanntidssynk med hele familien. 100% gratis!",
  keywords: [
    "middagsplanlegger uke",
    "middagsplanlegger",
    "ukemeny planlegger",
    "gratis middagsplanlegger",
    "ukemeny",
    "måltidsplanlegger",
    "middagsplanlegger app",
    "hva skal vi ha til middag",
    "ukesplan middag",
    "måltidsplan uke",
    "familiens middagsplanlegger",
    "middagsplanlegging",
    "middag planlegger",
    "ukesplanlegger mat",
  ],
  alternates: {
    canonical: "/middagsplanlegger",
  },
  openGraph: {
    title: "Gratis Middagsplanlegger Uke | listo.family",
    description:
      "Planlegg ukens middager på under 5 minutter. Automatisk handleliste, AI-forslag, og synk med familien.",
    url: "https://listo.family/middagsplanlegger",
    siteName: "listo.family",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/images/og-middagsplanlegger.png",
        width: 1200,
        height: 630,
        alt: "listo.family middagsplanlegger - Planlegg ukemenyen gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratis Middagsplanlegger Uke | listo.family",
    description: "Planlegg ukens middager på 5 minutter. Automatisk handleliste og AI-forslag!",
    images: ["/images/og-middagsplanlegger.png"],
  },
};

// FAQ Schema for rich snippets in Google search results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Er Listo middagsplanlegger gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Under beta-perioden er alle funksjoner helt gratis. Etter lansering vil grunnfunksjonene fortsatt være gratis, mens avanserte AI-funksjoner vil kreve Premium.",
      },
    },
    {
      "@type": "Question",
      name: "Kan hele familien bruke middagsplanleggeren sammen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutt! Det er hele poenget med Listo. Alle familiemedlemmer kan legge til oppskrifter, planlegge middager, og oppdatere handlelisten – alt synkroniseres i sanntid.",
      },
    },
    {
      "@type": "Question",
      name: "Hvordan hjelper AI-en med middagsplanleggingen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-en lærer hva familien din liker, og kan foreslå middager basert på preferanser, tilgjengelig tid, og hva dere har spist tidligere. Den kan også generere nye oppskrifter på forespørsel.",
      },
    },
    {
      "@type": "Question",
      name: "Fungerer middagsplanleggeren på både mobil og PC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Listo fungerer på web (PC/Mac), og native apper for iOS og Android. Alt synkroniserer automatisk mellom enhetene.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jeg importere mine egne oppskrifter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Du kan lime inn lenker fra matblogger, og AI-en henter automatisk ingredienser og fremgangsmåte. Du kan også legge inn oppskrifter manuelt.",
      },
    },
  ],
};

// BreadcrumbList schema for better navigation display
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hjem",
      item: "https://listo.family",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Middagsplanlegger",
      item: "https://listo.family/middagsplanlegger",
    },
  ],
};

export default function MiddagsplanleggerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
