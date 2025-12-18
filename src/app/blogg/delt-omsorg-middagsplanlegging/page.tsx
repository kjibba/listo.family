import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Middagsplanlegging med delt omsorg: Slik fungerer det | listo.family",
    description:
        "Har du barn som bor to steder? Lær hvordan smart middagsplanlegging gjør hverdagen enklere for hele familien – uansett hvem som har barna.",
    keywords: [
        "delt omsorg",
        "samværsordning",
        "middagsplanlegging",
        "barn to hjem",
        "delt foreldreansvar",
        "ukesplanlegging familie",
        "middagsplan delt bosted",
    ],
};

export default function Article() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1600&q=80"
                    alt="Familie som lager middag sammen"
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
                        Middagsplanlegging med delt omsorg: Slik fungerer det
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                        <span className="bg-listo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Familielogistikk
                        </span>
                        <span>6 min lesetid</span>
                        <span>•</span>
                        <time dateTime="2024-12-13">13. desember 2024</time>
                    </div>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-4 py-12">
                <div className="prose prose-lg prose-gray max-w-none">
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-listo-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                        &quot;Hvem har barna denne uken? Og hva skal vi egentlig ha til middag?&quot;
                        For familier med delt omsorg er dette spørsmål som dukker opp ukentlig.
                        Det trenger ikke være så komplisert.
                    </p>

                    {/* User story box */}
                    <div className="my-12 p-6 bg-salmon-50 rounded-2xl border-l-4 border-salmon-400">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            👨‍👧‍👦 Møt Thomas og Lise
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Thomas har Emma (8) og Oliver (11) annenhver uke. Hver søndag startet
                            med det samme kaoset: &quot;Hva har vi i kjøleskapet? Hva liker barna
                            denne uken? Trenger vi å handle?&quot; Han brukte ofte første kvelden på
                            take-away fordi han ikke var forberedt.
                        </p>
                    </div>

                    <h2>Utfordringene med delt bosted</h2>

                    <p>
                        Når barn bor to steder, blir middagsplanlegging ekstra komplisert:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">📅</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Varierende porsjoner</h3>
                            <p className="text-gray-600 m-0">
                                Noen uker er dere 4, andre uker 2. Hvor mye mat skal du egentlig lage?
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🛒</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Dobbelt handlearbeid</h3>
                            <p className="text-gray-600 m-0">
                                To hjem betyr ofte at samme varer kjøpes to ganger – eller glemmes begge steder
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🤔</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Hvem liker hva?</h3>
                            <p className="text-gray-600 m-0">
                                Preferansene endrer seg. Det som var favoritten hos mamma, er kanskje ikke det lenger
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">⏰</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Travle byttehelger</h3>
                            <p className="text-gray-600 m-0">
                                Søndag kveld er allerede stressende nok uten å tenke på ukens middager
                            </p>
                        </div>
                    </div>

                    <h2>Løsningen: Smart samværsplan</h2>

                    <p>
                        Med en app som forstår delt omsorg, forsvinner mye av stresset. Du setter
                        opp samværsplanen én gang – og appen beregner resten automatisk.
                    </p>

                    {/* Solution box */}
                    <div className="my-12 p-6 bg-listo-50 rounded-2xl border-l-4 border-listo-500">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            ✅ Slik fungerer det i listo.family
                        </h2>
                        <ul className="text-gray-700 mb-0 space-y-2">
                            <li><strong>Sett byttedag:</strong> F.eks. søndag kveld</li>
                            <li><strong>Velg mønster:</strong> Ukentlig eller annenhver uke</li>
                            <li><strong>Marker startuke:</strong> Partall eller oddetallsuke</li>
                            <li><strong>Ferdig:</strong> Appen vet nå hvem som spiser hjemme – alltid</li>
                        </ul>
                    </div>

                    <figure className="my-10">
                        <Image
                            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80"
                            alt="Far og barn som lager mat sammen på kjøkkenet"
                            width={1200}
                            height={600}
                            className="rounded-2xl object-cover w-full h-64"
                        />
                        <figcaption className="text-center text-sm text-gray-500 mt-3">
                            De beste middagsøyeblikkene skjer når du har planlagt riktig
                        </figcaption>
                    </figure>

                    <h2>Thomas&apos; nye hverdag</h2>

                    <p>
                        Etter å ha satt opp samværsplanen, endret alt seg:
                    </p>

                    <div className="space-y-4 my-8 not-prose">
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-listo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                            <div>
                                <h3 className="font-bold text-charcoal text-lg mb-1">Søndag kveld</h3>
                                <p className="text-gray-600">
                                    Appen viser automatisk at barna kommer. Den foreslår 3 middager
                                    basert på hva de liker, med porsjoner beregnet for 3 personer.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-listo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                            <div>
                                <h3 className="font-bold text-charcoal text-lg mb-1">Mandag morgen</h3>
                                <p className="text-gray-600">
                                    Handlelisten er klar med akkurat det han trenger for uken –
                                    verken mer eller mindre.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-listo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                            <div>
                                <h3 className="font-bold text-charcoal text-lg mb-1">Fredag</h3>
                                <p className="text-gray-600">
                                    Taco-fredag som alltid! Appen husker at dette er familietradisjonen.
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2>Når barna er hos den andre</h2>

                    <p>
                        Ukene uten barn er også enklere å planlegge:
                    </p>

                    <ul>
                        <li>Porsjoner beregnes for voksne</li>
                        <li>Mer tid til matlaging? Prøv nye oppskrifter</li>
                        <li>Mindre handling – mindre svinn</li>
                    </ul>

                    <p>
                        <strong>Tips:</strong> Bruk én av disse ukene til batch-cooking.
                        Lag fryseretter som barna liker, så har du et ekstra kort i ermet
                        på travle dager.
                    </p>

                    <h2>Hva med den andre forelderen?</h2>

                    <p>
                        Ideelt sett bruker begge foreldre samme system. Da kan dere:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                        {[
                            { icon: "🔄", title: "Dele oppskrifter", desc: "Barna får favorittene i begge hjem" },
                            { icon: "📋", title: "Koordinere allergier", desc: "Begge hjem har oppdatert info" },
                            { icon: "💬", title: "Se hva barna spiste", desc: "Unngå å servere samme middag to dager på rad" },
                            { icon: "🤝", title: "Samarbeide om innkjøp", desc: "Hvem kjøper hva før byttehelgen" },
                        ].map((tip) => (
                            <div key={tip.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                <span className="text-2xl">{tip.icon}</span>
                                <div>
                                    <p className="font-semibold text-charcoal m-0">{tip.title}</p>
                                    <p className="text-sm text-gray-600 m-0">{tip.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p>
                        Men selv om bare én forelder bruker appen, er forbedringen merkbar.
                        Du får kontroll over <em>din</em> uke – og det er en stor forskjell.
                    </p>

                    <h2>Gjester og spontane endringer</h2>

                    <p>
                        Hva skjer når bestemor kommer på middag? Eller barna har med en venn?
                    </p>

                    <ul>
                        <li>Legg til gjester med ett trykk</li>
                        <li>Porsjoner oppdateres automatisk</li>
                        <li>Handlelisten justerer seg</li>
                    </ul>

                    <p>
                        Og hvis byttedag plutselig endres – bare oppdater i appen, så
                        følger alt annet med.
                    </p>

                    {/* CTA */}
                    <div className="my-12 p-8 bg-gradient-to-r from-listo-500 to-listo-600 rounded-2xl text-white text-center">
                        <h3 className="text-2xl font-bold mt-0 text-white">
                            Klar for enklere hverdager?
                        </h3>
                        <p className="text-listo-100 mb-6">
                            listo.family er laget for moderne familier – inkludert de med
                            delt omsorg. Prøv samværsplanleggeren og se forskjellen.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-listo-600 font-semibold rounded-full hover:bg-cream-50 transition-colors"
                        >
                            Prøv listo.family gratis →
                        </Link>
                    </div>

                    <h2>Oppsummering</h2>

                    <p>
                        Delt omsorg betyr ikke dobbelt stress med middagsplanlegging.
                        Med riktig verktøy kan du:
                    </p>

                    <ul>
                        <li>Sette opp samværsplanen én gang</li>
                        <li>Få automatiske porsjonsberegninger</li>
                        <li>Slippe å lure på hvem som spiser hjemme</li>
                        <li>Ha mer tid til det som faktisk betyr noe – barna</li>
                    </ul>

                    <p>
                        Thomas bruker nå søndagskvelden på brettspill med Emma og Oliver i
                        stedet for å stresse over middagsplaner. Det kan du også. 🍽️
                    </p>
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
                                Tips og inspirasjon for moderne familier
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
                                Slik planlegger du ukemenyen uten stress
                            </p>
                            <p className="text-sm text-gray-500">5 min lesetid</p>
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
