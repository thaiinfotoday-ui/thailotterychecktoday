import KnowledgeClient from './KnowledgeClient';

export default function KnowledgePage() {
    return <KnowledgeClient />;
}

export const metadata = {
    title: "Thai Lottery Glossary & Knowledge Base - Entity Definitions",
    description: "A comprehensive semantic wiki defining Thai Lottery terms, rules, and entity relationships. Understand 3-Up, 2-Down, and GLO structure.",
    keywords: "thai lottery wiki, 3-up definition, 2-down meaning, lottery glossary, glo entity",
    openGraph: {
        title: "Thai Lottery Knowledge Graph",
        description: "Semantic definitions of Thai Lottery entities.",
        type: "article",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/knowledge`,
    }
};
