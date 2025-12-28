import { NextResponse } from 'next/server';
import { getLotteryData } from '@/lib/lotteryService';

export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Simple security check (use environment variable in production)
        const authHeader = request.headers.get('authorization');
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('[CRON] Starting scheduled update...');

        // Force refresh the data
        const data = await getLotteryData(true);

        console.log('[CRON] Success:', data.source);

        return NextResponse.json({
            success: true,
            message: 'Data updated successfully',
            timestamp: new Date().toISOString(),
            source: data.source
        });

    } catch (error) {
        console.error('[CRON] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
