# SYSTEM CONTEXT: LISTO FAMILY ASSISTANT — DEFINITIVE DESIGN SPEC
# TARGET AGENT: GEMINI 3 PRO (ANTIGRAVITY IDE // UI/UX MODE)
# MISSION: Implementere det komplette visuelle språket og interaksjonsmodellen for "Listo".

---

## 1. KJERNEFILOSOFI OG IDENTITET (CORE PHILOSOPHY)

**Produktdefinisjon:** Listo er en AI-drevet familieassistent. Dens primære funksjon er å redusere den mentale belastningen knyttet til middagsplanlegging, generere tilhørende handlelister automatisk, og holde oversikt over familiens logistikk og gjøremål.

**Visuell Tone:** Varm, innbydende, beroligende og appetittvekkende. Appen skal føles som kjøkkenets hjerte – det motsatte av et sterilt regneark. Det er en samarbeidspartner, ikke en sjef.

**Designprinsipp:** "Friendly Softness". All geometri skal være avrundet. Ingen skarpe hjørner. Linjer skal være tykke og myke. Interaksjoner skal gi taktil, positiv respons.

---

## 2. GLOBALE FUNDAMENTER (GLOBAL FOUNDATIONS)

Agenten skal overholde disse reglene universelt over hele applikasjonen.

### 2.1. Geometri & Linjer
* **Primærform:** "Squircle" (superellipse/sterkt avrundet rektangel) brukes for alle kort, knapper og app-ikonet.
* **Corner Radius:** Vær generøs med radius. Det skal føles mykt.
* **Stroke (Kontur):** Alle ikoner og beholdere bruker en tykk konturlinje.
    * *Stroke Cap/Join:* Må være `Round` (avrundede ender og skjøter).
    * *Stroke Color:* `#34495E` (Soft Charcoal – en varmere koksgrå, aldri ren sort).
* **Bakgrunn:** `#FFFAF5` (Cream White). En veldig subtil, varm off-white for å unngå klinisk hvithet.

### 2.2. Fargepalett (The Family Palette)
Fargene er funksjonelle og definerer appens ulike moduser.

* **FOOD CORE (Middag & Oppskrifter):** `#FF8C69` (Warm Salmon/Coral).
    * *Bruk:* Aktive tilstander i middagsfanen, ikoner relatert til matlaging. Skal føles appetittvekkende.
* **LOGISTICS CORE (Familie & Kalender):** `#5DADE2` (Soft Blue).
    * *Bruk:* Kalenderoppføringer, oppgaver som ikke er matrelaterte, og "Hjem"-oversikten. Beroligende og klar.
* **ACTION & SUCCESS (Ferdig/Klar):** `#2ECC71` (Listo Green).
    * *Bruk:* Fullførte sjekklistepunkter (særlig under handling), bekreftelsesmeldinger.
* **AI GUIDANCE (Magien):** `#9B59B6` (Friendly Purple/Lavender).
    * *Bruk:* Når AI foreslår noe, automatisk genererer innhold, eller "snakker" til brukeren.
* **ALERT/PRIORITY:** `#F1C40F` (Warm Yellow).
    * *Bruk:* Kun for ting som haster eller trenger oppmerksomhet. Sparsom bruk.

---

## 3. NAVIGASJONSSTRUKTUR (TAB BAR ARCHITECTURE)

Bunnmenyen er appens skjelett og skal bestå av fire faner. Ikonene skal bruke "Soft Line & Fill"-stilen (tykk kontur, fylles med seksjonsfargen når aktiv).

| Fane | Fokus | Ikon-metafor | Aktiv Farge |
| :--- | :--- | :--- | :--- |
| **1. Hjem** | Dagsoversikt. "Hva skjer nå?" | Et stilisert hus med en liten klokke eller hjerte integrert. | Soft Blue |
| **2. Middag** | Ukemeny, oppskriftsvalg, AI-forslag. | En tallerken ("cloche"/serveringslokk) som damper lett. | Warm Salmon |
| **3. Handle** | Sjekkliste for butikken (AI-generert). | En handlekurv (basket) som ser velfylt ut. | Listo Green |
| **4. Familie** | Kalender, logistikk, husoppgaver. | En gruppe på 3 stiliserte, avrundede profiler ("meeples") eller en kalender. | Soft Blue |

---

## 4. AI-VISUALISERING & INTERAKSJON

AI-en er en proaktiv deltaker. Dens tilstedeværelse må være tydelig, men ikke påtrengende.

### 4.1. AI-Indikatoren ("The Sparkle")
Det universelle symbolet for AI-involvering er et "sparkle"-ikon (`✨`).
* Når en liste (f.eks. handlelisten) er generert av AI, skal den ha en liten `✨` i AI Purple ved siden av tittelen.
* Når AI foreslår en oppskrift, markeres den med `✨`.

### 4.2. AI-Forslagskort (Suggestion Cards)
Når AI proaktivt foreslår noe (f.eks. i Middag-fanen):
* Bruk et kort med en tynn AI Purple konturlinje og en veldig svak lilla bakgrunnstint (5-10% opacity).
* Inkluder en vennlig introtekst, f.eks. "Basert på hva dere liker..."

### 4.3. Primærhandling: "The Magic FAB"
Den flytende handlingsknappen (Floating Action Button) skal indikere at hjelp er tilgjengelig.
* *Ikon:* En kombinasjon av et plusstegn `+` og en sparkle `✨`.
* *Farge:* En subtil gradient fra Listo Green til AI Purple. Dette signaliserer "Legg til manuelt ELLER la AI hjelpe deg".

---

## 5. KOMPONENT-SPESIFIKASJONER

### 5.1. Lister og Checkboxer
Lister er kjernen i Listo. Interaksjonen skal føles tilfredsstillende.
* **Stil:** Checkboxen er en squircle med tykk kontur (`#34495E`).
* **Aktiv Tilstand (Gjort):** Når trykket, fylles den solid med Listo Green (`#2ECC71`) og får en hvit hake.
* **Animasjon:** En tydelig "puff"-effekt (rask skalering opp og ned) ved fullføring for taktil feedback.

### 5.2. Empty States (Tomme tilstander)
Når data mangler, skal appen føles oppmuntrende, ikke tom. Bruk store, vennlige illustrasjoner i appens myke strekstil.
* **Scenario: Ingen middag planlagt.** Illustrasjon: En familie som ser spørrende på en tom tallerken, mens en vennlig AI-robot svever ved siden av med en kokkehatt. Tekst: "Hva står på menyen? La Listo foreslå noe godt!"
* **Scenario: Tom handleliste.** Illustrasjon: En handlekurv som slapper av i en solstol. Tekst: "Alt handlet inn! (Eller er det på tide å planlegge uken?)"

---

## 6. APP-IKON (LAUNCHER ICON)

App-ikonet skal oppsummere "Klar for familien".
* **Konsept:** En stilisert hake (checkmark) som naturlig former et tak over et enkelt hus-symbol. Det er en "huk av for hjemmet"-metafor.
* **Farge:** Haken/taket er i Listo Green. Huset under er i en varmere tone (f.eks. Warm Salmon), alt på en kremhvit squircle-bakgrunn.

**SLUTT PÅ SPESIFIKASJON.** Agent Gemini 3 Pro har tillatelse til å starte implementering.