'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';
import { LiveIllustration } from '../components/Illustrations2';

export default function LatestClient({ data, error }) {
    const { t } = useLanguage();

    if (error || !data) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-xl font-bold text-slate-800 mb-2">{t.latest.serviceUnavailable}</h1>
                <p className="text-slate-500 mb-4">{error || "No data"}</p>
                <Link href="/" className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                    {t.latest.returnHome}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <LiveIllustration className="w-24 h-24 mx-auto mb-6" />
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span> {t.latest.liveUpdate}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                        {t.latest.title}
                    </h1>
                    <p className="text-slate-500 font-medium flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        {t.latest.drawDate}: <span className="text-purple-600 font-bold">{data.date}</span>
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-4xl">

                {/* Live Result Card */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-slate-100 relative">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

                    <div className="p-8 md:p-12 text-center">
                        {/* 1st */}
                        <div className="mb-10">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">{t.home.firstPrize}</h2>
                            <div className="text-7xl md:text-9xl font-black text-slate-900 font-mono tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-slate-900">
                                {data.results.first_prize}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">{t.home.front3}</h3>
                                <div className="flex justify-center gap-3">
                                    {data.results.front_three.map((n, i) => (
                                        <span key={i} className="text-2xl font-bold font-mono text-slate-800">{n}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">{t.home.back3}</h3>
                                <div className="flex justify-center gap-3">
                                    {data.results.back_three.map((n, i) => (
                                        <span key={i} className="text-2xl font-bold font-mono text-slate-800">{n}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                            <h3 className="text-sm font-bold text-purple-200 uppercase tracking-widest mb-2 relative z-10">{t.home.last2}</h3>
                            <div className="text-8xl font-black font-mono relative z-10">
                                {data.results.last_two}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                        <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {t.home.verified}: {data.source}
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/check" className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 font-semibold transition-colors">
                        {t.latest.checkTicket} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
}
