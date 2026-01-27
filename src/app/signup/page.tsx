"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, User, ShieldX } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";

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

// Generate a random 6-character invite code
const generateInviteCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous chars like I, 1, O, 0
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingInvite, setIsCheckingInvite] = useState(true);
  const [isInvited, setIsInvited] = useState(false);
  const [betaInterestId, setBetaInterestId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Check if email is invited
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      checkInvitation(emailParam);
    } else {
      setIsCheckingInvite(false);
    }
  }, [searchParams]);

  const checkInvitation = async (emailToCheck: string): Promise<{ invited: boolean; docId?: string; isRegistered?: boolean }> => {
    try {
      // Allow any email that exists in beta_interest
      const q = query(
        collection(db, "beta_interest"),
        where("email", "==", emailToCheck.toLowerCase())
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        const docId = snapshot.docs[0].id;

        // If already registered, flag it
        if (docData.status === "registered") {
          return { invited: true, docId, isRegistered: true };
        }

        setIsInvited(true);
        setBetaInterestId(docId);
        // Pre-fill name if available
        if (docData.name) {
          setName(docData.name);
        }
        return { invited: true, docId };
      }
      return { invited: false };
    } catch (error) {
      console.error("Error checking invitation:", error);
      return { invited: false };
    } finally {
      setIsCheckingInvite(false);
    }
  };

  const handleEmailBlur = async () => {
    if (email && !isInvited) {
      await checkInvitation(email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Check availability
    let inviteDocId: string | null = betaInterestId;
    if (!isInvited) {
      const result = await checkInvitation(email);
      if (result.isRegistered) {
        setError("Denne e-posten er allerede registrert. Logg inn i stedet.");
        setIsLoading(false);
        return;
      }
      if (!result.invited) {
        setError("Denne e-posten er ikke registrert for beta. Meld interesse på forsiden først!");
        setIsLoading(false);
        return;
      }
      inviteDocId = result.docId || null;
    }

    try {
      // 1. Create user in Firebase Auth
      // This triggers Cloud Function onUserCreated which creates users/{uid}
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update Auth display name
      if (name) {
        await updateProfile(user, { displayName: name });
      }

      // 3. Create Family Document
      const familyRef = doc(collection(db, "families"));
      const familyId = familyRef.id;
      const inviteCode = generateInviteCode();

      await setDoc(familyRef, {
        name: `${name.split(' ')[0]}s Familie`,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        inviteCode: inviteCode,
        adminIds: [user.uid],
        memberIds: [user.uid],
      });

      // 4. Wait for Cloud Function to create user document, then update with familyId
      // Cloud Function may take a moment to complete, so we use updateDoc with a small delay
      const userRef = doc(db, "users", user.uid);
      
      // Retry logic for updating user with familyId (in case Cloud Function hasn't finished)
      let retries = 0;
      const maxRetries = 5;
      const updateUserWithFamily = async (): Promise<void> => {
        try {
          await updateDoc(userRef, {
            familyId: familyId,
            familyName: `${name.split(' ')[0]}s Familie`,
            "journey.familyCreatedAt": serverTimestamp(),
          });
        } catch (error: any) {
          // If document doesn't exist yet (Cloud Function not done), wait and retry
          if (error.code === "not-found" && retries < maxRetries) {
            retries++;
            console.log(`User document not ready, retrying in 500ms... (${retries}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, 500));
            return updateUserWithFamily();
          }
          throw error;
        }
      };

      await updateUserWithFamily();

      // 5. Update beta_interest status to registered
      if (inviteDocId) {
        await updateDoc(doc(db, "beta_interest", inviteDocId), {
          status: "registered",
          registeredAt: serverTimestamp(),
          userId: user.uid, // Link to the new user
        });
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

  // Loading state while checking invite
  if (isCheckingInvite) {
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
            Kontoen din er opprettet. Du er nå registrert som beta-tester!
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
              <li className="flex items-start gap-2">
                <span className="text-listo-500">✓</span>
                <span>Android-appen kommer snart på Google Play</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-listo-500">✓</span>
                <span>Vi sender deg en e-post når appen er klar</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <a
              href="https://app.listo.family"
              className="block w-full py-3 px-6 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-squircle-sm shadow-lg hover:shadow-xl transition-all text-center"
            >
              Åpne listo.family Web App
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
            Closed Beta
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">
            Bli med som beta-tester
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Få tidlig tilgang til listo.family og hjelp oss forme fremtidens familieassistent.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              "🎁 Gratis tilgang i beta-perioden",
              "🚀 Første til å teste nye funksjoner",
              "💬 Direkte kontakt med utviklerne",
              "🏷️ Spesialpris når vi lanserer",
            ].map((benefit, i) => (
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
              Closed Beta
            </div>

            <h2 className="text-2xl font-bold text-charcoal mb-2">Opprett konto</h2>
            <p className="text-charcoal-light mb-8">
              Registrer deg for å bli med i beta-programmet.
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
                  {isInvited && (
                    <span className="ml-2 text-xs text-green-600 font-normal">✓ Invitert til beta</span>
                  )}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder="din@epost.no"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-squircle-sm border focus:ring-2 outline-none transition-all ${isInvited
                      ? "border-green-500 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30"
                      : "border-charcoal/20 focus:border-listo-500 focus:ring-listo-500/20"
                      }`}
                  />
                </div>
                {!isInvited && email && (
                  <p className="mt-1 text-xs text-charcoal-light">
                    Skriv inn e-posten du meldte interesse med
                  </p>
                )}
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
