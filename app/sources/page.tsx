import SourceComparisonClient from './SourceComparisonClient';

export const metadata = {
    title: "Thai Lottery Source Comparison: Thai Rath vs Mae Jamnian vs Daily News",
    description: "In-depth analysis of Thailand's top lottery formula sources. We compare accuracy, 3-Up performance, and statistical reliability of Thai Rath, Daily News, and Mae Jamnian.",
    keywords: "thai rath vs daily news lottery, mae jamnian accuracy, best lottery formula 2025, thai lottery source review, 3-up prediction comparison",
    openGraph: {
        title: "Battle of the Sources: Who Predicts Best?",
        description: "Statistical comparison of Thai Lottery giants.",
        type: "article",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/sources`,
    }
};

export default function SourceComparisonPage() {
    return <SourceComparisonClient />;
}
