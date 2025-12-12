"use client";

import { Users, Mail, Calendar } from "lucide-react";
import { useAdminData, formatDate, timeAgo } from "../layout";

export default function UsersPage() {
    const { users } = useAdminData();

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-squircle shadow-lg">
                    <p className="text-3xl font-bold text-charcoal">{users.length}</p>
                    <p className="text-sm text-charcoal-light">Totalt registrert</p>
                </div>
                <div className="bg-white p-6 rounded-squircle shadow-lg">
                    <p className="text-3xl font-bold text-listo-600">
                        {users.filter(u => {
                            if (!u.registeredAt) return false;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const ts = u.registeredAt as any;
                            const date = ts.toDate ? ts.toDate() : new Date(ts);
                            return (new Date().getTime() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
                        }).length}
                    </p>
                    <p className="text-sm text-charcoal-light">Siste 7 dager</p>
                </div>
                <div className="bg-white p-6 rounded-squircle shadow-lg">
                    <p className="text-3xl font-bold text-salmon-600">
                        {users.filter(u => {
                            if (!u.registeredAt) return false;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const ts = u.registeredAt as any;
                            const date = ts.toDate ? ts.toDate() : new Date(ts);
                            const now = new Date();
                            return date.getDate() === now.getDate() &&
                                date.getMonth() === now.getMonth() &&
                                date.getFullYear() === now.getFullYear();
                        }).length}
                    </p>
                    <p className="text-sm text-charcoal-light">I dag</p>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-squircle shadow-lg border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Users className="w-5 h-5 text-listo-500" />
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
                                    <p className="text-charcoal flex items-center gap-1 justify-end">
                                        <Calendar className="w-3 h-3" />
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
        </div>
    );
}
