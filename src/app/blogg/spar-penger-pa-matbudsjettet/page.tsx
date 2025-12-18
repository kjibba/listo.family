import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "10 tips for å spare penger på matbudsjettet | listo.family",
  description:
    "Praktiske råd for å kutte matkostnadene uten å gå på kompromiss med kvalitet eller smak. Spar tusenvis av kroner i året.",
};

export default function Article() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
          alt="Sparing og budsjett med mynter og kalkulator"
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
            10 tips for å spare penger på matbudsjettet
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Økonomi
            </span>
            <span>6 min lesetid</span>
            <span>•</span>
            <time dateTime="2024-12-01">1. desember 2024</time>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg prose-gray max-w-none">
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-green-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
            Matutgifter er en av de største postene i familiebudsjettet. Med
            noen enkle grep kan du kutte kostnadene betydelig – uten at det går
            utover smak eller kvalitet.
          </p>

          {/* Highlight box */}
          <div className="my-10 not-prose bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-3xl">
            <div className="text-5xl font-bold mb-2">20-30%</div>
            <p className="text-green-100">
              Så mye kan familier spare på mat ved å planlegge ukemenyen
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">1</span>
            Planlegg ukemenyen
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Dette er det viktigste tipset av alle. Når du vet hva du skal lage,
            kjøper du kun det du trenger. Impulshandling er matbudsjettets
            største fiende.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">2</span>
            Handle med liste – og hold deg til den
          </h2>
          <p className="text-gray-700 leading-relaxed">
            En handleliste er bare nyttig hvis du faktisk følger den. Gå til
            butikken mett, og unngå å la deg friste av tilbud du ikke trenger.
          </p>

          <blockquote className="my-10 not-prose border-l-4 border-green-500 pl-6 py-4 bg-gradient-to-r from-green-50 to-transparent">
            <p className="text-xl font-medium text-gray-800 italic">
              &quot;Organiser handlelisten etter butikkens layout. Da handler du raskere og unngår å vandre rundt og bli fristet.&quot;
            </p>
          </blockquote>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">3</span>
            Sjekk kjøleskapet før du handler
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Overraskende mange glemmer å sjekke hva de allerede har hjemme. Ta
            et raskt bilde av kjøleskapet før du drar, så unngår du å kjøpe
            dobbelt.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">4</span>
            Kjøp sesongvarer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Frukt og grønnsaker i sesong er billigere og smaker bedre. Norske
            jordbær i juni er rimeligere enn importerte i januar – og mye
            bedre.
          </p>

          {/* Season grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">🌸</div>
              <div className="font-bold text-gray-900 text-sm">Vår</div>
              <div className="text-xs text-gray-600">Asparges, rabarbra</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">☀️</div>
              <div className="font-bold text-gray-900 text-sm">Sommer</div>
              <div className="text-xs text-gray-600">Bær, tomater</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">🍂</div>
              <div className="font-bold text-gray-900 text-sm">Høst</div>
              <div className="text-xs text-gray-600">Epler, kål</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">❄️</div>
              <div className="font-bold text-gray-900 text-sm">Vinter</div>
              <div className="text-xs text-gray-600">Rotgrønnsaker</div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">5</span>
            Ikke kast mat
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Nordmenn kaster i snitt 42 kilo mat per person per år. Det tilsvarer
            tusenvis av kroner rett i søppelet. Spis restene, frys ned det du ikke
            rekker å spise, og vær kreativ med det som nærmer seg datoen.
          </p>

          <figure className="my-10 not-prose">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
                alt="Matlagning fra bunnen av"
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="text-center text-sm text-gray-500 mt-3">
              Hjemmelaget mat koster en brøkdel av ferdigmat
            </figcaption>
          </figure>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">6</span>
            Lag mer fra bunnen
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Ferdigmat og halvfabrikata er praktisk, men dyrt. En hjemmelaget
            tomatsaus koster en brøkdel av den ferdigkjøpte – og smaker bedre.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">7</span>
            Kjøp større pakker (når det lønner seg)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Storpakker er ofte billigere per kilo, men bare hvis du faktisk
            bruker alt. Frys ned det du ikke bruker med en gang.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">8</span>
            Prøv billigere proteinkilder
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kjøtt er ofte den dyreste ingrediensen. Prøv å ha noen vegetariske
            dager, eller bruk rimeligere alternativer:
          </p>
          <ul className="space-y-2 my-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">•</span>
              <span>Belgfrukter (linser, bønner, kikerter)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">•</span>
              <span>Egg – en av de rimeligste proteinkildene</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">•</span>
              <span>Kyllinglår i stedet for bryst</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">•</span>
              <span>Frossen fisk – ofte rimeligere og like bra</span>
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">9</span>
            Sammenlign priser
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Prisforskjellene mellom butikkene kan være store. Bruk apper som
            viser tilbud, eller ha en fast &quot;billigbutikk&quot; for basisvarer.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">10</span>
            Lag lunsj hjemmefra
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Å kjøpe lunsj ute koster fort 100-150 kr dagen. Med rester fra
            middagen eller en enkel matpakke sparer du tusenvis i måneden.
          </p>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 my-12 text-center not-prose">
            <h3 className="text-2xl font-bold text-white mb-3">
              La listo.family hjelpe deg spare penger
            </h3>
            <p className="text-green-100 mb-6">
              Automatisk ukemeny og handleliste som hjelper deg handle smartere.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-colors shadow-lg"
            >
              Prøv listo.family gratis →
            </Link>
          </div>
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">L</span>
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
            <Link href="/blogg/slik-planlegger-du-ukemenyen" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <p className="font-medium text-charcoal group-hover:text-green-600">
                Slik planlegger du ukemenyen – en komplett guide
              </p>
              <p className="text-sm text-gray-500">5 min lesetid</p>
            </Link>
            <Link href="/blogg/sunn-mat-pa-budsjett" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <p className="font-medium text-charcoal group-hover:text-green-600">
                Sunn mat på budsjett: 15 tips for å spise sunt og billig
              </p>
              <p className="text-sm text-gray-500">7 min lesetid</p>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
