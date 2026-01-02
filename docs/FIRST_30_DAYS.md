# 🎯 Listo: De Første 30 Dagene

**Sprint-fokus:** Vis verdien av automatisering og synkronisering fra dag 1

---

## Kjerneinnsikt

**Listo sin styrke er IKKE "AI-magi" - det er AUTOMATISERING + SYNKRONISERING:**

| Konkret verdi | Hvordan det fungerer |
|---------------|---------------------|
| **Butikkmodus** | To handler samtidig, ser hverandres avkryssinger live |
| **Auto-handleliste** | Planlegg middag → ingredienser legges til automatisk |
| **Porsjonsberegning** | Samværsplan sier hvem som spiser → oppskrift skaleres |
| **Alt på ett sted** | Én app i stedet for 5 (kalender, handleliste, oppgaver, middager, samvær) |

**AI er en støttefunksjon**, ikke hovedattraksjonen. Den hjelper når du trenger inspirasjon, men automatiseringen er det som sparer tid daglig.

---

## Uke 1: Fokus & Identitet

### Dag 1-2: Definer Listo sin identitet

**Oppgave:** Besvar disse spørsmålene skriftlig:

1. **Hva er Listo?**
   - Nåværende: "Familieassistent for måltidsplanlegging, handleliste, oppgaver, kalender..."
   - **Revidert:** "Familiens operativsystem - automatisert synkronisering av middager, handlelister og logistikk"

2. **Hvem er Listo for?**
   - **Primær persona:** "Samkjørings-familien" - to foreldre som begge jobber, trenger å holde oversikt sammen
   - **Sekundær:** Samværs-foreldre som trenger porsjonsberegning

3. **Hva gjør Listo bedre enn alt annet?**
   - **Automatisering:** Planlegg middag → handleliste fylles automatisk
   - **Live-sync:** Butikkmodus der to handler samtidig
   - **Alt-i-ett:** Slipper 5 separate apper

4. **Hva er AI sin rolle?**
   - **Støttefunksjon:** "Trenger inspirasjon? Prøv AI-forslag"
   - **Ikke hovedattraksjon:** Automatiseringen er det som sparer tid daglig

**Leveranse:** Oppdater landing page hero-tekst til å reflektere automatisering + synkronisering.

---

### Dag 3-4: Web-optimalisering for iPhone

**Situasjon:** iOS native app kommer ikke før mars/april 2026 (avhengig av Mac-innkjøp).

**Midlertidig løsning:** Gjør webapp bedre på iPhone Safari.

**Oppgave:**
```bash
# Test webapp på iPhone (bruk BrowserStack eller be en venn teste)
# Sjekk: https://app.listo.family på iPhone Safari
```

**Forbedringer å gjøre:**
1. Legg til PWA manifest for "Add to Home Screen"
2. Optimaliser touch-targets (min 44px)
3. Test at alle modaler fungerer på Safari
4. Fiks eventuelle Safari-spesifikke CSS-bugs

**iOS venteliste på landing page:**
- Legg til "Varsle meg når iOS-app kommer" seksjon
- Samler e-poster for iOS-lansering
- Viser etterspørsel

**Leveranse:**
- [ ] PWA manifest oppdatert
- [ ] Webapp testet på iPhone (via BrowserStack/venn)
- [ ] iOS-venteliste på listo.family

---

### Dag 5-7: Showcase automatisering i onboarding

**Problem:** Nye brukere ser ikke verdien av automatisering før de har brukt appen en stund.

**Løsning:** Vis automatisering I PRAKSIS under onboarding.

**Oppgave:** Legg til "wow-moment" i onboarding:

```
Steg: "Se hvordan automatisering fungerer"

1. Bruker velger "Taco" som middag for fredag
2. App viser: "Ingredienser lagt til handlelisten automatisk:"
   - Tacokjøtt
   - Tacokrydder
   - Rømme
   - Salat
   - ...
3. Bruker ser live hvordan det fungerer

"Dette skjer hver gang du legger til en middag med oppskrift!"
```

**Leveranse:**
- [ ] Onboarding-steg som demonstrerer auto-handleliste
- [ ] Visuell "aha-moment" når ingredienser dukker opp

---

## Uke 2: Onboarding Redesign

### Nytt onboarding-flow

**Nåværende:** 4 slides → opprett familie → full app

**Nytt:**
```
1. Velkommen (slide)
2. Hva vil du oppnå? (valg: middagsplanlegging / organisere familien / begge)
3. Opprett/join familie
4. Hvem bor hjemme? (legg til medlemmer)
5. Matpreferanser: Allergier? Dislikes?
6. Første middag: Velg fra 3 AI-forslag ELLER skriv selv
7. Handleliste generert automatisk
8. Inviter partner (valgfritt)
9. "Du er klar!" → Dashboard
```

