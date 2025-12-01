import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Personvernerklæring – Listo",
  description: "Les om hvordan Listo behandler dine personopplysninger",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-charcoal mb-2">Personvernerklæring</h1>
        <p className="text-charcoal-light mb-8">Sist oppdatert: 1. desember 2025</p>

        <div className="prose prose-charcoal max-w-none space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">1. Hvem er vi?</h2>
            <p className="text-charcoal-light leading-relaxed">
              Listo er en familieassistent-app utviklet av Kjetil Kjibba (&quot;vi&quot;, &quot;oss&quot;). 
              Vi er behandlingsansvarlig for personopplysningene som samles inn gjennom appen.
            </p>
            <p className="text-charcoal-light leading-relaxed mt-2">
              <strong>Kontakt:</strong> hei@listo.family
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">2. Hvilke opplysninger samler vi inn?</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              Vi samler inn følgende kategorier av personopplysninger:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Kontoinformasjon:</strong> E-postadresse og visningsnavn når du registrerer deg.
              </li>
              <li>
                <strong>Familiedata:</strong> Informasjon du legger inn, som handlelister, måltidsplaner, 
                oppskrifter og familiemedlemmer du inviterer.
              </li>
              <li>
                <strong>AI-generert innhold:</strong> Når du bruker våre AI-funksjoner (f.eks. ukesmenyer), 
                sendes dine preferanser til Google Gemini for å generere tilpasset innhold.
              </li>
              <li>
                <strong>Tekniske data:</strong> Anonymisert bruksstatistikk for å forbedre appen.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">3. Hvorfor behandler vi opplysningene?</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-charcoal/10">
                  <th className="text-left py-2 text-charcoal font-semibold">Formål</th>
                  <th className="text-left py-2 text-charcoal font-semibold">Rettslig grunnlag</th>
                </tr>
              </thead>
              <tbody className="text-charcoal-light">
                <tr className="border-b border-charcoal/5">
                  <td className="py-2">Opprette og administrere din konto</td>
                  <td className="py-2">Avtale (GDPR art. 6(1)b)</td>
                </tr>
                <tr className="border-b border-charcoal/5">
                  <td className="py-2">Levere tjenesten (handlelister, måltidsplan, osv.)</td>
                  <td className="py-2">Avtale (GDPR art. 6(1)b)</td>
                </tr>
                <tr className="border-b border-charcoal/5">
                  <td className="py-2">Sende viktige oppdateringer om tjenesten</td>
                  <td className="py-2">Berettiget interesse (GDPR art. 6(1)f)</td>
                </tr>
                <tr className="border-b border-charcoal/5">
                  <td className="py-2">Forbedre appen basert på bruksmønstre</td>
                  <td className="py-2">Berettiget interesse (GDPR art. 6(1)f)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">4. Deling med tredjeparter</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              Vi deler data med følgende tjenesteleverandører som er nødvendige for å drifte appen:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Google Firebase:</strong> Autentisering og database (Firestore). 
                Data lagres i EU (europe-west1).
              </li>
              <li>
                <strong>Google Gemini AI:</strong> Behandler matpreferanser for å generere ukesmenyer. 
                Ingen personlig identifiserbar informasjon sendes.
              </li>
              <li>
                <strong>Hetzner:</strong> Hosting av web-applikasjonen (servere i Tyskland).
              </li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              Vi selger aldri dine personopplysninger til tredjeparter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">5. Dine rettigheter</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              I henhold til GDPR har du følgende rettigheter:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li><strong>Innsyn:</strong> Du kan be om å se hvilke opplysninger vi har om deg.</li>
              <li><strong>Retting:</strong> Du kan be om å korrigere uriktige opplysninger.</li>
              <li><strong>Sletting:</strong> Du kan be om at vi sletter alle dine data.</li>
              <li><strong>Dataportabilitet:</strong> Du kan be om å få utlevert dine data i et maskinlesbart format.</li>
              <li><strong>Innsigelse:</strong> Du kan protestere mot behandling basert på berettiget interesse.</li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              For å utøve dine rettigheter, kontakt oss på <a href="mailto:hei@listo.family" className="text-listo-600 underline">hei@listo.family</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">6. Lagring og sletting</h2>
            <p className="text-charcoal-light leading-relaxed">
              Vi lagrer dine data så lenge du har en aktiv konto. Når du sletter kontoen din, 
              slettes alle tilknyttede data innen 30 dager. Sikkerhetskopier kan oppbevares 
              i opptil 90 dager før de slettes permanent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">7. Sikkerhet</h2>
            <p className="text-charcoal-light leading-relaxed">
              Vi bruker bransjestandard sikkerhetstiltak for å beskytte dine data:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2 mt-2">
              <li>Kryptert dataoverføring (HTTPS/TLS)</li>
              <li>Sikker autentisering via Firebase Auth</li>
              <li>Firestore Security Rules som begrenser datatilgang</li>
              <li>Regelmessige sikkerhetsgjennomganger</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">8. Informasjonskapsler (cookies)</h2>
            <p className="text-charcoal-light leading-relaxed">
              Vi bruker kun nødvendige informasjonskapsler for at appen skal fungere, 
              primært for innlogging og sesjonshåndtering via Firebase. 
              Vi bruker ikke sporings- eller markedsføringscookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">9. Barn</h2>
            <p className="text-charcoal-light leading-relaxed">
              Listo er ment for familier, og kontoer opprettes av voksne familiemedlemmer. 
              Vi samler ikke bevisst inn personopplysninger direkte fra barn under 16 år.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">10. Endringer</h2>
            <p className="text-charcoal-light leading-relaxed">
              Vi kan oppdatere denne personvernerklæringen ved behov. Ved vesentlige endringer 
              vil vi varsle deg via e-post eller i appen. Fortsatt bruk av tjenesten etter 
              endringer innebærer aksept av oppdatert erklæring.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-charcoal mb-4">11. Klage</h2>
            <p className="text-charcoal-light leading-relaxed">
              Hvis du mener vi behandler personopplysningene dine i strid med regelverket, 
              kan du klage til Datatilsynet: <a href="https://www.datatilsynet.no" className="text-listo-600 underline" target="_blank" rel="noopener noreferrer">www.datatilsynet.no</a>
            </p>
          </section>

          <section className="border-t border-charcoal/10 pt-8 mt-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Kontakt oss</h2>
            <p className="text-charcoal-light leading-relaxed">
              Har du spørsmål om personvern? Ta kontakt:
            </p>
            <p className="text-charcoal-light mt-2">
              <strong>E-post:</strong> <a href="mailto:hei@listo.family" className="text-listo-600 underline">hei@listo.family</a>
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-charcoal/5 mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-charcoal-light text-sm">
          <p>© 2025 Listo. Alle rettigheter reservert.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-charcoal underline">Vilkår for bruk</Link>
            <Link href="/privacy" className="hover:text-charcoal underline">Personvern</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
