# Listo Landing Page - AI Coding Instructions

## Project Overview
Norwegian (nb) landing page for listo.family - a family assistant app for meal planning, shopping lists, and task management. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## 🚨 CRITICAL: Documentation & State Management (READ FIRST)
**Before writing a single line of code or planning a feature:**
1.  **Check the Map:** Read `Docs/FEATURES.md` and `Docs/PENDING_FEATURES.md` (in listo-app repo if shared, or local docs).
2.  **Verify State:** Do not assume a feature is missing. Check `CHANGELOG.md` and `FEATURES.md`.
3.  **Update Strategy:** If you implement something, you **MUST** update the tracking documents.
4.  **Single Source of Truth:** These documents are the truth.

## 🤖 Antigravity Kit & Context7
- **Use the Kit:** Actively use agents and skills.
- **Context7:** Use Context7 for all library documentation.

**Live site:** https://listo.family

## Branding & Naming Convention
- **Formal branding:** Use `listo.family` (lowercase) in titles, metadata, CTAs, logos, and marketing copy
- **Casual references:** `Listo` is acceptable in flowing body text where natural
- **Author attribution:** Use `Listo-teamet` in blog author sections
- **CSS/code identifiers:** Keep as-is (e.g., `listo-500`, `bg-listo-100` - these are internal class names)
- **Firebase project IDs:** Keep as-is (e.g., `listo-6443c`)

## Terminal Usage
**IMPORTANT:** Do not write to or interact with terminals that have running processes (e.g., `npm run dev`, `npm run build`). Wait for the process to complete before sending new commands.

**⚠️ CRITICAL: Git & Deployment Policy (NON-NEGOTIABLE)**
- **ALWAYS ASK before committing/pushing to `main` branch**
- `main` branch auto-deploys to production immediately via server monitoring
- Production bugs affect real users - TEST thoroughly before pushing
- Only push to `main` for:
  - Critical hotfixes (security, crashes, data loss)
  - Explicitly approved changes by user
  - Minor documentation/content updates
- When uncertain, commit to separate branch and wait for user review

## Design System & Brand Colors
Follow the "Friendly Softness" philosophy documented in the design philosophy file. Use warm, rounded visuals - no sharp corners.

**Color Palette:**
- `cream-50` (`#FFFAF5`) - Background
- `charcoal` (`#34495E`) - Primary text, strokes
- `salmon-500` (`#FF8C69`) - Food/meal features, CTAs
- `listo-500` (`#2ECC71`) - Success, action states
- `sky-400` (`#5DADE2`) - Logistics, links
- `magic-500` (`#9B59B6`) - AI features (use ✨ sparkle icon)

Use Tailwind classes defined in the config: `bg-cream-50`, `text-charcoal`, `text-salmon-500`, etc.

## Component Patterns

### Section Structure
Each landing page section follows this pattern (see Features component):
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
- See Hero component for client component pattern

## Code Cleanup (IMPORTANT)
When modifying, upgrading, or refactoring code and features:
- **ALWAYS** remove old, obsolete, and redundant code
- Delete unused imports, functions, components, and files
- Remove deprecated patterns when introducing replacements
- Keep the codebase as lean as possible
- Don't leave commented-out code "for later"

## Blog Articles
Blog posts live in the blogg directory with dynamic routes. Article metadata defined inline in the blog page. Each article page exports:
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
Deployed via github to Hetzner. Automated via script running on server. 

## Language & Content
All user-facing content is in **Norwegian (Bokmål)**. Maintain this consistency:
- Page lang: `<html lang="nb">`
- Dates: `nb-NO` locale formatting
- SEO metadata in Norwegian
