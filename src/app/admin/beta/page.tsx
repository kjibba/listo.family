"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, setDoc, Timestamp } from "firebase/firestore";
import { Shield, CheckCircle, Clock, Users, Mail, Search, UserCheck, UserX, Sparkles } from "lucide-react";
import { useAdminData, formatDate } from "../layout";

interface BetaUser {
  email: string;
  approved: boolean;
  addedDate: Timestamp;
  invitedBy: string;
  note?: string;
}

interface WaitlistUser {
  email: string;
  addedDate: Timestamp;
  source: string;
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
    const [waitlistUsers, setWaitlistUsers] = useState<WaitlistUser[]>([]);
    const [appUsers, setAppUsers] = useState<AppUser[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"users" | "waitlist">("users");

    // Subscribe to beta users
    useEffect(() => {
        const q = query(collection(db, "betaUsers"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users: BetaUser[] = [];
            snapshot.forEach((doc) => {
                users.push({ email: doc.id, ...doc.data() } as BetaUser);
            });
            console.log("BetaUsers loaded:", users.length, users);
            setBetaUsers(users);
            setLoading(false);
        }, (error) => {
            console.error("Error loading betaUsers:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [db]);

    // Subscribe to waitlist
    useEffect(() => {
        const q = query(collection(db, "waitlist"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users: WaitlistUser[] = [];
            snapshot.forEach((doc) => {
                users.push({ email: doc.id, ...doc.data() } as WaitlistUser);
            });
            setWaitlistUsers(users.sort((a, b) => {
                const aTime = a.addedDate?.toMillis() || 0;
                const bTime = b.addedDate?.toMillis() || 0;
                return bTime - aTime;
            }));
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

    const isBetaApproved = (email: string) => {
        const found = betaUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        console.log(`Checking beta for ${email}:`, found);
        return found?.approved === true;
    };

    const filteredAppUsers = appUsers.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredWaitlist = waitlistUsers.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            Administrer hvem som har tilgang til listo.family beta
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-listo-50 rounded-squircle-sm p-4 border border-listo-200">
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-5 h-5 text-listo-600" />
                            <span className="text-sm font-medium text-charcoal-light">Beta-godkjent</span>
                        </div>
                        <p className="text-3xl font-bold text-listo-700">{betaUsers.filter(u => u.approved).length}</p>
                    </div>
                    <div className="bg-salmon-50 rounded-squircle-sm p-4 border border-salmon-200">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-5 h-5 text-salmon-600" />
                            <span className="text-sm font-medium text-charcoal-light">På venteliste</span>
                        </div>
                        <p className="text-3xl font-bold text-salmon-700">{waitlistUsers.length}</p>
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
                        onClick={() => setActiveTab("users")}
                        className={`px-4 py-2 font-medium transition-colors relative ${activeTab === "users"
                                ? "text-listo-600"
                                : "text-charcoal-light hover:text-charcoal"
                            }`}
                    >
                        Alle brukere ({filteredAppUsers.length})
                        {activeTab === "users" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-listo-500" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("waitlist")}
                        className={`px-4 py-2 font-medium transition-colors relative ${activeTab === "waitlist"
                                ? "text-salmon-600"
                                : "text-charcoal-light hover:text-charcoal"
                            }`}
                    >
                        Venteliste ({filteredWaitlist.length})
                        {activeTab === "waitlist" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-salmon-500" />
                        )}
                    </button>
                </div>
            </div>

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
                                                {formatDate(user.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {hasAccess ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-listo-100 text-listo-700 rounded-full text-xs font-semibold">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Godkjent
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                                        <UserX className="w-3 h-3" />
                                                        Ikke godkjent
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
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

            {/* Waitlist Tab */}
            {activeTab === "waitlist" && (
                <div className="bg-white rounded-squircle border border-charcoal/5 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-charcoal/5">
                        <h2 className="text-xl font-bold text-charcoal flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Venteliste ({filteredWaitlist.length})
                        </h2>
                        <p className="text-sm text-charcoal-light mt-1">
                            Brukere som ikke har beta-tilgang ennå
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-cream-50 border-b border-charcoal/5">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        E-post
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Kilde
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Lagt til
                                    </th>
                                    <th className="text-right px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                                        Handling
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-charcoal/5">
                                {filteredWaitlist.map((user) => (
                                    <tr key={user.email} className="hover:bg-cream-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-charcoal-light" />
                                                <span className="font-medium text-charcoal">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${user.source === "signup"
                                                    ? "bg-sky-100 text-sky-700"
                                                    : "bg-magic-100 text-magic-700"
                                                }`}>
                                                {user.source === "signup" ? "App signup" : "Landing page"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-charcoal-light">
                                            {formatDate(user.addedDate)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => approveUser(user.email)}
                                                disabled={actionLoading === user.email}
                                                className="px-4 py-2 bg-listo-100 hover:bg-listo-200 text-listo-700 text-sm font-medium rounded-squircle-sm transition-colors disabled:opacity-50"
                                            >
                                                {actionLoading === user.email ? "⏳" : "✓ Godkjenn"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredWaitlist.length === 0 && (
                            <div className="text-center py-12 text-charcoal-light">
                                <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>Ingen på venteliste</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
