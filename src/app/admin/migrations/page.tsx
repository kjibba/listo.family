"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Database, AlertCircle, CheckCircle, Play, Eye } from "lucide-react";

interface MigrationResult {
    totalUsers: number;
    fixedFamily: number;
    fixedOnboarding: number;
    fixedMultiple: number;
    errors: number;
    errorDetails?: Array<{userId: string, error: string}>;
}

interface VerificationResult {
    consistent: number;
    inconsistent: number;
    issues: Array<{userId: string, email: string, problem: string}>;
}

export default function MigrationsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [action, setAction] = useState<string>("");

    const runMigration = async (actionType: "dry-run" | "fix" | "verify") => {
        setLoading(true);
        setAction(actionType);
        setResult(null);

        try {
            const response = await fetch("/api/admin/fix-journey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    adminEmail: "kjibba@gmail.com",
                    action: actionType,
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Migration failed");
            }

            setResult(data);
        } catch (error: any) {
            setResult({ 
                success: false, 
                error: error.message 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/admin")}
                    className="flex items-center gap-2 text-charcoal-light hover:text-charcoal transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Tilbake
                </button>
                <div className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-listo-600" />
                    <h1 className="text-2xl font-bold text-charcoal">Data Migrations</h1>
                </div>
            </div>

            {/* Migration: Journey Consistency */}
            <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-orange-100 rounded-full">
                        <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-charcoal mb-2">
                            Journey Consistency Fix
                        </h2>
                        <p className="text-charcoal-light mb-4">
                            Synkroniserer journey-tracking med faktisk brukerstatus. Fikser:
                        </p>
                        <ul className="list-disc list-inside text-sm text-charcoal-light space-y-1 mb-4">
                            <li>Brukere med <code className="bg-charcoal/5 px-1 rounded">familyId</code> uten <code className="bg-charcoal/5 px-1 rounded">journey.familyCreatedAt</code></li>
                            <li>Brukere med fullført onboarding uten <code className="bg-charcoal/5 px-1 rounded">journey.onboardingCompletedAt</code></li>
                            <li>Brukere uten <code className="bg-charcoal/5 px-1 rounded">journey</code>-objekt</li>
                        </ul>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => runMigration("verify")}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors disabled:opacity-50"
                            >
                                <Eye className="w-4 h-4" />
                                {loading && action === "verify" ? "Sjekker..." : "Sjekk status"}
                            </button>
                            <button
                                onClick={() => runMigration("dry-run")}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-colors disabled:opacity-50"
                            >
                                <Play className="w-4 h-4" />
                                {loading && action === "dry-run" ? "Kjører..." : "Dry Run (Test)"}
                            </button>
                            <button
                                onClick={() => runMigration("fix")}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-listo-500 text-white rounded-xl hover:bg-listo-600 transition-colors disabled:opacity-50"
                            >
                                <Database className="w-4 h-4" />
                                {loading && action === "fix" ? "Fikser..." : "🚨 Kjør migrering"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Display */}
                {result && (
                    <div className={`mt-6 p-4 rounded-xl border ${
                        result.success 
                            ? "bg-green-50 border-green-200" 
                            : "bg-red-50 border-red-200"
                    }`}>
                        <div className="flex items-start gap-3">
                            {result.success ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            )}
                            <div className="flex-1">
                                <p className={`font-semibold mb-2 ${
                                    result.success ? "text-green-900" : "text-red-900"
                                }`}>
                                    {result.success ? result.message : `Error: ${result.error}`}
                                </p>

                                {result.success && result.action === "verify" && (
                                    <div className="space-y-2 text-sm">
                                        <p className="text-charcoal-light">
                                            ✅ Konsistente brukere: <strong>{result.result.consistent}</strong>
                                        </p>
                                        <p className="text-charcoal-light">
                                            ⚠️  Inkonsistente brukere: <strong>{result.result.inconsistent}</strong>
                                        </p>
                                        {result.result.issues && result.result.issues.length > 0 && (
                                            <details className="mt-3">
                                                <summary className="cursor-pointer text-orange-700 font-medium">
                                                    Vis problemer ({result.result.issues.length})
                                                </summary>
                                                <ul className="mt-2 space-y-1 text-xs text-charcoal-light pl-4">
                                                    {result.result.issues.map((issue: any, i: number) => (
                                                        <li key={i}>
                                                            <strong>{issue.email}</strong>: {issue.problem}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        )}
                                    </div>
                                )}

                                {result.success && (result.action === "dry-run" || result.action === "fix") && (
                                    <div className="space-y-2 text-sm">
                                        <p className="text-charcoal-light">
                                            📊 Totalt brukere: <strong>{result.result.totalUsers}</strong>
                                        </p>
                                        <p className="text-charcoal-light">
                                            🏠 Familie-problemer fikset: <strong>{result.result.fixedFamily}</strong>
                                        </p>
                                        <p className="text-charcoal-light">
                                            ✔️  Onboarding-problemer fikset: <strong>{result.result.fixedOnboarding}</strong>
                                        </p>
                                        <p className="text-charcoal-light">
                                            🔧 Journey-objekt opprettet: <strong>{result.result.fixedMultiple}</strong>
                                        </p>
                                        {result.result.errors > 0 && (
                                            <p className="text-red-700">
                                                ❌ Feil: <strong>{result.result.errors}</strong>
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Documentation Link */}
            <div className="bg-blue-50 border border-blue-200 rounded-squircle p-4">
                <p className="text-sm text-blue-900">
                    📚 <strong>Dokumentasjon:</strong> Se{" "}
                    <code className="bg-blue-100 px-2 py-0.5 rounded">
                        NyeListo/docs/revision/batch-minus-1-data-consistency.md
                    </code>
                    {" "}for detaljer om datainkonsistensene og hvordan de fikses.
                </p>
            </div>
        </div>
    );
}
