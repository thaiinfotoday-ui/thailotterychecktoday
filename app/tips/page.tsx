import TipsClient from './TipsClient';

export const metadata = {
    title: "Thai Lottery Tips Papers 2025 - Lucky Numbers & 3up Formulas",
    description: "Get the latest Bangkok Weekly lottery tips, Thai Rath winning numbers, and VIP lucky number formulas for 2025. Calculate your personal lucky number.",
    keywords: "thai lottery tips, bangkok weekly, thai lottery paper, lucky numbers 2025, 3up tips, vip lottery numbers",
    openGraph: {
        title: "Thai Lottery VIP Tips & Formulas 2025",
        description: "Bangkok Weekly Papers and Lucky Number Calculator",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/tips`,
    }
};

export default function TipsPage() {
    return <TipsClient />;
}
