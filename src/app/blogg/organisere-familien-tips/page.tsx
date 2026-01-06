import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "7 tips for å organisere familien i 2026 | listo.family",
    description:
        "Sliter du med hverdagslogistikken? Her er 7 konkrete tips for å organisere familien bedre i 2026. Fra middagsplanlegging til oppgavefordeling - få orden på hjemmet!",
    keywords: [
        "organisere familien",
        "holde orden på familien",
        "hverdagslogistikk",
        "organisere hjemmet",
        "familieorganisering tips",
        "orden i familien",
        "organisering 2026",
        "strukturere familiehverdagen",
        "tips organisering familie",
        "styre familien",
    ],
};

export default function Article() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=80"
                    alt="Familie som planlegger sammen ved kjøkkenbordet"
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
                        7 tips for å organisere familien i 2026
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Organisering
                        </span>
                        <span>6 min lesetid</span>
                        <span>•</span>
                        <time dateTime="2026-01-06">6. januar 2026</time>
                    </div>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-4 py-12">
                <div className="prose prose-lg prose-gray max-w-none">
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-green-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                        Hvis du føler at hverdagslogistikken tar overhånd – mellom jobb,
                        barneaktiviteter, mathandling og tusen andre ting – er du langt
                        fra alene. Men det finnes løsninger. Her er 7 konkrete tips som
                        faktisk fungerer.
                    </p>

                    <p>
                        Det nye året er den perfekte tiden for å innføre bedre rutiner.
                        Og det beste? Du trenger ikke å gjøre alt på én gang. Start med
                        ett tips, mestre det, og legg til flere etter hvert.
                    </p>

                    {/* Tip 1 */}
                    <div className="my-10 p-6 bg-green-50 rounded-2xl border-l-4 border-green-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            1️⃣ Ha ett felles sted for all informasjon
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Den vanligste feilen familier gjør er å ha informasjon spredt
                            overalt: Kalender på kjøleskapet, handleliste på papir,
                            middagsplan i hodet til mamma. <strong>Løsningen?</strong>
                            Samle alt på ett sted som alle har tilgang til – en app som
                            <Link href="/familieapp" className="text-green-600 hover:underline"> listo.family</Link>,
                            eller et felles system familien er enig om.
                        </p>
                    </div>

                    {/* Tip 2 */}
                    <div className="my-10 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            2️⃣ Planlegg ukens middager på søndag
                        </h2>
                        <p className="text-gray-700">
                            &quot;Hva skal vi ha til middag?&quot; er spørsmålet som stjeler
                            mest tid og energi i hverdagen. Ved å bruke 10-15 minutter
                            søndag kveld på å planlegge ukens middager, eliminerer du
                            dette stresset helt.
                        </p>
                        <p className="text-gray-700 mb-0">
                            <strong>Bonus:</strong> Når middagsplanen er klar, kan handlelisten
                            lages automatisk basert på ingrediensene.
                            <Link href="/middagsplanlegger" className="text-blue-600 hover:underline"> Les mer om middagsplanlegging →</Link>
                        </p>
                    </div>

                    {/* Tip 3 */}
                    <div className="my-10 p-6 bg-salmon-50 rounded-2xl border-l-4 border-salmon-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            3️⃣ Del handlelisten med hele familien
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Ingen flere &quot;jeg trodde du kjøpte melk&quot;-øyeblikk. Med
                            en delt digital handleliste kan hvem som helst legge til ting
                            de trenger, og den som handler ser alt i sanntid. Krysser du
                            av melken i butikken? Partneren din hjemme ser det umiddelbart.
                            <Link href="/handleliste" className="text-salmon-600 hover:underline"> Se hvordan det fungerer →</Link>
                        </p>
                    </div>

                    <figure className="my-10">
                        <Image
                            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80"
                            alt="Synkronisert planlegging mellom familiemedlemmer"
                            width={1200}
                            height={600}
                            className="rounded-2xl object-cover w-full h-64"
                        />
                        <figcaption className="text-center text-sm text-gray-500 mt-3">
                            Når alle har tilgang til samme informasjon, fungerer familien bedre som et team
                        </figcaption>
                    </figure>

                    {/* Tip 4 */}
                    <div className="my-10 p-6 bg-purple-50 rounded-2xl border-l-4 border-purple-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            4️⃣ Gi barna faste ansvarsområder
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Barn som har egne gjøremål føler seg inkludert og lærer ansvar.
                            Start enkelt: Rydde rommet, dekke bordet, mata kjæledyret.
                            Når oppgavene er tydelig fordelt, slipper du å mase – og barna
                            vet hva de skal gjøre.
                            <Link href="/blogg/gjoremal-for-barn" className="text-purple-600 hover:underline"> Les guiden om gjøremål for barn →</Link>
                        </p>
                    </div>

                    {/* Tip 5 */}
                    <div className="my-10 p-6 bg-amber-50 rounded-2xl border-l-4 border-amber-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            5️⃣ Ha et ukentlig familiemøte (15 min)
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Det høres formelt ut, men det trenger bare være 15 minutter
                            søndag kveld. Gå gjennom uken: Hvem skal hvor? Hvilke middager
                            lager vi? Er det noe spesielt vi må huske? Denne lille
                            investeringen sparer deg for timer med stress.
                        </p>
                    </div>

                    {/* Tip 6 */}
                    <div className="my-10 p-6 bg-sky-50 rounded-2xl border-l-4 border-sky-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            6️⃣ Bruk morgenrutiner og kveldsrutiner
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Rutiner er superkrefter for familier. Når alle vet at morgenen
                            alltid følger samme rekkefølge (kle på seg → frokost → pakke
                            sekk → sko), går alt raskere og med mindre konflikter. Det
                            samme gjelder kvelden: Lekser → middag → aktivitet →
                            leggeruting.
                        </p>
                    </div>

                    {/* Tip 7 */}
                    <div className="my-10 p-6 bg-listo-50 rounded-2xl border-l-4 border-listo-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            7️⃣ Ikke strebe etter perfeksjon
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Det viktigste tipset til slutt: Et &quot;godt nok&quot;-system
                            som faktisk brukes er bedre enn et perfekt system som ignoreres.
                            Det vil være dager hvor alt går galt – og det er greit.
                            Poenget er at de fleste dagene går bedre.
                        </p>
                    </div>

                    <h2>Oppsummering: Start i dag!</h2>

                    <div className="my-8 not-prose">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { num: "1", text: "Samle all informasjon på ett sted" },
                                { num: "2", text: "Planlegg middager på søndag" },
                                { num: "3", text: "Del handlelisten digitalt" },
                                { num: "4", text: "Gi barna faste oppgaver" },
                                { num: "5", text: "Ha et kort ukentlig familiemøte" },
                                { num: "6", text: "Lag faste morgen- og kveldsrutiner" },
                                { num: "7", text: "Godta at det ikke blir perfekt" },
                            ].map((item) => (
                                <div key={item.num} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="w-8 h-8 bg-listo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {item.num}
                                    </span>
                                    <span className="text-charcoal">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p>
                        Du trenger ikke gjøre alt på én gang. Velg ett tips denne uken,
                        og se hvordan det fungerer. Legg til flere etter hvert. Før du
                        vet ordet av det, har familien din en hverdag som føles mye
                        mer håndterbar.
                    </p>

                    {/* CTA */}
                    <div className="my-12 p-8 bg-gradient-to-r from-listo-500 to-listo-600 rounded-2xl text-white text-center">
                        <h3 className="text-2xl font-bold mt-0 text-white">
                            Klar til å organisere familien?
                        </h3>
                        <p className="text-listo-100 mb-6">
                            listo.family samler middagsplan, handleliste og gjøremål i én
                            enkel app. Delt med hele familien, synkronisert i sanntid.
                        </p>
                        <Link
                            href="/familieapp"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-listo-600 font-semibold rounded-full hover:bg-cream-50 transition-colors"
                        >
                            Prøv listo.family gratis →
                        </Link>
                    </div>
                </div>

                {/* Author */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-listo-100 rounded-full flex items-center justify-center">
                            <span className="text-listo-600 font-bold">L</span>
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
                        <Link href="/blogg/familieorganisering" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <p className="font-medium text-charcoal group-hover:text-listo-600">
                                Fra kaos til kontroll: Familieorganisering i 2025
                            </p>
                            <p className="text-sm text-gray-500">7 min lesetid</p>
                        </Link>
                        <Link href="/blogg/slik-planlegger-du-ukemenyen" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <p className="font-medium text-charcoal group-hover:text-listo-600">
                                Slik planlegger du ukemenyen effektivt
                            </p>
                            <p className="text-sm text-gray-500">5 min lesetid</p>
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
