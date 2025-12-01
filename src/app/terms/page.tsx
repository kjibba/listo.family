import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Vilkår for bruk – Listo",
  description: "Les vilkårene for bruk av Listo familieassistent",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <header className="border-b border-charcoal/5 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til forsiden
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Vilkår for bruk</h1>
        <p className="text-charcoal-light mb-8">Sist oppdatert: 1. desember 2024</p>

        <div className="prose prose-charcoal max-w-none space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">1. Aksept av vilkår</h2>
            <p className="text-charcoal-light leading-relaxed">
              Ved å opprette en konto eller bruke Listo (&quot;Tjenesten&quot;), godtar du disse vilkårene 
              for bruk. Hvis du ikke godtar vilkårene, må du ikke bruke Tjenesten.
            </p>
            <p className="text-charcoal-light leading-relaxed mt-2">
              Tjenesten leveres av Kjetil Kjibba (&quot;vi&quot;, &quot;oss&quot;, &quot;Listo&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">2. Beskrivelse av tjenesten</h2>
            <p className="text-charcoal-light leading-relaxed">
              Listo er en familieassistent-app som hjelper med:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-1 mt-2">
              <li>Handlelister og handleplanlegging</li>
              <li>Måltidsplanlegging og ukesmenyer</li>
              <li>Oppskrifter og matlagingshjelp</li>
              <li>AI-genererte forslag basert på preferanser</li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              Tjenesten er for øyeblikket i <strong>beta</strong>, noe som betyr at den kan 
              inneholde feil og at funksjoner kan endres uten forvarsel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">3. Konto og tilgang</h2>
            <p className="text-charcoal-light leading-relaxed">
              For å bruke Tjenesten må du:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2 mt-2">
              <li>Være minst 16 år gammel</li>
              <li>Oppgi korrekt e-postadresse ved registrering</li>
              <li>Holde påloggingsinformasjonen din konfidensiell</li>
              <li>Varsle oss umiddelbart ved mistanke om uautorisert tilgang</li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              Du er ansvarlig for all aktivitet som skjer under din konto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">4. Beta-tilgang</h2>
            <p className="text-charcoal-light leading-relaxed">
              Under beta-perioden gjelder følgende:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2 mt-2">
              <li>Tjenesten tilbys gratis, men dette kan endres ved lansering</li>
              <li>Vi kan begrense antall brukere og funksjoner</li>
              <li>Data kan gå tapt ved tekniske problemer (vi gjør vårt beste for å unngå dette)</li>
              <li>Vi setter pris på tilbakemeldinger for å forbedre appen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">5. Akseptabel bruk</h2>
            <p className="text-charcoal-light leading-relaxed">
              Du samtykker til å ikke:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2 mt-2">
              <li>Bruke Tjenesten til ulovlige formål</li>
              <li>Forsøke å hacke, overbelaste eller forstyrre Tjenesten</li>
              <li>Laste opp skadelig innhold, virus eller malware</li>
              <li>Opprette falske kontoer eller utgi deg for andre</li>
              <li>Selge eller overføre tilgang til din konto</li>
              <li>Bruke automatiserte verktøy for å hente data fra Tjenesten</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">6. Ditt innhold</h2>
            <p className="text-charcoal-light leading-relaxed">
              Du beholder eierskapet til alt innhold du legger inn (handlelister, oppskrifter, osv.). 
              Ved å bruke Tjenesten gir du oss en begrenset lisens til å lagre og behandle 
              dette innholdet for å levere Tjenesten til deg.
            </p>
            <p className="text-charcoal-light leading-relaxed mt-2">
              Du er ansvarlig for at innholdet du legger inn ikke krenker andres rettigheter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">7. AI-funksjoner</h2>
            <p className="text-charcoal-light leading-relaxed">
              Listo bruker kunstig intelligens (Google Gemini) for å generere forslag til ukesmenyer 
              og oppskrifter. Du forstår at:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2 mt-2">
              <li>AI-generert innhold kan inneholde feil eller unøyaktigheter</li>
              <li>Du bør alltid verifisere viktig informasjon, spesielt knyttet til allergier</li>
              <li>AI-forslag er ikke medisinsk eller ernæringsmessig rådgivning</li>
              <li>Vi er ikke ansvarlige for beslutninger basert på AI-generert innhold</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">8. Familietilgang</h2>
            <p className="text-charcoal-light leading-relaxed">
              Du kan invitere familiemedlemmer til å dele tilgang til handlelister og 
              måltidsplaner. Ved å invitere noen samtykker du til at de kan se og redigere 
              delt familieinnhold. Du er ansvarlig for hvem du inviterer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">9. Priser og betaling</h2>
            <p className="text-charcoal-light leading-relaxed">
              Under beta-perioden er Tjenesten gratis. Ved offisiell lansering kan vi innføre 
              betalte funksjoner. Vi vil varsle deg i god tid før eventuelle endringer, og 
              du kan velge å avslutte bruken om du ikke ønsker å betale.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">10. Ansvarsfraskrivelse</h2>
            <p className="text-charcoal-light leading-relaxed">
              Tjenesten leveres &quot;som den er&quot; uten garantier av noe slag. Vi garanterer ikke at:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2 mt-2">
              <li>Tjenesten vil være tilgjengelig til enhver tid uten avbrudd</li>
              <li>Tjenesten vil være feilfri</li>
              <li>Data aldri vil gå tapt (selv om vi tar sikkerhetskopier)</li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              I den grad loven tillater det, er vi ikke ansvarlige for indirekte tap, 
              tapt fortjeneste eller andre følgeskader som oppstår ved bruk av Tjenesten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">11. Oppsigelse</h2>
            <p className="text-charcoal-light leading-relaxed">
              Du kan når som helst avslutte din konto ved å kontakte oss. Vi kan suspendere 
              eller avslutte din tilgang hvis du bryter disse vilkårene. Ved avslutning 
              slettes dine data i henhold til vår personvernerklæring.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">12. Endringer i vilkårene</h2>
            <p className="text-charcoal-light leading-relaxed">
              Vi kan oppdatere disse vilkårene fra tid til annen. Ved vesentlige endringer 
              vil vi varsle deg via e-post eller i appen minst 14 dager før endringene trer i kraft. 
              Fortsatt bruk av Tjenesten etter endringer betyr at du aksepterer de nye vilkårene.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">13. Lovvalg og tvister</h2>
            <p className="text-charcoal-light leading-relaxed">
              Disse vilkårene reguleres av norsk lov. Eventuelle tvister skal søkes løst 
              i minnelighet. Hvis dette ikke lykkes, er Oslo tingrett verneting.
            </p>
          </section>

          <section className="border-t border-charcoal/10 pt-8 mt-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Kontakt oss</h2>
            <p className="text-charcoal-light leading-relaxed">
              Har du spørsmål om disse vilkårene? Ta kontakt:
            </p>
            <p className="text-charcoal-light mt-2">
              <strong>E-post:</strong> <a href="mailto:kjetil@kjibba.no" className="text-listo-600 underline">kjetil@kjibba.no</a>
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-charcoal/5 mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-charcoal-light text-sm">
          <p>© 2024 Listo. Alle rettigheter reservert.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-charcoal underline">Vilkår for bruk</Link>
            <Link href="/privacy" className="hover:text-charcoal underline">Personvern</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
