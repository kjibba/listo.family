import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Middagsplanlegger & mer for familier | listo.family – Familiens operativsystem",
  description:
    "Norges smarteste middagsplanlegger app! AI-drevet ukemeny, smarte handlelister, oppgavefordeling og familiekalender – alt på ett sted. Prøv gratis!",
  keywords: [
    "middagsplanlegger",
    "middagsplanlegger uke",
    "middagsplanlegger app",
    "ukemeny",
    "måltidsplanlegging",
    "handleliste",
    "handleliste app",
    "ukesplan middag",
    "hva skal vi ha til middag",
    "billig sunn middag",
    "budsjettvennlige måltider",
    "matplanlegging",
    "oppskrifter",
    "familie",
    "AI middagsplanlegger",
    "gratis middagsplanlegger",
  ],
  authors: [{ name: "listo.family" }],
  metadataBase: new URL("https://listo.family"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/listo-logo.svg",
    apple: "/images/listo-logo.svg",
  },
  openGraph: {
    title: "listo.family – Operativsystemet for moderne familier",
    description:
      "Middagsplanlegging, handlelister, oppgaver og familiekalender – alt på ett sted. Familiens komplette digitale assistent.",
    url: "https://listo.family",
    siteName: "listo.family",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "listo.family – Operativsystemet for familier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "listo.family – Operativsystemet for moderne familier",
    description:
      "Middagsplanlegging, handlelister, oppgaver & kalender. Alt familien trenger – på ett sted. Prøv gratis!",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data for SEO - Multiple schemas
const jsonLdSchemas = [
  // Organization schema
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "listo.family",
    url: "https://listo.family",
    logo: "https://listo.family/images/listo-logo.svg",
    description: "listo.family – Operativsystemet for moderne familier. Middagsplanlegger, handlelister, oppgaver og kalender på ett sted.",
    slogan: "Operativsystemet for moderne familier",
    sameAs: [],
  },
  // SoftwareApplication schema
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "listo.family",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android, Web",
    description:
      "Familiens operativsystem: middagsplanlegger, handlelister, oppgavefordeling og kalender – alt synkronisert i sanntid.",
    url: "https://listo.family",
    image: "https://listo.family/images/og-image.png",
    author: {
      "@type": "Organization",
      name: "listo.family",
      url: "https://listo.family",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NOK",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Middagsplanlegger for hele uken",
      "Automatisk handleliste",
      "AI-drevne oppskriftsforslag",
      "Familiesynkronisering i sanntid",
      "Import av oppskrifter fra nettet",
    ],
  },
  // WebSite schema for sitelinks search box
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "listo.family",
    url: "https://listo.family",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://listo.family/blogg?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={inter.variable}>
      <head>
        <script
          defer
          src="https://analytics.listo.family/script.js"
          data-website-id="1b61f65c-a9f0-473d-856b-a1ac47f61c0f"
        />
        {jsonLdSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
