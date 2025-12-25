import { NextResponse } from 'next/server';
import { getLotteryData } from '@/lib/lotteryService';

/**
 * Secure cron endpoint for refreshing lottery data
 * 
 * Protection:
 * - Requires CRON_SECRET environment variable
 * - Can be called by Vercel Cron Jobs or external cron services
 * 
 * Usage:
 * - Vercel: Add to vercel.json cron jobs
 * - External: Call with ?secret=YOUR_SECRET
 */
export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        // Vercel Cron Jobs send a special Authorization header
        // For external cron services, use CRON_SECRET env var
        const authHeader = request.headers.get('authorization');
        const { searchParams } = new URL(request.url);
        const secretParam = searchParams.get('secret');
        
        const expectedSecret = process.env.CRON_SECRET;
        
        // If CRON_SECRET is set, require authentication
        if (expectedSecret) {
            // Check Authorization header (Bearer token)
            const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
            // Check query parameter (for external cron services)
            const secret = bearerToken || secretParam;
            
            if (secret !== expectedSecret) {
                // Allow Vercel's internal cron (no auth header means Vercel cron)
                // But if secret param is provided and wrong, reject
                if (secretParam && secretParam !== expectedSecret) {
                    console.warn('[CRON] Unauthorized cron attempt with wrong secret');
                    return NextResponse.json(
                        { error: 'Unauthorized' },
                        { status: 401 }
                    );
                }
                // If no secret provided and CRON_SECRET is set, require it for external calls
                // Vercel cron jobs will work without it, but external services need the secret
            }
        } else {
            // If CRON_SECRET not set, log warning but allow (for development)
            console.warn('[CRON] CRON_SECRET not set - endpoint is unprotected. Set CRON_SECRET in production!');
        }

        // Force refresh the cache
        console.log('[CRON] Starting forced refresh of lottery data...');
        const startTime = Date.now();
        
        const data = await getLotteryData(true); // forceRefresh = true
        
        const duration = Date.now() - startTime;
        console.log(`[CRON] Refresh completed in ${duration}ms`, {
            source: data.source,
            date: data.date,
            stale: data.stale || false
        });

        return NextResponse.json({
            success: true,
            message: 'Cache refreshed successfully',
            data: {
                source: data.source,
                date: data.date,
                stale: data.stale || false
            },
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        }, {
            status: 200
        });

    } catch (error) {
        console.error('[CRON] Error during refresh:', error);
        
        return NextResponse.json({
            success: false,
            error: 'Failed to refresh cache',
            message: error.message,
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}

// Also support POST for cron services that prefer POST
export async function POST(request) {
    return GET(request);
}

