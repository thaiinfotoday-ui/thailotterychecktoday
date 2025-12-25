import FAQClient from './FAQClient';

export const metadata = {
    title: "Thai Lottery FAQ - Frequently Asked Questions",
    description: "Frequently asked questions about Thai Lottery results, draws, prizes, and how to check numbers. Complete guide and answers.",
    keywords: "thai lottery faq, lottery questions, how to check lottery, lottery results guide",
    openGraph: {
        title: "Thai Lottery FAQ - Frequently Asked Questions",
        description: "Complete FAQ about Thai Lottery results and checking",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Thai Lottery FAQ",
        description: "Frequently asked questions about Thai Lottery",
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function FAQPage() {
    return <FAQClient />;
}

