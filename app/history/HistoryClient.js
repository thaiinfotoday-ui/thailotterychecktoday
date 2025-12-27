'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Search, FileText, ChevronRight as ChevronIcon, TrendingUp, Award, Zap, Library } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import CollectionSchema from '../components/schema/CollectionSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function HistoryClient({ results, pagination, currentYear }) {
    const { t } = useLanguage();
    const years = ['2025', '2024', '2023'];

    // --- UNIQUE INSIGHTS CALCULATION ---
    const insights = useMemo(() => {
        if (!results || results.length === 0) return null;

        // 1. Most frequent Last 2 digits (2-digit prize) in this page's dataset
        const last2Counts = {};

        results.forEach(r => {
            const num = r.last2;
            if (num) {
                last2Counts[num] = (last2Counts[num] || 0) + 1;
            }
        });

        const sortedLast2 = Object.entries(last2Counts).sort((a, b) => b[1] - a[1]);
        const topLast2 = sortedLast2.slice(0, 3).map(([num, count]) => ({ num, count }));

        // 2. Count "Doubles" (e.g. 11, 22, 33)
        const doublesCount = results.filter(r => r.last2 && r.last2[0] === r.last2[1]).length;

        return { topLast2, doublesCount, totalDraws: results.length };
    }, [results]);

    // Construct CollectionSchema parts
    const collectionParts = results.map(r => ({
        "@type": "CreativeWork",
        "name": `Thai Lottery Result ${r.date}`,
        "description": `Winning numbers for First Prize: ${r.first}, 2-Down: ${r.last2}`,
        "url": `https://thailotterychecktoday.com/history/${r.date}`
    }));

    return (
        <div className="min-h-screen bg-slate-50 pb-12">

            {/* 1. HERO SECTION */}
            <section className="bg-white border-b border-slate-200">

                <div className="container mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase mb-4 border border-slate-200">
                        <Library className="w-3 h-3" />
                        Historical Archive
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        Thai Lottery {t.historyPage.title}
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Complete database of past Thai Lottery winning numbers.
                        Use this archive to analyze <strong className="text-slate-700">Frequency Patterns</strong> and <strong className="text-slate-700">Historical Trends</strong> before your next purchase.
                    </p>
                    <div className="flex justify-center gap-4 mt-6">
                        <Link href="/check" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                            Check Latest Ticket <ChevronIcon className="w-4 h-4" />
                        </Link>
                        <Link href="/number-frequency" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors hover:underline flex items-center gap-1">
                            Frequency Analysis <ChevronIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">

                {/* 2. FILTER SECTION (SEO Friendly Links) */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        <Link
                            href="/history"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!currentYear ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {t.historyPage.allYears}
                        </Link>
                        {years.map(y => (
                            <Link
                                key={y}
                                href={`/history?year=${y}`}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentYear === y ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {y}
                            </Link>
                        ))}
                    </div>
                    <div className="text-sm text-slate-400 font-medium">
                        Page {pagination.current} / {pagination.total}
                    </div>
                </div>

                {/* 3. INSIGHTS SECTION (New Unique Content) */}
                {insights && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                            <div className="p-3 bg-red-50 rounded-full text-primary mb-3">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Top Recurring 2-Down</h3>
                            <div className="flex gap-2">
                                {insights.topLast2.map((item, idx) => (
                                    <span key={idx} className="font-mono font-bold text-lg text-slate-900 bg-slate-100 px-2 py-1 rounded">
                                        {item.num} <span className="text-xs text-slate-400">({item.count})</span>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                            <div className="p-3 bg-blue-50 rounded-full text-secondary mb-3">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Double Digits (Same pair)</h3>
                            <div className="font-mono font-black text-3xl text-slate-900">
                                {insights.doublesCount} <span className="text-sm font-normal text-slate-400">Occurrences</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                            <div className="p-3 bg-yellow-50 rounded-full text-accent mb-3">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Dataset Size</h3>
                            <div className="font-mono font-black text-3xl text-slate-900">
                                {insights.totalDraws} <span className="text-sm font-normal text-slate-400">Draws</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. RESULTS TABLE */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-xs uppercase tracking-wider">{t.table.date}</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-xs uppercase tracking-wider">{t.table.first}</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-xs uppercase tracking-wider text-center">{t.table.last2}</th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-xs uppercase tracking-wider text-right">{t.table.action}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {results.map((row, i) => (
                                    <tr key={i} className="hover:bg-red-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-red-200 transition-colors">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <span className="font-semibold text-slate-900">{row.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-lg font-bold text-slate-600 tracking-wide">{row.first}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block w-10 h-10 rounded-full bg-red-100 text-primary leading-10 font-bold font-mono text-lg">
                                                {row.last2}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/history/${row.date}`} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
                                                {t.table.fullResult} <ChevronIcon className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {results.length === 0 && (
                        <div className="p-12 text-center text-slate-400">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>{t.historyPage.noResults}</p>
                        </div>
                    )}
                </div>

                {/* 5. PAGINATION */}
                {pagination.total > 1 && (
                    <div className="flex justify-center gap-2 mb-12">
                        {pagination.hasPrev ? (
                            <Link href={`/history?year=${currentYear || ''}&page=${pagination.current - 1}`} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                        ) : (
                            <button disabled className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-300 cursor-not-allowed">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}

                        <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium">
                            Page {pagination.current}
                        </div>

                        {pagination.hasNext ? (
                            <Link href={`/history?year=${currentYear || ''}&page=${pagination.current + 1}`} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        ) : (
                            <button disabled className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-300 cursor-not-allowed">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}

                <CollectionSchema
                    name={`Thai Lottery History Archive ${currentYear || 'All Time'}`}
                    description={`Historical archive of past Thai Lottery draw results. Viewing ${results.length} records. Includes full prize breakdown.`}
                    hasPart={collectionParts}
                />

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "Where can I find the complete history of Thai Lottery results?", answer: "You can browse our comprehensive archive on this page, which contains official draw results dating back over 10 years." },
                    { question: "Are these historical lottery results officially verified?", answer: "Yes, all historical data displayed here is sourced directly from the Government Lottery Office (GLO) announcements." },
                    { question: "Can I search for results from a specific year?", answer: "Yes, use the year filter at the top of the page to view all draw results for 2024, 2023, and previous years." },
                    { question: "How do I find the result for a specific date?", answer: "You can scroll through the list or use the browser's 'Find' function (Ctrl+F) to search for a specific date (e.g., '16 October 2023')." },
                    { question: "Does the history show all prize tiers?", answer: "The main table displays the First Prize and Last 2 Digits for quick reference. Click 'Full Result' to see the complete prize breakdown for that draw." },
                    { question: "How often is the history archive updated?", answer: "The archive is updated immediately after every official draw announcement, usually on the 1st and 16th of each month." },
                    { question: "Can I download the official GLO result sheet?", answer: "Yes, most individual result pages include a link or view of the official PDF sheet released by the GLO." },
                    { question: "What was the most common winning number in history?", answer: "You can visit our 'Frequency Analysis' page to see detailed statistics on the most frequently drawn numbers in the last 10 years." },
                    { question: "Are old lottery tickets still valid for claiming?", answer: "No, winning tickets must be claimed within 2 years from the draw date. Expired tickets cannot be redeemed." },
                    { question: "Why do some dates have delayed results?", answer: "Occasionally, draws are rescheduled due to public holidays (e.g., New Year or Songkran). Our archive reflects the actual draw dates." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "Where can I find the complete history of Thai Lottery results?", answer: "You can browse our comprehensive archive on this page, which contains official draw results dating back over 10 years." },
                    { question: "Are these historical lottery results officially verified?", answer: "Yes, all historical data displayed here is sourced directly from the Government Lottery Office (GLO) announcements." },
                    { question: "Can I search for results from a specific year?", answer: "Yes, use the year filter at the top of the page to view all draw results for 2024, 2023, and previous years." },
                    { question: "How do I find the result for a specific date?", answer: "You can scroll through the list or use the browser's 'Find' function (Ctrl+F) to search for a specific date (e.g., '16 October 2023')." },
                    { question: "Does the history show all prize tiers?", answer: "The main table displays the First Prize and Last 2 Digits for quick reference. Click 'Full Result' to see the complete prize breakdown for that draw." },
                    { question: "How often is the history archive updated?", answer: "The archive is updated immediately after every official draw announcement, usually on the 1st and 16th of each month." },
                    { question: "Can I download the official GLO result sheet?", answer: "Yes, most individual result pages include a link or view of the official PDF sheet released by the GLO." },
                    { question: "What was the most common winning number in history?", answer: "You can visit our 'Frequency Analysis' page to see detailed statistics on the most frequently drawn numbers in the last 10 years." },
                    { question: "Are old lottery tickets still valid for claiming?", answer: "No, winning tickets must be claimed within 2 years from the draw date. Expired tickets cannot be redeemed." },
                    { question: "Why do some dates have delayed results?", answer: "Occasionally, draws are rescheduled due to public holidays (e.g., New Year or Songkran). Our archive reflects the actual draw dates." }
                ]} />

            </div>
        </div>
    );
}
