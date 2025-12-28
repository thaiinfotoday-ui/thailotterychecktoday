'use client';

import { useLanguage } from '../context/LanguageContext';
import { MousePointer2, GitBranch, ArrowRight, Zap, PlayCircle, Layers, Fingerprint } from 'lucide-react';
import ArticleSchema from '../components/schema/ArticleSchema';

export default function ActionsClient() {
    const { t } = useLanguage();

    // Strategy: Predicates for Frame Semantics
    // Concept: "FrameNet" & "Semantic Role Labeling (SRL)"
    // We explicitly structure content around "Verbs of Life" related to lottery.
    // Instead of just nouns (Result, Ticket), we focus on the ACTION (Check, Claim, Analyze).
    // This creates "Contextual Bridges" and defines the "Semantic Role" of the user (Agent) vs the Lottery (Object).

    const frames = [
        {
            verb: "Check",
            entailment: "Verifying Outcome",
            objects: ["Digital Ticket", "Physical Leaflet", "L6 Number"],
            agent: "Player",
            context: "Post-Draw Verification",
            color: "emerald"
        },
        {
            verb: "Claim",
            entailment: "Receiving Value",
            objects: ["Cash Prize", "Bank Transfer", "GLO Cheque"],
            agent: "Winner",
            context: "Financial Transaction",
            color: "blue"
        },
        {
            verb: "Analyze",
            entailment: "Predicting Future",
            objects: ["Past Statistics", "Digit Frequency", "Dream Signals"],
            agent: "Analyst",
            context: "Pre-Draw Strategy",
            color: "purple"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <section className="bg-indigo-900 border-b border-indigo-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 py-16 text-center max-w-4xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800 text-indigo-200 text-xs font-bold uppercase mb-6 border border-indigo-700">
                        <GitBranch className="w-3 h-3" />
                        Frame Semantics
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Action <span className="text-indigo-400">Predicates</span>
                    </h1>
                    <p className="text-indigo-200 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                        Structuring the lottery experience through "Verbs of Life."
                        We don't just list nouns; we map the entire "Action Frame" for semantic clarity.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-5xl">

                <div className="grid md:grid-cols-3 gap-8">
                    {frames.map((frame, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-full h-2 bg-${frame.color}-500`}></div>

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform origin-left">
                                    {frame.verb}
                                </h2>
                                <div className={`p-3 bg-${frame.color}-50 text-${frame.color}-600 rounded-xl`}>
                                    <Zap className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Layers className="w-5 h-5 text-slate-400 mt-1" />
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase">Entailment</span>
                                        <p className="font-bold text-slate-700 leading-tight">{frame.entailment}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Fingerprint className="w-5 h-5 text-slate-400 mt-1" />
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase">Direct Objects</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {frame.objects.map((obj, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded font-medium">
                                                    {obj}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>Agent: <strong className="text-slate-700">{frame.agent}</strong></span>
                                    <span>Context: <strong className="text-slate-700">{frame.context}</strong></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Micro-Semantics Explanation */}
                <div className="mt-16 p-8 bg-slate-900 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <MousePointer2 className="w-64 h-64 text-white" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Why Predicates Matter?</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            "A restaurant isn't just a place (Noun); it's where you <strong>eat</strong>, <strong>order</strong>, and <strong>wait</strong> (Verbs)."
                            <br /><br />
                            Similarly, our site maps the user journey not just by "Lottery Ticket" (Noun), but by the <strong>Actions</strong> you take with it.
                            This aligns with <em>FrameNet</em> logic for deeper semantic understanding.
                        </p>
                        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all">
                            Explore Action Paths <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <ArticleSchema
                    title="Thai Lottery Actions: Frame Semantics & Predicates"
                    description="Understanding the core actions of the Thai Lottery ecosystem: Check, Claim, and Analyze. A semantic guide for players."
                />

            </div>
        </div>
    );
}
