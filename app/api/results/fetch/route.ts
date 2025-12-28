import { NextResponse } from 'next/server';
import { fetchMyanThaiResults } from '@/lib/myanthaiParser';

export const dynamic = 'force-dynamic'; // Always fetch fresh
export const revalidate = 0;

export async function GET() {
    try {
        const data = await fetchMyanThaiResults();

        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0'
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch results", details: error.message },
            { status: 502 }
        );
    }
}
