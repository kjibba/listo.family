"use client";

import { useState } from "react";
import { Sparkles, Check, Users, Zap, Heart } from "lucide-react";

const betaPerks = [
  { icon: Zap, text: "Gratis tilgang i hele beta-perioden" },
  { icon: Users, text: "Direkte dialog med utviklerteamet" },
  { icon: Heart, text: "Påvirk hvilke funksjoner vi bygger" },
  { icon: Sparkles, text: "Rabatt når vi lanserer" },
];

export default function Cta() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Send til backend/Firebase/Mailchimp
    // For nå simulerer vi en vellykket innsending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsLoading(false);
  };

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
          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6 border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-listo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-listo-400"></span>
            </span>
            <span className="text-sm font-medium text-white">
              Lukket beta starter snart
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Bli en av de første
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Vi åpner snart for et begrenset antall familier som vil teste Listo
            og forme fremtiden til appen sammen med oss.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Beta perks */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Som beta-tester får du:
            </h3>
            <ul className="space-y-4">
              {betaPerks.map((perk, index) => {
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
                <strong className="text-white">Begrenset antall plasser.</strong>{" "}
                Vi starter med et lite antall familier for å sikre god oppfølging
                og kvalitet. Meld interesse i dag for å sikre din plass i køen.
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
                  Takk for interessen!
                </h3>
                <p className="text-charcoal-light">
                  Vi har mottatt din påmelding og kontakter deg så snart vi har
                  en plass ledig i betaen. Sjekk e-posten din for bekreftelse.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-charcoal mb-2">
                  Meld interesse for beta
                </h3>
                <p className="text-charcoal-light mb-6">
                  Fyll ut skjemaet, så kontakter vi deg når det er din tur.
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

                  <div>
                    <label
                      htmlFor="familySize"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Hvor mange er dere i familien?
                    </label>
                    <select
                      id="familySize"
                      value={familySize}
                      onChange={(e) => setFamilySize(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-squircle-sm border border-charcoal/20 focus:border-listo-500 focus:ring-2 focus:ring-listo-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">Velg...</option>
                      <option value="1-2">1-2 personer</option>
                      <option value="3-4">3-4 personer</option>
                      <option value="5+">5 eller flere</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 disabled:from-listo-300 disabled:to-listo-400 text-white font-semibold rounded-squircle-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      "Sender..."
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Meld interesse
                      </>
                    )}
                  </button>
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
