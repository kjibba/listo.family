"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-cream-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-listo-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-salmon-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-magic-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-salmon-100 to-magic-100 rounded-full mb-6 border border-salmon-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-salmon-500"></span>
              </span>
              <span className="text-sm font-medium text-charcoal">
                Lukket beta – Begrenset antall plasser
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
              Si farvel til{" "}
              <span className="gradient-text-magic">&quot;Hva skal vi ha til middag?&quot;</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-charcoal-light mb-8 max-w-xl mx-auto lg:mx-0">
              Listo er familiens AI-drevne hverdagsassistent som planlegger
              måltider, organiserer handlelister og inspirerer til nye
              matopplevelser – helt automatisk.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="#beta"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
              >
                <Sparkles className="w-5 h-5" />
                Meld interesse for beta
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-cream-100 text-charcoal font-semibold rounded-full shadow-md hover:shadow-lg transition-all text-lg border border-charcoal/10">
                <Play className="w-5 h-5 fill-listo-500 text-listo-500" />
                Se hvordan det fungerer
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-charcoal-light">
              <span className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-listo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Gratis å starte
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-listo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Synkroniserer i sanntid
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-listo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Hele familien inkludert
              </span>
            </div>
          </div>

          {/* Right content - Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main phone */}
              <div className="relative z-10 w-72 sm:w-80 animate-float">
                {/* Phone frame */}
                <div className="bg-charcoal rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-cream-50 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                    <Image
                      src="/screenshots/planner.png"
                      alt="Listo ukeplanlegger"
                      width={320}
                      height={693}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Secondary phone (behind) */}
              <div className="absolute -right-8 top-12 w-64 sm:w-72 opacity-80 -rotate-6">
                <div className="bg-charcoal-light rounded-[3rem] p-3 shadow-xl">
                  <div className="bg-cream-50 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                    <Image
                      src="/screenshots/shopping.png"
                      alt="Listo handleliste"
                      width={288}
                      height={624}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-4 top-24 bg-white rounded-squircle p-3 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍝</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Pasta Bolognese</p>
                    <p className="text-xs text-charcoal-light">Mandag • 30 min</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-32 bg-white rounded-squircle p-3 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <p className="text-sm font-medium text-charcoal">Melk lagt til!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-charcoal/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-charcoal/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
