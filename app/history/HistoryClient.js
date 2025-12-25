'use client';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, Search, FileText, ChevronRight as ChevronIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HistoryClient({ results, pagination, currentYear }) {
    const { t } = useLanguage();
    const years = ['2025', '2024', '2023'];

    return (
        <div className="min-h-screen bg-slate-50 pb-12">

            {/* 1. HERO SECTION */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        {t.historyPage.title}
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t.historyPage.subtitle.split('**').map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="text-slate-700 font-semibold">{part}</strong> : part
                        )}
                    </p>
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
                        {t.historyPage.page} {pagination.current} / {pagination.total}
                    </div>
                </div>

                {/* 3. RESULTS TABLE */}
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
                                    <tr key={i} className="hover:bg-purple-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-purple-500 group-hover:border-purple-200 transition-colors">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <span className="font-semibold text-slate-900">{row.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-lg font-bold text-slate-600 tracking-wide">{row.first}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block w-10 h-10 rounded-full bg-purple-100 text-purple-700 leading-10 font-bold font-mono text-lg">
                                                {row.last2}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/history/${row.date}`} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors">
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

                {/* 4. PAGINATION */}
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
                            {t.historyPage.page} {pagination.current}
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

                {/* 5. CONTEXT SECTION */}
                <section className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">{t.historyPage.aboutTitle}</h2>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        {t.historyPage.aboutDesc.split('**').map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="text-slate-700">{part}</strong> : part
                        )}
                    </p>
                </section>

                {/* 6. FAQ SECTION */}
                <section className="max-w-2xl mx-auto space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-500" />
                        {t.faq.title}
                    </h3>
                    <div className="space-y-4">
                        {(t.historyPage?.faqs || t.faq.items.slice(0, 2)).map((item, i) => (
                            <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm open:shadow-md transition-shadow">
                                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-700 hover:bg-slate-50 select-none list-none">
                                    <span>{item.q}</span>
                                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                    </span>
                                </summary>
                                <div className="px-4 pb-4 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50/50 animate-in slide-in-from-top-1 duration-200">
                                    {item.a.split('**').map((part, i) =>
                                        i % 2 === 1 ? <strong key={i} className="text-slate-700">{part}</strong> : part
                                    )}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
