import { notFound } from 'next/navigation';
import HistoryDetailClient from './HistoryDetailClient';
import { getDrawByDate } from '@/lib/lotteryService';

// ISR: Cache historical results for 24 hours (they don't change)
export const revalidate = 86400;

// --- DATA FETCHING ---
async function fetchDrawData(date: string) {
    const data = await getDrawByDate(date);
    if (!data) return null;

    // Enrich with computed fields if missing
    // Calculate near first (neighbors)
    const firstNum = parseInt(data.first);
    const nearFirst = [
        String(firstNum - 1).padStart(6, '0'),
        String(firstNum + 1).padStart(6, '0')
    ];

    return {
        ...data,
        nearFirst: nearFirst,
        // Mock secondary prizes if not in DB (UI requirement)
        secondPrize: ["--", "--", "--", "--", "--"],
    };
}

// --- SEO METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
    const { date } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com';
    return {
        title: `Thai Lottery Results ${date} - Winning Numbers`,
        description: `Official Thai Lottery winning numbers for the draw on ${date}. Check First Prize, Last 2 Digits, and full prize breakdown safely.`,
        alternates: {
            canonical: `${baseUrl}/history/${date}`,
        },
    };
}

// --- COMPONENT ---
export default async function DrawDetailPage({ params }: { params: Promise<{ date: string }> }) {
    const { date } = await params;
    const data = await fetchDrawData(date);

    if (!data) notFound();

    return <HistoryDetailClient data={data} />;
}