**Hvorfor:** Brukeren har allerede gjort noe nyttig før de ser appen.

### Implementasjonsplan

**Dag 8-10:** Lag skjermene
```
/onboarding/goal-selection.tsx    # Steg 2
/onboarding/family-members.tsx    # Steg 4 (eksisterer delvis)
/onboarding/preferences.tsx       # Steg 5 (eksisterer)
/onboarding/first-meal.tsx        # Steg 6 (NY)
/onboarding/invite-partner.tsx    # Steg 8 (NY)
/onboarding/ready.tsx             # Steg 9 (NY)
```

**Dag 11-12:** Koble sammen flow
- Oppdater `/app/_layout.tsx` for å sjekke onboarding-completion
- Lagre onboarding-progresjon i AsyncStorage + Firestore

**Dag 13-14:** Test og iterer
- Test hele flyten på Android, Web, (iOS hvis klar)
- Mål tid fra start til ferdig (mål: < 5 min)

---

## Uke 3: Premium vs. Gratis

### Definer tydelige grenser

**Foreslått modell:**

| Feature | Gratis (etter 14 dager) | Premium |
|---------|-------------------------|---------|
| Kalender | Denne + neste uke | Ubegrenset |
| AI-forslag | 3 per uke | Ubegrenset |
| Oppskrifter | Maks 20 | Ubegrenset |
| Steder | 1 (hjemme) | Ubegrenset |
| Samværsplan | ✅ | ✅ |
| Handleliste | ✅ | ✅ |
| Statistikk | ❌ | ✅ |

### Implementasjon

**Dag 15-17:** Legg til "limit checks"
```typescript
// hooks/usePremiumLimit.ts
export function usePremiumLimit(feature: 'ai_suggestions' | 'recipes' | 'locations') {
    const { isPremium } = useRevenueCat();
    const { userData } = useAuth();
    
    const limits = {
        ai_suggestions: { free: 3, period: 'week' },
        recipes: { free: 20, period: 'total' },
        locations: { free: 1, period: 'total' }
    };
    
    // Check usage from Firestore
    // Return { isAllowed, remaining, limit }
}
```

**Dag 18-19:** UI for limits
- Vis "3/3 AI-forslag brukt denne uken" badge
- "Oppgrader for ubegrenset" knapp når limit nådd
- ALDRI blokker uten forklaring

**Dag 20-21:** Statistikk-side (Premium-only)
- Middager planlagt denne måneden
- Favoritt-retter
- Tid spart (estimat: 2 timer/uke hvis plan fylles)

---

## Uke 4: Soft Launch Prep

### Dag 22-24: Kvalitetssikring

- [ ] Test full user journey (signup → onboarding → første uke → premium)
- [ ] Test på Android, Web, iOS (TestFlight)
- [ ] Fiks kritiske bugs
- [ ] Oppdater landing page med ny messaging

### Dag 25-27: Forbered markedsføring

- [ ] Skriv 3 bloggposter (SEO-fokus):
  1. "Cozi-alternativ: Hvorfor norske familier bytter til Listo"
  2. "5 tips for enklere middagsplanlegging (med AI)"
  3. "Samværskalender-apper: Hva fungerer for norske skilte foreldre"

- [ ] Lag screenshots for app stores
- [ ] Skriv App Store description (no + en)

### Dag 28-30: Launch-klargjøring

- [ ] Submit til App Store (estimert 1-2 uker review)
- [ ] Oppdater Play Store listing
- [ ] Send invitasjon til beta-waitlist
- [ ] Sett opp analytics-dashboard (brukere, retensjon, konvertering)

---

## Suksesskriterier etter 30 dager

| Metrikk | Mål | Hvordan måle |
|---------|-----|--------------|
| Nye registreringer | 100 | Firebase Auth count |
| Onboarding fullført | 70% | AsyncStorage flag |
| Dag 7 retensjon | 40% | Firebase Analytics |
| Minst 1 middag planlagt | 60% | Firestore query |
| Partner invitert | 30% | Family members > 1 |
| Premium-konvertering | 5% | RevenueCat |
| iOS-venteliste signups | 30 | Firestore/form |
| Webapp brukt på iPhone | 10 | Analytics user-agent |

---

## Daglig standup-spørsmål

1. Hva gjorde jeg i går for Listo-fokus?
2. Hva skal jeg gjøre i dag?
3. Er det noe som blokkerer meg?
4. Er dette aligned med "AI middagsplanlegger for travle familier"?

---

## Ukentlig retrospektiv

Hver fredag, svar på:
1. Hva lærte vi om brukerne denne uken?
2. Hva fungerte / fungerte ikke?
3. Hva skal vi slutte å gjøre?
4. Hva skal vi begynne å gjøre?

---

*Start: 1. januar 2026*
*Slutt: 30. januar 2026*
