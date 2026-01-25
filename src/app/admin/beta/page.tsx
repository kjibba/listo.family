"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, setDoc, Timestamp } from "firebase/firestore";
import { Shield, CheckCircle, Clock, Users, Mail, Search, Sparkles, Send } from "lucide-react";
import { useAdminData, formatDate } from "../layout";

interface BetaInterest {
    id: string;
    name: string;
    email: string;
    familySize?: string; // Deprecated in Phase 3
    source: string;
    userType: "free_beta" | "trial";
    position: number | null;
    createdAt: Timestamp;
    welcomeEmailSent?: boolean;
    welcomeEmailSentAt?: Timestamp;
    androidBetaInviteSent?: boolean;
    androidBetaInviteSentAt?: Timestamp;
    trialStartDate?: Timestamp;
    trialExpiresAt?: Timestamp;
}

interface BetaUser {
    email: string;
    approved: boolean;
    addedDate: Timestamp;
    invitedBy: string;
    note?: string;
}

interface AppUser {
    email: string;
    displayName?: string;
    familyId?: string;
    createdAt?: Timestamp;
}

export default function BetaPage() {
    const { db } = useAdminData();
    const [betaUsers, setBetaUsers] = useState<BetaUser[]>([]);
    const [betaInterest, setBetaInterest] = useState<BetaInterest[]>([]);
    const [appUsers, setAppUsers] = useState<AppUser[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"interest" | "users">("interest");

    // Subscribe to beta_interest (new signups from landing page)
    useEffect(() => {
        const q = query(collection(db, "beta_interest"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const interests: BetaInterest[] = [];
            snapshot.forEach((doc) => {
                interests.push({ id: doc.id, ...doc.data() } as BetaInterest);
            });
            // Sort by createdAt descending (newest first)
            setBetaInterest(interests.sort((a, b) => {
                const aTime = a.createdAt?.toMillis() || 0;
                const bTime = b.createdAt?.toMillis() || 0;
                return bTime - aTime;
            }));
            setLoading(false);
        }, (error) => {
            console.error("Error loading beta_interest:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [db]);

    // Subscribe to beta users
    useEffect(() => {
        const q = query(collection(db, "betaUsers"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users: BetaUser[] = [];
            snapshot.forEach((doc) => {
                users.push({ email: doc.id, ...doc.data() } as BetaUser);
            });
            setBetaUsers(users);
        }, (error) => {
            console.error("Error loading betaUsers:", error);
        });
        return () => unsubscribe();
    }, [db]);

    // Subscribe to app users
    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users: AppUser[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                users.push({
                    email: data.email || "",
                    displayName: data.displayName,
                    familyId: data.familyId,
                    createdAt: data.createdAt,
                });
            });
            setAppUsers(users.sort((a, b) => {
                const aTime = a.createdAt?.toMillis() || 0;
                const bTime = b.createdAt?.toMillis() || 0;
                return bTime - aTime;
            }));
        });
        return () => unsubscribe();
    }, [db]);

    const approveUser = async (email: string) => {
        setActionLoading(email);
        try {
            const betaUserRef = doc(db, "betaUsers", email.toLowerCase());
            await setDoc(betaUserRef, {
                email: email.toLowerCase(),
                approved: true,
                addedDate: Timestamp.now(),
                invitedBy: "admin",
                note: "Godkjent via admin panel",
            });
            alert(`✅ ${email} er nå godkjent for beta!`);
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Feil ved godkjenning");
        } finally {
            setActionLoading(null);
        }
    };

    const revokeAccess = async (email: string) => {
        if (!confirm(`Er du sikker på at du vil fjerne beta-tilgang for ${email}?`)) return;

        setActionLoading(email);
        try {
            const betaUserRef = doc(db, "betaUsers", email.toLowerCase());
            await setDoc(betaUserRef, {
                email: email.toLowerCase(),
                approved: false,
                addedDate: Timestamp.now(),
                invitedBy: "admin",
                note: "Tilgang fjernet via admin panel",
            });
            alert(`❌ Beta-tilgang fjernet for ${email}`);
        } catch (error) {
            console.error("Error revoking access:", error);
            alert("Feil ved fjerning av tilgang");
        } finally {
            setActionLoading(null);
        }
    };

    const sendAndroidBetaInvite = async (interest: BetaInterest) => {
        if (!confirm(`Send Android beta-invitasjon til ${interest.email}?\n\nDu må først ha lagt til ${interest.email} i Play Console som beta-tester.`)) return;

        setActionLoading(interest.email);
        try {
            // Call Firebase Cloud Function
            const response = await fetch('https://us-central1-listo-6443c.cloudfunctions.net/sendAndroidBetaInvite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        email: interest.email,
                        name: interest.name
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send invitation');
            }

            // Update Firestore to mark as sent
            const interestRef = doc(db, "beta_interest", interest.id);
            await setDoc(interestRef, {
                androidBetaInviteSent: true,
                androidBetaInviteSentAt: Timestamp.now(),
            }, { merge: true });

            alert(`✅ Android beta-invitasjon sendt til ${interest.email}!`);
        } catch (error) {
            console.error("Error sending Android beta invite:", error);
            alert("Feil ved sending av invitasjon. Sjekk konsollen for detaljer.");
        } finally {
            setActionLoading(null);
        }
    };

    const isBetaApproved = (email: string) => {
        const found = betaUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        return found?.approved === true;
    };

    const deleteTestUser = async (email: string) => {
        if (!confirm(`⚠️ ADVARSEL: Dette vil permanent slette:\n\n- Bruker fra Firebase Auth\n- Brukerdata fra Firestore\n- Beta-påmelding\n\nEr du sikker på at du vil slette ${email}?`)) return;

        setActionLoading(email);
        try {
            // Call Firebase Cloud Function
            const response = await fetch('https://us-central1-listo-6443c.cloudfunctions.net/deleteTestUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: { email }
                })
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            const result = await response.json();
            console.log('Delete result:', result);

            let message = `✅ Bruker slettet:\n`;
            if (result.result.authDeleted) message += `- Firebase Auth ✓\n`;
            if (result.result.firestoreDeleted) message += `- Firestore ✓\n`;
            if (result.result.betaInterestDeleted) message += `- Beta-påmelding ✓\n`;
            if (result.result.errors.length > 0) {
                message += `\n⚠️ Feil:\n${result.result.errors.join('\n')}`;
            }

            alert(message);
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Feil ved sletting av bruker. Sjekk konsollen for detaljer.");
        } finally {
            setActionLoading(null);
        }
    };

    const filteredAppUsers = appUsers.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredBetaInterest = betaInterest.filter(interest =>
        interest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate stats
    const freeBetaCount = betaInterest.filter(i => i.userType === "free_beta").length;
    const trialCount = betaInterest.filter(i => i.userType === "trial").length;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-listo-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-squircle p-6 border border-charcoal/5 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-charcoal mb-2 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-listo-500" />
                            Beta Tilgangsstyring
                        </h1>
                        <p className="text-charcoal-light">
                            Administrer beta-påmeldinger og Android beta-invitasjoner
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-listo-50 rounded-squircle-sm p-4 border border-listo-200">
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-5 h-5 text-listo-600" />
                            <span className="text-sm font-medium text-charcoal-light">Free Beta</span>
                        </div>
                        <p className="text-3xl font-bold text-listo-700">{freeBetaCount}</p>
                        <p className="text-xs text-charcoal-light mt-1">av 30 plasser</p>
                    </div>
                    <div className="bg-salmon-50 rounded-squircle-sm p-4 border border-salmon-200">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-5 h-5 text-salmon-600" />
                            <span className="text-sm font-medium text-charcoal-light">Trial</span>
                        </div>
                        <p className="text-3xl font-bold text-salmon-700">{trialCount}</p>
                        <p className="text-xs text-charcoal-light mt-1">14-dagers prøve</p>
                    </div>
                    <div className="bg-sky-50 rounded-squircle-sm p-4 border border-sky-200">
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="w-5 h-5 text-sky-600" />
                            <span className="text-sm font-medium text-charcoal-light">Totalt registrert</span>
                        </div>
                        <p className="text-3xl font-bold text-sky-700">{appUsers.length}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mt-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                    <input
                        type="text"
                        placeholder="Søk etter e-post eller navn..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-cream-50 border border-charcoal/10 rounded-squircle-sm focus:outline-none focus:ring-2 focus:ring-listo-500 focus:border-transparent"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mt-6 border-b border-charcoal/10">
                    <button
                        onClick={() => setActiveTab("interest")}
                        className={`px-4 py-2 font-medium transition-colors relative ${activeTab === "interest"
                            ? "text-listo-600"
                            : "text-charcoal-light hover:text-charcoal"
                            }`}
                    >
                        Beta-påmeldinger ({filteredBetaInterest.length})
                        {activeTab === "interest" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-listo-500" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-4 py-2 font-medium transition-colors relative ${activeTab === "users"
                            ? "text-salmon-600"
                            : "text-charcoal-light hover:text-charcoal"
                            }`}
                    >
                        Alle brukere ({filteredAppUsers.length})
                        {activeTab === "users" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-salmon-500" />
                        )}
                    </button>
                </div>
            </div>

            {/* Beta Interest Tab */}
            {activeTab === "interest" && (
                <div className="bg-white rounded-squircle border border-charcoal/5 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-charcoal/5">
                        <h2 className="text-xl font-bold text-charcoal flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Beta-påmeldinger ({filteredBetaInterest.length})
                        </h2>
                        <p className="text-sm text-charcoal-light mt-1">
                            Brukere som har meldt seg på via listo.family
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-cream-50 border-b border-charcoal/5">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Bruker
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Registrert
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="text-right px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Handling
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-charcoal/5">
                                {filteredBetaInterest.map((interest) => (
                                    <tr key={interest.id} className="hover:bg-cream-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-charcoal">
                                                    {interest.name}
                                                </div>
                                                <div className="text-sm text-charcoal-light">{interest.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {interest.userType === "free_beta" ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-listo-100 text-listo-700 rounded-full text-xs font-semibold">
                                                    <Sparkles className="w-3 h-3" />
                                                    Free Beta #{interest.position}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-salmon-100 text-salmon-700 rounded-full text-xs font-semibold">
                                                    <Clock className="w-3 h-3" />
                                                    14-dagers prøve
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-charcoal-light">
                                            {formatDate(interest.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                {interest.welcomeEmailSent && (
                                                    <div className="flex items-center gap-1 text-xs text-listo-600">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Velkomst-e-post sendt
                                                    </div>
                                                )}
                                                {interest.androidBetaInviteSent && (
                                                    <div className="flex items-center gap-1 text-xs text-sky-600">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Android-invitasjon sendt
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                {!interest.androidBetaInviteSent ? (
                                                    <button
                                                        onClick={() => sendAndroidBetaInvite(interest)}
                                                        disabled={actionLoading === interest.email}
                                                        className="px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-700 text-sm font-medium rounded-squircle-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                                                    >
                                                        {actionLoading === interest.email ? (
                                                            "⏳"
                                                        ) : (
                                                            <>
                                                                <Send className="w-4 h-4" />
                                                                Send Android-invitasjon
                                                            </>
                                                        )}
                                                    </button>
                                                ) : (
                                                    <span className="text-sm text-charcoal-light">
                                                        Invitasjon sendt {interest.androidBetaInviteSentAt && formatDate(interest.androidBetaInviteSentAt)}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => deleteTestUser(interest.email)}
                                                    disabled={actionLoading === interest.email}
                                                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-squircle-sm transition-colors disabled:opacity-50"
                                                    title="Slett testbruker"
                                                >
                                                    {actionLoading === interest.email ? "⏳" : "🗑️"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredBetaInterest.length === 0 && (
                            <div className="text-center py-12 text-charcoal-light">
                                <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>Ingen beta-påmeldinger funnet</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* All App Users Tab */}
            {activeTab === "users" && (
                <div className="bg-white rounded-squircle border border-charcoal/5 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-charcoal/5">
                        <h2 className="text-xl font-bold text-charcoal flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Alle registrerte brukere ({filteredAppUsers.length})
                        </h2>
                        <p className="text-sm text-charcoal-light mt-1">
                            Brukere som har opprettet konto i appen
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-cream-50 border-b border-charcoal/5">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Bruker
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Familie ID
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Registrert
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Beta-status
                                    </th>
                                    <th className="text-right px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Handling
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-charcoal/5">
                                {filteredAppUsers.map((user) => {
                                    const hasAccess = isBetaApproved(user.email);
                                    return (
                                        <tr key={user.email} className="hover:bg-cream-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-charcoal">
                                                        {user.displayName || "Ikke satt"}
                                                    </div>
                                                    <div className="text-sm text-charcoal-light">{user.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs bg-cream-100 px-2 py-1 rounded">
                                                    {user.familyId ? user.familyId.slice(0, 8) + "..." : "Ingen"}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-charcoal-light">
                                                {user.createdAt ? formatDate(user.createdAt) : "Ukjent"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {hasAccess ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-listo-100 text-listo-700 rounded-full text-xs font-semibold">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Godkjent
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                                        <Clock className="w-3 h-3" />
                                                        Ikke godkjent
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center gap-2 justify-end">
                                                    {hasAccess ? (
                                                        <button
                                                            onClick={() => revokeAccess(user.email)}
                                                            disabled={actionLoading === user.email}
                                                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-squircle-sm transition-colors disabled:opacity-50"
                                                        >
                                                            {actionLoading === user.email ? "⏳" : "Fjern tilgang"}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => approveUser(user.email)}
                                                            disabled={actionLoading === user.email}
                                                            className="px-4 py-2 bg-listo-100 hover:bg-listo-200 text-listo-700 text-sm font-medium rounded-squircle-sm transition-colors disabled:opacity-50"
                                                        >
                                                            {actionLoading === user.email ? "⏳" : "✓ Godkjenn"}
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteTestUser(user.email)}
                                                        disabled={actionLoading === user.email}
                                                        className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-squircle-sm transition-colors disabled:opacity-50"
                                                        title="Slett testbruker"
                                                    >
                                                        {actionLoading === user.email ? "⏳" : "🗑️"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filteredAppUsers.length === 0 && (
                            <div className="text-center py-12 text-charcoal-light">
                                <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>Ingen brukere funnet</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
