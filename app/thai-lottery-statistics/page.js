import { getHistoryData } from '@/lib/historyData';
import StatisticsClient from './StatisticsClient';

export const metadata = {
    title: "Thai Lottery Statistics - Historical Data Analysis 2025",
    description: "Comprehensive statistics and historical analysis of Thai Lottery results. Most common numbers, patterns, and trends (informational only).",
    keywords: "thai lottery statistics, lottery analysis, number patterns, historical data, most common numbers",
    openGraph: {
        title: "Thai Lottery Statistics & Historical Analysis",
        description: "Statistical analysis of Thai Lottery historical results",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Thai Lottery Statistics",
        description: "Historical statistics and analysis of Thai Lottery",
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default async function StatisticsPage() {
    const allData = await getHistoryData(null, 1);
    
    return <StatisticsClient initialData={allData.results} />;
}

