'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Award, ExternalLink, RefreshCw, ChevronRight, HelpCircle, ShieldCheck, Zap } from 'lucide-react';
import { HeroIllustration, SecureIllustration, StatsIllustration, WinnerIllustration } from './Illustrations';

export default function HomeClient({ initialData, history, latestPosts }) {
    const { t, lang } = useLanguage();

    // If initialData failed (passed as null or error from server), usage fallback?
    // We assume server component handled error or passed minimal structure.
    const data = initialData || {
        date: 'N/A',
        source: 'Unavailable',
        results: { first_prize: '------', last_two: '--', front_three: [], back_three: [] }
    };

    return (
        <div className="flex flex-col gap-16 pb-12">

            {/* 1. HERO SECTION & TODAY RESULTS */}
            <section className="bg-slate-50 border-b border-slate-200 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#6b21a8 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                {/* Hero Illustration Background */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                    <HeroIllustration className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">

                        {/* Left: Text Content */}
                        <div className="flex-1 space-y-8 pt-4">
                            {/* Live Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-bold uppercase mb-[-10px] animate-in fade-in slide-in-from-bottom-2 w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Official Result Live
                            </div>

                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                    {t.title}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 block text-2xl md:text-4xl mt-3 font-bold">
                                        {data.date !== 'N/A' ? `${t.home.heroUpdate} ${data.date}` : t.home.heroTitleSuffix}
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed mt-6">
                                    {t.home.heroDesc}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/latest" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-purple-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-purple-200">
                                    {t.home.checkBtn} <ChevronRight className="w-5 h-5" />
                                </Link>
                                <Link href="/how-to" className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-2xl hover:border-purple-200 hover:text-purple-700 hover:bg-purple-50 transition-all flex items-center gap-2">
                                    {t.home.howToBtn}
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 text-sm font-semibold text-slate-400 pt-4">
                                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Verified GLO</span>
                                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Instant Update</span>
                            </div>
                        </div>

                        {/* Right: TODAY RESULTS CARD (Server Data) */}
                        <div className="w-full lg:w-[500px] shrink-0 transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(107,33,168,0.15)] border border-purple-50 overflow-hidden relative group ring-1 ring-slate-100">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />

                                {/* Card Header */}
                                <div className="p-8 pb-4 text-center border-b border-slate-50 bg-gradient-to-b from-white to-slate-50/50">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-600 mb-6 shadow-sm">
                                        <Calendar className="w-4 h-4 text-purple-500" />
                                        {data.date}
                                    </div>
                                    <div className="text-sm font-bold tracking-[0.2em] text-purple-400 uppercase mb-3">
                                        {t.home.firstPrize}
                                    </div>
                                    <div className="text-6xl md:text-7xl font-black text-slate-900 font-mono tracking-wider drop-shadow-sm">
                                        {data.results.first_prize || '------'}
                                    </div>
                                </div>

                                {/* Card Grid */}
                                <div className="p-8 pt-6 grid gap-6 bg-slate-50/50">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.home.front3}</span>
                                            <div className="flex justify-center gap-2 flex-wrap font-mono font-bold text-slate-800 text-xl">
                                                {data.results.front_three.length ? data.results.front_three.map(n => <span key={n} className="bg-slate-100 px-2 py-1 rounded-md">{n}</span>) : '-'}
                                            </div>
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.home.back3}</span>
                                            <div className="flex justify-center gap-2 flex-wrap font-mono font-bold text-slate-800 text-xl">
                                                {data.results.back_three.length ? data.results.back_three.map(n => <span key={n} className="bg-slate-100 px-2 py-1 rounded-md">{n}</span>) : '-'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-white flex items-center justify-between shadow-xl shadow-purple-200 relative overflow-hidden group/item">
                                        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                                            <Award className="w-32 h-32 rotate-12" />
                                        </div>
                                        <div className="relative z-10">
                                            <span className="block text-xs font-bold opacity-80 uppercase tracking-wider mb-1">{t.home.last2}</span>
                                            <span className="text-[10px] font-medium bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">{t.home.popular}</span>
                                        </div>
                                        <div className="text-6xl font-black font-mono tracking-tight relative z-10">
                                            {data.results.last_two || '--'}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-3 bg-white border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    {t.home.verified}: {data.source}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. WHY CHOOSE US - VISUAL SECTION */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="w-20 h-20 mb-6 relative">
                            <WinnerIllustration className="w-full h-full drop-shadow-md" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Lightning Fast</h3>
                        <p className="text-slate-500 leading-relaxed relative z-10">
                            Our automated system fetches results directly from the GLO signal within seconds of the official announcement.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="w-20 h-20 mb-6 relative">
                            <SecureIllustration className="w-full h-full drop-shadow-md" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">100% Verified</h3>
                        <p className="text-slate-500 leading-relaxed relative z-10">
                            We cross-reference data from multiple official sources (Sanook, Thairath) to ensure zero errors.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="w-20 h-20 mb-6 relative">
                            <StatsIllustration className="w-full h-full drop-shadow-md" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Deep Analytics</h3>
                        <p className="text-slate-500 leading-relaxed relative z-10">
                            Access 10+ years of historical data and frequency analysis to spot patterns and trends.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. QUICK TOOLS SECTION */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <span className="w-1 h-8 bg-purple-600 rounded-full"></span>
                    {t.tools.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: t.tools.checkTitle, desc: t.tools.checkDesc, href: "/check", icon: ExternalLink, color: "text-blue-500", bg: "bg-blue-50" },
                        { title: t.tools.historyTitle, desc: t.tools.historyDesc, href: "/history", icon: RefreshCw, color: "text-green-500", bg: "bg-green-50" },
                        { title: t.tools.statsTitle, desc: t.tools.statsDesc, href: "/thai-lottery-statistics", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
                        { title: t.tools.howToTitle, desc: t.tools.howToDesc, href: "/how-to", icon: HelpCircle, color: "text-orange-500", bg: "bg-orange-50" },
                    ].map((tool, i) => (
                        <Link key={i} href={tool.href} className="flex flex-col p-6 bg-white border border-slate-100 rounded-2xl hover:border-purple-200 hover:shadow-lg transition-all group">
                            <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <tool.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">{tool.title}</h3>
                            <p className="text-sm text-slate-500">{tool.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3.5. INFO & SEO CONTENT SECTION */}
            <section className="container mx-auto px-4">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6 relative inline-block">
                                <span className="absolute -left-6 top-0 text-purple-200 text-6xl -z-10 opacity-50">?</span>
                                {t.homeContent?.aboutTitle}
                            </h2>
                            <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                                {t.homeContent?.aboutText.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                            <div className="p-3 bg-green-100 text-green-700 rounded-xl shrink-0">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.homeContent?.scheduleTitle}</h3>
                                <p className="text-slate-600">
                                    {t.homeContent?.scheduleText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. RESULTS HISTORY (REAL DATA) */}
            <section className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        {t.table.title}
                    </h2>
                    <Link href="/history" className="text-purple-600 font-semibold text-sm hover:underline">
                        View All
                    </Link>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm md:w-1/4">{t.table.date}</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm hidden md:table-cell">{t.table.first}</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">{t.table.last2}</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">{t.table.action}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {/* Real Data Render */}
                            {history && history.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 text-slate-900 font-medium whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {row.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-mono hidden md:table-cell tracking-widest">{row.first}</td>
                                    <td className="px-6 py-4 text-purple-600 font-bold font-mono text-lg">{row.last2}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/history/${row.date}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-purple-100 text-slate-400 hover:text-purple-600 transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 5. LATEST BLOG POSTS */}
            {/* 5. LATEST BLOG POSTS */}
            {latestPosts && latestPosts.length > 0 && (
                <section className="container mx-auto px-4 pt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-1 h-8 bg-pink-500 rounded-full"></span>
                            Latest News & Guides
                        </h2>
                        <Link href="/blog" className="text-pink-600 font-semibold text-sm hover:underline">
                            Read Blog
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latestPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
                            >
                                <div className="h-32 bg-slate-100 flex items-center justify-center text-slate-300">
                                    {post.featured_image ? (
                                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl">📰</span>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="text-xs text-slate-400 mb-2 font-medium">
                                        {new Date(post.createdAt || post.published_at).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <span className="mt-auto text-xs font-bold text-slate-400 uppercase tracking-wide group-hover:text-pink-500 flex items-center gap-1">
                                        Read More <ChevronRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. FAQ SECTION - Accordion Style */}
            <section className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t.faq.title}</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {t.faq.items.map((faq, i) => (
                        <details key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm open:shadow-md transition-shadow">
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 select-none list-none">
                                <span>{faq.q}</span>
                                <span className="transform group-open:rotate-180 transition-transform duration-200">
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
                                </span>
                            </summary>
                            <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed text-sm animate-in slide-in-from-top-2 duration-200">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

        </div >
    );
}
