"use client";

import { useAdminData, formatDate, IosWaitlistEntry } from "../layout";
import { Apple, Mail, Check, Clock, Users } from "lucide-react";

export default function IosWaitlistPage() {
    const { iosWaitlist } = useAdminData();

    const notifiedCount = iosWaitlist.filter(e => e.notified).length;
    const pendingCount = iosWaitlist.length - notifiedCount;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-charcoal mb-2">iOS Venteliste</h2>
                <p className="text-charcoal-light">
                    Brukere som venter på iOS-lansering (Q1 2026)
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-squircle p-6 border border-charcoal/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-listo-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-listo-600" />
                        </div>
                        <span className="text-3xl font-bold text-charcoal">{iosWaitlist.length}</span>
                    </div>
                    <p className="text-sm text-charcoal-light">Totalt på venteliste</p>
                </div>

                <div className="bg-white rounded-squircle p-6 border border-charcoal/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-sky-600" />
                        </div>
                        <span className="text-3xl font-bold text-charcoal">{pendingCount}</span>
                    </div>
                    <p className="text-sm text-charcoal-light">Venter på varsel</p>
                </div>

                <div className="bg-white rounded-squircle p-6 border border-charcoal/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-listo-100 rounded-lg flex items-center justify-center">
                            <Check className="w-5 h-5 text-listo-600" />
                        </div>
                        <span className="text-3xl font-bold text-charcoal">{notifiedCount}</span>
                    </div>
                    <p className="text-sm text-charcoal-light">Varslet</p>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-squircle border border-charcoal/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-charcoal/10 bg-cream-50">
                    <h3 className="font-semibold text-charcoal flex items-center gap-2">
                        <Apple className="w-5 h-5" />
                        Alle påmeldinger ({iosWaitlist.length})
                    </h3>
                </div>

                {iosWaitlist.length === 0 ? (
                    <div className="p-12 text-center">
                        <Apple className="w-12 h-12 text-charcoal/20 mx-auto mb-4" />
                        <p className="text-charcoal-light">Ingen påmeldinger ennå</p>
                    </div>
                ) : (
                    <div className="divide-y divide-charcoal/5">
                        {iosWaitlist.map((entry) => (
                            <div key={entry.id} className="px-6 py-4 hover:bg-cream-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${entry.notified ? 'bg-listo-100' : 'bg-sky-100'
                                            }`}>
                                            <Mail className={`w-4 h-4 ${entry.notified ? 'text-listo-600' : 'text-sky-600'
                                                }`} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-charcoal">{entry.email}</p>
                                            <p className="text-xs text-charcoal-light">
                                                {entry.source || 'landing_page'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${entry.notified
                                                ? 'bg-listo-100 text-listo-700'
                                                : 'bg-sky-100 text-sky-700'
                                            }`}>
                                            {entry.notified ? 'Varslet' : 'Venter'}
                                        </span>
                                        <span className="text-sm text-charcoal-light">
                                            {formatDate(entry.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
