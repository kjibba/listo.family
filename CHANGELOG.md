# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **User Analytics Dashboard:** Click on any user in /admin/users to see detailed activation journey and feature usage
- **Activation Funnel:** Visual funnel on users page showing drop-off between Registration → App Opened → Onboarding → Family
- **User Detail Page:** `/admin/users/[id]` with activation steps, feature usage grid (AI, recipes, meals, shopping), engagement score, subscription info
- **At-Risk Alerts:** Users registered >3 days without family are flagged with amber warning badge
- **Funnel Insights:** Automatic analysis of biggest drop-off point with actionable description
- **Blog:** New articles regarding cross-platform availability and free trial onboarding.
- **Stripe & Vipps:** Complete payment integration logic (Currently in `feature/stripe-vipps` branch).
- **Founders Pass:** Exclusive lifetime access component (Currently in `feature/stripe-vipps` branch).

### Changed
- **Early Adopter Program:** Pivoted from beta-gated to Early Adopter model with 50 spots (3 months premium free + exclusive badge)
- **Hero:** Updated to "Bli en av grunnleggerne" messaging, removed hardcoded dates (now "3 måneders Premium gratis")
- **Features:** Added "Tilgjengelig overalt" tile highlighting web-first cross-platform availability
- **Cta:** Complete Early Adopter signup flow with `earlyAdopters.claimed` Firestore structure, dynamic spot counter
- **Signup:** Atomic transaction-based signup with real-time quota check, assigns `accessType: 'early_adopter'` or `'trial'`
- **Admin Beta Page:** Updated to support Early Adopter stats (50 spots), legacy free_beta handling, new badge colors
- **SEO:** Enhanced metadata, keywords, and structured data (Schema.org) for better search visibility.
- **Trial Logic:** Implemented expiration check (14 days) in CTA and authentication flow.
