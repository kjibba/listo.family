"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Mail, Calendar, Smartphone, CheckCircle, XCircle, Home, Sparkles, Clock, Trash2, ChevronRight, AlertTriangle, TrendingDown } from "lucide-react";
import { useAdminData, formatDate, timeAgo, UserDocument } from "../layout";

// Helper to check journey status
const getJourneyStatus = (user: UserDocument) => {
    const journey = user.journey;
    if (!journey) return { step: 0, label: "Ukjent", color: "text-charcoal-light" };
    
    if (journey.familyCreatedAt || journey.familyJoinedAt) {
        return { step: 5, label: "Familie", color: "text-listo-600" };
    }
    if (journey.onboardingCompletedAt) {
        return { step: 4, label: "Onboarding", color: "text-sky-600" };
    }
    if (journey.appFirstOpenAt) {
        return { step: 3, label: "App åpnet", color: "text-magic-600" };
    }
    if (journey.registeredAt) {
        return { step: 2, label: "Registrert", color: "text-salmon-600" };
    }
    if (journey.betaInterestAt) {
        return { step: 1, label: "Beta-interesse", color: "text-charcoal-light" };
    }
    return { step: 0, label: "Ukjent", color: "text-charcoal-light" };
};

// Access type badge
const AccessBadge = ({ accessType }: { accessType: string }) => {
    const styles: Record<string, string> = {
        admin: "bg-magic-100 text-magic-700",
        founders_pass: "bg-salmon-100 text-salmon-700",
        free_beta: "bg-listo-100 text-listo-700",
        early_adopter: "bg-green-100 text-green-700",
        freemium: "bg-charcoal/10 text-charcoal",
        trial: "bg-charcoal/10 text-charcoal",
    };
    const labels: Record<string, string> = {
        admin: "Admin",
        founders_pass: "Founders",
        free_beta: "Beta",
        early_adopter: "Early Adopter",
        freemium: "Freemium",
        trial: "Trial",
    };
    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[accessType] || styles.trial}`}>
            {labels[accessType] || "Trial"}
        </span>
    );
};

export default function UsersPage() {
    const { users } = useAdminData();
    const router = useRouter();

    // Stats calculations
    const registeredLast7Days = users.filter(u => {
        const ts = u.createdAt;
        if (!ts) return false;
        const date = ts.toDate ? ts.toDate() : new Date();
        return (new Date().getTime() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
    }).length;

    const registeredToday = users.filter(u => {
        const ts = u.createdAt;
        if (!ts) return false;
        const date = ts.toDate ? ts.toDate() : new Date();
        const now = new Date();
        return date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();
    }).length;

    const withFamily = users.filter(u => u.familyId).length;
    const completedOnboarding = users.filter(u => u.journey?.onboardingCompletedAt).length;
    const openedApp = users.filter(u => u.journey?.appFirstOpenAt).length;

    // ─── Activation Funnel Data ────────────────────────────────
    const funnelSteps = [
        {
            label: "Registrert",
            count: users.length,
            icon: Users,
            color: "bg-salmon-100 text-salmon-600",
        },
        {
            label: "Åpnet app",
            count: openedApp,
            icon: Smartphone,
            color: "bg-magic-100 text-magic-600",
        },
        {
            label: "Onboardet",
            count: completedOnboarding,
            icon: CheckCircle,
            color: "bg-sky-100 text-sky-600",
        },
        {
            label: "Familie",
            count: withFamily,
            icon: Home,
            color: "bg-listo-100 text-listo-600",
        },
    ];

    // Users at risk (registered > 3 days ago, no family)
    const atRiskUsers = users.filter(u => {
        const ts = u.createdAt;
        if (!ts) return false;
        const date = ts.toDate ? ts.toDate() : new Date();
        const daysOld = (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        return daysOld > 3 && !u.familyId;
    });

    return (
        <div className="space-y-6">
            {/* Stats - Top Row */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-squircle shadow-lg">
                    <p className="text-3xl font-bold text-charcoal">{users.length}</p>
                    <p className="text-sm text-charcoal-light">Totalt registrert</p>
                </div>
                <div className="bg-white p-6 rounded-squircle shadow-lg">
                    <p className="text-3xl font-bold text-listo-600">{registeredLast7Days}</p>
                    <p className="text-sm text-charcoal-light">Siste 7 dager</p>
                </div>
                <div className="bg-white p-6 rounded-squircle shadow-lg">
                    <p className="text-3xl font-bold text-salmon-600">{registeredToday}</p>
                    <p className="text-sm text-charcoal-light">I dag</p>
                </div>
            </div>

            {/* ─── Activation Funnel ────────────────────────────── */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-charcoal/10">
                    <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-listo-500" />
                        Aktiveringsstrakt
                    </h2>
                    <p className="text-sm text-charcoal-light mt-1">
                        Hvor faller brukerne av? Vis konvertering mellom hvert steg.
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
                                    {/* Drop-off indicator between steps */}
                                    {index > 0 && dropOff > 0 && (
                                        <div className="text-xs text-red-500 font-medium mb-1">
                                            -{dropOff} ({dropOffPct}%)
                                        </div>
                                    )}
                                    {index === 0 && <div className="text-xs text-transparent mb-1">&nbsp;</div>}

                                    {/* Count */}
                                    <p className="text-2xl font-bold text-charcoal mb-2">{step.count}</p>

                                    {/* Bar */}
                                    <div className="w-full flex justify-center mb-3">
                                        <div
                                            className={`w-full max-w-[80px] rounded-t-lg transition-all ${step.color.split(" ")[0]}`}
                                            style={{ height: `${barHeight}px` }}
                                        />
                                    </div>

                                    {/* Label */}
                                    <div className={`w-10 h-10 rounded-full ${step.color.split(" ")[0]} flex items-center justify-center mb-2`}>
                                        <Icon className={`w-5 h-5 ${step.color.split(" ")[1]}`} />
                                    </div>
                                    <p className="text-sm font-medium text-charcoal text-center">{step.label}</p>
                                    <p className="text-xs text-charcoal-light">{percentage}%</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary insight */}
                    {users.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                            <div className="text-sm text-charcoal-light">
                                {(() => {
                                    const regToApp = users.length > 0 ? ((openedApp / users.length) * 100).toFixed(0) : 0;
                                    const appToOnboard = openedApp > 0 ? ((completedOnboarding / openedApp) * 100).toFixed(0) : 0;
                                    const onboardToFamily = completedOnboarding > 0 ? ((withFamily / completedOnboarding) * 100).toFixed(0) : 0;

                                    // Find biggest drop
                                    const drops = [
                                        { label: "Registrering → App åpnet", pct: Number(regToApp), lost: users.length - openedApp },
                                        { label: "App åpnet → Onboarding", pct: Number(appToOnboard), lost: openedApp - completedOnboarding },
                                        { label: "Onboarding → Familie", pct: Number(onboardToFamily), lost: completedOnboarding - withFamily },
                                    ].filter(d => d.lost > 0);

                                    if (drops.length === 0) return "Alle brukere er fullt aktivert! 🎉";

                                    const biggest = drops.reduce((a, b) => a.lost > b.lost ? a : b);
                                    return (
                                        <>
                                            <strong>Største frafall:</strong> {biggest.label} — {biggest.lost} brukere ({100 - biggest.pct}% frafall).
                                            {biggest.label.includes("App åpnet") && " Disse registrerte seg men åpnet aldri appen."}
                                            {biggest.label.includes("Onboarding") && " Disse åpnet appen men fullførte ikke veiviseren."}
                                            {biggest.label.includes("Familie") && " Disse fullførte onboarding men opprettet ikke familie."}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* At-Risk Users Alert */}
            {atRiskUsers.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-squircle p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                        <p className="font-medium text-amber-800">
                            {atRiskUsers.length} bruker{atRiskUsers.length > 1 ? "e" : ""} i faresonen
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                            Registrert for mer enn 3 dager siden uten å opprette familie. Klikk på en bruker for å se detaljer.
                        </p>
                    </div>
                </div>
            )}

            {/* User List */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Users className="w-5 h-5 text-listo-500" />
                        Registrerte brukere
                    </h2>
                    <span className="text-sm text-charcoal-light">
                        Klikk for å se detaljer og feature-bruk
                    </span>
                </div>

                {users.length === 0 ? (
                    <div className="p-12 text-center text-charcoal-light">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>Ingen registrerte brukere ennå.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-charcoal/5">
                        {users.map((user, index) => {
                            const journey = getJourneyStatus(user);
                            const isAtRisk = atRiskUsers.some(u => u.id === user.id);
                            return (
                                <div
                                    key={user.id}
                                    onClick={() => router.push(`/admin/users/${user.id}`)}
                                    className="px-6 py-4 hover:bg-cream-50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                            isAtRisk
                                                ? "bg-gradient-to-br from-amber-400 to-amber-600"
                                                : "bg-gradient-to-br from-listo-400 to-listo-600"
                                        }`}>
                                            {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "?"}
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-charcoal truncate">
                                                    {user.displayName || "Uten navn"}
                                                </p>
                                                {index === 0 && (
                                                    <span className="px-2 py-0.5 bg-salmon-100 text-salmon-700 text-xs font-medium rounded-full">
                                                        Nyeste
                                                    </span>
                                                )}
                                                <AccessBadge accessType={user.accessType} />
                                                {isAtRisk && (
                                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                                        ⚠️ Risiko
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-charcoal-light">
                                                <span className="flex items-center gap-1 truncate">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </span>
                                                {user.journey?.appPlatform && (
                                                    <span className="flex items-center gap-1">
                                                        <Smartphone className="w-3 h-3" />
                                                        {user.journey.appPlatform}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Journey Progress */}
                                        <div className="flex items-center gap-1 px-3">
                                            {[1, 2, 3, 4, 5].map((step) => (
                                                <div
                                                    key={step}
                                                    className={`w-2 h-2 rounded-full ${
                                                        step <= journey.step ? "bg-listo-500" : "bg-charcoal/20"
                                                    }`}
                                                    title={
                                                        step === 1 ? "Beta-interesse" :
                                                        step === 2 ? "Registrert" :
                                                        step === 3 ? "App åpnet" :
                                                        step === 4 ? "Onboarding" :
                                                        "Familie"
                                                    }
                                                />
                                            ))}
                                        </div>

                                        {/* Journey Status */}
                                        <div className="text-center min-w-[80px]">
                                            <p className={`text-sm font-medium ${journey.color}`}>
                                                {journey.label}
                                            </p>
                                        </div>

                                        {/* Date */}
                                        <div className="text-right text-sm min-w-[100px]">
                                            <p className="text-charcoal flex items-center gap-1 justify-end">
                                                <Calendar className="w-3 h-3" />
                                                {timeAgo(user.createdAt)}
                                            </p>
                                            <p className="text-charcoal-light text-xs">
                                                {formatDate(user.createdAt)}
                                            </p>
                                        </div>

                                        {/* Click indicator */}
                                        <ChevronRight className="w-5 h-5 text-charcoal/20 group-hover:text-listo-500 transition-colors" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
