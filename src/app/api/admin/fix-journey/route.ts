import { NextRequest, NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { fixJourneyConsistency, verifyJourneyConsistency } from "@/lib/migrations/fix-journey-consistency";

// Firebase config (same as admin layout)
const firebaseConfig = {
    apiKey: "AIzaSyAW6ksZsDokqRAIpczXI030u_esWHOVe0Q",
    authDomain: "listo-6443c.firebaseapp.com",
    projectId: "listo-6443c",
    storageBucket: "listo-6443c.firebasestorage.app",
    messagingSenderId: "616905600919",
    appId: "1:616905600919:web:d5e5c9f8a7b6c4d3e2f1a0",
};

const app = initializeApp(firebaseConfig, "migration-app");
const db = getFirestore(app);

const ADMIN_EMAILS = ["kjibba@gmail.com"];

/**
 * POST /api/admin/fix-journey
 * 
 * Body: 
 * {
 *   "adminEmail": "kjibba@gmail.com",
 *   "action": "fix" | "verify" | "dry-run"
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const { adminEmail, action = "dry-run" } = await request.json();
        
        // Verify admin
        if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
        
        console.log(`🔐 Admin ${adminEmail} triggered journey migration: ${action}`);
        
        if (action === "verify") {
            // Just check consistency without fixing
            const result = await verifyJourneyConsistency(db);
            
            return NextResponse.json({
                success: true,
                action: "verify",
                result,
                message: `Found ${result.inconsistent} users with journey inconsistencies`
            });
        } else {
            // Fix (or dry-run)
            const dryRun = action === "dry-run";
            const result = await fixJourneyConsistency(db, dryRun);
            
            return NextResponse.json({
                success: true,
                action: dryRun ? "dry-run" : "fix",
                result,
                message: dryRun 
                    ? `DRY RUN: Would fix ${result.fixedFamily + result.fixedOnboarding + result.fixedMultiple} issues`
                    : `Fixed ${result.fixedFamily + result.fixedOnboarding + result.fixedMultiple} issues`
            });
        }
    } catch (error: any) {
        console.error("❌ Migration failed:", error);
        return NextResponse.json({ 
            error: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
}

/**
 * GET /api/admin/fix-journey
 * 
 * Returns current migration status
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const adminEmail = searchParams.get("adminEmail");
    
    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    try {
        const result = await verifyJourneyConsistency(db);
        
        return NextResponse.json({
            success: true,
            result,
            needsMigration: result.inconsistent > 0
        });
    } catch (error: any) {
        return NextResponse.json({ 
            error: error.message 
        }, { status: 500 });
    }
}
