import StatisticsClient from './StatisticsClient';

export const metadata = {
    title: "Thai Lottery Statistics & Frequency Analysis (EAV Model)",
    description: "Advanced statistical analysis of Thai Lottery results. View digit frequency matrices, hot/cold number attributes, and historical probability models.",
    keywords: "thai lottery statistics, 3-up frequency, lottery heatmap, digit probability, past draw analysis",
    openGraph: {
        title: "The Science of Luck: Lottery Data Analysis",
        description: "Uncovering patterns with Entity-Attribute-Value models.",
        type: "article",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/thai-lottery-statistics`,
    }
};

export default function StatisticsPage() {
    return <StatisticsClient />;
}
