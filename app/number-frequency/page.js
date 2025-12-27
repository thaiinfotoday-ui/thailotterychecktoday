import { getHistoryData } from '@/lib/historyData';
import NumberFrequencyClient from './NumberFrequencyClient';

export const metadata = {
    title: "Thai Lottery Number Frequency - Historical Analysis",
    description: "Check how often specific numbers have appeared in Thai Lottery history. Informational analysis of past draw results.",
    keywords: "thai lottery frequency, number frequency, lottery statistics, historical analysis",
    openGraph: {
        title: "Thai Lottery Number Frequency Analysis",
        description: "Historical frequency analysis of Thai Lottery numbers",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Thai Lottery Number Frequency",
        description: "Check number frequency in Thai Lottery history",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/number-frequency`,
    },
};

// ISR: Cache for 5 minutes  
export const revalidate = 300;

export default async function NumberFrequencyPage() {
    // Get all history data for analysis
    const allData = await getHistoryData(null, 1);

    return <NumberFrequencyClient initialData={allData.results} />;
}

