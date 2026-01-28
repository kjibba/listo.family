"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function DeleteUserPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        details?: any;
    } | null>(null);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setResult({ success: false, message: "E-post kan ikke være tom" });
            return;
        }

        if (!confirm(`Er du SIKKER på at du vil slette brukeren:\n\n${email}\n\nDette kan ikke angres!`)) {
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/admin/delete-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult({
                    success: true,
                    message: `Bruker ${email} slettet!`,
                    details: data,
                });
                setEmail(""); // Clear input
            } else {
                setResult({
                    success: false,
                    message: data.error || "Noe gikk galt",
                    details: data,
                });
            }
        } catch (error: any) {
            setResult({
                success: false,
                message: error.message || "Nettverksfeil",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Warning Banner */}
            <div className="bg-salmon-50 border-l-4 border-salmon-500 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-salmon-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-semibold text-salmon-900">Farlig operasjon</h3>
                        <p className="text-sm text-salmon-700 mt-1">
                            Denne siden sletter brukere permanent fra Firebase Auth, Firestore, og beta_interest. 
                            Bruk kun for testing! Familie slettes bare hvis brukeren var owner og eneste medlem.
                        </p>
                    </div>
                </div>
            </div>

            {/* Delete Form */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-salmon-100 flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-salmon-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-charcoal">Slett testbruker</h1>
                        <p className="text-sm text-charcoal-light">For testing og cleanup</p>
                    </div>
                </div>

                <form onSubmit={handleDelete} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                            E-postadresse
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="test@example.com"
                            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-listo-500"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email.trim()}
                        className="w-full bg-salmon-500 hover:bg-salmon-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Sletter...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                Slett bruker permanent
                            </>
                        )}
                    </button>
                </form>

                {/* Result */}
                {result && (
                    <div className={`mt-6 p-4 rounded-lg border-l-4 ${
                        result.success 
                            ? "bg-listo-50 border-listo-500" 
                            : "bg-salmon-50 border-salmon-500"
                    }`}>
                        <div className="flex items-start gap-3">
                            {result.success ? (
                                <CheckCircle className="w-5 h-5 text-listo-600 mt-0.5 flex-shrink-0" />
                            ) : (
                                <XCircle className="w-5 h-5 text-salmon-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                    result.success ? "text-listo-900" : "text-salmon-900"
                                }`}>
                                    {result.message}
                                </p>
                                {result.details && (
                                    <details className="mt-2">
                                        <summary className="text-xs text-charcoal-light cursor-pointer hover:text-charcoal">
                                            Vis detaljer
                                        </summary>
                                        <pre className="mt-2 text-xs bg-charcoal/5 p-2 rounded overflow-x-auto">
                                            {JSON.stringify(result.details, null, 2)}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-cream-50 border border-charcoal/10 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-charcoal mb-2">Hva slettes:</h3>
                <ul className="text-sm text-charcoal-light space-y-1">
                    <li>✓ Firebase Authentication bruker</li>
                    <li>✓ Firestore <code className="bg-charcoal/10 px-1 rounded">users/{'{'}uid{'}'}</code> dokument</li>
                    <li>✓ Firestore <code className="bg-charcoal/10 px-1 rounded">families/{'{'}familyId{'}'}</code> (hvis owner og eneste medlem)</li>
                    <li>✓ Firestore <code className="bg-charcoal/10 px-1 rounded">beta_interest</code> entry</li>
                </ul>
            </div>
        </div>
    );
}
