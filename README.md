# Listo Landing Page

Landing page for Listo - familiens smarte hverdagsassistent.

## Teknologi

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animasjoner**: Framer Motion
- **Ikoner**: Lucide React
- **Språk**: TypeScript

## Kom i gang

```bash
# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build

# Start produksjonsserver
npm start
```

## Struktur

```
src/
├── app/
│   ├── layout.tsx      # Root layout med metadata
│   ├── page.tsx        # Hovedside (landing page)
│   ├── globals.css     # Globale stiler
│   └── login/
│       └── page.tsx    # Login-side
├── components/
│   ├── Header.tsx      # Navigasjon
│   ├── Hero.tsx        # Hero-seksjon med CTA
│   ├── Features.tsx    # Funksjoner-grid
│   ├── AiShowcase.tsx  # AI-funksjoner
│   ├── HowItWorks.tsx  # Steg-for-steg
│   ├── Testimonials.tsx# Anmeldelser
│   ├── Pricing.tsx     # Prisplaner
│   ├── Faq.tsx         # Ofte stilte spørsmål
│   ├── Cta.tsx         # Nedlastings-CTA
│   ├── Footer.tsx      # Bunntekst
│   └── LoginPage.tsx   # Login-skjema
```

## Screenshots som trengs

For å fullføre landing page trengs det screenshots fra appen:

### Hero-seksjon
1. **Ukeplanlegger (hovedbilde)** - Full ukevisning med middager fylt inn

### Features / How It Works
2. **Handleliste** - Aktiv handleliste med kategoriserte varer
3. **Oppskriftsvisning** - En oppskrift med ingredienser og fremgangsmåte
4. **Familiemedlemmer** - Family-innstillinger med flere medlemmer

### AI Showcase
5. **Magic Fill i aksjon** - Før/etter av AI-fylt ukeplan
6. **URL-import** - Dialogen for å importere oppskrift fra nett
7. **AI Chat** - Chat-grensesnittet med assistenten

### How It Works stegene
8. **Onboarding** - Første skjerm ved opprettelse av familie
9. **Butikkmodus** - Handlelisten i butikkmodus

## Deployment

Siden er klar for deployment på Vercel, Netlify eller lignende.
