import CheckClient from './CheckClient';

export const metadata = {
    title: "Thai Lottery Check Tool - Verify Winning Numbers (All Prizes)",
    description: "Official Thai Lottery inspection tool. Scan your 6-digit ticket against all prize categories including First Prize, 3-Up, and 2-Down. Instant verification.",
    keywords: "check thai lottery, verify lottery ticket, lottery scanner tool, check winning number, glo result checker",
    openGraph: {
        title: "Smart Thai Lottery Inspector Tool",
        description: "Verify tickets against official GLO database.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/check`,
    }
};

export default function CheckPage() {
    return <CheckClient />;
}
