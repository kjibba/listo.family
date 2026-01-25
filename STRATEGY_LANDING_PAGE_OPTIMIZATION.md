# 🚀 Strategi for Vekst: SEO og Konvertering (listo.family)

> **Dato:** 25.01.2026  
> **Status:** Utkast for godkjenning  
> **Mål:** Øke organisk trafikk (SEO) og konverteringsrate (CRO).

---

## 🤖 Metodikk & Agenter
Denne analysen er utarbeidet ved hjelp av følgende ferdigheter fra `.agent/skills/`:
*   **`@[skills/seo-fundamentals]`**: Brukt for å vurdere E-E-A-T (Erfaring, Ekspertise, Autoritet, Troverdighet), Core Web Vitals, og Topic Cluster-struktur.
*   **`@[skills/frontend-design]`**: Brukt for å analysere UX, "Wow Factor", og konverteringsdrivere (særlig manglende video/død knapp).
*   **`@[skills/user-journey]`**: (Implisitt via `USER_JOURNEY_ANALYSIS.md`) Brukt for å identifisere friksjonspunkter i onboarding.

---

## 1. Nåsituasjon (Executive Summary)

Vi har et solid teknisk fundament med Next.js, men **brukerreisen har kritiske brudd** som hindrer vekst. Vi har innhold (blogg/landingssider), men mangler "limet" som konverterer en besøkende til en aktiv bruker.

### 🟢 Det som fungerer (Keep)
*   **Teknisk SEO:** Metadata, sitemap og struktur er meget bra (`layout.tsx` er godt oppsatt).
*   **Automatisert Onboarding:** Velkomst-e-post og signup-flyt er nå implementert (Fase 1 er fullført!).
*   **Innholdsstruktur:** `blogg/` og feature-sider (`/middagsplanlegger`) eksisterer og gir et godt utgangspunkt for "Topic Clusters".
*   **Visuell profil:** Fargepalett og "clean" look bygger tillit.

### 🔴 Kritiske mangler (Fix ASAP)
*   **🚫 "Se hvordan det funker"-knappen er død:** I Hero-seksjonen er det en Play-knapp som ikke gjør noe. Dette dreper nysgjerrighet umiddelbart.
*   **🎥 Manglende Video:** Brukere vil *se* appen i bruk før de investerer tid. Skjermbilder er bra, men video er nødvendig for "hjelpende hånd"-følelsen.

---

## 2. Innholdsstrategi: "En hjelpende hånd"

### Tone of Voice: Fra "Tech" til "Omsorg"
Dagens tekst ("Null kaos", "Operativsystem") kan fremstå litt kaldt/teknisk. Vi skal vri dette mot det **sympatiske og relaterbare**.

*   **Før:** "Én app, null kaos" (Løfte om perfeksjon, kan virke uoppnåelig)
*   **Etter:** "Litt lavere skuldre i hverdagen" (Løfte om hjelp og forståelse)

### 🎥 Oppskrift: "Hero Video" (30-45 sek)
Vi trenger en video som kan lenkes fra Hero-knappen.

**Produksjonsplan (Kan gjøres "in-house" med Screenflow/Camtasia):**
1.  **Format:** Høykant (mobilvisning) plassert i en "device frame" på en rolig bakgrunn.
2.  **Manus-struktur:**
    *   **00-05s (Problemet):** "Hva skal vi ha til middag? Har vi melk? Hvem henter i barnehagen?" (Visuelt: Rask klipping, kanskje litt rotete notater).
    *   **05-25s (Løsningen - Listo):** "Listo samler trådene." Vis *rolig* scrolling gjennom ukeplanen. Vis et klikk på "Legg til i handleliste". Vis at partneren ser det samme.
    *   **25-35s (Resultatet):** "Mindre administrasjon. Mer tid til oss."
    *   **35-45s (CTA):** "Prøv gratis i dag."
3.  **Lyd:** Rolig, varm voiceover (kan bruke AI-voice som "OpenAI - Alloy" eller "ElevenLabs" for høy kvalitet, men en ekte, "ikke-selgende" stemme er best). Bakgrunnsmusikk: Akustisk, rolig, optimistisk.

### Blogg & SEO
*   Vi har mappene under `src/app/blogg`. Vi må sikre at disse artiklene har **interne lenker** til feature-sidene.
    *   Eks: Artikkelen "Slik planlegger du uken" MÅ lenke til `/middagsplanlegger`.
*   **Call to Action i artikler:** Hver artikkel må avslutte med en "myk" CTA: "Vil du prøve denne metoden i praksis? Listo hjelper deg i gang gratis."

---

## 3. SEO-Strategi: Topic Clusters

Vi bygger autoritet ved å dominere temaer, ikke bare enkeltord.

### Pillar: Middagsplanlegging
*   **Hovedside:** `/middagsplanlegger` (Må være "The Ultimate Guide").
*   **Støtteartikler (Blogg):** "Spare penger på mat", "Sunne middager", "Matplanlegger for barn".
*   **Lenking:** Alle støtteartikler peker 'opp' til hovedsiden. Hovedsiden peker 'ned' til de viktigste støtteartiklene.

### Pillar: Familielogistikk
*   **Hovedside:** `/familie-hub` (eller ny `/kalender`-side).
*   **Støtteartikler:** "Fordeling av husarbeid", "Delt omsorg", "Kjøring til trening".

**Teknisk Tiltak:**
*   Legg til **VideoObject Schema** når videoen er på plass (dette gir video-thumbnail i Google-søk).
*   Sikre `alt`-tekster på alle screenshots er beskrivende (ikke bare "screenshot", men "Listo app viser ukesplan med taco på fredag").

---

## 4. Konverterings-Strategi (Action Plan)

For å sikre at besøkende faktisk *blir med*, må vi fjerne alle hinder.

### Fase 1: Reparasjon (ASAP)
1.  **✅ Automatisert Onboarding:** Velkomst-e-post og Web-signup er implementert.
2.  **✅ "Se hvordan det funker":** Knappen peker nå til "Hvordan det fungerer"-seksjonen (midlertidig fix til video er klar).

### Fase 2: Tillit & Sympati
1.  **✅ Oppdater Tekster:** Tekster i `Hero` og `HowItWorks` er vridd fra "effektivitet" til "ro/oversikt".
2.  **Social Proof:** Vis "X antall familier planlegger uken sin nå" (hvis data finnes/kan anonymiseres) eller "Laget av foreldre, for foreldre".

### Fase 3: Vekst
1.  **SEO-Innhold:** Fyll opp de tomme blogg-mappene (hvis de er tomme) med innhold av høy kvalitet (E-E-A-T).
2.  **Referanse-program:** "Inviter en annen familie, få 1 mnd gratis Premium".

---

## 5. Oppsummering & Bestilling

Veien videre bør være:

1.  **Teknisk:** Fiks "Se video"-knappen (selv om video mangler, la den åpne en bilde-karusell inntil videre).
2.  **System:** Implementer automatisk e-post (Critical).
3.  **Kreativt:** Produser "Hero Video" basert på oppskriften over.

*Dette dokumentet bør lagres som en "Nordstjerne" for utvikling og innholdsproduksjon de neste 3 månedene.*
