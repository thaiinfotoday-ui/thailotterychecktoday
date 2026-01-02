import { getHistoryData } from '@/lib/historyData';
import HistoryClient from '../history/HistoryClient';

export const metadata = {
    title: "ตรวจหวยย้อนหลัง - ผลหวยย้อนหลัง สลากย้อนหลัง | Lottery Archive",
    description: "ตรวจหวยย้อนหลัง ผลหวยย้อนหลัง ผลสลากกินแบ่งรัฐบาลย้อนหลัง สลากย้อนหลัง หวยงวดที่แล้ว ตรวจหวยย้อนหลัง 10 ปี Complete archive of past Thai Lottery results with search and filter options.",
    keywords: "ตรวจหวยย้อนหลัง, ผลหวยย้อนหลัง, สลากย้อนหลัง, ผลสลากกินแบ่งรัฐบาลย้อนหลัง, หวยงวดที่แล้ว, ตรวจหวยย้อนหลัง 10 ปี, ตรวจหวยย้อนหลัง 5 ปี, lottery archive, past results",
    openGraph: {
        title: "ตรวจหวยย้อนหลัง - ผลหวยย้อนหลัง สลากย้อนหลัง",
        description: "ตรวจหวยย้อนหลัง ผลหวยย้อนหลัง ผลสลากกินแบ่งรัฐบาลย้อนหลัง สลากย้อนหลัง หวยงวดที่แล้ว",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "ตรวจหวยย้อนหลัง - Lottery Archive",
        description: "ตรวจหวยย้อนหลัง ผลหวยย้อนหลัง สลากย้อนหลัง",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/archive`,
    },
};

// ISR: Cache for 5 minutes
export const revalidate = 300;

export default async function ArchivePage({ searchParams }: { searchParams: Promise<{ year?: string; page?: string }> }) {
    // Await searchParams before using its properties
    const params = await searchParams;
    const year = params?.year || null;
    const page = parseInt(params?.page || '1');

    const { results, pagination } = await getHistoryData(year, page);

    return <HistoryClient results={results} pagination={pagination} currentYear={year} />;
}
