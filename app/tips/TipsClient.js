'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Zap, Calculator, Lock, TrendingUp, Calendar, ArrowRight, CheckCircle2, Brain, Sparkles, ScrollText, AlertTriangle } from 'lucide-react';
import BangkokWeeklyTips from '../components/BangkokWeeklyTips';
import ProductSchema from '../components/schema/ProductSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function TipsClient() {
    const { lang } = useLanguage();
    const [birthDate, setBirthDate] = useState('');
    const [luckyNumber, setLuckyNumber] = useState(null);

    const calculateLuckyNumber = () => {
        if (!birthDate) return;
        // Simple numerology simulation
        const numbers = birthDate.replace(/-/g, '').split('').map(Number);
        const sum = numbers.reduce((a, b) => a + b, 0);
        const reduced = sum % 9 || 9; // Reduce to single digit 1-9

        // Generate a 2-digit and 3-digit set based on this
        const set2 = [reduced, (reduced + 3) % 10].join('');
        const set3 = [reduced, (reduced + 5) % 10, (reduced + 8) % 10].join('');

        // Add semantic attributes for EAV model
        const attributes = {
            element: ['Fire', 'Earth', 'Air', 'Water', 'Ether', 'Fire', 'Earth', 'Air', 'Water'][reduced - 1],
            resonance: ['High', 'Stable', 'Volatile', 'Fluid', 'Central', 'High', 'Stable', 'Volatile', 'Fluid'][reduced - 1],
            keyword: ['Leadership', 'Balance', 'Creation', 'Structure', 'Change', 'Harmony', 'Truth', 'Power', 'Completion'][reduced - 1]
        };

        setLuckyNumber({ single: reduced, two: set2, three: set3, ...attributes });
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            {/* HEROS SECTION: DEFINING THE DOMAIN */}
            {/* The "Source Context" here is "Predicitive Analysis" for the "Central Entity" (Lottery) */}
            <section className="bg-slate-900 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-900/20"></div>
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs font-bold uppercase mb-6">
                        <Brain className="w-3 h-3 text-yellow-300" />
                        Probability & Prediction Hub
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Thai Lottery <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Analytic Formulas</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        A structured collection of <strong>Predictive Models</strong>. We categorize insights into "Statistical Frequency" (Math) and "Cultural Beliefs" (Tradition) to help you form a strategy.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-5xl -mt-10 relative z-20">

                {/* 1. AGGREGATED SOURCES SECTION (Bangkok Weekly) */}
                {/* This represents the "Mass Media" node in the knowledge graph */}
                <BangkokWeeklyTips lang={lang} />

                {/* 2. INTERACTIVE TOOL: PERSONAL COMPUTE */}
                {/* Semantic Intent: "Personal Calculation" tool that outputs an Entity with Attributes */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-16">
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Calculator className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">Soul Number Algorithm</h2>
                                        <div className="flex gap-2 mt-1">
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] uppercase font-bold rounded">Numerology</span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] uppercase font-bold rounded">Personal</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-8 leading-relaxed">
                                    This tool creates a <strong>Subject-Object relationship</strong> between your "Birth Date" (Inputs) and "Probable Digits" (Outputs). We use the Mahasat Thai Astrology framework to reduce integers.
                                </p>

                                <div className="space-y-4 max-w-sm">
                                    <label className="block text-sm font-semibold text-slate-700">Input Birth Date for Analysis</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="date"
                                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900"
                                            onChange={(e) => setBirthDate(e.target.value)}
                                        />
                                        <button
                                            onClick={calculateLuckyNumber}
                                            disabled={!birthDate}
                                            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            Calculate <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* RESULT DISPLAY: EAV MODEL (Attribute Display) */}
                            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                {!luckyNumber ? (
                                    <div className="text-slate-400">
                                        <Lock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p className="font-medium">Enter date to reveal set</p>
                                    </div>
                                ) : (
                                    <div className="animate-in zoom-in duration-500 w-full">
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Computed Number Set</h3>

                                        {/* Primary Value */}
                                        <div className="mb-6">
                                            <div className="text-6xl font-black text-primary font-mono tracking-tighter drop-shadow-sm">{luckyNumber.single}</div>
                                            <div className="text-xs font-bold text-primary/60 uppercase tracking-wider mt-1">Core Digit</div>
                                        </div>

                                        {/* Attributes (EAV) */}
                                        <div className="grid grid-cols-3 gap-2 mb-6">
                                            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                                                <span className="block text-[10px] text-slate-400 uppercase">Element</span>
                                                <span className="text-xs font-bold text-slate-800">{luckyNumber.element}</span>
                                            </div>
                                            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                                                <span className="block text-[10px] text-slate-400 uppercase">Energy</span>
                                                <span className="text-xs font-bold text-slate-800">{luckyNumber.keyword}</span>
                                            </div>
                                            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                                                <span className="block text-[10px] text-slate-400 uppercase">Resonance</span>
                                                <span className="text-xs font-bold text-slate-800">{luckyNumber.resonance}</span>
                                            </div>
                                        </div>

                                        {/* Derived Sets */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white p-3 rounded-xl border border-slate-200">
                                                <span className="block text-[10px] text-slate-400 mb-1">2-Digit Set</span>
                                                <span className="text-2xl font-black text-slate-900 font-mono">{luckyNumber.two}</span>
                                            </div>
                                            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-white">
                                                <span className="block text-[10px] text-white/60 mb-1">3-Digit Set</span>
                                                <span className="text-2xl font-black font-mono">{luckyNumber.three}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TAXONOMY OF FORMULAS (Statistical vs Cultural) */}
                <div className="flex items-center gap-3 mb-6">
                    <ScrollText className="w-6 h-6 text-slate-400" />
                    <h2 className="text-2xl font-bold text-slate-900">Formula Classification Matrix</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Statistical Nodes */}
                    {[
                        {
                            title: "Mae Jamnian 2025",
                            category: "Statistical Aggregation",
                            desc: "Top 10 most purchased numbers. Represents 'Colloquial Demand'.",
                            items: ["19", "28", "56"],
                            color: "bg-pink-500",
                            icon: TrendingUp
                        },
                        {
                            title: "Thai Rath Grid",
                            category: "Astrological Grid",
                            desc: "Fixed grid calculation from Thailand's largest daily newspaper.",
                            items: ["3", "5", "8"],
                            color: "bg-green-600",
                            icon: Newspaper
                        }
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-full ${card.color} flex items-center justify-center text-white`}>
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <span className="px-2 py-1 bg-slate-50 text-[10px] font-bold uppercase text-slate-400 rounded-md border border-slate-100">
                                    {card.category}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{card.title}</h3>
                            <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100 min-h-[60px]">
                                {card.desc}
                            </p>
                            <div className="flex gap-2">
                                {card.items.map(n => (
                                    <span key={n} className="px-3 py-1 bg-slate-100 rounded-lg font-mono font-bold text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                        {n}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Cultural Nodes */}
                    {[
                        {
                            title: "Chinese Calendar",
                            category: "Cultural/Lunar",
                            desc: "Dates aligned with the lunar cycle event 'Full Moon'.",
                            items: ["492", "55"],
                            color: "bg-red-600",
                            icon: Calendar
                        }
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-full ${card.color} flex items-center justify-center text-white`}>
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <span className="px-2 py-1 bg-slate-50 text-[10px] font-bold uppercase text-slate-400 rounded-md border border-slate-100">
                                    {card.category}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{card.title}</h3>
                            <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100 min-h-[60px]">
                                {card.desc}
                            </p>
                            <div className="flex gap-2">
                                {card.items.map(n => (
                                    <span key={n} className="px-3 py-1 bg-slate-100 rounded-lg font-mono font-bold text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                        {n}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                    <div>
                        <strong className="block mb-1 text-amber-900">Statistical Disclaimer (Contextual Border)</strong>
                        These tools are for "Entertainment & Cultural" purposes. The "Official GLO Draw" is a stochastic process (Random Variable). No formula guarantees a win.
                    </div>
                </div>

                <ProductSchema
                    name="Thai Lottery VIP Analytic Formulas"
                    description="Professional grade lottery analysis tools including Soul Number Calculator, Mae Jamnian Aggregation, and Thai Rath Grids. Helps identifying statistical and cultural lucky numbers."
                    brand="ThaiLotteryCheckToday"
                    offers={[
                        { name: "Soul Number Calculator", price: "0" },
                        { name: "Mae Jamnian 2025 Board", price: "0" },
                        { name: "Thai Rath Grid", price: "0" }
                    ]}
                />

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "What is the 'Soul Number' in Thai Lottery analysis?", answer: "The Soul Number is a numerological reduction of your birth date. According to Thai astrological beliefs (Mahasat), this single digit represents your core resonance frequency for the current timeframe." },
                    { question: "How accurate are these lucky number formulas?", answer: "These formulas are based on historical statistics and cultural beliefs. They are tools for generating number sets but cannot guarantee a win, as the lottery is a random event." },
                    { question: "What is the Mae Jamnian formula?", answer: "Mae Jamnian is one of Thailand's most famous lottery tip sheets. It aggregates the 'top 10 most sold tickets' across the country, representing the 'wisdom of the crowd' or high-demand numbers." },
                    { question: "Can mathematical formulas predict lottery results?", answer: "No formula can predict random outcomes with 100% certainty. However, probability theory allows us to analyze frequency distributions (Hot/Cold numbers) to make informed choices." },
                    { question: "What does the 'Element' attribute signify?", answer: "In our analysis, 'Element' (Earth, Water, Air, Fire) adds a semantic layer to the numbers, linking abstract digits to tangible qualities. For example, 'Water' numbers (like 2 or 6) are associated with flow and adaptability." },
                    { question: "How exactly do I use the 2-digit set?", answer: "The 2-digit set suggests a pair of numbers to play for the '2-Down' (Last 2 Digits) prize category. You can play them as a direct pair or swap their positions (Rumpher)." },
                    { question: "What is the Thai Rath Grid?", answer: "The Thai Rath Grid is a famous 3x3 astrological chart published by the Thai Rath newspaper. It provides a daily set of 'influential digits' based on planetary positions." },
                    { question: "Does the Chinese Calendar influence the Thai Lottery?", answer: "Many players believe in lunar dates. Our system checks if the draw date coincides with significant lunar events (like Full Moon or Festivals) to suggest 'Auspicous Numbers'." },
                    { question: "Is this page providing financial advice?", answer: "No. This tool is for entertainment and informational purposes only. We analyze patterns and cultural trends, but you should play responsibly and within your means." },
                    { question: "How often should I recalculate my Soul Number?", answer: "Your base Soul Number remains constant, but the 'Resonance' attributes may change depending on the current draw's date. We recommend checking before every draw (1st and 16th)." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "What is the 'Soul Number' in Thai Lottery analysis?", answer: "The Soul Number is a numerological reduction of your birth date. According to Thai astrological beliefs (Mahasat), this single digit represents your core resonance frequency for the current timeframe." },
                    { question: "How accurate are these lucky number formulas?", answer: "These formulas are based on historical statistics and cultural beliefs. They are tools for generating number sets but cannot guarantee a win, as the lottery is a random event." },
                    { question: "What is the Mae Jamnian formula?", answer: "Mae Jamnian is one of Thailand's most famous lottery tip sheets. It aggregates the 'top 10 most sold tickets' across the country, representing the 'wisdom of the crowd' or high-demand numbers." },
                    { question: "Can mathematical formulas predict lottery results?", answer: "No formula can predict random outcomes with 100% certainty. However, probability theory allows us to analyze frequency distributions (Hot/Cold numbers) to make informed choices." },
                    { question: "What does the 'Element' attribute signify?", answer: "In our analysis, 'Element' (Earth, Water, Air, Fire) adds a semantic layer to the numbers, linking abstract digits to tangible qualities. For example, 'Water' numbers (like 2 or 6) are associated with flow and adaptability." },
                    { question: "How exactly do I use the 2-digit set?", answer: "The 2-digit set suggests a pair of numbers to play for the '2-Down' (Last 2 Digits) prize category. You can play them as a direct pair or swap their positions (Rumpher)." },
                    { question: "What is the Thai Rath Grid?", answer: "The Thai Rath Grid is a famous 3x3 astrological chart published by the Thai Rath newspaper. It provides a daily set of 'influential digits' based on planetary positions." },
                    { question: "Does the Chinese Calendar influence the Thai Lottery?", answer: "Many players believe in lunar dates. Our system checks if the draw date coincides with significant lunar events (like Full Moon or Festivals) to suggest 'Auspicous Numbers'." },
                    { question: "Is this page providing financial advice?", answer: "No. This tool is for entertainment and informational purposes only. We analyze patterns and cultural trends, but you should play responsibly and within your means." },
                    { question: "How often should I recalculate my Soul Number?", answer: "Your base Soul Number remains constant, but the 'Resonance' attributes may change depending on the current draw's date. We recommend checking before every draw (1st and 16th)." }
                ]} />
            </div>
        </div>
    );
}

function Newspaper({ className }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>
    );
}
