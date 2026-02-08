"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Users, Mail, Calendar, Smartphone, ChevronRight, AlertTriangle, Search, X, Filter } from "lucide-react";
import { useAdminData, formatDate, timeAgo, UserDocument } from "../layout";

// Helper to check journey status
const getJourneyStatus = (user: UserDocument) => {
    const journey = user.journey;
    if (!journey) return { step: 0, label: "Ukjent", color: "text-charcoal-light" };

    if (journey.familyCreatedAt || journey.familyJoinedAt || user.familyId) {
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

type FilterType = "all" | "at-risk" | "with-family" | "no-family";

export default function UsersPage() {
    const { users } = useAdminData();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");

    // Users at risk (registered > 3 days ago, no family)
    const atRiskIds = useMemo(() => {
        return new Set(
            users.filter(u => {
                const ts = u.createdAt;
                if (!ts) return false;
                const date = ts.toDate ? ts.toDate() : new Date();
                const daysOld = (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
                return daysOld > 3 && !u.familyId;
            }).map(u => u.id)
        );
    }, [users]);

    // Filter and search
    const filteredUsers = useMemo(() => {
        let result = users;

        // Text search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(u =>
                (u.displayName?.toLowerCase().includes(q)) ||
                (u.email?.toLowerCase().includes(q)) ||
                (u.id?.toLowerCase().includes(q))
            );
        }

        // Filter
        switch (filter) {
            case "at-risk":
                result = result.filter(u => atRiskIds.has(u.id));
                break;
            case "with-family":
                result = result.filter(u => u.familyId);
                break;
            case "no-family":
                result = result.filter(u => !u.familyId);
                break;
        }

        return result;
    }, [users, search, filter, atRiskIds]);

    const filterOptions: { value: FilterType; label: string; count: number }[] = [
        { value: "all", label: "Alle", count: users.length },
        { value: "at-risk", label: "I faresonen", count: atRiskIds.size },
        { value: "with-family", label: "Med familie", count: users.filter(u => u.familyId).length },
        { value: "no-family", label: "Uten familie", count: users.filter(u => !u.familyId).length },
    ];

    return (
        <div className="space-y-4">
            {/* At-Risk Alert */}
            {atRiskIds.size > 0 && filter !== "at-risk" && (
                <div className="bg-amber-50 border border-amber-200 rounded-squircle p-3 flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-sm text-amber-800 flex-1">
                        <strong>{atRiskIds.size}</strong> bruker{atRiskIds.size > 1 ? "e" : ""} registrert &gt;3 dager uten familie.
                    </p>
                    <button
                        onClick={() => setFilter("at-risk")}
                        className="text-xs font-medium text-amber-700 hover:text-amber-900 underline"
                    >
                        Vis
                    </button>
                </div>
            )}

            {/* Search + Filters */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light" />
                        <input
                            type="text"
                            placeholder="Søk på navn, e-post eller ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-8 py-2 border border-charcoal/10 rounded-squircle-sm text-sm focus:outline-none focus:ring-2 focus:ring-listo-500 focus:border-transparent"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-1 bg-cream-50 p-1 rounded-squircle-sm">
                        {filterOptions.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setFilter(opt.value)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-squircle-sm transition-all whitespace-nowrap ${
                                    filter === opt.value
                                        ? "bg-white text-charcoal shadow-sm"
                                        : "text-charcoal-light hover:text-charcoal"
                                }`}
                            >
                                {opt.label} ({opt.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Result count */}
                {(search || filter !== "all") && (
                    <p className="mt-2 text-xs text-charcoal-light">
                        Viser {filteredUsers.length} av {users.length} brukere
                        {search && <> for &ldquo;{search}&rdquo;</>}
                    </p>
                )}
            </div>

            {/* User List */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-3 border-b border-charcoal/10 flex items-center justify-between">
                    <h2 className="font-semibold text-charcoal flex items-center gap-2">
                        <Users className="w-4 h-4 text-listo-500" />
                        Brukere
                        <span className="text-sm font-normal text-charcoal-light">({filteredUsers.length})</span>
                    </h2>
                    <span className="text-xs text-charcoal-light">
                        Klikk for detaljer
                    </span>
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="p-12 text-center text-charcoal-light">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>{search ? `Ingen treff for "${search}"` : "Ingen brukere matcher filteret."}</p>
                    </div>
                ) : (
                    <div className="divide-y divide-charcoal/5">
                        {filteredUsers.map((user, index) => {
                            const journey = getJourneyStatus(user);
                            const isAtRisk = atRiskIds.has(user.id);
                            return (
                                <div
                                    key={user.id}
                                    onClick={() => router.push(`/admin/users/${user.id}`)}
                                    className="px-6 py-4 hover:bg-cream-50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
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
                                                {index === 0 && filter === "all" && !search && (
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
