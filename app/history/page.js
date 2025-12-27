import { getHistoryData } from '@/lib/historyData';
import HistoryClient from './HistoryClient';

export const metadata = {
    title: "Thai Lottery Results History - Past Draw Archive",
    description: "Browse the complete history of Thai Lottery results. Filter by year and date to check past winning numbers.",
    keywords: "thai lottery history, past lottery results, lottery archive, historical draws",
    openGraph: {
        title: "Thai Lottery Results History - Past Draw Archive",
        description: "Complete archive of Thai Lottery historical results",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Thai Lottery History",
        description: "Browse past Thai Lottery results",
    },
    robots: {
        index: true,
        follow: true,
    },
};

// ISR: Cache for 5 minutes
export const revalidate = 300;

export default async function HistoryPage({ searchParams }) {
    // Await searchParams before using its properties
    const params = await searchParams;
    const year = params?.year || null;
    const page = parseInt(params?.page || '1');

    const { results, pagination } = await getHistoryData(year, page);

    return <HistoryClient results={results} pagination={pagination} currentYear={year} />;
}
