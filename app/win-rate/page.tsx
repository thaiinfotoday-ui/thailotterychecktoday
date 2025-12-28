import WinRateClient from './WinRateClient';

export const metadata = {
    title: "Thai Lottery Win Rate Calculator: Signal Consolidation Tool",
    description: "Calculate your winning probability. Our Algo 2.0 consolidates historical signals, freshness metrics, and frequency circles to predict lottery outcomes.",
    keywords: "win rate calculator, thai lottery probability, signal consolidation, lottery algorithm 2025, lucky number check",
    openGraph: {
        title: "Calculate Your Luck: Win Rate Signal Tool",
        description: "Advanced probability signals for the modern player.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/win-rate`,
    }
};

export default function WinRatePage() {
    return <WinRateClient />;
}
