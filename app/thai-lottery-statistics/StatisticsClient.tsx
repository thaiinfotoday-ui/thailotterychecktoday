'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BarChart, PieChart, TrendingUp, Calendar, Hash, ArrowUpRight, Filter, Table2 } from 'lucide-react';
import ArticleSchema from '../components/schema/ArticleSchema';

export default function StatisticsClient() {
    const { t } = useLanguage();

    // EAV (Entity-Attribute-Value) Data Architecture
    // Visualizing specific attributes of the "Lottery Draw" Entity
    // Attribute: "Frequency", Value: "Count"
    // Attribute: "Heat", Value: "Hot/Cold"

    // Mock Data simulating "Document Statistics" from the transcript
    const digitFrequency = [
        { digit: 0, count: 42, hot: true },
        { digit: 1, count: 28, hot: false },
        { digit: 2, count: 35, hot: false },
        { digit: 3, count: 19, hot: false, cold: true },
        { digit: 4, count: 31, hot: false },
        { digit: 5, count: 45, hot: true, peak: true },
        { digit: 6, count: 22, hot: false },
        { digit: 7, count: 38, hot: true },
        { digit: 8, count: 29, hot: false },
        { digit: 9, count: 33, hot: false },
    ];

    const [timeframe, setTimeframe] = useState('year'); // 'year', 'all-time'

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase mb-6 border border-purple-100">
                        <TrendingUp className="w-3 h-3" />
                        Statistical Analysis
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                        Frequency <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Matrices</span>
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                        Deep dive into the attributes of past draws.
                        We structure randomness into readable patterns using Entity-Attribute-Value models.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* 1. Frequency Distribution (Attribute: Occurrence) */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                <BarChart className="w-6 h-6 text-purple-600" />
                                Single Digit Frequency
                            </h2>
                            <p className="text-slate-400 text-sm">Occurrence of digits 0-9 in the Last 2 Digits category</p>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setTimeframe('year')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${timeframe === 'year' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}
                            >
                                2024-2025
                            </button>
                            <button
                                onClick={() => setTimeframe('all-time')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${timeframe === 'all-time' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}
                            >
                                All Time
                            </button>
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-2 md:gap-4">
                        {digitFrequency.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                                <div className="text-xs font-bold text-slate-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {d.count}
                                </div>
                                <div
                                    className={`w-full rounded-t-xl transition-all duration-500 relative ${d.peak ? 'bg-purple-500' : d.hot ? 'bg-purple-400' : d.cold ? 'bg-slate-200' : 'bg-slate-300'}`}
                                    style={{ height: `${(d.count / 50) * 100}%` }}
                                >
                                    {d.peak && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                            Peak
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center font-black text-slate-700 bg-slate-50 group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-200 transition-colors">
                                    {d.digit}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Heatmap & Attributes (Attribute: Temperature) */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-red-500" /> Hot Numbers (High Velocity)
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {digitFrequency.filter(d => d.hot).map(d => (
                                <div key={d.digit} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 w-full sm:w-auto">
                                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center font-black text-red-600 text-xl">
                                        {d.digit}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase text-red-400">Frequency</span>
                                        <span className="font-bold text-slate-900">{d.count} DRAWS</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500 rotate-180" /> Cold Numbers (Low Velocity)
                        </h3>
                        <p className="text-slate-500 text-sm mb-4">
                            Digits appearing significantly below the statistical mean.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {digitFrequency.filter(d => d.cold).map(d => (
                                <div key={d.digit} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 w-full sm:w-auto">
                                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center font-black text-blue-600 text-xl">
                                        {d.digit}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase text-blue-400">Frequency</span>
                                        <span className="font-bold text-slate-900">{d.count} DRAWS</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* EAV Context Note */}
                <div className="bg-purple-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Table2 className="w-64 h-64" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-2xl font-bold mb-4">The Logic of Attributes</h3>
                        <p className="text-purple-200 leading-relaxed mb-6">
                            Every lottery draw is an <strong>Entity</strong>. The resulting numbers are its <strong>Values</strong>.
                            By tracking the <strong>Attributes</strong> of these numbers (Odd/Even, High/Low, Sum Total) over time,
                            we create a structured dataset that reveals hidden probabilities.
                        </p>
                        <button className="bg-white text-purple-900 px-6 py-3 rounded-xl font-bold hover:bg-purple-100 transition-colors">
                            Download Raw Value Sets
                        </button>
                    </div>
                </div>

                <ArticleSchema
                    title="Thai Lottery Statistics Information: EAV Model"
                    description="Advanced statistical analysis of Thai Lottery results, utilizing Entity-Attribute-Value models to track digit frequency and heatmaps."
                />

            </div>
        </div>
    );
}
