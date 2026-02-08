import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Force dynamic rendering (don't pre-render at build time)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Lazy Firebase Admin initialization with build-time safety
function initFirebaseAdmin() {
    if (!admin.apps.length) {
        // Skip initialization during build if env vars missing
        if (!process.env.FIREBASE_PROJECT_ID) {
            console.warn('Firebase Admin not initialized - missing credentials');
            return null;
        }
        
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            }),
        });
    }
    return admin;
}

export async function POST(request: NextRequest) {
    const firebaseAdmin = initFirebaseAdmin();
    
    if (!firebaseAdmin) {
        return NextResponse.json(
            { error: 'Firebase Admin not configured' },
            { status: 500 }
        );
    }
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'E-post mangler' },
                { status: 400 }
            );
        }

        const results = {
            authDeleted: false,
            firestoreDeleted: false,
            familyDeleted: false,
            betaInterestDeleted: false,
            errors: [] as string[],
        };

        let userId: string | null = null;

        // 1. Delete from Firebase Auth
        try {
            const user = await firebaseAdmin.auth().getUserByEmail(email);
            userId = user.uid;
            await firebaseAdmin.auth().deleteUser(user.uid);
            results.authDeleted = true;
        } catch (e: any) {
            if (e.code !== 'auth/user-not-found') {
                results.errors.push(`Auth error: ${e.message}`);
            }
        }

        // 2. Delete from Firestore users
        const userSnapshot = await firebaseAdmin
            .firestore()
            .collection('users')
            .where('email', '==', email.toLowerCase())
            .get();

        let familyId: string | null = null;

        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            familyId = userData.familyId || null;

            const batch = firebaseAdmin.firestore().batch();
            userSnapshot.forEach((d) => batch.delete(d.ref));
            await batch.commit();
            results.firestoreDeleted = true;
        }

        // 3. Delete family if user was owner and only member
        if (familyId && userId) {
            try {
                const familyDoc = await firebaseAdmin
                    .firestore()
                    .collection('families')
                    .doc(familyId)
                    .get();

                if (familyDoc.exists) {
                    const familyData = familyDoc.data();
                    if (
                        familyData?.ownerId === userId &&
                        familyData?.members?.length <= 1
                    ) {
                        await firebaseAdmin
                            .firestore()
                            .collection('families')
                            .doc(familyId)
                            .delete();
                        results.familyDeleted = true;
                    }
                }
            } catch (e: any) {
                results.errors.push(`Family deletion error: ${e.message}`);
            }
        }

        // 4. Delete from beta_interest
        const betaSnapshot = await firebaseAdmin
            .firestore()
            .collection('beta_interest')
            .where('email', '==', email.toLowerCase())
            .get();

        if (!betaSnapshot.empty) {
            const batch = firebaseAdmin.firestore().batch();
            betaSnapshot.forEach((d) => batch.delete(d.ref));
            await batch.commit();
            results.betaInterestDeleted = true;
        }

        return NextResponse.json(results, { status: 200 });
    } catch (error: any) {
        console.error('Delete user error:', error);
        return NextResponse.json(
            { error: error.message || 'Server error' },
            { status: 500 }
        );
    }
}
