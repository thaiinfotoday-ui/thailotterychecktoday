import { getHistoryData } from '@/lib/historyData';
import HistoryClient from './HistoryClient';

export const metadata = {
    title: "ตรวจหวยย้อนหลัง - ผลสลากกินแบ่งรัฐบาลย้อนหลัง | Thai Lottery History",
    description: "ตรวจหวยย้อนหลัง ผลสลากกินแบ่งรัฐบาลย้อนหลัง สถิติหวย หวยงวดที่แล้ว Browse complete Thai Lottery history, past results, and historical data. Filter by year and date.",
    keywords: "ตรวจหวยย้อนหลัง, หวยย้อนหลัง, ผลสลากกินแบ่งรัฐบาลย้อนหลัง, สถิติหวยย้อนหลัง, หวยงวดที่แล้ว, สลากย้อนหลัง, thai lottery history, past lottery results, lottery archive",
    openGraph: {
        title: "ตรวจหวยย้อนหลัง - ผลสลากกินแบ่งรัฐบาลย้อนหลัง",
        description: "ตรวจหวยย้อนหลัง ผลสลากกินแบ่งรัฐบาลย้อนหลัง สถิติหวย หวยงวดที่แล้ว ข้อมูลครบถ้วน",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "ตรวจหวยย้อนหลัง - Thai Lottery History",
        description: "ตรวจหวยย้อนหลัง ผลสลากกินแบ่งรัฐบาลย้อนหลัง สถิติหวย",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/history`,
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
