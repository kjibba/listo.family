"use client";

import { useMemo, useState, useEffect } from "react";
import {
    Users, Bug, TrendingUp, TrendingDown, Crown, Gift, Zap,
    Smartphone, CheckCircle, Home, AlertTriangle, Server, Cpu, HardDrive, RefreshCw
} from "lucide-react";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { useAdminData } from "./layout";
import MetricCard from "@/components/admin/MetricCard";
import SimpleChart from "@/components/admin/SimpleChart";

interface OnboardingQuotas {
    betaSpots: { total: number; claimed: number };
    foundersPass: { total: number; sold: number; price: number };
}

interface ServerHealth {
    cpu: number;
    memory: number;
    disk: number;
    containers: number;
    uptime: string;
    hasWarnings: boolean;
}

// ─── Server Health Widget ─────────────────────────────────────
function ServerHealthWidget() {
    const [health, setHealth] = useState<ServerHealth | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const res = await fetch("https://app.listo.family/api/admin/server-stats", {
                    headers: { "X-Admin-Key": "listo-admin-2024" },
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                setHealth({
                    cpu: data.cpu?.usagePercent || 0,
                    memory: data.memory?.usagePercent || 0,
                    disk: data.disk?.usagePercent || 0,
                    containers: data.containers?.length || 0,
                    uptime: data.uptime || "Ukjent",
                    hasWarnings: !!(data.warnings?.highCpu || data.warnings?.highMemory || data.warnings?.highDisk),
                });
            } catch {
                setError(true);
            }
        };
        fetchHealth();
        const interval = setInterval(fetchHealth, 60000);
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
                <h3 className="font-semibold text-charcoal flex items-center gap-2 mb-3">
                    <Server className="w-5 h-5 text-charcoal-light" />
                    Server
                </h3>
                <p className="text-sm text-charcoal-light">Kunne ikke hente serverdata</p>
            </div>
        );
    }

    if (!health) {
        return (
            <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
                <h3 className="font-semibold text-charcoal flex items-center gap-2 mb-3">
                    <Server className="w-5 h-5 text-charcoal-light" />
                    Server
                </h3>
                <div className="flex items-center gap-2 text-sm text-charcoal-light">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Henter...
                </div>
            </div>
        );
    }

    const getBarColor = (value: number) =>
        value > 80 ? "bg-red-500" : value > 60 ? "bg-yellow-500" : "bg-listo-500";

    return (
        <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-charcoal flex items-center gap-2">
                    <Server className="w-5 h-5 text-listo-500" />
                    Server-helse
                </h3>
                {health.hasWarnings && (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        Advarsel
                    </span>
                )}
            </div>

            <div className="space-y-3">
                <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-charcoal-light flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" />CPU
                        </span>
                        <span className="font-medium text-charcoal">{health.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getBarColor(health.cpu)} transition-all`} style={{ width: `${health.cpu}%` }} />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-charcoal-light">💾 RAM</span>
                        <span className="font-medium text-charcoal">{health.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getBarColor(health.memory)} transition-all`} style={{ width: `${health.memory}%` }} />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-charcoal-light flex items-center gap-1.5">
                            <HardDrive className="w-3.5 h-3.5" />Disk
                        </span>
                        <span className="font-medium text-charcoal">{health.disk}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getBarColor(health.disk)} transition-all`} style={{ width: `${health.disk}%` }} />
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-charcoal/5 flex items-center justify-between text-xs text-charcoal-light">
                <span>{health.containers} containere</span>
                <span>Uptime: {health.uptime}</span>
            </div>
        </div>
    );
}

// ─── Main Dashboard ───────────────────────────────────────────
export default function AdminDashboard() {
    const { users, betaInterests, bugReports, db } = useAdminData();
    const [quotas, setQuotas] = useState<OnboardingQuotas | null>(null);

    // Fetch onboarding quotas
    useEffect(() => {
        const fetchQuotas = async () => {
            try {
                const quotaRef = doc(db, "onboarding_config", "quotas");
                const quotaDoc = await getDoc(quotaRef);
                if (quotaDoc.exists()) {
                    const data = quotaDoc.data();
                    setQuotas({
                        betaSpots: data.betaSpots || { total: 30, claimed: 0 },
                        foundersPass: data.foundersPass || { total: 300, sold: 0, price: 990 },
                    });
                } else {
                    setQuotas({
                        betaSpots: { total: 30, claimed: 0 },
                        foundersPass: { total: 300, sold: 0, price: 990 },
                    });
                }
            } catch (err) {
                console.error("Error fetching quotas:", err);
            }
        };
        fetchQuotas();
    }, [db]);

    const trialUsers = useMemo(() => {
        return betaInterests.filter(b => b.userType === "trial").length;
    }, [betaInterests]);

    // ─── Core metrics (all from users collection) ─────────────
    const metrics = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

        const getDate = (timestamp: Timestamp | string | undefined) => {
            if (!timestamp) return new Date(0);
            return timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
        };

        const registeredToday = users.filter(u => getDate(u.createdAt) >= today).length;
        const registeredThisWeek = users.filter(u => getDate(u.createdAt) >= weekAgo).length;
        const registeredLastWeek = users.filter(u => {
            const d = getDate(u.createdAt);
            return d >= twoWeeksAgo && d < weekAgo;
        }).length;

        const openedApp = users.filter(u => u.journey?.appFirstOpenAt).length;
        const completedOnboarding = users.filter(u => u.journey?.onboardingCompletedAt).length;
        const withFamily = users.filter(u => u.familyId).length;
        const newBugs = bugReports.filter(b => b.status === "new").length;

        return {
            total: users.length,
            registeredToday,
            registeredThisWeek,
            weekTrend: registeredThisWeek - registeredLastWeek,
            openedApp,
            completedOnboarding,
            withFamily,
            newBugs,
        };
    }, [users, bugReports]);

    // ─── Activation funnel ────────────────────────────────────
    const funnelSteps = useMemo(() => [
        { label: "Registrert", count: users.length, icon: Users, color: "bg-salmon-100 text-salmon-600" },
        { label: "Åpnet app", count: metrics.openedApp, icon: Smartphone, color: "bg-magic-100 text-magic-600" },
        { label: "Onboardet", count: metrics.completedOnboarding, icon: CheckCircle, color: "bg-sky-100 text-sky-600" },
        { label: "Familie", count: metrics.withFamily, icon: Home, color: "bg-listo-100 text-listo-600" },
    ], [users.length, metrics]);

    // ─── At-risk users ────────────────────────────────────────
    const atRiskCount = useMemo(() => {
        return users.filter(u => {
            const ts = u.createdAt;
            if (!ts) return false;
            const date = ts.toDate ? ts.toDate() : new Date();
            const daysOld = (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
            return daysOld > 3 && !u.familyId;
        }).length;
    }, [users]);

    // ─── Chart data (7 days) ──────────────────────────────────
    const chartData = useMemo(() => {
        const days = 7;
        const data = [];
        const now = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);

            const count = users.filter(u => {
                const ts = u.createdAt;
                if (!ts) return false;
                const d = ts instanceof Timestamp ? ts.toDate() : new Date(ts as any);
                return d >= date && d < nextDate;
            }).length;

            data.push({
                label: date.toLocaleDateString("nb-NO", { weekday: "short" }),
                value: count,
            });
        }
        return data;
    }, [users]);

    return (
        <div className="space-y-6">
            {/* ─── Quick Stats ──────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Totalt brukere"
                    value={metrics.total}
                    icon={Users}
                    iconBgColor="bg-listo-100"
                    iconColor="text-listo-600"
                    trend={metrics.weekTrend}
                    trendLabel="denne uken"
                    href="/admin/users"
                />
                <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
                    <p className="text-sm text-charcoal-light">Siste 7 dager</p>
                    <p className="text-3xl font-bold text-listo-600">{metrics.registeredThisWeek}</p>
                </div>
                <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
                    <p className="text-sm text-charcoal-light">I dag</p>
                    <p className="text-3xl font-bold text-salmon-600">{metrics.registeredToday}</p>
                </div>
                <MetricCard
                    title="Nye bugs"
                    value={metrics.newBugs}
                    icon={Bug}
                    iconBgColor="bg-red-100"
                    iconColor="text-red-600"
                    href="/admin/bugs"
                />
            </div>

            {/* ─── Onboarding Status ───────────────────────────── */}
            {quotas && (
                <div className="bg-gradient-to-r from-charcoal to-charcoal-dark rounded-squircle p-6 text-white">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-salmon-300" />
                        Onboarding Status
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 rounded-squircle-sm p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Gift className="w-4 h-4 text-listo-300" />
                                <span className="text-sm font-medium text-white/80">Free Beta</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-bold">{quotas.betaSpots.claimed}</span>
                                <span className="text-white/60">/ {quotas.betaSpots.total}</span>
                            </div>
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-listo-400 rounded-full" style={{ width: `${(quotas.betaSpots.claimed / quotas.betaSpots.total) * 100}%` }} />
                            </div>
                            <p className="text-xs text-white/50 mt-2">{quotas.betaSpots.total - quotas.betaSpots.claimed} plasser igjen</p>
                        </div>
                        <div className="bg-white/10 rounded-squircle-sm p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-4 h-4 text-salmon-300" />
                                <span className="text-sm font-medium text-white/80">Founders Pass</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-bold">{quotas.foundersPass.sold}</span>
                                <span className="text-white/60">/ {quotas.foundersPass.total}</span>
                            </div>
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-salmon-400 rounded-full" style={{ width: `${(quotas.foundersPass.sold / quotas.foundersPass.total) * 100}%` }} />
                            </div>
                            <p className="text-xs text-white/50 mt-2">💰 {(quotas.foundersPass.sold * quotas.foundersPass.price).toLocaleString("no-NO")} NOK</p>
                        </div>
                        <div className="bg-white/10 rounded-squircle-sm p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-magic-300" />
                                <span className="text-sm font-medium text-white/80">Prøveperioder</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-bold">{trialUsers}</span>
                                <span className="text-white/60">aktive</span>
                            </div>
                            <p className="text-xs text-white/50 mt-4">14-dagers prøveperiode</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Activation Funnel + Server Health ──────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activation Funnel (2/3) */}
                <div className="lg:col-span-2 bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-charcoal/10">
                        <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-listo-500" />
                            Aktiveringsstrakt
                        </h2>
                        <p className="text-sm text-charcoal-light mt-1">
                            Hvor faller brukerne av? Konvertering mellom hvert steg.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="flex items-end gap-2">
                            {funnelSteps.map((step, index) => {
                                const percentage = users.length > 0 ? Math.round((step.count / users.length) * 100) : 0;
                                const prevCount = index > 0 ? funnelSteps[index - 1].count : users.length;
                                const dropOff = prevCount > 0 ? prevCount - step.count : 0;
                                const dropOffPct = prevCount > 0 ? Math.round((dropOff / prevCount) * 100) : 0;
                                const Icon = step.icon;
                                const barHeight = Math.max(20, percentage);

                                return (
                                    <div key={step.label} className="flex-1 flex flex-col items-center">
                                        {index > 0 && dropOff > 0 && (
                                            <div className="text-xs text-red-500 font-medium mb-1">
                                                -{dropOff} ({dropOffPct}%)
                                            </div>
                                        )}
                                        {index === 0 && <div className="text-xs text-transparent mb-1">&nbsp;</div>}

                                        <p className="text-2xl font-bold text-charcoal mb-2">{step.count}</p>

                                        <div className="w-full flex justify-center mb-3">
                                            <div
                                                className={`w-full max-w-[80px] rounded-t-lg transition-all ${step.color.split(" ")[0]}`}
                                                style={{ height: `${barHeight}px` }}
                                            />
                                        </div>

                                        <div className={`w-10 h-10 rounded-full ${step.color.split(" ")[0]} flex items-center justify-center mb-2`}>
                                            <Icon className={`w-5 h-5 ${step.color.split(" ")[1]}`} />
                                        </div>
                                        <p className="text-sm font-medium text-charcoal text-center">{step.label}</p>
                                        <p className="text-xs text-charcoal-light">{percentage}%</p>
                                    </div>
                                );
                            })}
                        </div>

                        {users.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                                <div className="text-sm text-charcoal-light">
                                    {(() => {
                                        const drops = [
                                            { label: "Registrering → App", lost: users.length - metrics.openedApp },
                                            { label: "App → Onboarding", lost: metrics.openedApp - metrics.completedOnboarding },
                                            { label: "Onboarding → Familie", lost: metrics.completedOnboarding - metrics.withFamily },
                                        ].filter(d => d.lost > 0);

                                        if (drops.length === 0) return "Alle brukere er fullt aktivert! 🎉";
                                        const biggest = drops.reduce((a, b) => a.lost > b.lost ? a : b);
                                        const pct = users.length > 0 ? Math.round((biggest.lost / users.length) * 100) : 0;
                                        return (
                                            <>
                                                <strong>Største frafall:</strong> {biggest.label} — {biggest.lost} brukere ({pct}% av totalen).
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Server Health (1/3) */}
                <ServerHealthWidget />
            </div>

            {/* ─── Activity Chart ──────────────────────────────── */}
            <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-charcoal flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-listo-500" />
                        Nye brukere siste 7 dager
                    </h3>
                    <span className="text-sm text-charcoal-light">
                        {chartData.reduce((sum, d) => sum + d.value, 0)} totalt
                    </span>
                </div>
                <SimpleChart data={chartData} height={160} color="#22c55e" />
            </div>

            {/* ─── At-Risk Alert ────────────────────────────────── */}
            {atRiskCount > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-squircle p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                        <p className="font-medium text-amber-800">
                            {atRiskCount} bruker{atRiskCount > 1 ? "e" : ""} i faresonen
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                            Registrert for mer enn 3 dager siden uten å opprette familie.{" "}
                            <a href="/admin/users" className="underline hover:no-underline">Se brukerlisten →</a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

