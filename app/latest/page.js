import { getLotteryData } from '@/lib/lotteryService';
import LatestClient from './LatestClient';
import LotterySchema from '@/app/components/LotterySchema'; // Import Schema

export const metadata = {
    title: "Latest Thai Lottery Result - Live Draw Update",
    description: "Check the very latest Thai Lottery draw results instantly. Real-time updates for First Prize, 3 Digits, and 2 Digits.",
    keywords: "latest thai lottery, live lottery results, thai lottery today, current draw results",
    openGraph: {
        title: "Latest Thai Lottery Result - Live Draw Update",
        description: "Real-time Thai Lottery draw results with First Prize, 3 Digits, and 2 Digits",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Latest Thai Lottery Results",
        description: "Real-time updates for Thai Lottery draw results",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/latest`,
    },
};

// ISR: Revalidate every 60 seconds (fresh on draw days)
export const revalidate = 60;

export default async function LatestDrawPage() {
    let data = null;
    let error = null;

    try {
        // Fetch LIVE data
        data = await getLotteryData();
    } catch (e) {
        error = "Unable to fetch live results. Please try again later.";
    }

    return (
        <>
            {data && <LotterySchema data={data} />}
            <LatestClient data={data} error={error} />
        </>
    );
}
