'use client';

import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Tag, Hash, GitCommit } from 'lucide-react';
import CollectionSchema from '../components/schema/CollectionSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function KnowledgeClient() {
    const { lang } = useLanguage();

    // Semantic Knowledge Graph Data
    // Building "Dense" definitions as per Koray's Entity Identity Strategy
    // Updated to reflect "Contextual Borders" - strictly defining what belongs in the Lottery Domain.
    const entities = [
        {
            id: "first-prize",
            term: "First Prize (รางวัลที่ 1)",
            type: "Prize Category",
            definition: "The primary winning number consisting of a specific 6-digit sequence drawn by the GLO. It represents the highest payout tier.",
            attributes: { "Probability": "1 in 1,000,000", "Payout": "6,000,000 THB", "Structure": "6 Digits" },
            relationship: "Determines the '3-Up' and '2-Up' suffix values."
        },
        {
            id: "3-up",
            term: "3-Up (Sam Tua Bon)",
            type: "Betting Term",
            definition: "A colloquial term used in Underground Lottery (Huay Tai Din) referring to the last three digits of the official First Prize. It is one of the most popular betting formats.",
            attributes: { "Source": "First Prize Suffix", "Cultural Relevance": "High", "Variation": "Teng (Direct) / Tod (Permutation)" },
            relationship: "Derived from Property: 'First Prize'"
        },
        {
            id: "2-down",
            term: "2-Down (Song Tua Lang)",
            type: "Prize Category",
            definition: "A separate official entity drawn independently by the GLO. It consists of a 2-digit number and is distinct from the First Prize suffix.",
            attributes: { "Probability": "1 in 100", "Payout": "2,000 THB", "Structure": "2 Digits" },
            relationship: "Independent Entity (No correlation to First Prize)"
        },
        {
            id: "glo",
            term: "GLO (Government Lottery Office)",
            type: "Organization",
            definition: "The state-owned enterprise in Thailand responsible for administering the official lottery. It is the sole legal issuer of lottery tickets in the Kingdom.",
            attributes: { "Authority": "State Enterprise", "Founded": "1939", "Location": "Nonthaburi" },
            relationship: "Issuer of 'Thai Lottery Tickets'"
        },
        {
            id: "l6-digital",
            term: "L6 Digital Ticket (Digital Lottery)",
            type: "Product Type",
            definition: "The modern digital lottery format sold exclusively through the 'Pao Tang' application at 80 THB fixed price. It consists of 6 digits.",
            attributes: { "Platform": "Pao Tang App", "Price": "80 THB", "Format": "Digital Scripless" },
            relationship: "Type of 'GLO Lottery Ticket'"
        },
        {
            id: "n3-lotto",
            term: "N3 (New 3-Digit Lottery)",
            type: "Product Type",
            definition: "A new government initiative (Pilot 2024-2025) offering legitimate 3-digit prizes to combat underground lotteries. Prizes are variable based on sales volume.",
            attributes: { "Status": "Pilot Phase", "Prize Structure": "Variable / Parimutuel", "Target": "Underground Market" },
            relationship: "Competitor to 'Underground Lottery'"
        },
        {
            id: "vip-tips",
            term: "VIP Tips (Lek Ded)",
            type: "Cultural Concept",
            definition: "Numbers derived from varying sources such as monks, dreams, or statistical calculations, believed by the public to possess a higher probability of winning.",
            attributes: { "Nature": "Predictive/Speculative", "Sources": "Mae Jamnian, Thai Rath, Bangkok Weekly" },
            relationship: "Influences 'Buying Behavior'"
        }
    ];

    const hasPart = entities.map(e => ({
        "@type": "DefinedTerm",
        "name": e.term,
        "description": e.definition,
        "termCode": e.id
    }));

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            {/* Header: Semantic Hub */}
            <section className="bg-white border-b border-slate-200 py-16">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase mb-4 border border-blue-100">
                        <BookOpen className="w-3 h-3" />
                        Knowledge Graph
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                        Thai Lottery <span className="text-primary">Wiki & Glossary</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        A structured knowledge base defining the specific entities, attributes, and relationships within the Thai Lottery ecosystem.
                        <span className="block text-xs mt-2 text-slate-400">
                            (Implementing Entity Identity Resolution)
                        </span>
                    </p>
                </div>
            </section>

            {/* Knowledge Nodes */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-8">
                    {entities.map((entity, index) => (
                        <div key={index} id={entity.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">

                            {/* Entity Header */}
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Hash className="w-5 h-5 text-slate-400" />
                                    <h2 className="text-xl font-bold text-slate-900">{entity.term}</h2>
                                </div>
                                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {entity.type}
                                </span>
                            </div>

                            <div className="p-6 md:p-8">
                                {/* Definition Statement */}
                                <div className="mb-6">
                                    <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                        {entity.definition}
                                    </p>
                                </div>

                                {/* Attribute-Value Pairs (Document Statistics) */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase mb-4">
                                            <Tag className="w-4 h-4 text-primary" /> Entity Attributes
                                        </h3>
                                        <ul className="space-y-3">
                                            {Object.entries(entity.attributes).map(([key, value]) => (
                                                <li key={key} className="flex items-start justify-between text-sm border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                                                    <span className="text-slate-500 font-medium">{key}</span>
                                                    <span className="text-slate-900 font-bold text-right">{value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase mb-4">
                                            <GitCommit className="w-4 h-4" /> Relationships
                                        </h3>
                                        <p className="text-blue-900/80 text-sm leading-relaxed italic">
                                            "{entity.relationship}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <CollectionSchema
                    name="Thai Lottery Wiki & Glossary"
                    description="A structured knowledge base defining the specific entities, attributes, and relationships within the Thai Lottery ecosystem."
                    hasPart={hasPart}
                />

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "What is the official name of the Thai Lottery?", answer: "The official name is 'Salak Kin Baeng Ratthaban' (สลากกินแบ่งรัฐบาล), administered by the Government Lottery Office (GLO)." },
                    { question: "What is the difference between '3-Up' and '3-Down'?", answer: "'3-Up' (Sam Tua Bon) refers to the last 3 digits of the First Prize. '3-Down' (Sam Tua Lang) usually refers to the 3-digit prizes drawn separately." },
                    { question: "What is the 'L6' digital lottery ticket?", answer: "L6 is the new digital lottery format introduced by the GLO, allowing users to buy 6-digit tickets via the 'Pao Tang' app at the official price of 80 Baht." },
                    { question: "Is underground lottery (Huay Tai Din) legal?", answer: "No, underground lottery is illegal in Thailand. This wiki focuses only on the legal entities and prize structures sanctioned by the GLO." },
                    { question: "What does 'Lek Ded' mean?", answer: "'Lek Ded' translates to 'Lucky Number' or 'Cool Number'. It refers to numbers that are widely rumored to win, often sourced from monks, unexpected events, or calculations." },
                    { question: "What is the 'N3' lottery pilot project?", answer: "N3 is a government-proposed 3-digit lottery product designed to offer a legal alternative to the underground market, currently in pilot phases." },
                    { question: "Who runs the Government Lottery Office?", answer: "The GLO is a state enterprise under the Ministry of Finance of Thailand, tasked with printing and distributing lottery tickets." },
                    { question: "What happens to unclaimed prize money?", answer: "Unclaimed prizes are remitted to the state revenue department after the 2-year claiming period expires. They cannot be claimed afterward." },
                    { question: "How many lottery tickets are printed per draw?", answer: "The GLO prints approximately 100 million tickets per draw, split between physical quota distribution and the digital L6 system." },
                    { question: "What is the 'Charity Lottery' ticket?", answer: "These are special tickets where a portion of the proceeds goes to public charity organizations. They have a slightly different tax rate for winnings (1% vs. 0.5%)." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "What is the official name of the Thai Lottery?", answer: "The official name is 'Salak Kin Baeng Ratthaban' (สลากกินแบ่งรัฐบาล), administered by the Government Lottery Office (GLO)." },
                    { question: "What is the difference between '3-Up' and '3-Down'?", answer: "'3-Up' (Sam Tua Bon) refers to the last 3 digits of the First Prize. '3-Down' (Sam Tua Lang) usually refers to the 3-digit prizes drawn separately." },
                    { question: "What is the 'L6' digital lottery ticket?", answer: "L6 is the new digital lottery format introduced by the GLO, allowing users to buy 6-digit tickets via the 'Pao Tang' app at the official price of 80 Baht." },
                    { question: "Is underground lottery (Huay Tai Din) legal?", answer: "No, underground lottery is illegal in Thailand. This wiki focuses only on the legal entities and prize structures sanctioned by the GLO." },
                    { question: "What does 'Lek Ded' mean?", answer: "'Lek Ded' translates to 'Lucky Number' or 'Cool Number'. It refers to numbers that are widely rumored to win, often sourced from monks, unexpected events, or calculations." },
                    { question: "What is the 'N3' lottery pilot project?", answer: "N3 is a government-proposed 3-digit lottery product designed to offer a legal alternative to the underground market, currently in pilot phases." },
                    { question: "Who runs the Government Lottery Office?", answer: "The GLO is a state enterprise under the Ministry of Finance of Thailand, tasked with printing and distributing lottery tickets." },
                    { question: "What happens to unclaimed prize money?", answer: "Unclaimed prizes are remitted to the state revenue department after the 2-year claiming period expires. They cannot be claimed afterward." },
                    { question: "How many lottery tickets are printed per draw?", answer: "The GLO prints approximately 100 million tickets per draw, split between physical quota distribution and the digital L6 system." },
                    { question: "What is the 'Charity Lottery' ticket?", answer: "These are special tickets where a portion of the proceeds goes to public charity organizations. They have a slightly different tax rate for winnings (1% vs. 0.5%)." }
                ]} />

            </div>
        </div>
    );
}
