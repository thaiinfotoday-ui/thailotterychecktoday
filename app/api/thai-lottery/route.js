import { NextResponse } from 'next/server';
import { getLotteryData } from '@/lib/lotteryService';

// Use Next.js caching with revalidation
// This allows Next.js to cache responses while still allowing manual refresh
export const revalidate = 3600; // Revalidate at most once per hour (but cache is 24h in service)

export async function GET() {
    try {
        const data = await getLotteryData();
        
        // Always return 200 with data (even if stale)
        // Frontend can check the 'stale' flag
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
            }
        });
    } catch (error) {
        // Last resort: return error but try to serve any cached data
        console.error('[API] Critical error:', error);
        
        return NextResponse.json(
            { 
                error: "Service unavailable", 
                message: "Unable to fetch lottery results. Please try again later.",
                stale: true
            },
            { 
                status: 503,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
}
