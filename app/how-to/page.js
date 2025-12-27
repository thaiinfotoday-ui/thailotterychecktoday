import HowToClient from './HowToClient';

export const metadata = {
    title: "Thai Lottery Prize Structure & Claiming Guide (Official Rules)",
    description: "Complete guide to Thai Lottery prizes. View the prize matrix (First Prize to 2-Down), calculate odds, and learn the step-by-step claiming process at GLO.",
    keywords: "thai lottery prize structure, claim lottery winnings, lottery tax thailand, glo office location, lottery rules",
    openGraph: {
        title: "Thai Lottery Official Handbook",
        description: "Rules, Prizes, and Claiming Guide.",
        type: "article",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/how-to`,
    }
};

export default function HowToPage() {
    return <HowToClient />;
}
