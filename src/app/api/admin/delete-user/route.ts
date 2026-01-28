import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin (idempotent)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        }),
    });
}

export async function POST(request: NextRequest) {
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
            const user = await admin.auth().getUserByEmail(email);
            userId = user.uid;
            await admin.auth().deleteUser(user.uid);
            results.authDeleted = true;
        } catch (e: any) {
            if (e.code !== 'auth/user-not-found') {
                results.errors.push(`Auth error: ${e.message}`);
            }
        }

        // 2. Delete from Firestore users
        const userSnapshot = await admin
            .firestore()
            .collection('users')
            .where('email', '==', email.toLowerCase())
            .get();

        let familyId: string | null = null;

        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            familyId = userData.familyId || null;

            const batch = admin.firestore().batch();
            userSnapshot.forEach((d) => batch.delete(d.ref));
            await batch.commit();
            results.firestoreDeleted = true;
        }

        // 3. Delete family if user was owner and only member
        if (familyId && userId) {
            try {
                const familyDoc = await admin
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
                        await admin
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
        const betaSnapshot = await admin
            .firestore()
            .collection('beta_interest')
            .where('email', '==', email.toLowerCase())
            .get();

        if (!betaSnapshot.empty) {
            const batch = admin.firestore().batch();
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
