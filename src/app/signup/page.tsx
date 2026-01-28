"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, User, ShieldX } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase config (same as listo-app)
const firebaseConfig = {
  apiKey: "AIzaSyAW6ksZsDokqRAIpczXI030u_esWHOVe0Q",
  authDomain: "listo-6443c.firebaseapp.com",
  projectId: "listo-6443c",
  storageBucket: "listo-6443c.firebasestorage.app",
  messagingSenderId: "616905600919",
  appId: "1:616905600919:web:d5e5c9f8a7b6c4d3e2f1a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Loading fallback component
function SignupLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-listo-500" />
    </div>
  );
}

// Main signup content
function SignupContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingQuota, setIsCheckingQuota] = useState(true);
  const [hasEarlyAdopterSpots, setHasEarlyAdopterSpots] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [accessType, setAccessType] = useState<"early_adopter" | "trial">("trial");

  // Check Early Adopter quota on mount
  useEffect(() => {
    checkQuota();
  }, []);

  const checkQuota = async () => {
    try {
      const quotasRef = doc(db, "onboarding_config", "quotas");
      const quotasSnap = await getDoc(quotasRef);
      
      if (quotasSnap.exists()) {
        const data = quotasSnap.data();
        const claimed = data.earlyAdopters?.claimed || 0;
        const total = data.earlyAdopters?.total || 50;
        const remaining = total - claimed;
        
        setSpotsRemaining(remaining);
        setHasEarlyAdopterSpots(remaining > 0);
      }
    } catch (error) {
      console.error("Error checking quota:", error);
    } finally {
      setIsCheckingQuota(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update Auth display name
      if (name) {
        await updateProfile(user, { displayName: name });
      }

      // 3. Cloud Function (onUserCreated) will automatically:
      //    - Create users/{uid} document
      //    - Check quota and assign accessType (early_adopter or trial)
      //    - Send welcome email
      //    - Update quota if needed
      
      // Wait a moment for Cloud Function to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 4. Check what access type was assigned
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setAccessType(userData.accessType || "trial");
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Signup error:", err);

      // Translate Firebase errors to Norwegian
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Denne e-postadressen er allerede i bruk av en annen konto.");
          break;
        case "auth/weak-password":
          setError("Passordet må være minst 6 tegn.");
          break;
        case "auth/invalid-email":
          setError("Ugyldig e-postadresse.");
          break;
        default:
          setError("Noe gikk galt under registreringen. Prøv igjen.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while checking quota
  if (isCheckingQuota) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-listo-500" />
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-squircle shadow-xl p-8 border border-charcoal/5 text-center">
          <div className="w-16 h-16 rounded-full bg-listo-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-listo-600" />
          </div>

          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Velkommen til listo.family! 🎉
          </h2>

          <p className="text-charcoal-light mb-6">
            {accessType === "early_adopter" 
              ? "Du har sikret deg en Early Adopter-plass! Du får 3 måneders Premium gratis."
              : "Kontoen din er opprettet. Du får 14 dagers gratis prøve."
            }
          </p>

          <div className="bg-cream-50 rounded-squircle-sm p-4 mb-6 text-left">
            <p className="text-sm text-charcoal-light mb-2">
              <strong className="text-charcoal">Hva skjer nå?</strong>
            </p>
            <ul className="text-sm text-charcoal-light space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-listo-500">✓</span>
                <span>Du kan allerede bruke web-appen på <a href="https://app.listo.family" className="text-listo-600 underline">app.listo.family</a></span>
              </li>
              {accessType === "early_adopter" ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-listo-500">✓</span>
                    <span>Du har 3 måneders Premium gratis (ingen kredittkort)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-listo-500">✓</span>
                    <span>Eksklusiv Early Adopter-badge i profilen din</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-listo-500">✓</span>
                    <span>Du har 14 dager gratis Premium-tilgang</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-listo-500">✓</span>
                    <span>Ingen kredittkort nødvendig før prøven utløper</span>
                  </li>
                </>
              )}
              <li className="flex items-start gap-2">
                <span className="text-listo-500">✓</span>
                <span>Android-appen kommer snart på Google Play</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <a
              href={`https://app.listo.family/login?email=${encodeURIComponent(email)}`}
              className="block w-full py-3 px-6 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-squircle-sm shadow-lg hover:shadow-xl transition-all text-center"
            >
              Logg inn på Listo 🚀
            </a>

            <Link
              href="/"
              className="block w-full py-3 px-6 border border-charcoal/10 text-charcoal font-medium rounded-squircle-sm hover:bg-cream-50 transition-colors text-center"
            >
              Tilbake til forsiden
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-charcoal to-charcoal-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-salmon-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-listo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-squircle-sm bg-white flex items-center justify-center">
              <img src="/images/listo-logo.svg" alt="listo.family" className="w-full h-full" />
            </div>
            <span className="text-3xl font-bold text-white">listo.family</span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-salmon-500/20 text-salmon-300 px-4 py-2 rounded-full text-sm font-medium mb-6 w-fit">
            <span className="w-2 h-2 bg-salmon-400 rounded-full animate-pulse" />
            {hasEarlyAdopterSpots ? `🎉 ${spotsRemaining} Early Adopter-plasser igjen!` : "14-dagers gratis prøve"}
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">
            {hasEarlyAdopterSpots ? "Bli en av grunnleggerne" : "Prøv listo.family gratis"}
          </h1>
          <p className="text-xl text-white/70 mb-8">
            {hasEarlyAdopterSpots 
              ? "De første 50 familiene får 3 måneders Premium gratis + eksklusiv Early Adopter-status."
              : "Start med 14 dagers full Premium-tilgang. Ingen kredittkort kreves."
            }
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {(hasEarlyAdopterSpots ? [
              "🎁 3 måneders Premium gratis (verdi: 207 NOK)",
              "👑 Eksklusiv Early Adopter-status",
              "💬 Påvirk hvilke funksjoner vi bygger",
              "🚀 Først til å teste nye funksjoner",
            ] : [
              "🎁 14 dagers full Premium-tilgang",
              "🚀 Test alle funksjoner gratis",
              "💬 Hjelp oss forme produktet",
              "🐳 Ingen kredittkort nødvendig",
            ]).map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80">
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-squircle-sm bg-white flex items-center justify-center border border-charcoal/10">
                <img src="/images/listo-logo.svg" alt="listo.family" className="w-full h-full" />
              </div>
              <span className="text-2xl font-bold text-charcoal">listo.family</span>
            </Link>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-charcoal mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til forsiden
          </Link>

          <div className="bg-white rounded-squircle shadow-xl p-8 border border-charcoal/5">
            {/* Mobile beta badge */}
            <div className="lg:hidden inline-flex items-center gap-2 bg-salmon-100 text-salmon-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-salmon-500 rounded-full animate-pulse" />
              {hasEarlyAdopterSpots ? `🎉 ${spotsRemaining} plasser igjen` : "14-dagers prøve"}
            </div>

            <h2 className="text-2xl font-bold text-charcoal mb-2">Opprett konto</h2>
            <p className="text-charcoal-light mb-8">
              {hasEarlyAdopterSpots 
                ? `Sikre en av de ${spotsRemaining} gjenstående Early Adopter-plassene.`
                : "Registrer deg og start din 14-dagers gratis prøve."
              }
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                  Navn
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ditt navn"
                    className="w-full pl-12 pr-4 py-3 rounded-squircle-sm border border-charcoal/20 focus:border-listo-500 focus:ring-2 focus:ring-listo-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  E-postadresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@epost.no"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-squircle-sm border border-charcoal/20 focus:border-listo-500 focus:ring-2 focus:ring-listo-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                  Passord
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minst 6 tegn"
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3 rounded-squircle-sm border border-charcoal/20 focus:border-listo-500 focus:ring-2 focus:ring-listo-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-squircle-sm text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-salmon-500 to-salmon-600 hover:from-salmon-600 hover:to-salmon-700 disabled:from-salmon-300 disabled:to-salmon-400 text-white font-semibold rounded-squircle-sm shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? "Oppretter konto..." : "Opprett konto"}
              </button>
            </form>

            {/* Login link */}
            <p className="text-center text-charcoal-light mt-8">
              Har du allerede konto?{" "}
              <Link href="/login" className="text-listo-600 font-medium hover:underline">
                Logg inn
              </Link>
            </p>
          </div>

          {/* Legal */}
          <p className="text-center text-sm text-charcoal/50 mt-6">
            Ved å registrere deg godtar du våre{" "}
            <Link href="/terms" className="underline hover:text-charcoal">vilkår</Link>{" "}
            og{" "}
            <Link href="/privacy" className="underline hover:text-charcoal">personvernerklæring</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function SignupPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <SignupContent />
    </Suspense>
  );
}
