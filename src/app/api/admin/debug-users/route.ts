import { NextRequest, NextResponse } from "next/server";
import * as admin from "firebase-admin";

function initFirebaseAdmin() {
    if (admin.apps.length === 0) {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

        if (!projectId || !clientEmail || !privateKey) {
            throw new Error("Missing Firebase Admin env vars");
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey,
            }),
        });
    }
    return admin.firestore();
}

const ADMIN_EMAILS = ["kjibba@gmail.com"];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const adminEmail = searchParams.get("adminEmail");
    
    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    try {
        const db = initFirebaseAdmin();
        const usersSnapshot = await db.collection("users").get();
        
        const users = usersSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                email: data.email,
                displayName: data.displayName,
                hasCreatedAt: !!data.createdAt,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
                familyId: data.familyId,
                hasJourney: !!data.journey,
            };
        });
        
        // Sort by createdAt (nulls last)
        users.sort((a, b) => {
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        return NextResponse.json({
            success: true,
            total: users.length,
            withCreatedAt: users.filter(u => u.hasCreatedAt).length,
            withoutCreatedAt: users.filter(u => !u.hasCreatedAt).length,
            users
        });
    } catch (error: any) {
        return NextResponse.json({ 
            error: error.message 
        }, { status: 500 });
    }
}
