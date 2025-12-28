import ActionsClient from './ActionsClient';

export const metadata = {
    title: "Thai Lottery Actions: Check, Claim, Analyze (Frame Semantics)",
    description: "Navigate the Thai Lottery ecosystem through key actions. Check results, claim prizes, and analyze trends using our predicate-based semantic map.",
    keywords: "check lottery, claim lottery prize, analyze lottery stats, lottery actions, semantic guide",
    openGraph: {
        title: "Action-Based Lottery Guide",
        description: "Understanding the verbs of the game.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/actions`,
    }
};

export default function ActionsPage() {
    return <ActionsClient />;
}
