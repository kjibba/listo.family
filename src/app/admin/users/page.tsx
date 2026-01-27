"use client";

import { Users, Mail, Calendar, Smartphone, CheckCircle, XCircle, Home, Sparkles, Clock } from "lucide-react";
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
        trial: "bg-charcoal/10 text-charcoal",
    };
    const labels: Record<string, string> = {
        admin: "Admin",
        founders_pass: "Founders",
        free_beta: "Beta",
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

            {/* Stats - Journey Progress */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-squircle shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-salmon-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-salmon-600" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-charcoal">{users.length}</p>
                        <p className="text-xs text-charcoal-light">Registreringer</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-squircle shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-magic-100 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-magic-600" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-charcoal">{openedApp}</p>
                        <p className="text-xs text-charcoal-light">Åpnet app</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-squircle shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-charcoal">{completedOnboarding}</p>
                        <p className="text-xs text-charcoal-light">Onboardet</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-squircle shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-listo-100 flex items-center justify-center">
                        <Home className="w-5 h-5 text-listo-600" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-charcoal">{withFamily}</p>
                        <p className="text-xs text-charcoal-light">Med familie</p>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Users className="w-5 h-5 text-listo-500" />
                        Registrerte brukere
                    </h2>
                    <span className="text-sm text-charcoal-light">
                        Enhetlig users collection med journey tracking
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
                            return (
                                <div
                                    key={user.id}
                                    className="px-6 py-4 hover:bg-cream-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-listo-400 to-listo-600 flex items-center justify-center text-white font-bold">
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
