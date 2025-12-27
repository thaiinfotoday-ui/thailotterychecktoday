'use client';
import Link from 'next/link';
import { Calendar, Award, ChevronLeft, ChevronRight, FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HistoryDetailClient({ data }) {
    const { t, lang } = useLanguage();

    if (!data) return null;

    return (
        <div key={lang} className="min-h-screen bg-slate-50 pb-12">
            {/* Debug: {lang} */}

            {/* 1. HERO SECTION */}
            <section className="bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <p className="text-primary font-bold tracking-wider text-sm uppercase mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> {t.historyDetail.verified}
                            </p>
                            {/* H1 SEO: Clear, descriptive, date-focused */}
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                                {t.historyDetail.title} <span className="block text-slate-400 text-2xl md:text-3xl mt-2 font-bold">{data.date}</span>
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            {/* Navigation Links (SEO structure) */}
                            <Link href="/history" className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-50 flex items-center gap-2">
                                <ChevronLeft className="w-4 h-4" /> {t.historyDetail.allHistory}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">

                {/* 2. MAIN RESULTS CARD */}
                <div className="max-w-4xl mx-auto space-y-8">

                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-red-900/5 border border-red-100">
                        {/* Gradient Top */}
                        <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>

                        <div className="p-8 md:p-12 text-center">

                            {/* First Prize */}
                            <div className="mb-12">
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{t.historyDetail.firstPrize}</h2>
                                <div className="text-6xl md:text-8xl font-black text-slate-900 font-mono tracking-wider drop-shadow-sm">
                                    {data.first}
                                </div>
                                <div className="mt-4 flex justify-center gap-4 text-sm text-slate-500 font-medium">
                                    {/* Handle neighbor display safely if data exists */}
                                    {data.nearFirst && data.nearFirst.length >= 2 && (
                                        <>
                                            <span>{t.historyDetail.neighbor} 1: {data.nearFirst[0]}</span>
                                            <span className="w-px h-4 bg-slate-200"></span>
                                            <span>{t.historyDetail.neighbor} 2: {data.nearFirst[1]}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100 mb-10"></div>

                            {/* Grid for Other Prizes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                                {/* 3 Digits */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t.historyDetail.front3}</h3>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {data.front3.map((n, i) => (
                                                <span key={i} className="text-2xl font-bold font-mono text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                                                    {n}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t.historyDetail.back3}</h3>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {data.back3.map((n, i) => (
                                                <span key={i} className="text-2xl font-bold font-mono text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                                                    {n}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Last 2 Digits Highlight */}
                                <div className="flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl border border-red-100 p-8">
                                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">{t.historyDetail.last2}</h3>
                                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-mono">
                                        {data.last2}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                            <span>{t.historyDetail.draw}: {data.date}</span>
                            <span>{t.historyDetail.source}</span>
                        </div>
                    </div>

                    {/* 3. PRIZE BREAKDOWN (Text-based SEO Content) */}
                    <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            {t.historyDetail.breakdownTitle}
                        </h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-600">
                                {t.historyDetail.breakdownDesc} <strong>{data.date}</strong> {t.historyDetail.breakdownDescSuffix}
                            </p>
                            <h3 className="text-lg font-bold mt-6 mb-4">{t.historyDetail.secondPrizes}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {data.secondPrize && data.secondPrize.map((n, i) => (
                                    <div key={i} className="font-mono text-slate-600 bg-slate-50 p-2 text-center rounded border border-slate-100 text-sm">
                                        {n}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-400 mt-6 italic">
                                {t.historyDetail.verifyWarning}
                            </p>
                        </div>
                    </section>

                    {/* 4. NAVIGATION SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Note: In a real app, links would be dynamic based on date */}
                        <Link href="/history" className="p-4 border border-slate-200 rounded-xl bg-white hover:border-red-300 hover:shadow-md transition-all group">
                            <div className="text-xs text-slate-400 mb-1 group-hover:text-primary flex items-center gap-1">
                                <ChevronLeft className="w-3 h-3" /> {t.historyDetail.prevDraw}
                            </div>
                            <div className="font-bold text-slate-700">{t.historyDetail.exploreOld}</div>
                        </Link>
                        <Link href="/history" className="p-4 border border-slate-200 rounded-xl bg-white hover:border-red-300 hover:shadow-md transition-all group text-right">
                            <div className="text-xs text-slate-400 mb-1 group-hover:text-primary flex items-center justify-end gap-1">
                                {t.historyDetail.nextDraw} <ChevronRight className="w-3 h-3" />
                            </div>
                            <div className="font-bold text-slate-700">{t.historyDetail.checkNew}</div>
                        </Link>
                    </div>

                    {/* 6. FAQ SECTION (Contextual) */}
                    <section className="space-y-6 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            {t.historyDetail.faqTitle}
                        </h2>

                        <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-700 hover:bg-slate-50 select-none">
                                {t.historyDetail.q1} {data.date}?
                                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="p-4 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50">
                                {t.historyDetail.a1}
                            </div>
                        </details>

                        <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-700 hover:bg-slate-50 select-none">
                                {t.historyDetail.q2}
                                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="p-4 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50">
                                {t.historyDetail.a2}
                            </div>
                        </details>

                    </section>

                </div>
            </div>
        </div>
    );
}
