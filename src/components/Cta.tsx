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
const BETA_SPOTS_TOTAL = 30;

interface QuotaState {
  betaClaimed: number;
  foundersPassSold: number;
  foundersPassTotal: number;
  loading: boolean;
}

const earlyAdopterPerks = [
  { icon: Gift, text: "Gratis tilgang ut 2026" },
  { icon: Users, text: "Direkte dialog med utviklerteamet" },
  { icon: Heart, text: "Påvirk hvilke funksjoner vi bygger" },
  { icon: Sparkles, text: "Eksklusiv \"Early Adopter\"-status" },
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
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [quota, setQuota] = useState<QuotaState>({
    betaClaimed: 0,
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
            betaClaimed: data.betaSpots?.claimed || 0,
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

  const spotsRemaining = BETA_SPOTS_TOTAL - quota.betaClaimed;
  const hasFreeBetaSpots = spotsRemaining > 0;
  const perks = hasFreeBetaSpots ? earlyAdopterPerks : trialPerks;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use transaction to atomically increment counter and add user
      await runTransaction(db, async (transaction) => {
        const quotaRef = doc(db, "onboarding_config", "quotas");
        const quotaDoc = await transaction.get(quotaRef);

        let currentClaimed = 0;

        if (quotaDoc.exists()) {
          currentClaimed = quotaDoc.data().betaSpots?.claimed || 0;
        }

        // Double-check that spot is still available
        const stillHasSpots = currentClaimed < BETA_SPOTS_TOTAL;
        const finalUserType = stillHasSpots ? "free_beta" : "trial";

        // Calculate trial expiration (14 days from now) for trial users
        const now = new Date();
        const trialExpiresAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

        // Add to beta_interest collection
        const betaInterestRef = doc(collection(db, "beta_interest"));
        transaction.set(betaInterestRef, {
          name,
          email: email.toLowerCase().trim(),
          source: "landing_page",
          userType: finalUserType,
          position: stillHasSpots ? currentClaimed + 1 : null,
          createdAt: serverTimestamp(),
          // Trial expiration tracking
          ...(finalUserType === "trial" && {
            trialStartDate: now,
            trialExpiresAt: trialExpiresAt,
          }),
        });

        // Increment counter if this is a free beta user
        if (stillHasSpots) {
          transaction.set(quotaRef, {
            betaSpots: {
              total: BETA_SPOTS_TOTAL,
              claimed: currentClaimed + 1,
            },
            foundersPass: quotaDoc.exists() ? quotaDoc.data().foundersPass : {
              total: 300,
              sold: 0,
              price: 990,
              yearsAccess: 5,
            },
          }, { merge: true });
        }
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting interest:", err);
      setError("Noe gikk galt. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress percentage for visual indicator
  const progressPercent = Math.min((quota.betaClaimed / BETA_SPOTS_TOTAL) * 100, 100);

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
          {hasFreeBetaSpots ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-listo-500/20 to-magic-500/20 backdrop-blur rounded-full mb-6 border border-listo-400/30">
              <Crown className="w-4 h-4 text-listo-400" />
              <span className="text-sm font-medium text-white">
                🎉 Kun <span className="font-bold text-listo-300">{spotsRemaining}</span> av {BETA_SPOTS_TOTAL} gratis plasser igjen!
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
            {hasFreeBetaSpots ? (
              <>Bli en av de <span className="gradient-text-magic">{BETA_SPOTS_TOTAL} første</span></>
            ) : (
              <>Prøv Listo <span className="gradient-text-magic">helt gratis</span></>
            )}
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            {hasFreeBetaSpots ? (
              <>De første {BETA_SPOTS_TOTAL} familiene får <strong className="text-white">gratis tilgang ut 2026</strong>. Meld deg på nå og bli en del av Listo-familien fra starten!</>
            ) : (
              <>Start med 14 dagers full Premium-tilgang. Ingen kredittkort kreves – bare opprett en konto og kom i gang.</>
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Progress and perks */}
          <div>
            {/* Progress indicator for beta spots */}
            {hasFreeBetaSpots && !quota.loading && (
              <div className="mb-8 p-5 bg-gradient-to-br from-listo-500/10 to-magic-500/10 rounded-squircle border border-listo-400/20">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">Gratis plasser tatt</span>
                  <span className="text-listo-300 font-semibold">{quota.betaClaimed} av {BETA_SPOTS_TOTAL}</span>
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
              {hasFreeBetaSpots ? "Som Early Adopter får du:" : "Prøveperioden inkluderer:"}
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
                {hasFreeBetaSpots ? (
                  <>
                    <strong className="text-white">Begrenset antall plasser.</strong>{" "}
                    Når de {BETA_SPOTS_TOTAL} plassene er fylt, går vi over til 14 dagers prøveperiode for nye brukere.
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
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-listo-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-listo-600" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-3">
                  {hasFreeBetaSpots ? "Du er med! 🎉" : "Takk for interessen!"}
                </h3>
                <div className="text-charcoal-light space-y-4">
                  <p>
                    {hasFreeBetaSpots ? (
                      <>Gratulerer! Du har sikret deg en av de {BETA_SPOTS_TOTAL} gratis plassene.</>
                    ) : (
                      <>Vi har mottatt din påmelding.</>
                    )}
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                    <p className="font-semibold mb-1">📩 Sjekk innboksen din</p>
                    <p>Du vil motta en e-post med lenke for å fullføre registreringen <strong>innen 2 minutter</strong>.</p>
                  </div>

                  <p className="text-sm text-charcoal/60 mt-4">
                    Fikk du ikke e-posten? <br />
                    <a href={`/signup?email=${encodeURIComponent(email)}`} className="text-listo-600 font-medium underline hover:text-listo-700">
                      Klikk her for å gå direkte til registrering
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-charcoal mb-2">
                  {hasFreeBetaSpots ? "Sikre din gratis plass" : "Start din gratis prøve"}
                </h3>
                <p className="text-charcoal-light mb-6">
                  {hasFreeBetaSpots ? (
                    <>Fyll ut skjemaet for å bli en av de {BETA_SPOTS_TOTAL} første.</>
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
                        {hasFreeBetaSpots ? "Sikre min plass" : "Start gratis prøve"}
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
}
