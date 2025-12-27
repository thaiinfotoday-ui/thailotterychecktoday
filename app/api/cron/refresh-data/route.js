import { NextResponse } from 'next/server';
import { getLotteryData } from '@/lib/lotteryService';

// CRON job endpoint to refresh data in background
// Call this every 30 minutes via Vercel Cron or external service
export async function GET(request) {
    // Verify cron secret (security)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Force refresh from external sources
        const data = await getLotteryData(true);

        return NextResponse.json({
            success: true,
            data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
