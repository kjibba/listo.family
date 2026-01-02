"use client";

import { useState } from "react";
import { Apple, Bell, CheckCircle, Loader2 } from "lucide-react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

export default function IosWaitlist() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setErrorMessage("Vennligst oppgi en gyldig e-postadresse");
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            // Add to ios_waitlist collection in Firebase
            await addDoc(collection(db, "ios_waitlist"), {
                email: email.toLowerCase().trim(),
                createdAt: serverTimestamp(),
                source: "landing_page",
                notified: false,
            });

            setStatus("success");
            setEmail("");
        } catch (error) {
            console.error("Waitlist signup error:", error);
            setErrorMessage("Noe gikk galt. Prøv igjen senere.");
            setStatus("error");
        }
    };

    return (
        <section id="ios-waitlist" className="py-16 bg-gradient-to-r from-charcoal to-charcoal-light">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Left: Icon and text */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                                <Apple className="w-8 h-8 text-white" />
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                Kommer snart til iPhone
                            </h2>

                            <p className="text-white/70 mb-2">
                                Vi jobber med iOS-versjonen og lanserer i <strong className="text-white">Q1 2026</strong>.
                            </p>

                            <p className="text-white/60 text-sm">
                                Legg igjen e-posten din, så varsler vi deg når appen er klar i App Store.
                            </p>
                        </div>

                        {/* Right: Form */}
                        <div className="w-full md:w-auto md:min-w-[320px]">
                            {status === "success" ? (
                                <div className="bg-listo-500/20 border border-listo-500/30 rounded-2xl p-6 text-center">
                                    <CheckCircle className="w-12 h-12 text-listo-400 mx-auto mb-3" />
                                    <p className="text-white font-medium">Du er på listen!</p>
                                    <p className="text-white/60 text-sm mt-1">
                                        Vi varsler deg når iOS-versjonen er klar.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (status === "error") setStatus("idle");
                                            }}
                                            placeholder="din@epost.no"
                                            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-listo-500 focus:border-transparent transition-all"
                                        />
                                        {status === "error" && (
                                            <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Registrerer...
                                            </>
                                        ) : (
                                            <>
                                                <Bell className="w-5 h-5" />
                                                Varsle meg
                                            </>
                                        )}
                                    </button>

                                    <p className="text-white/40 text-xs text-center">
                                        Vi sender kun én e-post når appen er klar. Ingen spam.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
