"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, RefreshCw, Send, Eye, Clock, Paperclip, Reply, AlertCircle, CheckCircle, Inbox, ChevronLeft } from "lucide-react";

interface Email {
    uid: number;
    seqno: number;
    subject: string;
    from: string;
    fromAddress: string | null;
    to: string;
    date: string;
    text: string;
    html: string | null;
    isRead: boolean;
    isAnswered: boolean;
    hasAttachments: boolean;
    attachmentCount: number;
    messageId: string;
    inReplyTo: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://listo.family";
const ADMIN_KEY = "listo-admin-2024"; // Same as other admin pages

export default function AdminMailPage() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [showCompose, setShowCompose] = useState(false);
    const [replyMode, setReplyMode] = useState(false);

    // Compose state
    const [composeTo, setComposeTo] = useState("");
    const [composeSubject, setComposeSubject] = useState("");
    const [composeText, setComposeText] = useState("");
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);

    const fetchEmails = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/api/admin/emails?limit=50`, {
                headers: { "X-Admin-Key": ADMIN_KEY }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Kunne ikke hente e-poster");
            }

            const data = await res.json();
            setEmails(data.emails || []);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Ukjent feil");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmails();
    }, [fetchEmails]);

    const handleSelectEmail = async (email: Email) => {
        setSelectedEmail(email);
        setShowCompose(false);
        setReplyMode(false);

        // Mark as read if not already
        if (!email.isRead) {
            try {
                await fetch(`${API_URL}/api/admin/emails/mark-read`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Admin-Key": ADMIN_KEY
                    },
                    body: JSON.stringify({ uid: email.uid })
                });
                // Update local state
                setEmails(prev => prev.map(e =>
                    e.uid === email.uid ? { ...e, isRead: true } : e
                ));
            } catch (err) {
                console.error("Could not mark as read:", err);
            }
        }
    };

    const handleReply = () => {
        if (!selectedEmail) return;
        setReplyMode(true);
        setShowCompose(true);
        setComposeTo(selectedEmail.fromAddress || "");
        setComposeSubject(selectedEmail.subject.startsWith("Re:") ? selectedEmail.subject : `Re: ${selectedEmail.subject}`);
        setComposeText(`\n\n---\nOpprinnelig melding fra ${selectedEmail.from}:\n\n${selectedEmail.text}`);
    };

    const handleSend = async () => {
        if (!composeTo || !composeSubject || !composeText) {
            alert("Fyll ut alle felt");
            return;
        }

        setSending(true);
        setSendSuccess(false);

        try {
            const res = await fetch(`${API_URL}/api/admin/emails/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Admin-Key": ADMIN_KEY
                },
                body: JSON.stringify({
                    to: composeTo,
                    subject: composeSubject,
                    text: composeText,
                    inReplyTo: replyMode && selectedEmail ? selectedEmail.messageId : undefined
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Kunne ikke sende e-post");
            }

            setSendSuccess(true);
            setTimeout(() => {
                setShowCompose(false);
                setComposeTo("");
                setComposeSubject("");
                setComposeText("");
                setSendSuccess(false);
                setReplyMode(false);
            }, 2000);

        } catch (err: any) {
            alert("Feil: " + err.message);
        } finally {
            setSending(false);
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < 24) {
            return date.toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" });
        } else if (diffHours < 168) { // 7 days
            return date.toLocaleDateString("nb-NO", { weekday: "short", hour: "2-digit", minute: "2-digit" });
        }
        return date.toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" });
    };

    const unreadCount = emails.filter(e => !e.isRead).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
                        <Mail className="w-7 h-7 text-magic-500" />
                        Support-innboks
                        {unreadCount > 0 && (
                            <span className="bg-salmon-500 text-white text-sm px-2 py-0.5 rounded-full">
                                {unreadCount} ulest
                            </span>
                        )}
                    </h1>
                    <p className="text-charcoal-light mt-1">E-post til support@listo.family</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchEmails}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-charcoal/10 rounded-squircle-sm hover:bg-cream-50 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        Oppdater
                    </button>
                    <button
                        onClick={() => {
                            setShowCompose(true);
                            setReplyMode(false);
                            setComposeTo("");
                            setComposeSubject("");
                            setComposeText("");
                            setSelectedEmail(null);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-magic-500 to-magic-600 text-white rounded-squircle-sm hover:from-magic-600 hover:to-magic-700 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                        Ny e-post
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-squircle p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Email List */}
                <div className="lg:col-span-1 bg-white rounded-squircle border border-charcoal/10 overflow-hidden">
                    <div className="p-4 border-b border-charcoal/10 flex items-center gap-2">
                        <Inbox className="w-5 h-5 text-charcoal-light" />
                        <span className="font-medium text-charcoal">Innboks</span>
                        <span className="text-charcoal-light text-sm">({emails.length})</span>
                    </div>

                    <div className="max-h-[600px] overflow-y-auto">
                        {loading && emails.length === 0 ? (
                            <div className="p-8 text-center text-charcoal-light">
                                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 opacity-50" />
                                Henter e-poster...
                            </div>
                        ) : emails.length === 0 ? (
                            <div className="p-8 text-center text-charcoal-light">
                                <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                Ingen e-poster
                            </div>
                        ) : (
                            emails.map((email) => (
                                <button
                                    key={email.uid}
                                    onClick={() => handleSelectEmail(email)}
                                    className={`w-full text-left p-4 border-b border-charcoal/5 hover:bg-cream-50 transition-colors ${selectedEmail?.uid === email.uid ? "bg-cream-100" : ""
                                        } ${!email.isRead ? "bg-sky-50/50" : ""}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${email.isRead ? "bg-transparent" : "bg-sky-500"
                                            }`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className={`truncate ${!email.isRead ? "font-semibold" : ""} text-charcoal`}>
                                                    {email.from.split('<')[0].trim() || email.fromAddress}
                                                </p>
                                                <span className="text-xs text-charcoal-light shrink-0">
                                                    {formatDate(email.date)}
                                                </span>
                                            </div>
                                            <p className={`truncate text-sm ${!email.isRead ? "font-medium text-charcoal" : "text-charcoal-light"}`}>
                                                {email.subject}
                                            </p>
                                            <p className="truncate text-xs text-charcoal/50 mt-1">
                                                {email.text.substring(0, 80)}...
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {email.hasAttachments && (
                                                    <span className="flex items-center gap-1 text-xs text-charcoal/50">
                                                        <Paperclip className="w-3 h-3" />
                                                        {email.attachmentCount}
                                                    </span>
                                                )}
                                                {email.isAnswered && (
                                                    <span className="flex items-center gap-1 text-xs text-listo-600">
                                                        <Reply className="w-3 h-3" />
                                                        Besvart
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Email Detail / Compose */}
                <div className="lg:col-span-2 bg-white rounded-squircle border border-charcoal/10 overflow-hidden">
                    {showCompose ? (
                        /* Compose Form */
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                                    {replyMode ? <Reply className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                                    {replyMode ? "Svar på e-post" : "Ny e-post"}
                                </h2>
                                <button
                                    onClick={() => setShowCompose(false)}
                                    className="text-charcoal-light hover:text-charcoal"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-1">Til</label>
                                    <input
                                        type="email"
                                        value={composeTo}
                                        onChange={(e) => setComposeTo(e.target.value)}
                                        placeholder="mottaker@example.com"
                                        className="w-full px-4 py-2 border border-charcoal/20 rounded-squircle-sm focus:border-magic-500 focus:ring-2 focus:ring-magic-500/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-1">Emne</label>
                                    <input
                                        type="text"
                                        value={composeSubject}
                                        onChange={(e) => setComposeSubject(e.target.value)}
                                        placeholder="Emne"
                                        className="w-full px-4 py-2 border border-charcoal/20 rounded-squircle-sm focus:border-magic-500 focus:ring-2 focus:ring-magic-500/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-1">Melding</label>
                                    <textarea
                                        value={composeText}
                                        onChange={(e) => setComposeText(e.target.value)}
                                        rows={12}
                                        placeholder="Skriv din melding her..."
                                        className="w-full px-4 py-3 border border-charcoal/20 rounded-squircle-sm focus:border-magic-500 focus:ring-2 focus:ring-magic-500/20 outline-none resize-none font-mono text-sm"
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowCompose(false)}
                                        className="px-4 py-2 border border-charcoal/10 rounded-squircle-sm hover:bg-cream-50 transition-colors"
                                    >
                                        Avbryt
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        disabled={sending || sendSuccess}
                                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-magic-500 to-magic-600 text-white rounded-squircle-sm hover:from-magic-600 hover:to-magic-700 transition-colors disabled:opacity-50"
                                    >
                                        {sendSuccess ? (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Sendt!
                                            </>
                                        ) : sending ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                Sender...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : selectedEmail ? (
                        /* Email Detail */
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-charcoal/10">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-charcoal mb-2">
                                            {selectedEmail.subject}
                                        </h2>
                                        <div className="flex items-center gap-3 text-sm text-charcoal-light">
                                            <span className="font-medium text-charcoal">{selectedEmail.from}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(selectedEmail.date).toLocaleString("nb-NO")}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleReply}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-listo-500 to-listo-600 text-white rounded-squircle-sm hover:from-listo-600 hover:to-listo-700 transition-colors shrink-0"
                                    >
                                        <Reply className="w-4 h-4" />
                                        Svar
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto">
                                <div className="prose prose-sm max-w-none">
                                    {selectedEmail.html ? (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                                            className="email-content"
                                        />
                                    ) : (
                                        <pre className="whitespace-pre-wrap font-sans text-charcoal">
                                            {selectedEmail.text}
                                        </pre>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex items-center justify-center h-96 text-charcoal-light">
                            <div className="text-center">
                                <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>Velg en e-post for å lese den</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
