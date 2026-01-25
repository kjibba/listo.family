"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, ArrowRight, Crown, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAW6ksZsDokqRAIpczXI030u_esWHOVe0Q",
  authDomain: "listo-6443c.firebaseapp.com",
  projectId: "listo-6443c",
  storageBucket: "listo-6443c.firebasestorage.app",
  messagingSenderId: "616905600919",
  appId: "1:616905600919:web:d5e5c9f8a7b6c4d3e2f1a0",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const BETA_SPOTS_TOTAL = 30;

export default function Hero() {
  const [betaClaimed, setBetaClaimed] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const quotaRef = doc(db, "onboarding_config", "quotas");
        const quotaDoc = await getDoc(quotaRef);
        if (quotaDoc.exists()) {
          const data = quotaDoc.data();
          setBetaClaimed(data.betaSpots?.claimed || 0);
        }
      } catch (error) {
        console.error("Error fetching quota:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuota();
  }, []);

  const spotsRemaining = BETA_SPOTS_TOTAL - betaClaimed;
  const hasFreeBetaSpots = spotsRemaining > 0;

  return (

    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-cream-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-listo-100/40 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-salmon-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-magic-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center text-center">

        {/* Dynamic Badge - Beta or Trial */}
        {!loading && hasFreeBetaSpots ? (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-squircle mb-8 border border-listo-200 shadow-sm animate-fade-up">
            <Crown className="w-5 h-5 text-listo-600" />
            <span className="text-base font-bold text-charcoal">
              🎉 Kun <span className="text-listo-600">{spotsRemaining}</span> av {BETA_SPOTS_TOTAL} gratis plasser igjen!
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-squircle mb-8 border border-listo-200 shadow-sm animate-fade-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-listo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-listo-500"></span>
            </span>
            <span className="text-base font-medium text-charcoal">
              Ny: Butikkmodus med live-synk
            </span>
          </div>
        )}

        {/* Headline - Massive & Centered */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-charcoal leading-[0.95] tracking-tight mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {hasFreeBetaSpots ? (
            <>
              Sikre deg <span className="text-transparent bg-clip-text bg-gradient-to-r from-magic-600 to-magic-400">gratis tilgang</span><br />
              <span className="relative inline-block">
                ut 2026
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-magic-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </>
          ) : (
            <>
              <span className="block text-4xl sm:text-6xl lg:text-7xl mb-2 font-medium text-charcoal-light">Litt lavere</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-magic-600 to-magic-400">skuldre</span> i hverdagen
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-charcoal-light mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {hasFreeBetaSpots ? (
            <>
              Bli en av de <strong>{BETA_SPOTS_TOTAL} første familiene</strong> som får full tilgang til fremtidens familieassistent.
            </>
          ) : (
            <>
              Vi samler middager, handlelister og oppgaver på ett sted. <br className="hidden sm:block" />
              Slutt å lure på hvem som henter, og start helgen litt tidligere.
            </>
          )}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link
            href="#beta"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-charcoal text-white font-semibold rounded-squircle shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-magic-500 to-magic-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              {hasFreeBetaSpots ? (
                <>
                  <Crown className="w-5 h-5" />
                  Sikre min gratis plass
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Prøv gratis i 14 dager
                </>
              )}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-charcoal font-semibold rounded-squircle shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-lg border border-charcoal/5 group">
            <Play className="w-5 h-5 fill-charcoal text-charcoal group-hover:text-magic-600 group-hover:fill-magic-600 transition-colors" />
            Se hvordan det funker
          </Link>
        </div>

        {/* Community / Invitation */}
        <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <div className="flex -space-x-3 mb-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-cream-50 bg-charcoal-light flex items-center justify-center text-xs text-white overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${[
                  'from-salmon-400 to-salmon-600',
                  'from-listo-400 to-listo-600',
                  'from-sky-400 to-sky-600',
                ][i]}`}></div>
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-cream-50 bg-white flex items-center justify-center text-sm shadow-sm relative z-10">
              👋
            </div>
          </div>
          <p className="text-sm text-charcoal-light font-medium">
            Bli med å forme <strong className="text-charcoal">fremtidens familieapp</strong>
          </p>
        </div>

        {/* Phone Visual - Peeking from bottom / Integrated */}
        <div className="relative w-full max-w-5xl mt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="relative flex justify-center items-end">

            {/* Main Phone (Center) */}
            <div className="relative z-20 w-64 sm:w-80 -mb-20 sm:-mb-32 transform transition-transform hover:-translate-y-4 duration-500">
              <div className="bg-charcoal rounded-[3rem] p-3 shadow-2xl ring-1 ring-white/10">
                <div className="bg-cream-50 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                  <Image
                    src="/screenshots/planner.png"
                    alt="listo.family planner"
                    width={320}
                    height={693}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Left Phone (Peeking) */}
            <div className="absolute left-1/2 -translate-x-[160%] bottom-0 z-10 w-56 sm:w-72 hidden md:block transform -rotate-12 translate-y-20 opacity-90 hover:opacity-100 hover:-translate-y-4 hover:-rotate-6 transition-all duration-500">
              <div className="bg-white rounded-[2.5rem] p-2.5 shadow-xl border border-charcoal/5">
                <div className="bg-cream-50 rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                  <Image
                    src="/screenshots/shopping.png"
                    alt="listo.family shopping"
                    width={288}
                    height={624}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Floating Elements (Replacing Right Phone for checks) */}
            <div className="absolute right-1/2 translate-x-[160%] bottom-20 z-10 hidden md:flex flex-col gap-6">
              <div className="bg-white rounded-squircle p-4 shadow-lg border border-charcoal/5 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-salmon-100 flex items-center justify-center text-xl">🌮</div>
                  <div>
                    <p className="text-sm font-bold text-charcoal">Taco Fredag</p>
                    <p className="text-xs text-charcoal-light">Ingredienser lagt til</p>
                  </div>
                  <div className="ml-2 w-6 h-6 rounded-full bg-listo-500 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-squircle p-4 shadow-lg border border-charcoal/5 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-magic-100 flex items-center justify-center">✨</div>
                  <p className="text-sm font-medium text-charcoal">Forslag: Fiskegrateng?</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
