import ZodiacClient from './ZodiacClient';

export const metadata = {
    title: "Thai Lottery Lucky Numbers by Zodiac Sign (2025)",
    description: "Find your lucky lotus numbers based on your Zodiac sign. Pisces, Aries, Leo, and more - discover the digits aligned with your stars for the next draw.",
    keywords: "thai lottery zodiac, lucky numbers horoscope, lottery astrology, capricorn lucky number, leo lottery prediction",
    openGraph: {
        title: "Zodiac Lottery Insights",
        description: "Cosmic digits for your next ticket.",
        type: "article",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/zodiac`,
    }
};

export default function ZodiacPage() {
    return <ZodiacClient />;
}
