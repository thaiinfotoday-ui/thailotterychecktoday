'use client';

import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Network, Share2, Tag, Search, BrainCircuit, Globe2 } from 'lucide-react';
import CollectionSchema from '../components/schema/CollectionSchema';

export default function LexiconClient() {
    const { t } = useLanguage();

    // Strategy: Phrase Taxonomies & Contextual Domains
    // Concept: "Lexical Relations" (Synonymy, Hyponymy) & "Word Themes"
    // We group terms not alphabetically, but by their "Semantic Field". 
    // This helps search engines understand the "Context" of ambiguous terms (e.g., "Run" business vs "Run" marathon).
    // Here: "Check" (Verify) vs "Check" (Money).

    const semanticFields = [
        {
            domain: "Economic Context",
            description: "Terms related to value, transaction, and ownership.",
            icon: Tag,
            color: "emerald",
            taxonomies: [
                {
                    head: "Prize Asset",
                    terms: ["Cash Reward", "Jackpot", "Winning Ticket", "Claimable Asset"]
                },
                {
                    head: "Transaction",
                    terms: ["Purchase", "Distributor Booking", "Government Tax", "Redemption"]
                }
            ]
        },
        {
            domain: "Technical Context",
            description: "Terms related to the mechanism and system.",
            icon: Network,
            color: "blue",
            taxonomies: [
                {
                    head: "Draw Mechanism",
                    terms: ["Spherical Cage", "Pneumatic System", "Randomization", "Official Committee"]
                },
                {
                    head: "Ticket Format",
                    terms: ["L6 (Digital)", "N3 (New)", "Physical Leaflet", "2-Piece Set"]
                }
            ]
        },
        {
            domain: "Cultural Context",
            description: "Terms related to belief, ritual, and origin.",
            icon: Globe2,
            color: "amber",
            taxonomies: [
                {
                    head: "Luck Source",
                    terms: ["Dream Interpretation", "Sacred Temple", "Monk Blessing", "Numerology"]
                },
                {
                    head: "Event",
                    terms: ["Live Broadcast", "Community Gathering", "Result Announcement"]
                }
            ]
        },
    ];

    const implicitQueries = [
        {
            phrase: "Lottery Live",
            intent: "Navigational",
            expansion: "Where can I watch the GLO lottery broadcast live online?"
        },
        {
            phrase: "Lek Ded",
            intent: "Informational",
            expansion: "What are the lucky number predictions (Lek Ded) for this draw?"
        },
        {
            phrase: "Claim",
            intent: "Transactional",
            expansion: "How do I claim my lottery prize at the GLO office?"
        }
    ];

    const lexiconItems = semanticFields.flatMap(field =>
        field.taxonomies.flatMap(tax =>
            tax.terms.map(term => ({ name: term, url: `https://thailotterychecktoday.com/lexicon#${term.replace(/\s+/g, '-').toLowerCase()}` }))
        )
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <section className="bg-teal-900 border-b border-teal-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 py-16 text-center max-w-4xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800 text-teal-200 text-xs font-bold uppercase mb-6 border border-teal-700">
                        <Share2 className="w-3 h-3" />
                        Lexical Relations
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Phrase <span className="text-teal-400">Taxonomies</span>
                    </h1>
                    <p className="text-teal-200 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                        Grouping "Contextual Signifiers" to define the semantic field.
                        We organize vocabulary by "Theme" rather than alphabet to deepen topical authority.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-5xl">

                {/* Phrase Taxonomies Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {semanticFields.map((field, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                            <div className={`p-3 bg-${field.color}-50 text-${field.color}-600 rounded-xl w-fit mb-4`}>
                                <field.icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 mb-2">{field.domain}</h2>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{field.description}</p>

                            <div className="space-y-4">
                                {field.taxonomies.map((tax, tId) => (
                                    <div key={tId} className={`p-4 rounded-xl bg-${field.color}-50/50 border border-${field.color}-100`}>
                                        <h3 className={`text-xs font-bold text-${field.color}-700 uppercase mb-2 flex items-center gap-1`}>
                                            <BrainCircuit className="w-3 h-3" /> {tax.head}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {tax.terms.map((term, i) => (
                                                <span key={i} className="px-2 py-1 bg-white border border-slate-100 rounded text-[11px] font-medium text-slate-600 shadow-sm">
                                                    {term}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Implicit Query Expansion Section */}
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Search className="w-64 h-64 text-white" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="w-6 h-6 text-teal-400" />
                            <h2 className="text-2xl font-black text-white">Implicit Query Refinement</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {implicitQueries.map((query, idx) => (
                                <div key={idx} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-teal-400 font-black text-lg">"{query.phrase}"</span>
                                        <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-[10px] uppercase font-bold rounded">
                                            {query.intent}
                                        </span>
                                    </div>
                                    <div className="text-slate-400 text-sm italic">
                                        <span className="text-slate-500 not-italic mr-2 text-xs font-bold uppercase">Expands to:</span>
                                        {query.expansion}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-800 text-slate-500 text-sm leading-relaxed max-w-3xl">
                            <strong>Note on Micro-Semantics:</strong> Search engines attempt to map short, incomplete phrases ("Implicit Queries") to full questions ("Explicit Intent"). By defining these relationships, we help the engine construct the index correctly for our domain.
                        </div>
                    </div>
                </div>

                <CollectionSchema
                    name="Thai Lottery Contextual Lexicon"
                    description="A curated taxonomy of lottery-related terms organized by semantic field (Economic, Technical, Cultural)."
                    hasPart={lexiconItems}
                />

            </div>
        </div>
    );
}
