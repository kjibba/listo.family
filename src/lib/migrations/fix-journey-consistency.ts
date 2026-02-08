/**
 * Data migration: Fix journey inconsistencies
 * 
 * Purpose: Sync journey tracking fields with actual user state
 * 
 * Fixes:
 * 1. Users with familyId but no journey.familyCreatedAt/familyJoinedAt
 * 2. Users with onboarding.isComplete but no journey.onboardingCompletedAt
 * 3. Null/undefined journey fields that should exist
 * 
 * Safe to run multiple times (idempotent)
 */

import { Firestore, collection, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";

export interface MigrationResult {
    totalUsers: number;
    fixedFamily: number;
    fixedOnboarding: number;
    fixedMultiple: number;
    errors: number;
    errorDetails: Array<{userId: string, error: string}>;
}

/**
 * Fix journey consistency across all users
 * 
 * @param db - Firestore instance from admin layout
 * @param dryRun - If true, only log what would be fixed without making changes
 */
export async function fixJourneyConsistency(
    db: Firestore,
    dryRun: boolean = false
): Promise<MigrationResult> {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    
    const result: MigrationResult = {
        totalUsers: snapshot.size,
        fixedFamily: 0,
        fixedOnboarding: 0,
        fixedMultiple: 0,
        errors: 0,
        errorDetails: [],
    };
    
    console.log(`\n🔍 Starting journey consistency check (${dryRun ? 'DRY RUN' : 'LIVE'})`);
    console.log(`📊 Total users to check: ${result.totalUsers}\n`);
    
    for (const userDoc of snapshot.docs) {
        const data = userDoc.data();
        const userId = userDoc.id;
        const updateData: any = {};
        const issues: string[] = [];
        
        // Issue 1: familyId without journey tracking
        if (data.familyId && !data.journey?.familyCreatedAt && !data.journey?.familyJoinedAt) {
            // Use joinedAt if available, otherwise createdAt
            const timestamp = data.joinedAt || data.createdAt;
            updateData["journey.familyCreatedAt"] = timestamp;
            issues.push(`Family (${data.familyName})` );
            result.fixedFamily++;
        }
        
        // Issue 2: onboarding.isComplete without journey tracking
        if (data.onboarding?.isComplete && !data.journey?.onboardingCompletedAt) {
            const timestamp = data.onboarding.completedAt || data.createdAt;
            updateData["journey.onboardingCompletedAt"] = timestamp;
            updateData["journey.onboardingSkipped"] = false;
            issues.push('Onboarding');
            result.fixedOnboarding++;
        }
        
        // Issue 3: Ensure journey object exists
        if (!data.journey) {
            updateData.journey = {
                betaInterestId: null,
                betaInterestAt: null,
                source: "app_direct",
                registeredAt: data.createdAt,
                registrationSource: "web",
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
            };
            issues.push('Journey object missing');
            result.fixedMultiple++;
        }
        
        // Apply updates
        if (Object.keys(updateData).length > 0) {
            const email = data.email || userDoc.id;
            const issueText = issues.join(', ');
            
            if (dryRun) {
                console.log(`🔧 [DRY RUN] Would fix: ${email} - Issues: ${issueText}`);
            } else {
                try {
                    await updateDoc(doc(db, "users", userId), updateData);
                    console.log(`✅ Fixed: ${email} - Issues: ${issueText}`);
                } catch (error: any) {
                    result.errors++;
                    const errorMsg = error.message || String(error);
                    result.errorDetails.push({ userId, error: errorMsg });
                    console.error(`❌ Failed to fix ${email}:`, errorMsg);
                }
            }
        }
    }
    
    // Summary
    console.log(`\n\n📊 Migration Summary:`);
    console.log(`════════════════════════════════════════`);
    console.log(`Total users checked:      ${result.totalUsers}`);
    console.log(`Family issues fixed:      ${result.fixedFamily}`);
    console.log(`Onboarding issues fixed:  ${result.fixedOnboarding}`);
    console.log(`Multiple issues fixed:    ${result.fixedMultiple}`);
    console.log(`Errors:                   ${result.errors}`);
    
    if (result.errors > 0) {
        console.log(`\n❌ Errors encountered:`);
        result.errorDetails.forEach(({ userId, error }) => {
            console.log(`  - ${userId}: ${error}`);
        });
    }
    
    if (dryRun) {
        console.log(`\n⚠️  This was a DRY RUN. No changes were made.`);
        console.log(`Run with dryRun=false to apply fixes.`);
    } else {
        console.log(`\n✅ Migration complete!`);
    }
    
    return result;
}

/**
 * Verify that all users now have consistent journey data
 */
export async function verifyJourneyConsistency(db: Firestore): Promise<{
    consistent: number;
    inconsistent: number;
    issues: Array<{userId: string, email: string, problem: string}>;
}> {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    
    const result = {
        consistent: 0,
        inconsistent: 0,
        issues: [] as Array<{userId: string, email: string, problem: string}>,
    };
    
    for (const userDoc of snapshot.docs) {
        const data = userDoc.data();
        const userId = userDoc.id;
        const email = data.email || userId;
        let hasIssue = false;
        
        // Check family consistency
        if (data.familyId && !data.journey?.familyCreatedAt && !data.journey?.familyJoinedAt) {
            result.issues.push({
                userId,
                email,
                problem: `Has familyId (${data.familyId}) but no journey tracking`
            });
            hasIssue = true;
        }
        
        // Check onboarding consistency
        if (data.onboarding?.isComplete && !data.journey?.onboardingCompletedAt) {
            result.issues.push({
                userId,
                email,
                problem: 'Onboarding complete but no journey.onboardingCompletedAt'
            });
            hasIssue = true;
        }
        
        // Check journey object exists
        if (!data.journey) {
            result.issues.push({
                userId,
                email,
                problem: 'Missing journey object entirely'
            });
            hasIssue = true;
        }
        
        if (hasIssue) {
            result.inconsistent++;
        } else {
            result.consistent++;
        }
    }
    
    return result;
}
