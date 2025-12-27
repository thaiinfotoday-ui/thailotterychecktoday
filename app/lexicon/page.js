import LexiconClient from './LexiconClient';

export const metadata = {
    title: "Thai Lottery Phrase Taxonomies: Lexical Relations & Context",
    description: "Semantic analysis of Thai Lottery vocabulary. Exploring lexical relations, phrase taxonomies, and contextual themes (Economic, Cultural, Technical).",
    keywords: "thai lottery lexicon, lexical relations, phrase taxonomies, lottery vocabulary, semantic field",
    openGraph: {
        title: "Lottery Context Map",
        description: "Defining the semantic field of luck.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/lexicon`,
    }
};

export default function LexiconPage() {
    return <LexiconClient />;
}
