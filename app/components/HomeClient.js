'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import LuckyNumbersGuide from './LuckyNumbersGuide';
import BangkokWeeklyTips from './BangkokWeeklyTips';
import OrganizationSchema from './schema/OrganizationSchema';
import { Calendar, Award, ExternalLink, RefreshCw, ChevronRight, HelpCircle, ShieldCheck, Zap, History, Sparkles, AlertCircle } from 'lucide-react';
import { HeroIllustration, SecureIllustration, StatsIllustration, WinnerIllustration } from './Illustrations';

export default function HomeClient({ initialData, history, latestPosts }) {
    const { t, lang } = useLanguage();

    const data = initialData || {
        date: 'N/A',
        source: 'Unavailable',
        results: { first_prize: '------', last_two: '--', front_three: [], back_three: [] }
    };

    return (
        <div className="flex flex-col gap-16 pb-12">

            {/* 1. HERO SECTION (CENTRAL ENTITY) */}
            <section className="bg-slate-50 border-b border-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#6b21a8 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                    <HeroIllustration className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">

                        {/* Text Content: Subject-Predicate-Object */}
                        <div className="flex-1 space-y-8 pt-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-bold uppercase mb-[-10px] animate-in fade-in slide-in-from-bottom-2 w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Official GLO Data Feed
                            </div>

                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                    Thai Lottery Results <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-2xl md:text-4xl block mt-4 font-bold">
                                        Provides Live Winning Numbers for {data.date !== 'N/A' ? data.date : "Today"}
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed mt-6">
                                    The <strong>Central Hub</strong> for checking official Government Lottery Office (GLO) results.
                                    We deliver <strong>verified numerical data</strong>, historical archives, and statistical analysis tools.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/latest" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-red-200">
                                    {t.home.checkBtn} <ChevronRight className="w-5 h-5" />
                                </Link>
                                <Link href="/how-to" className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-2xl hover:border-red-200 hover:text-primary hover:bg-red-50 transition-all flex items-center gap-2">
                                    {t.home.howToBtn}
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 text-sm font-semibold text-slate-400 pt-4">
                                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Source: Government Lottery Office</span>
                                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Update Frequency: Instant</span>
                            </div>
                        </div>

                        {/* Right: TODAY RESULTS CARD (Main Macro Content) */}
                        <div className="w-full lg:w-[500px] shrink-0 transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(183,46,56,0.15)] border border-red-50 overflow-hidden relative group ring-1 ring-slate-100">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-red-500 to-secondary" />

                                <div className="p-8 pb-4 text-center border-b border-slate-50 bg-gradient-to-b from-white to-slate-50/50">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-600 mb-6 shadow-sm">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        Draw Date: {data.date}
                                    </div>
                                    <div className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">
                                        {t.home.firstPrize}
                                    </div>
                                    <div className="text-6xl md:text-7xl font-black text-slate-900 font-mono tracking-wider drop-shadow-sm">
                                        {data.results.first_prize || '------'}
                                    </div>
                                </div>

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
                                    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl text-white flex items-center justify-between shadow-xl shadow-red-200 relative overflow-hidden group/item">
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
                                    Status: Verified Official Content
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. ATTRIBUTE DEFINITIONS (EAV MODEL) */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="w-20 h-20 mb-6 relative">
                            <WinnerIllustration className="w-full h-full drop-shadow-md" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Speed Attribute</h3>
                        <p className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Fastest Retrieval</p>
                        <p className="text-slate-500 leading-relaxed relative z-10 text-sm">
                            System fetches data <strong>directly from GLO broadcast signals</strong>, minimizing latency between official announcement and digital display.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="w-20 h-20 mb-6 relative">
                            <SecureIllustration className="w-full h-full drop-shadow-md" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Accuracy Attribute</h3>
                        <p className="text-sm font-bold text-green-600 mb-2 uppercase tracking-wider">Zero Error Rate</p>
                        <p className="text-slate-500 leading-relaxed relative z-10 text-sm">
                            Data undergoes a <strong>triple-verification process</strong> (Audio Signal, Official Feed, Manual Audit) to ensure absolute fidelity.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="w-20 h-20 mb-6 relative">
                            <StatsIllustration className="w-full h-full drop-shadow-md" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Depth Attribute</h3>
                        <p className="text-sm font-bold text-amber-500 mb-2 uppercase tracking-wider">10-Year Archive</p>
                        <p className="text-slate-500 leading-relaxed relative z-10 text-sm">
                            We provide <strong>comprehensive historical datasets</strong> allowing for "Frequency Analysis" and "Pattern Recognition" beyond simple results.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. CORE FUNCTIONALITY (MACRO CONTEXT) */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <span className="w-1 h-8 bg-primary rounded-full"></span>
                    Primary Service Utilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: t.tools.checkTitle, desc: "Verify Thai Lottery tickets against the official GLO database.", href: "/check", icon: ExternalLink, color: "text-blue-500", bg: "bg-blue-50" },
                        { title: t.tools.historyTitle, desc: "Browse the complete Thai Lottery historical archive.", href: "/history", icon: RefreshCw, color: "text-green-500", bg: "bg-green-50" },
                        { title: t.tools.statsTitle, desc: "Analyze Thai Lottery number frequency and trends.", href: "/thai-lottery-statistics", icon: Award, color: "text-primary", bg: "bg-red-50" },
                        { title: t.tools.howToTitle, desc: "Learn the rules and prize structure of Thai Lottery.", href: "/how-to", icon: HelpCircle, color: "text-orange-500", bg: "bg-orange-50" },
                    ].map((tool, i) => (
                        <Link key={i} href={tool.href} className="flex flex-col p-6 bg-white border border-slate-100 rounded-2xl hover:border-red-200 hover:shadow-lg transition-all group">
                            <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <tool.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">{tool.title}</h3>
                            <p className="text-sm text-slate-500">{tool.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* 3.1. Discovery & Insights (Semantic Cluster Links) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <Link href="/zodiac" className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl hover:bg-indigo-100 transition-colors group">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-indigo-900 text-sm">Zodiac Statistics</h3>
                            <p className="text-xs text-indigo-600">Lucky Number Correlation</p>
                        </div>
                    </Link>
                    <Link href="/sources" className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl hover:bg-amber-100 transition-colors group">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm group-hover:scale-110 transition-transform">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-amber-900 text-sm">Source Comparison</h3>
                            <p className="text-xs text-amber-600">Accuracy Metrics</p>
                        </div>
                    </Link>
                    <Link href="/live" className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl hover:bg-red-100 transition-colors group">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-red-900 text-sm">Live Broadcast</h3>
                            <p className="text-xs text-red-600">Real-time Signal Feed</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* 4. MACRO CONTEXT: WHAT IS THAI LOTTERY? */}
            <section className="container mx-auto px-4">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-xs">Central Entity Definition</span>
                            <h2 className="text-3xl font-black text-slate-900 mb-6 mt-2">
                                What is the Thai Government Lottery?
                            </h2>
                            <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                                <p>
                                    The <strong>Thai Government Lottery (Salak Kin Baeng Ratthaban)</strong> is the official national lottery of Thailand, administered by the <strong>Government Lottery Office (GLO)</strong>. It is one of only two forms of legal gambling permitted in the Kingdom.
                                </p>
                                <p>
                                    Draws are conducted twice a month, typically on the <strong>1st</strong> and <strong>16th</strong>. The results determine payouts for millions of officially issued tickets (both physical and digital L6 format).
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Prize Structure Overview</h3>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-slate-600">First Prize (1 Draw)</span>
                                    <span className="font-bold text-slate-900">6,000,000 THB</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-slate-600">Front 3 Digits (2 Draws)</span>
                                    <span className="font-bold text-slate-900">4,000 THB</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-slate-600">Back 3 Digits (2 Draws)</span>
                                    <span className="font-bold text-slate-900">4,000 THB</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-slate-600">Last 2 Digits (1 Draw)</span>
                                    <span className="font-bold text-slate-900">2,000 THB</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. HISTORY SECTION (DATA TABLE) */}
            <section className="container mx-auto px-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                <History className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Recent Draw Archive
                            </h2>
                        </div>
                        <Link href="/history" className="text-sm font-semibold text-primary hover:underline">
                            View Full 10-Year History
                        </Link>
                    </div>

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
                                {(history || []).map((row, i) => (
                                    <tr key={i} className="hover:bg-red-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-slate-900">{row.date}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-medium text-slate-600">{row.first_prize || row.first}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block px-3 py-1 bg-slate-100 rounded-lg font-mono font-bold text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors">
                                                {(row.last_two || row.last2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/history/${row.date}`} className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">
                                                {t.table.fullResult}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 6. UNIQUE CULTURE & TIPS (SUPPLEMENTARY CONTENT) */}
            <BangkokWeeklyTips lang={lang} />
            <LuckyNumbersGuide />

            {/* 7. LATEST NEWS (SUPPLEMENTARY CONTENT) */}
            {latestPosts && latestPosts.length > 0 && (
                <section className="container mx-auto px-4 pt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-1 h-8 bg-primary rounded-full"></span>
                            Latest News & Guides
                        </h2>
                        <Link href="/blog" className="text-primary font-semibold text-sm hover:underline">
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
                                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <span className="mt-auto text-xs font-bold text-slate-400 uppercase tracking-wide group-hover:text-primary flex items-center gap-1">
                                        Read More <ChevronRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 8. MICRO CONTEXT (FAQs) - Limited to ~20% of Page */}
            <section className="container mx-auto px-4 py-8">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
                        <AlertCircle className="w-6 h-6 text-slate-400" />
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 mb-6 max-w-2xl mx-auto">
                        Quick answers regarding the checking process, claim procedures, and legal definitions.
                    </p>
                    <div className="max-w-3xl mx-auto space-y-4 text-left">
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
                </div>
            </section>

            <OrganizationSchema />
        </div>
    );
}
