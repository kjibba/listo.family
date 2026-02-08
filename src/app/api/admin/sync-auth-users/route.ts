import { NextRequest, NextResponse } from "next/server";
import * as admin from "firebase-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_EMAILS = ["kjibba@gmail.com"];

function initFirebaseAdmin() {
    if (!admin.apps.length) {
        if (!process.env.FIREBASE_PROJECT_ID) {
            console.warn("Firebase Admin not initialized - missing credentials");
            return null;
        }
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            }),
        });
    }
    return admin;
}

interface OrphanUser {
    uid: string;
    email: string | undefined;
    displayName: string | undefined;
    createdAt: string;
    providers: string[];
    hasBetaInterest: boolean;
    betaInterestData?: Record<string, unknown>;
}

/**
 * GET /api/admin/sync-auth-users?adminEmail=...
 * 
 * Lists Firebase Auth users that DON'T have a corresponding users/{uid} doc.
 */
export async function GET(request: NextRequest) {
    const adminEmail = request.nextUrl.searchParams.get("adminEmail");
    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const firebaseAdmin = initFirebaseAdmin();
    if (!firebaseAdmin) {
        return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
    }

    try {
        // List ALL Firebase Auth users
        const authUsers: admin.auth.UserRecord[] = [];
        let nextPageToken: string | undefined;
        do {
            const result = await firebaseAdmin.auth().listUsers(1000, nextPageToken);
            authUsers.push(...result.users);
            nextPageToken = result.pageToken;
        } while (nextPageToken);

        // Check which ones have users/{uid} docs
        const db = firebaseAdmin.firestore();
        const orphans: OrphanUser[] = [];
        const synced: string[] = [];

        for (const authUser of authUsers) {
            const userDoc = await db.collection("users").doc(authUser.uid).get();
            if (!userDoc.exists) {
                // Check if they have a beta_interest entry
                let betaData: Record<string, unknown> | undefined;
                let hasBeta = false;
                if (authUser.email) {
                    const betaSnap = await db
                        .collection("beta_interest")
                        .where("email", "==", authUser.email.toLowerCase())
                        .limit(1)
                        .get();
                    if (!betaSnap.empty) {
                        hasBeta = true;
                        betaData = betaSnap.docs[0].data();
                    }
                }

                orphans.push({
                    uid: authUser.uid,
                    email: authUser.email,
                    displayName: authUser.displayName,
                    createdAt: authUser.metadata.creationTime || "unknown",
                    providers: authUser.providerData.map(p => p.providerId),
                    hasBetaInterest: hasBeta,
                    betaInterestData: betaData,
                });
            } else {
                synced.push(authUser.uid);
            }
        }

        return NextResponse.json({
            success: true,
            totalAuthUsers: authUsers.length,
            synced: synced.length,
            orphans: orphans.length,
            orphanList: orphans,
        });
    } catch (error: any) {
        console.error("Sync check failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * POST /api/admin/sync-auth-users
 * 
 * Body: { adminEmail, action: "sync" | "dry-run", uids?: string[] }
 * 
 * Creates users/{uid} docs for orphan Auth users.
 * If uids provided, only syncs those. Otherwise syncs all orphans.
 */
export async function POST(request: NextRequest) {
    const { adminEmail, action = "dry-run", uids } = await request.json();
    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const firebaseAdmin = initFirebaseAdmin();
    if (!firebaseAdmin) {
        return NextResponse.json({ error: "Firebase Admin not configured" }, { status: 500 });
    }

    const dryRun = action === "dry-run";
    const db = firebaseAdmin.firestore();

    try {
        // Get all Auth users or specific ones
        let authUsers: admin.auth.UserRecord[] = [];

        if (uids && uids.length > 0) {
            // Fetch specific users
            const result = await firebaseAdmin.auth().getUsers(
                uids.map((uid: string) => ({ uid }))
            );
            authUsers = result.users;
        } else {
            // List all
            let nextPageToken: string | undefined;
            do {
                const result = await firebaseAdmin.auth().listUsers(1000, nextPageToken);
                authUsers.push(...result.users);
                nextPageToken = result.pageToken;
            } while (nextPageToken);
        }

        const results = {
            checked: 0,
            created: 0,
            skipped: 0,
            errors: [] as string[],
            details: [] as { uid: string; email?: string; action: string }[],
        };

        for (const authUser of authUsers) {
            results.checked++;

            // Skip if doc already exists
            const userDoc = await db.collection("users").doc(authUser.uid).get();
            if (userDoc.exists) {
                results.skipped++;
                results.details.push({ uid: authUser.uid, email: authUser.email, action: "skipped (exists)" });
                continue;
            }

            // Find beta_interest link
            let betaInterestId: string | null = null;
            let betaInterestAt: admin.firestore.Timestamp | null = null;
            let betaPosition: number | null = null;
            let source: "landing_page" | "app_direct" = "app_direct";

            if (authUser.email) {
                const betaSnap = await db
                    .collection("beta_interest")
                    .where("email", "==", authUser.email.toLowerCase())
                    .limit(1)
                    .get();
                if (!betaSnap.empty) {
                    const betaDoc = betaSnap.docs[0];
                    const betaData = betaDoc.data();
                    betaInterestId = betaDoc.id;
                    betaInterestAt = betaData.createdAt || null;
                    betaPosition = betaData.position || null;
                    source = "landing_page";
                }
            }

            // Determine auth provider
            const providerId = authUser.providerData?.[0]?.providerId;
            const authProvider = providerId === "google.com" ? "google"
                : providerId === "apple.com" ? "apple" : "email";

            // Determine access type — existing users get early_adopter
            const isAdmin = authUser.email && ADMIN_EMAILS.includes(authUser.email.toLowerCase());
            const accessType = isAdmin ? "admin" : "early_adopter";

            // 3 months premium for early adopters
            const premiumUntil = new Date();
            premiumUntil.setMonth(premiumUntil.getMonth() + 3);

            // Parse creation time
            const createdAt = authUser.metadata.creationTime
                ? admin.firestore.Timestamp.fromDate(new Date(authUser.metadata.creationTime))
                : admin.firestore.FieldValue.serverTimestamp();

            const userData = {
                email: authUser.email?.toLowerCase() || null,
                displayName: authUser.displayName || null,
                photoURL: authUser.photoURL || null,
                createdAt,
                authProvider,
                journey: {
                    betaInterestId,
                    betaInterestAt,
                    source,
                    registeredAt: createdAt,
                    registrationSource: "web" as const,
                    androidBetaInviteSent: false,
                    androidBetaInviteSentAt: null,
                    appFirstOpenAt: null,
                    appPlatform: null,
                    appVersion: null,
                    onboardingStartedAt: null,
                    onboardingCompletedAt: null,
                    onboardingSkipped: false,
                    familyCreatedAt: null,
                    familyJoinedAt: null,
                },
                accessType,
                betaPosition,
                premiumUntil: admin.firestore.Timestamp.fromDate(premiumUntil),
                foundersPass: false,
                foundersPassExpiresAt: null,
                trialExpiresAt: null,
                familyId: null,
                familyName: null,
                settings: {
                    notifications: true,
                    theme: "system",
                    language: "nb",
                },
                expoPushToken: null,
                lastActiveAt: null,
            };

            if (!dryRun) {
                try {
                    await db.collection("users").doc(authUser.uid).set(userData);
                    results.created++;
                    results.details.push({ uid: authUser.uid, email: authUser.email, action: "created" });

                    // Link beta_interest if found
                    if (betaInterestId) {
                        await db.collection("beta_interest").doc(betaInterestId).update({
                            userId: authUser.uid,
                            status: "registered",
                            registeredAt: admin.firestore.FieldValue.serverTimestamp(),
                        });
                    }
                } catch (err: any) {
                    results.errors.push(`${authUser.email}: ${err.message}`);
                }
            } else {
                results.created++;
                results.details.push({ uid: authUser.uid, email: authUser.email, action: "would create" });
            }
        }

        return NextResponse.json({
            success: true,
            dryRun,
            ...results,
            message: dryRun
                ? `DRY RUN: Would create ${results.created} user docs`
                : `Created ${results.created} user docs`,
        });
    } catch (error: any) {
        console.error("Sync failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
