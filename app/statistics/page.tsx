import { getHistoryData } from '@/lib/historyData';
import StatisticsClient from './StatisticsClient';

export const metadata = {
    title: "สถิติหวย - วิเคราะห์หวย สถิติหวยย้อนหลัง | Thai Lottery Statistics 2025",
    description: "สถิติหวย วิเคราะห์หวย สถิติหวยย้อนหลัง เลขที่ออก หวยชัวร์ 100 In-depth statistical analysis of Thai Lottery results, number frequency, patterns, and trends.",
    keywords: "สถิติหวย, วิเคราะห์หวย, สถิติหวยย้อนหลัง, สถิติหวยรัฐย้อนหลัง, เลขที่ออก, หวยชัวร์ 100, thai lottery statistics, numbers frequency, lottery analysis",
    openGraph: {
        title: "สถิติหวย - วิเคราะห์หวย สถิติหวยย้อนหลัง",
        description: "สถิติหวย วิเคราะห์หวย สถิติหวยย้อนหลัง เลขที่ออก วิเคราะห์เลขเด็ด",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/statistics`,
    },
};

// ISR: Cache for 5 minutes
export const revalidate = 300;

export default async function StatisticsPage() {
    const allData = await getHistoryData(null, 1);

    return <StatisticsClient initialData={allData.results} />;
}
