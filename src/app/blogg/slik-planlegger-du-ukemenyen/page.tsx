import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slik planlegger du ukemenyen – en komplett guide | listo.family",
  description:
    "Lær hvordan du planlegger ukens middager på under 15 minutter. Spar tid, penger og stress med disse enkle stegene for middagsplanlegging.",
  keywords: [
    "ukemeny",
    "middagsplanlegging",
    "planlegge ukemeny",
    "måltidsplanlegging",
    "ukesplan middag",
    "middagsplanlegger",
  ],
  alternates: {
    canonical: "/blogg/slik-planlegger-du-ukemenyen",
  },
  openGraph: {
    title: "Slik planlegger du ukemenyen – en komplett guide",
    description: "Lær hvordan du planlegger ukens middager på under 15 minutter. Spar tid, penger og stress!",
    type: "article",
    publishedTime: "2024-12-01",
    authors: ["Listo-teamet"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Ukemeny planlegging med notater og ingredienser",
      },
    ],
  },
};

// Article schema for rich snippets
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Slik planlegger du ukemenyen – en komplett guide",
  description: "Lær hvordan du planlegger ukens middager på under 15 minutter. Spar tid, penger og stress med disse enkle stegene.",
  image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80",
  datePublished: "2024-12-01",
  dateModified: "2024-12-15",
  author: {
    "@type": "Organization",
    name: "listo.family",
    url: "https://listo.family",
  },
  publisher: {
    "@type": "Organization",
    name: "listo.family",
    url: "https://listo.family",
    logo: {
      "@type": "ImageObject",
      url: "https://listo.family/images/listo-logo.svg",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://listo.family/blogg/slik-planlegger-du-ukemenyen",
  },
};

export default function Article() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1600&q=80"
            alt="Ukemeny planlegging med notater og ingredienser"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <Link
              href="/blogg"
              className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2 text-sm font-medium"
            >
              <span>←</span> Tilbake til bloggen
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Slik planlegger du ukemenyen – en komplett guide
            </h1>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Planlegging
              </span>
              <span>5 min lesetid</span>
              <span>•</span>
              <time dateTime="2024-12-01">1. desember 2024</time>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <div className="prose prose-lg prose-gray max-w-none">
            {/* Lead paragraph with drop cap effect */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-orange-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              Spørsmålet &quot;Hva skal vi ha til middag?&quot; er kanskje det mest stilte
              spørsmålet i norske hjem. Med en god ukemeny slipper du å tenke på
              det – og du sparer både tid og penger.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              Hvorfor planlegge ukemenyen?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              En gjennomtenkt ukemeny gir deg flere fordeler enn du kanskje tror:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
                <div className="text-3xl mb-2">⏰</div>
                <h3 className="font-bold text-gray-900 mb-1">Spar tid</h3>
                <p className="text-gray-600 text-sm">Ingen mer grubling foran kjøleskapet klokken 17</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-bold text-gray-900 mb-1">Spar penger</h3>
                <p className="text-gray-600 text-sm">Du handler kun det du trenger og kaster mindre mat</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <div className="text-3xl mb-2">🥗</div>
                <h3 className="font-bold text-gray-900 mb-1">Spis sunnere</h3>
                <p className="text-gray-600 text-sm">Med en plan er det lettere å få inn variert kost</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                <div className="text-3xl mb-2">😌</div>
                <h3 className="font-bold text-gray-900 mb-1">Mindre stress</h3>
                <p className="text-gray-600 text-sm">Du vet alltid hva som skal på bordet</p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              Steg 1: Finn din planleggingsdag
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Velg en fast dag i uken for planlegging. Mange foretrekker søndag
              kveld eller mandag morgen. Det viktigste er at det passer inn i din
              rutine.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Sett av 10-15 minutter – det er alt du trenger når du får øvelse.
            </p>

            {/* Inline image */}
            <figure className="my-10 not-prose">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80"
                  alt="Kalender og planlegging av ukemenyen"
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-500 mt-3">
                En fast planleggingsdag gjør det enklere å holde rutinen
              </figcaption>
            </figure>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              Steg 2: Sjekk kalenderen
            </h2>
            <p className="text-gray-700 leading-relaxed">Før du planlegger, ta en titt på ukens aktiviteter:</p>
            <ul className="space-y-2 my-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>Hvilke dager er travle med aktiviteter?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>Har dere gjester eller skal bort?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>Er det noen som spiser borte?</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Travle dager krever enkle middager. Rolige dager kan du eksperimentere mer.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              Steg 3: Bygg menyen din
            </h2>
            <p className="text-gray-700 leading-relaxed">En god ukemeny har variasjon. Tenk på:</p>
            <ul className="space-y-2 my-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Proteinkilder:</strong> Veksle mellom kjøtt, fisk, kylling og vegetar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Tilberedningsmetoder:</strong> Gryte, ovn, panne, wok</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Tidskrevende vs. enkle:</strong> Balanser mellom dem</span>
              </li>
            </ul>

            {/* Pull quote */}
            <blockquote className="my-10 not-prose border-l-4 border-orange-500 pl-6 py-4 bg-gradient-to-r from-orange-50 to-transparent">
              <p className="text-xl md:text-2xl font-medium text-gray-800 italic">
                &quot;Ha 3-4 go-to middager som familien alltid liker. Disse kan du falle tilbake på når inspirasjonen mangler.&quot;
              </p>
              <cite className="text-orange-600 text-sm font-semibold mt-2 block">— Tips fra Listo</cite>
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              Steg 4: Lag handlelisten
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Når menyen er klar, er det tid for handlelisten. Gå gjennom hver
              oppskrift og noter ingrediensene du mangler. Organiser listen etter
              butikkens avdelinger for raskere handling.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              Steg 5: Gjør det til en vane
            </h2>
            <p className="text-gray-700 leading-relaxed">
              De første ukene krever litt mer innsats, men etter 3-4 uker blir det
              en naturlig del av rutinen. Snart vil du lure på hvordan du klarte
              deg uten!
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              Slik hjelper Listo deg
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Med Listo-appen blir måltidsplanlegging enda enklere. Appen kan:
            </p>
            <ul className="space-y-2 my-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Foreslå middager basert på familiens preferanser</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Automatisk generere handlelister fra ukemenyen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Tilpasse seg sesong og tilbud</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Huske hva familien liker (og ikke liker)</span>
              </li>
            </ul>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 my-12 text-center not-prose">
              <h3 className="text-2xl font-bold text-white mb-3">
                Klar for enklere måltidsplanlegging?
              </h3>
              <p className="text-orange-100 mb-6">
                Prøv listo.family gratis og se hvor mye tid du kan spare.
              </p>
              <Link
                href="/"
                className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Prøv listo.family gratis →
              </Link>
            </div>
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">L</span>
              </div>
              <div>
                <p className="font-medium text-charcoal">Listo-teamet</p>
                <p className="text-sm text-gray-500">
                  Tips og inspirasjon for travle familier
                </p>
              </div>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-charcoal mb-6">Les også</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blogg/hva-skal-vi-ha-til-middag" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <p className="font-medium text-charcoal group-hover:text-orange-600">
                  Hva skal vi ha til middag? 30 enkle middagsideer
                </p>
                <p className="text-sm text-gray-500">8 min lesetid</p>
              </Link>
              <Link href="/blogg/batch-cooking-guide" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <p className="font-medium text-charcoal group-hover:text-orange-600">
                  Batch cooking: Lag mat for en hel uke på én dag
                </p>
                <p className="text-sm text-gray-500">7 min lesetid</p>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
