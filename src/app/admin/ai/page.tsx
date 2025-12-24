"use client";

import { useEffect, useState } from "react";
import { Sparkles, Zap, Database, TrendingUp, RefreshCw, DollarSign, Clock, BarChart3, AlertTriangle } from "lucide-react";

// Match the actual API response format
interface AIStats {
    period: {
        days: number;
        startDate: string;
        endDate: string;
    };
    totals: {
        requests: number;
        cacheHits: number;
        cacheMisses: number;
    };
    rates: {
        cacheHitRate: string;
        cacheHitRateRaw: number;
    };
    performance: {
        avgGeminiTimeMs: number;
        avgGenerationTimeMs: number;
        totalGeminiTimeMs: number;
    };
    breakdown: {
        byType: Record<string, number>;
        errors: Record<string, number>;
    };
    costEstimate: {
        geminiCallsAvoided: number;
        estimatedSavingsUSD: string;
    };
    dailySummaries: Array<{
        date: string;
        weekplanCount?: number;
        ingredientsCount?: number;
        cacheMissCount?: number;
        totalGeminiCallTimeMs?: number;
        [key: string]: unknown;
    }>;
}

function ProgressBar({ value, color = "bg-listo-500" }: { value: number; color?: string }) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full ${color} transition-all duration-500`}
                style={{ width: `${Math.min(value, 100)}%` }}
            />
        </div>
    );
}

function StatCard({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    iconColor = "text-listo-500",
    iconBg = "bg-listo-100"
}: { 
    title: string; 
    value: string | number; 
    subtitle?: string;
    icon: typeof Sparkles;
    iconColor?: string;
    iconBg?: string;
}) {
    return (
        <div className="bg-white rounded-squircle p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${iconBg} rounded-squircle-sm flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="font-medium text-charcoal-light">{title}</h3>
            </div>
            <div className="text-3xl font-bold text-charcoal mb-1">
                {value}
            </div>
            {subtitle && (
                <p className="text-sm text-charcoal-light">{subtitle}</p>
            )}
        </div>
    );
}

export default function AIStatsPage() {
    const [stats, setStats] = useState<AIStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [days, setDays] = useState(7);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://app.listo.family/api/admin/ai-stats?days=${days}`, {
                headers: {
                    'X-Admin-Key': 'listo-admin-2024'
                }
            });

            if (!res.ok) throw new Error('Failed to fetch AI stats');

            const data = await res.json();
            setStats(data);
            setLastUpdate(new Date());
            setError(null);
        } catch (err) {
            setError('Kunne ikke hente AI-statistikk');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [days]);

    const formatCurrency = (usdString: string) => {
        // Parse USD string like "$0.01" to number
        const amount = parseFloat(usdString.replace('$', '')) || 0;
        // Convert USD to NOK (approximate rate)
        const nokAmount = amount * 11.5;
        return new Intl.NumberFormat('nb-NO', { 
            style: 'currency', 
            currency: 'NOK',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(nokAmount);
    };

    const totalErrors = stats?.breakdown?.errors 
        ? Object.values(stats.breakdown.errors).reduce((sum, count) => sum + count, 0)
        : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-magic-500" />
                    <div>
                        <h1 className="text-2xl font-display font-bold text-charcoal">AI Statistikk</h1>
                        <p className="text-charcoal-light text-sm">Cache-ytelse og kostnadsbesparelse</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-200 rounded-squircle-sm text-sm"
                    >
                        <option value={7}>Siste 7 dager</option>
                        <option value={14}>Siste 14 dager</option>
                        <option value={30}>Siste 30 dager</option>
                    </select>
                    <button
                        onClick={fetchStats}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-squircle-sm hover:bg-charcoal-light transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Oppdater
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-squircle p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Loading State */}
            {loading && !stats && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-listo-500" />
                </div>
            )}

            {/* Stats */}
            {stats && (
                <>
                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Totale forespørsler"
                            value={stats.totals?.requests?.toLocaleString('nb-NO') || 0}
                            subtitle={`Siste ${stats.period?.days || days} dager`}
                            icon={Zap}
                            iconColor="text-magic-500"
                            iconBg="bg-magic-100"
                        />
                        <StatCard
                            title="Cache Hit Rate"
                            value={stats.rates?.cacheHitRate || '0%'}
                            subtitle={`${stats.totals?.cacheHits || 0} treff / ${stats.totals?.cacheMisses || 0} miss`}
                            icon={Database}
                            iconColor="text-listo-500"
                            iconBg="bg-listo-100"
                        />
                        <StatCard
                            title="Kostnader spart"
                            value={formatCurrency(stats.costEstimate?.estimatedSavingsUSD || '$0')}
                            subtitle={`${stats.costEstimate?.geminiCallsAvoided || 0} Gemini-kall unngått`}
                            icon={DollarSign}
                            iconColor="text-green-600"
                            iconBg="bg-green-100"
                        />
                        <StatCard
                            title="Feil"
                            value={totalErrors}
                            subtitle={`${((totalErrors / Math.max(stats.totals?.requests || 1, 1)) * 100).toFixed(1)}% av forespørsler`}
                            icon={AlertTriangle}
                            iconColor="text-red-500"
                            iconBg="bg-red-100"
                        />
                    </div>

                    {/* Performance */}
                    <div className="bg-white rounded-squircle p-6 border border-gray-100">
                        <h3 className="font-semibold text-charcoal flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-magic-500" />
                            Ytelse
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-charcoal-light mb-1">Snitt Gemini-tid</p>
                                <p className="text-2xl font-bold text-charcoal">
                                    {((stats.performance?.avgGeminiTimeMs || 0) / 1000).toFixed(1)}s
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-charcoal-light mb-1">Snitt generering</p>
                                <p className="text-2xl font-bold text-charcoal">
                                    {((stats.performance?.avgGenerationTimeMs || 0) / 1000).toFixed(1)}s
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-charcoal-light mb-1">Total Gemini-tid</p>
                                <p className="text-2xl font-bold text-charcoal">
                                    {((stats.performance?.totalGeminiTimeMs || 0) / 1000 / 60).toFixed(1)} min
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown by Type */}
                    <div className="bg-white rounded-squircle p-6 border border-gray-100">
                        <h3 className="font-semibold text-charcoal flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-listo-500" />
                            Fordeling per type
                        </h3>
                        <div className="space-y-4">
                            {stats.breakdown?.byType && Object.entries(stats.breakdown.byType).map(([type, count]) => {
                                const total = stats.totals?.requests || 1;
                                const percent = Math.round((count / total) * 100);
                                return (
                                    <div key={type} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-charcoal capitalize">{type}</span>
                                            <span className="text-charcoal-light">
                                                {count} ({percent}%)
                                            </span>
                                        </div>
                                        <ProgressBar 
                                            value={percent} 
                                            color="bg-magic-500"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Errors */}
                    {stats.breakdown?.errors && Object.keys(stats.breakdown.errors).length > 0 && (
                        <div className="bg-red-50 rounded-squircle p-6 border border-red-200">
                            <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-5 h-5" />
                                Feil ({totalErrors} totalt)
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(stats.breakdown.errors).map(([errorType, count]) => {
                                    // Provide explanations for known error types
                                    const errorExplanations: Record<string, string> = {
                                        'GENERATION_FAILED': 'AI-generering feilet, ofte pga. ugyldig respons fra Gemini eller timeout',
                                        'RATE_LIMITED': 'For mange forespørsler, brukeren har nådd grensen',
                                        'INVALID_REQUEST': 'Ugyldig forespørsel fra klienten',
                                        'CACHE_ERROR': 'Feil ved lesing/skriving til cache',
                                        'TIMEOUT': 'Forespørselen tok for lang tid (>30s)',
                                        'PARSE_ERROR': 'Kunne ikke parse AI-responsen til gyldig JSON',
                                    };
                                    const explanation = errorExplanations[errorType] || 'Ukjent feiltype';
                                    const percent = Math.round((count / totalErrors) * 100);
                                    
                                    return (
                                        <div key={errorType} className="bg-white/50 rounded-lg p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-red-700 font-mono text-sm font-semibold">{errorType}</span>
                                                <span className="font-bold text-red-800">{count} ({percent}%)</span>
                                            </div>
                                            <p className="text-red-600 text-xs">{explanation}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-red-600 text-xs mt-4 pt-3 border-t border-red-200">
                                💡 Feilrate: {((totalErrors / Math.max(stats.totals?.requests || 1, 1)) * 100).toFixed(1)}% av totale forespørsler
                            </p>
                        </div>
                    )}

                    {/* Daily Summaries */}
                    {stats.dailySummaries && stats.dailySummaries.length > 0 && (
                        <div className="bg-white rounded-squircle p-6 border border-gray-100">
                            <h3 className="font-semibold text-charcoal flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-magic-500" />
                                Daglig aktivitet
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-charcoal-light border-b">
                                            <th className="pb-2 font-medium">Dato</th>
                                            <th className="pb-2 font-medium text-right">Ukeplaner</th>
                                            <th className="pb-2 font-medium text-right">Ingredienser</th>
                                            <th className="pb-2 font-medium text-right">Cache miss</th>
                                            <th className="pb-2 font-medium text-right">Gemini-tid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.dailySummaries.map((day) => (
                                            <tr key={day.date} className="border-b border-gray-50">
                                                <td className="py-3 font-medium text-charcoal">
                                                    {new Date(day.date).toLocaleDateString('nb-NO', { 
                                                        weekday: 'short', 
                                                        day: 'numeric', 
                                                        month: 'short' 
                                                    })}
                                                </td>
                                                <td className="py-3 text-right text-charcoal-light">
                                                    {day.weekplanCount || 0}
                                                </td>
                                                <td className="py-3 text-right text-charcoal-light">
                                                    {day.ingredientsCount || 0}
                                                </td>
                                                <td className="py-3 text-right text-charcoal-light">
                                                    {day.cacheMissCount || 0}
                                                </td>
                                                <td className="py-3 text-right text-charcoal-light">
                                                    {day.totalGeminiCallTimeMs 
                                                        ? `${(day.totalGeminiCallTimeMs / 1000).toFixed(1)}s` 
                                                        : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Cost Analysis */}
                    <div className="bg-gradient-to-br from-listo-50 to-listo-100 rounded-squircle p-6 border border-listo-200">
                        <h3 className="font-semibold text-charcoal flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-listo-600" />
                            Kostnadsanalyse
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-charcoal-light mb-1">Gemini-kall unngått (cache hits)</p>
                                <p className="text-2xl font-bold text-charcoal">
                                    {stats.costEstimate?.geminiCallsAvoided || 0}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-charcoal-light mb-1">Estimert besparelse</p>
                                <p className="text-2xl font-bold text-listo-600">
                                    {formatCurrency(stats.costEstimate?.estimatedSavingsUSD || '$0')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-sm text-charcoal-light">
                        <span>
                            Periode: {stats.period?.startDate && new Date(stats.period.startDate).toLocaleDateString('nb-NO')} - {stats.period?.endDate && new Date(stats.period.endDate).toLocaleDateString('nb-NO')}
                        </span>
                        <span>
                            Sist oppdatert: {lastUpdate?.toLocaleTimeString('nb-NO')}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}
