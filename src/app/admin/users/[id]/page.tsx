"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { collection, doc, getDoc, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { useAdminData, formatDate, timeAgo, UserDocument } from "../../layout";
import {
    ArrowLeft, User, Mail, Calendar, Smartphone, Home, Crown, Clock,
    Brain, BookOpen, UtensilsCrossed, ShoppingCart, Check, X, AlertCircle,
    ChevronRight, Activity, TrendingUp, Zap
} from "lucide-react";

// ─── Activation Funnel Steps ───────────────────────────────────
interface FunnelStep {
    key: string;
    label: string;
    icon: typeof User;
    completedAt: Date | null;
    description: string;
}

function buildFunnelSteps(user: UserDocument): FunnelStep[] {
    const ts = (val: Timestamp | null | undefined): Date | null => {
        if (!val) return null;
        return val.toDate ? val.toDate() : null;
    };

    return [
        {
            key: "registered",
            label: "Registrert",
            icon: Mail,
            completedAt: ts(user.journey?.registeredAt) || ts(user.createdAt),
            description: "Opprettet konto",
        },
        {
            key: "app_opened",
            label: "Åpnet appen",
            icon: Smartphone,
            completedAt: ts(user.journey?.appFirstOpenAt),
            description: "Første gang appen ble åpnet",
        },
        {
            key: "onboarding",
            label: "Fullført onboarding",
            icon: Check,
            completedAt: ts(user.journey?.onboardingCompletedAt),
            description: user.journey?.onboardingSkipped ? "Hoppet over" : "Fullført veiviseren",
        },
        {
            key: "family",
            label: "Familie opprettet",
            icon: Home,
            completedAt: ts(user.journey?.familyCreatedAt) || ts(user.journey?.familyJoinedAt) || (user.familyId ? ts(user.createdAt) : null),
            description: user.journey?.familyJoinedAt ? "Ble med i en familie" : "Opprettet familie",
        },
    ];
}

// ─── Feature Usage Card ────────────────────────────────────────
interface FeatureUsage {
    key: string;
    label: string;
    icon: typeof Brain;
    color: string;
    bgColor: string;
    count: number;
    last30Days: number;
    lastUsed: Date | null;
    description: string;
}

