"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement Firebase auth
    // This would redirect to the web app after successful login
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to web app
      window.location.href = "https://app.listo.family";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-charcoal to-charcoal-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-listo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-magic-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-squircle-sm bg-white/10 backdrop-blur flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">Listo</span>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-6">
            Velkommen tilbake til hverdagsmagien
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Logg inn for å fortsette med ukeplanen din, handlelisten og alle
            familiens favorittoppskrifter.
          </p>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              "🍝 Se ukens måltider med ett blikk",
              "🛒 Sjekk handlelisten i sanntid",
              "👨‍👩‍👧‍👦 Alltid synkronisert med familien",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-squircle-sm bg-gradient-to-br from-listo-500 to-listo-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-charcoal">Listo</span>
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
            <h2 className="text-2xl font-bold text-charcoal mb-2">Logg inn</h2>
            <p className="text-charcoal-light mb-8">
              Velkommen tilbake! Fyll inn for å fortsette.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
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
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-charcoal"
                  >
                    Passord
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-charcoal-light hover:text-listo-600"
                  >
                    Glemt passord?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3 rounded-squircle-sm border border-charcoal/20 focus:border-listo-500 focus:ring-2 focus:ring-listo-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 disabled:from-listo-300 disabled:to-listo-400 text-white font-semibold rounded-squircle-sm shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? "Logger inn..." : "Logg inn"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-charcoal/10" />
              <span className="text-sm text-charcoal/40">eller</span>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>

            {/* Social login */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-charcoal/10 rounded-squircle-sm hover:bg-cream-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-charcoal font-medium">
                  Fortsett med Google
                </span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-charcoal/10 rounded-squircle-sm hover:bg-cream-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="text-charcoal font-medium">
                  Fortsett med Apple
                </span>
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-charcoal-light mt-8">
              Ny bruker?{" "}
              <Link
                href="/signup"
                className="text-listo-600 font-medium hover:underline"
              >
                Opprett konto
              </Link>
            </p>
          </div>

          {/* Legal links */}
          <p className="text-center text-sm text-charcoal/50 mt-6">
            Ved å logge inn godtar du våre{" "}
            <Link href="/terms" className="underline hover:text-charcoal">
              vilkår
            </Link>{" "}
            og{" "}
            <Link href="/privacy" className="underline hover:text-charcoal">
              personvernerklæring
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
