# Listo.family Landing Page

Landing page for [Listo](https://listo.family) - familiens smarte hverdagsassistent.

🌐 **Live:** https://listo.family

## Teknologi

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animasjoner**: Framer Motion
- **Ikoner**: Lucide React
- **Språk**: TypeScript
- **Hosting**: Docker på Hetzner

## Lokal utvikling

```bash
# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev
```

Åpne http://localhost:3000

## Deployment

Siden deployes automatisk til Hetzner-serveren.

### Manuell deploy

Fra `NyeListo`-mappen:

```powershell
# PowerShell
.\update-server.ps1 -LandingOnly
```

Eller oppdater alt (landing + web app):

```powershell
.\update-server.ps1
```

### Hva skjer ved deploy

1. Filer synces til `/opt/listo/landing/` på serveren
2. Docker bygger Next.js med standalone output
3. Container startes på port 3002
4. Nginx proxyer `listo.family` → port 3002

## Struktur

```
src/
├── app/
│   ├── layout.tsx      # Root layout med metadata
│   ├── page.tsx        # Hovedside
│   ├── globals.css     # Globale stiler
│   └── login/
│       └── page.tsx    # Login-side (beta registrering)
├── components/
│   ├── Header.tsx      # Navigasjon
│   ├── Hero.tsx        # Hero med CTA
│   ├── Features.tsx    # Funksjoner
│   ├── AiShowcase.tsx  # AI-demo
│   ├── HowItWorks.tsx  # Steg-for-steg
│   ├── Testimonials.tsx# Closed beta info
│   ├── Pricing.tsx     # Prisplaner
│   ├── Faq.tsx         # FAQ
│   ├── Cta.tsx         # Nedlastings-CTA
│   ├── Footer.tsx      # Footer
│   └── LoginPage.tsx   # Beta registrering
public/
├── images/
│   └── listo-logo.svg
└── screenshots/        # App-skjermbilder
    ├── planner.png
    ├── shopping.png
    ├── recipe.png
    ├── store-mode.png
    └── ai-chat.png
```

## Designfilosofi

Se [docs/design_philosophy.md](docs/design_philosophy.md) for fargepalett og designprinsipper.

### Farger

| Navn | Hex | Bruk |
|------|-----|------|
| Cream | `#FFFAF5` | Bakgrunn |
| Charcoal | `#34495E` | Tekst |
| Salmon | `#FF8C69` | Primærfarge, CTA |
| Listo Green | `#2ECC71` | Suksess |
| Sky Blue | `#5DADE2` | Lenker |
| Magic Purple | `#9B59B6` | AI-funksjoner |

## Relaterte repos

- **Listo App**: [kjibba/NyeListo](https://github.com/kjibba/NyeListo) - React Native/Expo app
- **Web App**: Deployes fra samme repo til https://app.listo.family