// ─── Main Component ────────────────────────────────────────────
export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;
    const { users, db } = useAdminData();

    const [user, setUser] = useState<UserDocument | null>(null);
    const [featureUsage, setFeatureUsage] = useState<FeatureUsage[]>([]);
    const [loading, setLoading] = useState(true);
    const [familyMembers, setFamilyMembers] = useState<number>(0);
    const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);

    // Find user from context
    useEffect(() => {
        const found = users.find(u => u.id === userId);
        if (found) {
            setUser(found);
        }
    }, [users, userId]);

    // Fetch feature usage data from Firestore
    useEffect(() => {
        if (!user?.familyId) {
            setLoading(false);
            return;
        }

        const fetchUsageData = async () => {
            try {
                const familyId = user.familyId!;
                const now = new Date();
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

                // Parallel fetch all data
                const [
                    usageSnap,
                    recipesSnap,
                    mealsSnap,
                    shoppingSnap,
                    familyDoc,
                    userDoc,
                ] = await Promise.all([
                    getDocs(collection(db, "families", familyId, "usage")).catch(() => null),
                    getDocs(collection(db, "families", familyId, "recipes")).catch(() => null),
                    getDocs(collection(db, "families", familyId, "meals")).catch(() => null),
                    getDocs(collection(db, "families", familyId, "shoppingListsV2", "list", "items")).catch(() => null),
                    getDoc(doc(db, "families", familyId)).catch(() => null),
                    getDoc(doc(db, "users", userId)).catch(() => null),
                ]);

                // Count family members
                if (familyDoc?.exists()) {
                    const familyData = familyDoc.data();
                    setFamilyMembers(familyData?.members?.length || 1);
                }

                // Read subscription data from user doc
                if (userDoc?.exists()) {
                    const userData = userDoc.data();
                    if (userData?.subscription) {
                        setSubscriptionInfo(userData.subscription);
                    }
                }

                // ─── AI Suggestions ──────────────
                let aiTotal = 0;
                let aiLast30 = 0;
                let aiLastUsed: Date | null = null;

                usageSnap?.forEach((doc) => {
                    const data = doc.data();
                    const count = data.aiSuggestionsCount || 0;
                    aiTotal += count;

                    if (data.lastResetTimestamp) {
                        const d = data.lastResetTimestamp.toDate ? data.lastResetTimestamp.toDate() : new Date(data.lastResetTimestamp);
                        if (d >= thirtyDaysAgo) aiLast30 += count;
                        if (!aiLastUsed || d > aiLastUsed) aiLastUsed = count > 0 ? d : aiLastUsed;
                    }
                });

                // ─── Recipes ─────────────────────
                let recipesTotal = 0;
                let recipesLast30 = 0;
                let recipesLastUsed: Date | null = null;

                recipesSnap?.forEach((doc) => {
                    recipesTotal++;
                    const data = doc.data();
                    if (data.createdAt?.toDate) {
                        const d = data.createdAt.toDate();
                        if (d >= thirtyDaysAgo) recipesLast30++;
                        if (!recipesLastUsed || d > recipesLastUsed) recipesLastUsed = d;
                    }
                });

                // ─── Meals ───────────────────────
                let mealsTotal = 0;
                let mealsLast30 = 0;
                let mealsLastUsed: Date | null = null;

                mealsSnap?.forEach((doc) => {
                    mealsTotal++;
                    const data = doc.data();
                    if (data.date) {
                        const d = new Date(data.date);
                        if (d >= thirtyDaysAgo) mealsLast30++;
                        if (!mealsLastUsed || d > mealsLastUsed) mealsLastUsed = d;
                    }
                });

                // ─── Shopping ────────────────────
                let shoppingTotal = 0;
                let shoppingChecked = 0;
                let shoppingLastUsed: Date | null = null;

                shoppingSnap?.forEach((doc) => {
                    shoppingTotal++;
                    const data = doc.data();
                    if (data.checked) shoppingChecked++;
                    if (data.addedAt?.toDate) {
                        const d = data.addedAt.toDate();
                        if (!shoppingLastUsed || d > shoppingLastUsed) shoppingLastUsed = d;
                    }
                });

                setFeatureUsage([
                    {
                        key: "ai",
                        label: "AI-forslag",
                        icon: Brain,
                        color: "text-purple-600",
                        bgColor: "bg-purple-100",
                        count: aiTotal,
                        last30Days: aiLast30,
                        lastUsed: aiLastUsed,
                        description: "Antall AI-genererte forslag",
                    },
                    {
                        key: "recipes",
                        label: "Oppskrifter",
                        icon: BookOpen,
                        color: "text-orange-600",
                        bgColor: "bg-orange-100",
                        count: recipesTotal,
                        last30Days: recipesLast30,
                        lastUsed: recipesLastUsed,
                        description: "Oppskrifter i biblioteket",
                    },
                    {
                        key: "meals",
                        label: "Måltidsplanlegging",
                        icon: UtensilsCrossed,
                        color: "text-green-600",
                        bgColor: "bg-green-100",
                        count: mealsTotal,
                        last30Days: mealsLast30,
                        lastUsed: mealsLastUsed,
                        description: "Planlagte måltider",
                    },
                    {
                        key: "shopping",
                        label: "Handleliste",
                        icon: ShoppingCart,
                        color: "text-blue-600",
                        bgColor: "bg-blue-100",
                        count: shoppingTotal,
                        last30Days: shoppingChecked,
                        lastUsed: shoppingLastUsed,
                        description: `${shoppingChecked} av ${shoppingTotal} varer krysset av`,
                    },
                ]);
            } catch (error) {
                console.error("Error fetching usage data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsageData();
    }, [user, db, userId]);

    if (!user) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-charcoal/30 mx-auto mb-4" />
                    <p className="text-charcoal-light">Bruker ikke funnet.</p>
                    <Link href="/admin/users" className="text-listo-600 hover:underline mt-2 inline-block">
                        ← Tilbake til brukerlisten
                    </Link>
                </div>
            </div>
        );
    }

    const funnelSteps = buildFunnelSteps(user);
    const completedSteps = funnelSteps.filter(s => s.completedAt).length;
    const dropOffStep = funnelSteps.find(s => !s.completedAt);

    // Calculate engagement score (0-100)
    const activationScore = Math.round((completedSteps / funnelSteps.length) * 40) +
        Math.min(30, featureUsage.reduce((sum, f) => sum + Math.min(10, f.count), 0)) +
        (user.journey?.appFirstOpenAt ? 15 : 0) +
        (featureUsage.some(f => f.lastUsed && (new Date().getTime() - f.lastUsed.getTime()) < 7 * 24 * 60 * 60 * 1000) ? 15 : 0);

    const getScoreColor = (score: number) => {
        if (score >= 70) return "text-green-600 bg-green-100";
        if (score >= 40) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 70) return "Aktiv bruker";
        if (score >= 40) return "Delvis aktivert";
        return "Risiko for frafall";
    };

    // Days since registration and last active
    const daysSinceRegistration = user.createdAt
        ? Math.floor((new Date().getTime() - (user.createdAt.toDate ? user.createdAt.toDate() : new Date()).getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const lastActiveDate = (user as any).lastActiveAt?.toDate?.() || null;
    const daysSinceActive = lastActiveDate
        ? Math.floor((new Date().getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    return (
        <div className="space-y-6">
            {/* Back + Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/admin/users")}
                    className="flex items-center gap-2 text-charcoal-light hover:text-charcoal transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Tilbake
                </button>
            </div>

            {/* User Header Card */}
            <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-listo-400 to-listo-600 flex items-center justify-center text-white text-2xl font-bold">
                            {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-charcoal">
                                {user.displayName || "Uten navn"}
                            </h1>
                            <p className="text-charcoal-light flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {user.email}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                                {user.familyName && (
                                    <span className="flex items-center gap-1 text-sm text-charcoal-light">
                                        <Home className="w-3.5 h-3.5" />
                                        {user.familyName}
                                        {familyMembers > 1 && ` (${familyMembers} medlemmer)`}
                                    </span>
                                )}
                                {user.journey?.appPlatform && (
                                    <span className="flex items-center gap-1 text-sm text-charcoal-light">
                                        <Smartphone className="w-3.5 h-3.5" />
                                        {user.journey.appPlatform}
                                    </span>
                                )}
                                {user.journey?.appVersion && (
                                    <span className="text-sm text-charcoal/40">
                                        v{user.journey.appVersion}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Engagement Score */}
                    <div className={`flex flex-col items-center px-6 py-3 rounded-squircle ${getScoreColor(activationScore)}`}>
                        <span className="text-3xl font-bold">{activationScore}</span>
                        <span className="text-xs font-medium">{getScoreLabel(activationScore)}</span>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-charcoal/10">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-charcoal">{daysSinceRegistration}</p>
                        <p className="text-xs text-charcoal-light">Dager siden reg.</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-charcoal">
                            {daysSinceActive !== null ? daysSinceActive : "—"}
                        </p>
                        <p className="text-xs text-charcoal-light">Dager siden aktiv</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-charcoal">{completedSteps}/{funnelSteps.length}</p>
                        <p className="text-xs text-charcoal-light">Aktiveringssteg</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-charcoal">
                            {featureUsage.filter(f => f.count > 0).length}/{featureUsage.length}
                        </p>
                        <p className="text-xs text-charcoal-light">Features brukt</p>
                    </div>
                </div>
            </div>

            {/* Drop-off Alert */}
            {dropOffStep && (
                <div className="bg-amber-50 border border-amber-200 rounded-squircle p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                        <p className="font-medium text-amber-800">
                            Brukeren stoppet ved: <span className="font-bold">{dropOffStep.label}</span>
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                            {completedSteps === 0 && "Brukeren har registrert seg men aldri kommet videre."}
                            {completedSteps === 1 && "Brukeren åpnet appen men fullførte ikke onboarding."}
                            {completedSteps === 2 && "Brukeren fullførte onboarding men opprettet ikke familie."}
                            {completedSteps === 3 && "Brukeren har familie men har ikke tatt i bruk features ennå."}
                        </p>
                    </div>
                </div>
            )}

            {/* Activation Funnel */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-charcoal/10">
                    <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Activity className="w-5 h-5 text-listo-500" />
                        Aktiveringsreise
                    </h2>
                    <p className="text-sm text-charcoal-light mt-1">
                        Viser hvor langt brukeren har kommet i onboarding og aktivering
                    </p>
                </div>

                <div className="p-6">
                    <div className="relative">
                        {funnelSteps.map((step, index) => {
                            const isCompleted = !!step.completedAt;
                            const isDropOff = !isCompleted && index === completedSteps;
                            const Icon = step.icon;

                            return (
                                <div key={step.key} className="flex items-start gap-4 relative">
                                    {/* Vertical line */}
                                    {index < funnelSteps.length - 1 && (
                                        <div
                                            className={`absolute left-[19px] top-[40px] w-0.5 h-[calc(100%-16px)] ${
                                                isCompleted ? "bg-listo-400" : "bg-charcoal/15"
                                            }`}
                                        />
                                    )}

                                    {/* Step circle */}
                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                        isCompleted
                                            ? "bg-listo-500 text-white"
                                            : isDropOff
                                                ? "bg-amber-100 text-amber-600 ring-2 ring-amber-300"
                                                : "bg-charcoal/10 text-charcoal/30"
                                    }`}>
                                        {isCompleted ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}
                                    </div>

                                    {/* Step content */}
                                    <div className={`pb-8 ${!isCompleted && !isDropOff ? "opacity-40" : ""}`}>
                                        <div className="flex items-center gap-2">
                                            <p className={`font-semibold ${isCompleted ? "text-charcoal" : isDropOff ? "text-amber-700" : "text-charcoal/50"}`}>
                                                {step.label}
                                            </p>
                                            {isDropOff && (
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                                    ⚠️ Stoppet her
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-charcoal-light">
                                            {step.description}
                                        </p>
                                        {step.completedAt && (
                                            <p className="text-xs text-charcoal/40 mt-1 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDate(Timestamp.fromDate(step.completedAt))}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Feature Usage Grid */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-charcoal/10">
                    <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Zap className="w-5 h-5 text-listo-500" />
                        Feature-bruk
                    </h2>
                    <p className="text-sm text-charcoal-light mt-1">
                        Aggregerte tall — ingen faktisk brukerinnhold vises
                    </p>
                </div>

                {loading ? (
                    <div className="p-12 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-listo-500" />
                    </div>
                ) : !user.familyId ? (
                    <div className="p-12 text-center text-charcoal-light">
                        <Home className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>Brukeren er ikke med i noen familie ennå.</p>
                        <p className="text-sm mt-1">Feature-bruk trackes per familie.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-px bg-charcoal/5">
                        {featureUsage.map((feature) => {
                            const Icon = feature.icon;
                            const isUsed = feature.count > 0;
                            const isRecentlyActive = feature.lastUsed &&
                                (new Date().getTime() - feature.lastUsed.getTime()) < 7 * 24 * 60 * 60 * 1000;

                            return (
                                <div
                                    key={feature.key}
                                    className={`bg-white p-6 ${!isUsed ? "opacity-50" : ""}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                                            <Icon className={`w-5 h-5 ${feature.color}`} />
                                        </div>
                                        {isRecentlyActive && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                Aktiv
                                            </span>
                                        )}
                                        {isUsed && !isRecentlyActive && (
                                            <span className="px-2 py-0.5 bg-charcoal/5 text-charcoal/50 text-xs font-medium rounded-full">
                                                Inaktiv
                                            </span>
                                        )}
                                    </div>

                                    <p className="font-semibold text-charcoal">{feature.label}</p>
                                    <p className="text-3xl font-bold text-charcoal mt-1">
                                        {feature.count}
                                    </p>
                                    <p className="text-sm text-charcoal-light mt-1">
                                        {feature.description}
                                    </p>

                                    {feature.lastUsed && (
                                        <p className="text-xs text-charcoal/40 mt-3 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Sist brukt: {timeAgo(Timestamp.fromDate(feature.lastUsed))}
                                        </p>
                                    )}
                                    {!isUsed && (
                                        <p className="text-xs text-red-400 mt-3 flex items-center gap-1">
                                            <X className="w-3 h-3" />
                                            Aldri brukt
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Subscription Info */}
            {subscriptionInfo && (
                <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-charcoal/10">
                        <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                            <Crown className="w-5 h-5 text-listo-500" />
                            Abonnement
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-charcoal-light">Status</p>
                                <p className={`font-semibold ${subscriptionInfo.active ? "text-green-600" : "text-red-500"}`}>
                                    {subscriptionInfo.active ? "Aktiv" : "Inaktiv"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-charcoal-light">Produkt</p>
                                <p className="font-semibold text-charcoal">
                                    {subscriptionInfo.productId || "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-charcoal-light">Plattform</p>
                                <p className="font-semibold text-charcoal">
                                    {subscriptionInfo.platform || "—"}
                                </p>
                            </div>
                        </div>
                        {subscriptionInfo.willCancel && (
                            <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
                                ⚠️ Brukeren har kansellert. Utløper: {subscriptionInfo.expiresAt?.toDate ? formatDate(subscriptionInfo.expiresAt) : "Ukjent"}
                            </div>
                        )}
                        {subscriptionInfo.refundedAt && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg text-sm text-red-700">
                                💰 Refundert: {subscriptionInfo.refundedAt?.toDate ? formatDate(subscriptionInfo.refundedAt) : "Ukjent"}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Access Type & Meta */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-listo-500" />
                    Metadata
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-charcoal-light">Access Type</p>
                        <p className="font-semibold text-charcoal">{(user as any).accessType || "—"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-charcoal-light">Beta Position</p>
                        <p className="font-semibold text-charcoal">{user.betaPosition ?? "—"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-charcoal-light">Kilde</p>
                        <p className="font-semibold text-charcoal">{user.journey?.source || "—"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-charcoal-light">Registrert via</p>
                        <p className="font-semibold text-charcoal">{user.journey?.registrationSource || "—"}</p>
                    </div>
                </div>
                {(user as any).premiumUntil && (
                    <div className="mt-4 pt-4 border-t border-charcoal/10">
                        <p className="text-sm text-charcoal-light">Premium til</p>
                        <p className="font-semibold text-charcoal">
                            {formatDate((user as any).premiumUntil)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
