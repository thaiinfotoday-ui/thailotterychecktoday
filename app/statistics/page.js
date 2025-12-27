import { getHistoryData } from '@/lib/historyData';
import StatisticsClient from './StatisticsClient';

export const metadata = {
    title: "Thai Lottery Statistics & Analysis 2025 | Past Results Patterns",
    description: "In-depth statistical analysis of Thai Lottery results. View frequency of numbers, patterns, and historical data trends.",
    keywords: "thai lottery statistics, numbers frequency, lottery analysis, past results patterns",
    openGraph: {
        title: "Thai Lottery Statistics & Analysis",
        description: "Analyze historical Thai Lottery results and number patterns.",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    }
};

// ISR: Cache for 5 minutes
export const revalidate = 300;

export default async function StatisticsPage() {
    const allData = await getHistoryData(null, 1);

    return <StatisticsClient initialData={allData.results} />;
}
