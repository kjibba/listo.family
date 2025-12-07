# Listo Landing Page - AI Coding Instructions

## Project Overview
Norwegian (nb) landing page for listo.family - a family assistant app for meal planning, shopping lists, and task management. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

**Live site:** https://listo.family

## Branding & Naming Convention
- **Formal branding:** Use `listo.family` (lowercase) in titles, metadata, CTAs, logos, and marketing copy
- **Casual references:** `Listo` is acceptable in flowing body text where natural
- **Author attribution:** Use `Listo-teamet` in blog author sections
- **CSS/code identifiers:** Keep as-is (e.g., `listo-500`, `bg-listo-100` - these are internal class names)
- **Firebase project IDs:** Keep as-is (e.g., `listo-6443c`)

## Terminal Usage
**IMPORTANT:** Do not write to or interact with terminals that have running processes (e.g., `npm run dev`, `npm run build`). Wait for the process to complete before sending new commands.

## Design System & Brand Colors
Follow the "Friendly Softness" philosophy from [docs/design_philosophy.md](../docs/design_philosophy.md). Use warm, rounded visuals - no sharp corners.

**Color Palette:**
- `cream-50` (`#FFFAF5`) - Background
- `charcoal` (`#34495E`) - Primary text, strokes
- `salmon-500` (`#FF8C69`) - Food/meal features, CTAs
- `listo-500` (`#2ECC71`) - Success, action states
- `sky-400` (`#5DADE2`) - Logistics, links
- `magic-500` (`#9B59B6`) - AI features (use ✨ sparkle icon)

Use Tailwind classes from [tailwind.config.ts](../tailwind.config.ts): `bg-cream-50`, `text-charcoal`, `text-salmon-500`, etc.

## Component Patterns

### Section Structure
Each landing page section follows this pattern (see [src/components/Features.tsx](../src/components/Features.tsx)):
```tsx
<section className="py-24 bg-white">  {/* or bg-cream-50 */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header with badge, title, subtitle */}
    <span className="inline-block px-4 py-1.5 bg-listo-100 text-listo-700 rounded-full text-sm font-medium mb-4">
      Section Label
    </span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">...</h2>
    {/* Content grid */}
  </div>
</section>
```

### Interactive Elements
- Buttons: `rounded-full` with gradient backgrounds, hover shadow effects
- Cards: `rounded-squircle` (custom 1.5rem radius), hover lift effect
- Icons: Use Lucide React, colored by feature domain (salmon=food, magic=AI, listo=success)

### Client vs Server Components
- Default to server components (no directive)
- Add `"use client"` only for: Framer Motion animations, interactive elements, event handlers
- See [src/components/Hero.tsx](../src/components/Hero.tsx) for client component pattern

## Blog Articles
Blog posts live in `src/app/blogg/[slug]/page.tsx`. Article metadata defined inline in [src/app/blogg/page.tsx](../src/app/blogg/page.tsx). Each article page exports:
- `metadata` object for SEO
- `jsonLd` structured data for Google
- Article content with consistent heading hierarchy

## Key Commands
```bash
npm run dev    # Start dev server at localhost:3000
npm run build  # Build for production (standalone output)
npm run lint   # Run ESLint
```

## Deployment
Deployed via Docker to Hetzner. From NyeListo repo: `.\update-server.ps1 -LandingOnly`

## Language & Content
All user-facing content is in **Norwegian (Bokmål)**. Maintain this consistency:
- Page lang: `<html lang="nb">`
- Dates: `nb-NO` locale formatting
- SEO metadata in Norwegian
