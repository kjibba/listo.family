"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { ArrowLeft, Users, Clock, Mail, User as UserIcon, Shield, RefreshCw, Sparkles } from "lucide-react";

// Firebase config (same as listo-app)
const firebaseConfig = {
  apiKey: "AIzaSyAW6ksZsDokqRAIpczXI030u_esWHOVe0Q",
  authDomain: "listo-6443c.firebaseapp.com",
  projectId: "listo-6443c",
  storageBucket: "listo-6443c.firebasestorage.app",
  messagingSenderId: "616905600919",
  appId: "1:616905600919:web:d5e5c9f8a7b6c4d3e2f1a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Admin emails that can access this page
const ADMIN_EMAILS = ["kjibba@gmail.com", "kristoffer@kjibba.no"];

interface UserRegistration {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
  registeredAt: Timestamp;
  source: string;
}

interface BetaInterest {
  id: string;
  name: string;
  email: string;
  familySize: string;
  createdAt: Timestamp;
  source: string;
}

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserRegistration[]>([]);
  const [betaInterests, setBetaInterests] = useState<BetaInterest[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "beta">("beta");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && ADMIN_EMAILS.includes(user.email || "")) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to user registrations
  useEffect(() => {
    if (!isAdmin) return;

    const q = query(
      collection(db, "user_registrations"),
      orderBy("registeredAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userList: UserRegistration[] = [];
      snapshot.forEach((doc) => {
        userList.push({
          id: doc.id,
          ...doc.data(),
        } as UserRegistration);
      });
      setUsers(userList);
      setLastRefresh(new Date());
    });

    return () => unsubscribe();
  }, [isAdmin]);

  // Subscribe to beta interests
  useEffect(() => {
    if (!isAdmin) return;

    const q = query(
      collection(db, "beta_interest"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const interests: BetaInterest[] = [];
      snapshot.forEach((doc) => {
        interests.push({
          id: doc.id,
          ...doc.data(),
        } as BetaInterest);
      });
      setBetaInterests(interests);
      setLastRefresh(new Date());
    });

    return () => unsubscribe();
  }, [isAdmin]);

  // Format date
  const formatDate = (timestamp: Timestamp | string) => {
    if (!timestamp) return "Ukjent";
    
    const date = timestamp instanceof Timestamp 
      ? timestamp.toDate() 
      : new Date(timestamp);
    
    return new Intl.DateTimeFormat("nb-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Time ago
  const timeAgo = (timestamp: Timestamp | string) => {
    if (!timestamp) return "";
    
    const date = timestamp instanceof Timestamp 
      ? timestamp.toDate() 
      : new Date(timestamp);
    
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "akkurat nå";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min siden`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} timer siden`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} dager siden`;
    return formatDate(timestamp);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-listo-500" />
      </div>
    );
  }

  // Not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-squircle shadow-xl p-8 border border-charcoal/5 text-center">
          <Shield className="w-16 h-16 text-charcoal/20 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Admin-tilgang kreves
          </h2>
          <p className="text-charcoal-light mb-6">
            Du må logge inn med en admin-konto for å se denne siden.
          </p>
          <Link
            href="/login"
            className="block w-full py-3 px-6 bg-gradient-to-r from-listo-500 to-listo-600 hover:from-listo-600 hover:to-listo-700 text-white font-semibold rounded-squircle-sm shadow-lg hover:shadow-xl transition-all text-center"
          >
            Logg inn
          </Link>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-squircle shadow-xl p-8 border border-charcoal/5 text-center">
          <Shield className="w-16 h-16 text-red-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Ingen tilgang
          </h2>
          <p className="text-charcoal-light mb-6">
            Kontoen din ({currentUser.email}) har ikke admin-tilgang.
          </p>
          <Link
            href="/"
            className="block w-full py-3 px-6 border border-charcoal/10 text-charcoal font-medium rounded-squircle-sm hover:bg-cream-50 transition-colors text-center"
          >
            Tilbake til forsiden
          </Link>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <header className="bg-white border-b border-charcoal/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-charcoal-light hover:text-charcoal transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbake
            </Link>
            <div className="h-6 w-px bg-charcoal/10" />
            <h1 className="text-xl font-bold text-charcoal flex items-center gap-2">
              <Shield className="w-5 h-5 text-listo-500" />
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-charcoal-light">
            <span>{currentUser.email}</span>
            <button
              onClick={() => auth.signOut()}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Logg ut
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-magic-100 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-magic-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-light">Beta-interesserte</p>
                <p className="text-3xl font-bold text-charcoal">{betaInterests.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-listo-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-listo-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-light">Registrerte brukere</p>
                <p className="text-3xl font-bold text-charcoal">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-salmon-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-salmon-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-light">Nye i dag</p>
                <p className="text-3xl font-bold text-charcoal">
                  {betaInterests.filter(b => {
                    if (!b.createdAt) return false;
                    const date = b.createdAt instanceof Timestamp 
                      ? b.createdAt.toDate() 
                      : new Date(b.createdAt);
                    return (new Date().getTime() - date.getTime()) < 86400000;
                  }).length + users.filter(u => {
                    if (!u.registeredAt) return false;
                    const date = u.registeredAt instanceof Timestamp 
                      ? u.registeredAt.toDate() 
                      : new Date(u.registeredAt);
                    return (new Date().getTime() - date.getTime()) < 86400000;
                  }).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-squircle shadow-lg p-6 border border-charcoal/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-light">Sist oppdatert</p>
                <p className="text-lg font-medium text-charcoal">
                  {lastRefresh.toLocaleTimeString("nb-NO")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("beta")}
            className={`px-4 py-2 rounded-squircle-sm font-medium transition-colors ${
              activeTab === "beta"
                ? "bg-magic-500 text-white"
                : "bg-white text-charcoal hover:bg-cream-50 border border-charcoal/10"
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Beta-interesserte ({betaInterests.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-squircle-sm font-medium transition-colors ${
              activeTab === "users"
                ? "bg-listo-500 text-white"
                : "bg-white text-charcoal hover:bg-cream-50 border border-charcoal/10"
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Registrerte brukere ({users.length})
          </button>
        </div>

        {/* Beta interests list */}
        {activeTab === "beta" && (
          <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal">
                Beta-interesserte
              </h2>
              <span className="text-sm text-charcoal-light">
                Fra interesseskjemaet på forsiden
              </span>
            </div>

            {betaInterests.length === 0 ? (
              <div className="p-12 text-center text-charcoal-light">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Ingen beta-interesserte ennå.</p>
                <p className="text-sm mt-2">
                  Folk vil vises her når de fyller ut skjemaet på{" "}
                  <Link href="/#beta" className="text-listo-600 underline">
                    forsiden
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="divide-y divide-charcoal/5">
                {betaInterests.map((interest, index) => (
                  <div
                    key={interest.id}
                    className="px-6 py-4 hover:bg-cream-50 transition-colors flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-magic-400 to-magic-600 flex items-center justify-center text-white font-bold">
                      {interest.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-charcoal truncate">
                          {interest.name}
                        </p>
                        {index === 0 && (
                          <span className="px-2 py-0.5 bg-magic-100 text-magic-700 text-xs font-medium rounded-full">
                            Nyeste
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-charcoal/5 text-charcoal-light text-xs rounded-full">
                          {interest.familySize} pers
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-charcoal-light">
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3" />
                          {interest.email}
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-sm">
                      <p className="text-charcoal">
                        {timeAgo(interest.createdAt)}
                      </p>
                      <p className="text-charcoal-light text-xs">
                        {formatDate(interest.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User list */}
        {activeTab === "users" && (
          <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal">
                Registrerte brukere
              </h2>
              <span className="text-sm text-charcoal-light">
                Fra signup-siden (har opprettet konto)
              </span>
            </div>

            {users.length === 0 ? (
              <div className="p-12 text-center text-charcoal-light">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Ingen registrerte brukere ennå.</p>
                <p className="text-sm mt-2">
                  Brukere vil vises her når de registrerer seg via{" "}
                  <Link href="/signup" className="text-listo-600 underline">
                    signup-siden
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="divide-y divide-charcoal/5">
                {users.map((user, index) => (
                  <div
                    key={user.id}
                    className="px-6 py-4 hover:bg-cream-50 transition-colors flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-listo-400 to-listo-600 flex items-center justify-center text-white font-bold">
                      {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "?"}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-charcoal truncate">
                          {user.displayName || "Uten navn"}
                        </p>
                        {index === 0 && (
                          <span className="px-2 py-0.5 bg-listo-100 text-listo-700 text-xs font-medium rounded-full">
                            Nyeste
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-charcoal-light">
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-sm">
                      <p className="text-charcoal">
                        {timeAgo(user.registeredAt)}
                      </p>
                      <p className="text-charcoal-light text-xs">
                        {formatDate(user.registeredAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Note */}
        <p className="text-center text-sm text-charcoal/50 mt-8">
          💡 Data hentes fra Firestore collection <code className="bg-charcoal/5 px-1 rounded">user_registrations</code>
          <br />
          som fylles ut av Cloud Functions når brukere registrerer seg.
        </p>
      </main>
    </div>
  );
}
