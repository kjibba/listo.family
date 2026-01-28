"use client";

import { useState, useEffect } from "react";
import { Sparkles, Check, Users, Zap, Heart, Gift, Crown } from "lucide-react";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp
} from "firebase/firestore";

// Firebase config (same as listo-app)
const firebaseConfig = {
  apiKey: "AIzaSyAW6ksZsDokqRAIpczXI030u_esWHOVe0Q",
  authDomain: "listo-6443c.firebaseapp.com",
  projectId: "listo-6443c",
  storageBucket: "listo-6443c.firebasestorage.app",
  messagingSenderId: "616905600919",
  appId: "1:616905600919:web:d5e5c9f8a7b6c4d3e2f1a0",
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Quota configuration
const EARLY_ADOPTER_SPOTS_TOTAL = 50;

interface QuotaState {
  earlyAdoptersClaimed: number;
  foundersPassSold: number;
  foundersPassTotal: number;
  loading: boolean;
}

const earlyAdopterPerks = [
  { icon: Gift, text: "3 måneders Premium gratis (verdi: 207 NOK)" },
  { icon: Crown, text: "Eksklusiv Early Adopter-status" },
  { icon: Users, text: "Påvirk hvilke funksjoner vi bygger" },
  { icon: Heart, text: "Ingen kredittkort nødvendig" },
];

const trialPerks = [
  { icon: Zap, text: "14 dagers full Premium-tilgang" },
  { icon: Users, text: "Hele familien inkludert" },
  { icon: Heart, text: "Ingen kredittkort kreves" },
  { icon: Sparkles, text: "Avbryt når som helst" },
];

export default function Cta() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [quota, setQuota] = useState<QuotaState>({
    earlyAdoptersClaimed: 0,
    foundersPassSold: 0,
    foundersPassTotal: 300,
    loading: true,
  });

  // Fetch quotas on mount
  useEffect(() => {
    const fetchQuotas = async () => {
      try {
        const quotaRef = doc(db, "onboarding_config", "quotas");
        const quotaDoc = await getDoc(quotaRef);

        if (quotaDoc.exists()) {
          const data = quotaDoc.data();
          setQuota({
            earlyAdoptersClaimed: data.earlyAdopters?.claimed || 0,
            foundersPassSold: data.foundersPass?.sold || 0,
            foundersPassTotal: data.foundersPass?.total || 300,
            loading: false,
          });
        } else {
          // Document doesn't exist yet, use defaults
          setQuota(prev => ({ ...prev, loading: false }));
        }
      } catch (err) {
        console.error("Error fetching quotas:", err);
        setQuota(prev => ({ ...prev, loading: false }));
      }
    };

    fetchQuotas();
  }, []);

  const spotsRemaining = EARLY_ADOPTER_SPOTS_TOTAL - quota.earlyAdoptersClaimed;
  const hasEarlyAdopterSpots = spotsRemaining > 0;
  const perks = hasEarlyAdopterSpots ? earlyAdopterPerks : trialPerks;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect directly to signup page instead of adding to beta_interest
    window.location.href = `/signup?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
  };

  // Calculate progress percentage for visual indicator
  const progressPercent = Math.min((quota.earlyAdoptersClaimed / EARLY_ADOPTER_SPOTS_TOTAL) * 100, 100);

  return (
    <section
      id="beta"
      className="py-24 bg-gradient-to-br from-charcoal via-charcoal-dark to-charcoal relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-listo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-magic-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Dynamic badge based on availability */}
          {hasEarlyAdopterSpots ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-listo-500/20 to-magic-500/20 backdrop-blur rounded-full mb-6 border border-listo-400/30">
              <Crown className="w-4 h-4 text-magic-400" />
              <span className="text-sm font-medium text-white">
                🎉 Kun <span className="font-bold text-magic-300">{spotsRemaining}</span> av {EARLY_ADOPTER_SPOTS_TOTAL} Early Adopter-plasser igjen!
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-listo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-listo-400"></span>
              </span>
              <span className="text-sm font-medium text-white">
                Start din 14 dagers gratis prøveperiode
              </span>
            </div>
          )}

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {hasEarlyAdopterSpots ? (
              <>Bli en av <span className="gradient-text-magic">grunnleggerne</span></>
            ) : (
              <>Prøv Listo <span className="gradient-text-magic">helt gratis</span></>
            )}
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            {hasEarlyAdopterSpots ? (
              <>De første {EARLY_ADOPTER_SPOTS_TOTAL} familiene får <strong className="text-white">3 måneders Premium gratis</strong> + eksklusiv Early Adopter-status. Bli en del av Listo-familien fra starten!</>
            ) : (
              <>Start med 14 dagers full Premium-tilgang. Ingen kredittkort kreves – bare opprett en konto og kom i gang.</>
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Progress and perks */}
          <div>
            {/* Progress indicator for early adopter spots */}
            {hasEarlyAdopterSpots && !quota.loading && (
              <div className="mb-8 p-5 bg-gradient-to-br from-listo-500/10 to-magic-500/10 rounded-squircle border border-listo-400/20">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">Early Adopter-plasser tatt</span>
                  <span className="text-magic-300 font-semibold">{quota.earlyAdoptersClaimed} av {EARLY_ADOPTER_SPOTS_TOTAL}</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-listo-400 to-magic-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-white/60 text-xs mt-2">
                  {spotsRemaining <= 5 ? (
                    <span className="text-salmon-300">⚡ Nesten fullt! Sikre deg plass nå.</span>
                  ) : (
                    <>Plassene fylles opp raskt – ikke gå glipp av dette!</>
                  )}
                </p>
              </div>
            )}

            <h3 className="text-xl font-semibold text-white mb-6">
              {hasEarlyAdopterSpots ? "Som Early Adopter får du:" : "Prøveperioden inkluderer:"}
            </h3>
            <ul className="space-y-4">
              {perks.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-squircle-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-listo-400" />
                    </div>
                    <span className="text-white/80">{perk.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 p-4 bg-white/5 rounded-squircle-sm border border-white/10">
              <p className="text-white/60 text-sm">
                {hasEarlyAdopterSpots ? (
                  <>
                    <strong className="text-white">Begrenset antall plasser.</strong>{" "}
                    Når de {EARLY_ADOPTER_SPOTS_TOTAL} plassene er fylt, går vi over til 14 dagers prøveperiode for nye brukere.
                  </>
                ) : (
                  <>
                    <strong className="text-white">Ingen binding.</strong>{" "}
                    Du kan når som helst velge å ikke fortsette etter prøveperioden.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right: Signup form */}
          <div className="bg-white rounded-squircle p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-charcoal mb-2">
              {hasEarlyAdopterSpots ? "Sikre din Early Adopter-plass" : "Start din gratis prøve"}
            </h3>
            <p className="text-charcoal-light mb-6">
              {hasEarlyAdopterSpots ? (
                <>Fyll ut skjemaet for å bli en av de {EARLY_ADOPTER_SPOTS_TOTAL} første.</>
              ) : (
                <>Fyll ut skjemaet for å starte din 14-dagers prøveperiode.</>
              )}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Navn
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ditt navn"
                      required
                      className="w-full px-4 py-3 rounded-squircle-sm border border-charcoal/20 focus:border-listo-500 focus:ring-2 focus:ring-listo-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      E-post
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="din@epost.no"
                      required
                      className="w-full px-4 py-3 rounded-squircle-sm border border-charcoal/20 focus:border-listo-500 focus:ring-2 focus:ring-listo-500/20 outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 disabled:from-listo-300 disabled:to-listo-400 text-white font-semibold rounded-squircle shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      "Sender..."
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {hasEarlyAdopterSpots ? "Sikre min plass" : "Start gratis prøve"}
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                </form>

                <p className="text-xs text-charcoal/50 mt-4 text-center">
                  Vi deler aldri e-posten din med andre. Les vår{" "}
                  <a href="/privacy" className="underline hover:text-charcoal">
                    personvernerklæring
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}className="w-full py-3.5 px-6 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-squircle shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    {hasEarlyAdopterSpots ? "Sikre min plass" : "Start gratis prøve"}
                  </button>
                </form>

                <p className="text-xs text-charcoal/50 mt-4 text-center">
                  Du blir sendt til registreringssiden for å fullføre