import { notFound } from 'next/navigation';
import HistoryDetailClient from './HistoryDetailClient';

// --- MOCK DATA FUNCTION ---
// In a real app, this would query your DB or an API by date.
async function getDrawByDate(date) {
    // Simulate DB Delay
    await new Promise(r => setTimeout(r, 50));

    // For demo, we just return a static object if the date structure is valid "YYYY-MM-DD"
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

    return {
        date: date,
        first: "763895",
        last2: "52",
        front3: ["431", "176"],
        back3: ["014", "449"],
        nearFirst: ["763894", "763896"], // Neighbors
        secondPrize: ["123456", "234567", "345678", "456789", "567890"], // usually 5
    };
}

// --- SEO METADATA ---
export async function generateMetadata({ params }) {
    const { date } = await params;
    return {
        title: `Thai Lottery Results ${date} - Winning Numbers`,
        description: `Official Thai Lottery winning numbers for the draw on ${date}. Check First Prize, Last 2 Digits, and full prize breakdown safely.`,
    };
}

// --- COMPONENT ---
export default async function DrawDetailPage({ params }) {
    const { date } = await params;
    const data = await getDrawByDate(date);

    if (!data) notFound();

    return <HistoryDetailClient data={data} />;
}
