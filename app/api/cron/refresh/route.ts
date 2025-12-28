import { NextResponse } from 'next/server';
import { getLotteryData } from '@/lib/lotteryService';

// Vercel Cron Job Handler
export async function GET(req) {
    // Verify Vercel Cron Secret (Security Best Practice)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Allow running without auth in development for testing
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    try {
        console.log('[CRON] Starting lottery data refresh...');
        const data = await getLotteryData(true); // Force Refresh
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('[CRON] Failed to refresh data:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
