'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, XCircle, AlertTriangle, Scale, BookOpen, Quote, ShieldCheck } from 'lucide-react';

export default function RealityClient() {
    const { t } = useLanguage();

    // Strategy: Entity-Oriented Search & Information Literacy
    // Concept: "Corroboration of Web Answers" & "Consensus"
    // We compare "Myth Entities" vs "Fact Entities" with explicit "Status" attributes.
    // This targets "Information Quality" algorithms by providing validated consensus.

    const myths = [
        {
            id: 'locked-numbers',
            claim: "Government locks specific numbers (Lek Lock)",
            status: "Debunked",
            reality: "GLO uses transparent mechanical draw machines (Latimer).",
            consensus: "High",
            source: "Official Process",
            attributes: ["Mechanical Randomness", "Public Witness", "Live Broadcast"],
            icon: <LockIcon />
        },
        {
            id: 'big-movers',
            claim: "Big series numbers can't win",
            status: "False",
            reality: "Every 6-digit combination has equal probability (1 in 1,000,000).",
            consensus: "Mathematical Fact",
            source: "Probability Theory",
            attributes: ["Equal Distribution", "Statistical Independence"],
            icon: <TrendingIcon />
        },
        {
            id: 'dream-numbers',
            claim: "Dreams predict future outcomes",
            status: "Subjective",
            reality: "Cultural belief system, scientifically unproven but psychologically significant.",
            consensus: "Cultural Consensus",
            source: "Psychology",
            attributes: ["Confirmation Bias", "Pattern Matching"],
            icon: <MoonIcon />
        }
    ];

    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <section className="bg-blue-900 border-b border-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 py-16 text-center max-w-4xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-bold uppercase mb-6 border border-blue-700">
                        <ShieldCheck className="w-3 h-3" />
                        Information Literacy
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Myths vs. <span className="text-blue-400">Reality</span>
                    </h1>
                    <p className="text-blue-200 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                        Corroborating claims with factual consensus. We check specific "Attributes" of lottery legends against transparency standards.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-5xl">

                <div className="grid gap-8">
                    {myths.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex flex-col md:flex-row gap-8 items-start">

                                {/* The "Claim" Entity */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">The Claim</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                        "{item.claim}"
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {item.attributes.map((attr, i) => (
                                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                                                {attr}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* The "Verdict" Bridge */}
                                <div className="flex items-center justify-center pt-2">
                                    {item.status === 'Debunked' && <div className="px-4 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-wider border border-red-200">Debunked</div>}
                                    {item.status === 'False' && <div className="px-4 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-wider border border-red-200">False Fact</div>}
                                    {item.status === 'Subjective' && <div className="px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-wider border border-amber-200">Subjective</div>}
                                </div>

                                {/* The "Reality" Entity */}
                                <div className="flex-1 space-y-4 border-l-2 border-slate-100 pl-0 md:pl-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">The Reality</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        {item.reality}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Scale className="w-4 h-4" /> Consensus: <span className="font-bold text-slate-700">{item.consensus}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Consensus Box */}
                <div className="mt-16 bg-slate-900 rounded-3xl p-8 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <Quote className="w-8 h-8 text-blue-500 mx-auto mb-4 opacity-50" />
                        <h3 className="text-2xl font-bold text-white mb-4">Establishing Consensus</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-6">
                            "Information Quality" is determined by the corroboration of facts across trusted sources.
                            We align our definitions with the official <strong>GLO Standard</strong>.
                        </p>
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-colors">
                            Verify Sources
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function LockIcon() { return <div className="w-6 h-6 border-2 border-current rounded-md" /> }
function TrendingIcon() { return <div className="w-6 h-6 border-2 border-current rounded-full" /> }
function MoonIcon() { return <div className="w-6 h-6 border-2 border-current rounded-full" /> }
