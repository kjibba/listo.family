import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI som middagsassistent: Slik foreslår appen perfekte middager | listo.family",
    description:
        "Sliter du med 'hva skal vi ha til middag?' Lær hvordan AI-basert middagsplanlegging tar hensyn til familiens preferanser, allergier og travle kalendere.",
    keywords: [
        "AI middagsplanlegging",
        "hva skal vi ha til middag",
        "middagsforslag app",
        "automatisk middagsplan",
        "ukemeny generator",
        "smart middagsplanlegger",
        "middagsideer familie",
        "kunstig intelligens mat",
    ],
};

export default function Article() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
                    alt="Familie som planlegger middager ved kjøkkenbordet"
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
                        AI som middagsassistent: Slik foreslår appen perfekte middager
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                        <span className="bg-magic-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            AI & Teknologi
                        </span>
                        <span>5 min lesetid</span>
                        <span>•</span>
                        <time dateTime="2024-12-13">13. desember 2024</time>
                    </div>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-4 py-12">
                <div className="prose prose-lg prose-gray max-w-none">
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-magic-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                        &quot;Hva skal vi ha til middag?&quot; Det evige spørsmålet. Hver dag,
                        år etter år. Men hva om en AI kunne svare for deg – basert på
                        hva familien faktisk liker?
                    </p>

                    {/* User story box */}
                    <div className="my-12 p-6 bg-magic-50 rounded-2xl border-l-4 border-magic-400">
                        <h2 className="text-2xl font-bold text-charcoal mt-0 flex items-center gap-2">
                            🤖 Møt Maria
                        </h2>
                        <p className="text-gray-700 mb-0">
                            Maria har 3 barn, jobb, og null inspirasjon for middagen klokken
                            16:30. Før brukte hun 20-30 minutter daglig på å finne på noe –
                            scrolle gjennom oppskrifter, sjekke kjøleskapet, ende opp med
                            pølser likevel. Nå tar det 30 sekunder.
                        </p>
                    </div>

                    <h2>Problemet med tradisjonell middagsplanlegging</h2>

                    <p>
                        De fleste foreldre kjenner seg igjen i minst én av disse:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">😩</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Beslutningstrøtthet</h3>
                            <p className="text-gray-600 m-0">
                                Etter 1000+ middager blir kreativiteten litt... sliten
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🤔</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Alle vil noe forskjellig</h3>
                            <p className="text-gray-600 m-0">
                                Veganerjenta, laktosegutten og kresne treåringen
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">⏰</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Varierende tid</h3>
                            <p className="text-gray-600 m-0">
                                Mandag er rolig, tirsdag er kaos etter fotballtrening
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🔄</div>
                            <h3 className="text-lg font-bold text-charcoal mb-2">Samme retter hele tiden</h3>
                            <p className="text-gray-600 m-0">
                                Taco, pasta, pølser – repeat. Hvor ble variasjonen av?
                            </p>
                        </div>
                    </div>

                    <h2>Hvordan AI-middagsplanlegging fungerer</h2>

                    <p>
                        Moderne AI kan faktisk forstå familiens behov – ikke bare gi tilfeldige
                        forslag. Slik fungerer det:
                    </p>

                    <div className="space-y-6 my-8 not-prose">
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-magic-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                            <div>
                                <h3 className="font-bold text-charcoal text-lg mb-1">AI-en lærer familiens preferanser</h3>
                                <p className="text-gray-600">
                                    Hvem liker hva? Hvem er allergisk? Hva har dere gitt 5 stjerner?
                                    Jo mer dere bruker appen, jo bedre blir forslagene.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-magic-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                            <div>
                                <h3 className="font-bold text-charcoal text-lg mb-1">Den sjekker kalenderen</h3>
                                <p className="text-gray-600">
                                    Fotballtrening klokken 17? Da foreslår den en 20-minutters middag.
                                    Rolig søndag? Kanskje en langkokt gryte.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-magic-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                            <div>
                                <h3 className="font-bold text-charcoal text-lg mb-1">Den unngår repetisjoner</h3>
                                <p className="text-gray-600">
                                    Hadde dere kylling i går? Da foreslår den noe annet i dag.
                                    Taco forrige fredag? Kanskje pizza denne gangen.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-magic-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">4</span>
                            <div>
                                <h3 className="font-bold text-charcoal text-lg mb-1">Den tilpasser porsjoner</h3>
                                <p className="text-gray-600">
                                    Barna hos ekspartneren denne uken? AI-en vet det, og foreslår
                                    retter tilpasset 2 voksne i stedet for 5 personer.
                                </p>
                            </div>
                        </div>
                    </div>

                    <figure className="my-10">
                        <Image
                            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80"
                            alt="Fargerik og sunn middagsrett"
                            width={1200}
                            height={600}
                            className="rounded-2xl object-cover w-full h-64"
                        />
                        <figcaption className="text-center text-sm text-gray-500 mt-3">
                            AI-en foreslår retter basert på det dere faktisk liker
                        </figcaption>
                    </figure>

                    <h2>Marias nye hverdag</h2>

                    <p>
                        Etter to uker med AI-middagsplanlegging:
                    </p>

                    <div className="my-12 p-6 bg-green-50 rounded-2xl border-l-4 border-green-500">
                        <ul className="text-gray-700 mb-0 space-y-2">
                            <li><strong>Søndag kveld:</strong> Åpner appen, trykker &quot;Generer ukesplan&quot;. 30 sekunder senere: 7 middager klare.</li>
                            <li><strong>Justerer:</strong> Bytter ut onsdag (har kylling i fryseren), beholder resten.</li>
                            <li><strong>Handleliste:</strong> Genereres automatisk med akkurat det hun trenger.</li>
                            <li><strong>Mandag 16:30:</strong> Sjekker appen. &quot;Ah, fiskegrateng. Ingrediensene er klare.&quot;</li>
                        </ul>
                    </div>

                    <h2>Men er det ikke upersonlig?</h2>

                    <p>
                        Tvert imot. AI-en lærer av <em>din</em> familie:
                    </p>

                    <ul>
                        <li>Rate oppskrifter med stjerner – AI-en husker hva som var en hit</li>
                        <li>Legg inn allergier og preferanser – de respekteres alltid</li>
                        <li>Chat med AI-en: &quot;Noe barnevennlig med kjøttdeig som er klart på 20 min&quot;</li>
                    </ul>

                    <p>
                        Jo mer dere bruker den, jo mer &quot;din&quot; blir den.
                    </p>

                    <h2>Chat-funksjonen: Din personlige kokk</h2>

                    <p>
                        Noen ganger trenger du bare å spørre noen:
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 my-8 not-prose font-mono text-sm">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className="text-magic-500">Du:</span>
                                <span className="text-gray-700">Vi har kyllingfilet og grønnsaker. Hva kan vi lage på 30 min?</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-magic-500">AI:</span>
                                <span className="text-gray-700">Prøv wok med kylling og grønnsaker! Skjær kylling i strimler,
                                    stek i varm wokpanne 3-4 min. Tilsett grønnsaker (brokkoli, paprika, gulrot) i
                                    5 min. Smak til med soyasaus og ingefær. Server med ris eller nudler.</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-magic-500">Du:</span>
                                <span className="text-gray-700">Kan den være uten soya? Allergisk.</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-magic-500">AI:</span>
                                <span className="text-gray-700">Absolutt! Bruk kokossaus i stedet, eller smak til med
                                    sitron, hvitløk og litt honning for en frisk asiatisk-inspirert smak.</span>
                            </div>
                        </div>
                    </div>

                    <h2>Import oppskrifter fra hvor som helst</h2>

                    <p>
                        Fant en god oppskrift på MatPrat eller i en kokebok? AI-en hjelper:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                        {[
                            { icon: "📱", title: "Fra nettsider", desc: "Åpne oppskriften i appen, trykk import" },
                            { icon: "📷", title: "Fra kokebøker", desc: "Ta bilde – AI-en digitaliserer den" },
                            { icon: "✍️", title: "Manuelt", desc: "Skriv inn og la AI-en strukturere" },
                            { icon: "⭐", title: "Rate og lær", desc: "Gi stjerner så AI-en forstår hva familien liker" },
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

                    {/* CTA */}
                    <div className="my-12 p-8 bg-gradient-to-r from-magic-500 to-magic-600 rounded-2xl text-white text-center">
                        <h3 className="text-2xl font-bold mt-0 text-white">
                            La AI-en ta over middagsstresset
                        </h3>
                        <p className="text-magic-100 mb-6">
                            listo.family bruker Googles Gemini AI til å generere middagsforslag
                            som faktisk passer din familie. Prøv det – det er gratis å starte.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-magic-600 font-semibold rounded-full hover:bg-cream-50 transition-colors"
                        >
                            Prøv listo.family gratis →
                        </Link>
                    </div>

                    <h2>Oppsummering</h2>

                    <p>
                        AI-middagsplanlegging er ikke fremtiden – det er nå. Med riktig
                        verktøy kan du:
                    </p>

                    <ul>
                        <li>Få personaliserte middagsforslag på sekunder</li>
                        <li>Slippe beslutningstrøtthet rundt mat</li>
                        <li>Ta hensyn til allergier, preferanser og tid</li>
                        <li>Bygge opp en oppskriftsbank AI-en lærer av</li>
                    </ul>

                    <p>
                        Maria bruker nå de 20 minuttene hun sparte på å faktisk <em>lage</em>
                        maten i stedet for å lure på hva den skal være. 🍽️
                    </p>
                </div>

                {/* Author */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-magic-100 rounded-full flex items-center justify-center">
                            <span className="text-magic-600 font-bold">L</span>
                        </div>
                        <div>
                            <p className="font-medium text-charcoal">Listo-teamet</p>
                            <p className="text-sm text-gray-500">
                                Tips og inspirasjon for smarte familier
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related articles */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-charcoal mb-6">Les også</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link href="/blogg/slik-planlegger-du-ukemenyen" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <p className="font-medium text-charcoal group-hover:text-magic-600">
                                Slik planlegger du ukemenyen uten stress
                            </p>
                            <p className="text-sm text-gray-500">5 min lesetid</p>
                        </Link>
                        <Link href="/blogg/hva-skal-vi-ha-til-middag" className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <p className="font-medium text-charcoal group-hover:text-magic-600">
                                Hva skal vi ha til middag? 30 ideer for hele uken
                            </p>
                            <p className="text-sm text-gray-500">8 min lesetid</p>
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
