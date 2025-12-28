import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, RefreshCw, Trophy, Hash, ArrowRight, ArrowLeft, Info, Home } from 'lucide-react';
import { getDrawByDate } from '@/lib/lotteryService';

// ISR: Regenerate page every 1 hour
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
    const { date } = await params;
    return {
        title: `Thai Lottery Results – ${date}`,
        description: `Official Thai Lottery results for ${date}. Check winning numbers, first prize, and 3-digit prizes.`,
    };
}

export default async function ResultPage({ params }: { params: Promise<{ date: string }> }) {
    const { date } = await params;

    // Fetch safe data (Static First + DB/Live Fallback)
    const data = await getDrawByDate(date);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Results Pending or Unavailable</h1>
                    <p className="text-slate-500 mb-6">We could not find the official results for {date} yet.</p>
                    <Link href="/" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-red-700 transition font-bold">
                        Check Latest Results
                    </Link>
                </div>
            </div>
        );
    }

    // If we got data, but the date doesn't match the requested URL (should be caught by getDrawByDate logic, but safety first)
    // Actually getDrawByDate only returns if date matches. So we are good.

    const { first: first_prize, last2: last_two, front3: front_three, back3: back_three } = data as any;
    // Map data fields if names differ (getDrawByDate returns { first, last2, front3, back3 })
    // Results page expects { results: { first_prize ... } } or we adapt below.
    // The previous code destructured `const { results } = data;`.
    // My new `getDrawByDate` returns flat object { date, first, last2... }.
    // So I need to adapt the variables below.

    // Create a 'results' object to match previous usage in JSX
    const results = {
        first_prize: data.first,
        last_two: data.last2,
        front_three: data.front3,
        back_three: data.back3
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
            {/* Header / Nav */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                            Official Source Verified
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero / Title */}
            <header className="bg-white border-b border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <div className="container mx-auto px-4 py-12 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Thai Lottery Results
                    </h1>
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-slate-600 font-mono font-bold text-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                        {data.date}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">

                {/* Result Cards Layout */}
                <div className="space-y-8">

                    {/* First Prize - Hero Card */}
                    <section className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                        <h2 className="text-red-100 font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-400" /> First Prize
                        </h2>
                        <div className="text-6xl md:text-8xl font-black font-mono tracking-wider tabular-nums drop-shadow-lg">
                            {results.first_prize || '------'}
                        </div>
                        <p className="mt-8 text-red-200 text-sm">
                            Official 6-digit winning number
                        </p>
                    </section>

                    {/* Secondary Prizes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 3 Digits */}
                        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
                                <Hash className="w-4 h-4 text-blue-500" /> 3-Digit Prizes
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 mb-2">Front 3 Digits</span>
                                    <div className="flex gap-4">
                                        {results.front_three && results.front_three.map((num, i) => (
                                            <div key={i} className="flex-1 bg-blue-50 rounded-xl py-3 text-center text-2xl font-bold font-mono text-blue-900 border border-blue-100">
                                                {num}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 my-4"></div>
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 mb-2">Back 3 Digits</span>
                                    <div className="flex gap-4">
                                        {results.back_three && results.back_three.map((num, i) => (
                                            <div key={i} className="flex-1 bg-indigo-50 rounded-xl py-3 text-center text-2xl font-bold font-mono text-indigo-900 border border-indigo-100">
                                                {num}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2 Digits */}
                        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
                                <Hash className="w-4 h-4 text-primary" /> 2-Digit Prize
                            </h3>

                            <div className="flex-1 flex flex-col justify-center items-center">
                                <div className="w-full bg-red-50 rounded-2xl py-8 text-center border border-red-100">
                                    <span className="text-6xl font-black font-mono text-primary block mb-2">
                                        {results.last_two || '--'}
                                    </span>
                                    <span className="text-xs font-bold text-red-400 uppercase">Last 2 Digits</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/results/prev" className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-red-300 transition-all text-left">
                            <span className="text-xs text-slate-400 font-bold uppercase mb-1 block group-hover:text-primary">Previous Draw</span>
                            <span className="flex items-center gap-2 font-bold text-slate-800">
                                <ArrowLeft className="w-4 h-4" /> View History
                            </span>
                        </Link>
                        <Link href="/latest" className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-red-300 transition-all text-right">
                            <span className="text-xs text-slate-400 font-bold uppercase mb-1 block group-hover:text-primary">Latest Updates</span>
                            <span className="flex items-center gap-2 font-bold text-slate-800 justify-end">
                                Check Now <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>

                </div>

                {/* Info / Disclaimer */}
                <footer className="mt-16 border-t border-slate-200 pt-8 text-center">
                    <div className="bg-slate-100 inline-flex items-start gap-3 p-4 rounded-xl text-left max-w-2xl">
                        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-slate-500 leading-relaxed">
                            <strong className="block text-slate-700 mb-1">Informational Notice</strong>
                            This page provides informational results only. We do not sell lottery tickets, provide predictions, or offer gambling services.
                            Please verify all results with the official Government Lottery Office (GLO) before claiming any prizes.
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

// Add these if you want to statically generate some paths,
// otherwise dynamic routes work on demand.
// export async function generateStaticParams() { return [] }
