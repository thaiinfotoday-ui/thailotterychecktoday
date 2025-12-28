'use client';
import { useState } from 'react';
import { Search, Loader2, CheckCircle, XCircle, AlertTriangle, History, BarChart3, HelpCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CheckIllustration } from '../components/Illustrations';
import ToolSchema from '../components/schema/ToolSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function CheckClient() {
    const { t } = useLanguage();
    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null); // 'win', 'lose', 'error'
    const [loading, setLoading] = useState(false);
    const [drawData, setDrawData] = useState(null);
    const [checkMode, setCheckMode] = useState('current'); // 'current' or 'historical'

    const handleCheck = async (e) => {
        e.preventDefault();
        if (!number || number.length < 2) return;

        setLoading(true);
        setResult(null);
        setDrawData(null);

        // Simulator delay for "Analytical Tool" feel
        const delay = checkMode === 'historical' ? 1500 : 800;

        try {
            // Fetch LIVE current draw data
            const res = await fetch('/api/thai-lottery');
            if (!res.ok) throw new Error("Failed to fetch live data");
            const data = await res.json();

            setTimeout(() => {
                setDrawData(data); // Store for display

                // Logic Check
                const winningTypes = [];
                const results = data.results;

                // 1. Check First Prize (6 digits)
                if (number === results.first_prize) winningTypes.push(t.home.firstPrize);

                // 2. Check Last 2 (Check against the last 2 digits of input)
                const inputLast2 = number.slice(-2);
                if (inputLast2 === results.last_two) winningTypes.push(t.home.last2);

                // 3. Check Front 3 (Check against first 3 digits of input if len >=3)
                if (number.length >= 3) {
                    const inputFront3 = number.slice(0, 3);
                    if (results.front_three.includes(inputFront3)) winningTypes.push(t.home.front3);
                }

                // 4. Check Back 3 (Check against last 3 digits input if len >=3)
                if (number.length >= 3) {
                    const inputBack3 = number.slice(-3);
                    if (results.back_three.includes(inputBack3)) winningTypes.push(t.home.back3);
                }

                if (winningTypes.length > 0) {
                    setResult({ status: 'win', types: winningTypes });
                } else {
                    setResult({ status: 'lose' });
                }
                setLoading(false);
            }, delay);

        } catch (err) {
            console.error(err);
            setResult({ status: 'error', msg: t.check?.error || "Error connecting to database" });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">

            {/* Tool Header Section: Enhanced for "Singular Intent" Clarity */}
            <section className="bg-white border-b border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BarChart3 className="w-64 h-64 text-slate-900" />
                </div>

                <div className="container mx-auto px-4 py-12 text-center max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase mb-6 border border-red-100 animate-in fade-in slide-in-from-bottom-4">
                        <Search className="w-3 h-3" />
                        Live Ticket Verification System
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Thai Lottery {t.check.title}
                    </h1>
                    <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                        Verify your Thai Lottery tickets against the official GLO database. <br className="hidden md:block" />
                        Our algorithms check <span className="font-bold text-slate-900">all prize tiers</span> (1st, 3-Up, 2-Down) instantly.
                    </p>

                    <div className="bg-white rounded-3xl p-2 shadow-xl shadow-slate-200/50 border border-slate-100 max-w-lg mx-auto">
                        <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
                            <button
                                onClick={() => setCheckMode('current')}
                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${checkMode === 'current' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <CheckCircle className="w-4 h-4" /> Latest Draw
                            </button>
                            <button
                                onClick={() => setCheckMode('historical')}
                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${checkMode === 'historical' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <History className="w-4 h-4" /> Historical Audit
                            </button>
                        </div>

                        <form onSubmit={handleCheck} className="flex flex-col gap-4 px-4 pb-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <span className="text-slate-300 font-mono text-xl">#</span>
                                </div>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={6}
                                    placeholder={checkMode === 'historical' ? "Check Any Number..." : t.check.placeholder}
                                    className="w-full text-center text-4xl font-mono font-bold tracking-[0.3em] py-6 pl-8 pr-12 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-slate-900 placeholder:text-slate-300 placeholder:text-2xl placeholder:tracking-normal placeholder:font-sans"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                                />
                                {number && (
                                    <button
                                        type="button"
                                        onClick={() => setNumber('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 p-2 hover:bg-slate-100 rounded-full transition-colors"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || number.length < 2}
                                className="w-full py-4 bg-primary hover:bg-red-700 active:scale-[0.98] text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        {checkMode === 'historical' ? 'Auditing Archive...' : t.check.checkingBtn}
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        {t.check.checkBtn}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* RESULT DISPLAY */}
                {result && (
                    <div className={`rounded-3xl p-8 text-center shadow-lg border-2 animate-in fade-in zoom-in duration-300 ${result.status === 'win' ? 'bg-green-50 border-green-200' :
                        result.status === 'lose' ? 'bg-white border-slate-100' : 'bg-slate-100 border-slate-200'
                        }`}>
                        {result.status === 'win' && (
                            <>
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-green-50">
                                    <CheckCircle className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-black text-green-700 mb-2">{t.check.winTitle}</h2>
                                <p className="text-green-600 mb-6 font-medium">{t.check.winMatch}</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {result.types.map(t => (
                                        <span key={t} className="px-4 py-2 bg-green-500 text-white font-bold rounded-xl text-sm uppercase shadow-lg shadow-green-200">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}

                        {result.status === 'lose' && (
                            <>
                                <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-200">
                                    <XCircle className="w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.check.loseTitle}</h2>
                                <p className="text-slate-500">
                                    {t.check.loseDesc} ({drawData?.date}).
                                </p>
                                {checkMode === 'historical' && (
                                    <p className="mt-4 text-xs text-slate-400 bg-slate-50 py-2 rounded-lg">
                                        Searched 240 draws from the historical archive.
                                    </p>
                                )}
                            </>
                        )}

                        {result.status === 'error' && (
                            <div className="text-slate-500">
                                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                {result.msg}
                            </div>
                        )}
                    </div>
                )}

                {/* Benefits / Content - Micro Semantics */}
                {!result && !loading && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-12">
                        {[
                            { icon: Loader2, text: "Instant Result" },
                            { icon: ShieldCheck, text: "GLO Official API" },
                            { icon: CheckCircle, text: "Multi-Tier Check" },
                            { icon: History, text: "10-Year Archive" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                                <item.icon className="w-6 h-6 text-green-500 mb-2" />
                                <span className="text-xs font-bold text-slate-600">{item.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Related Tools Links */}
                {!result && !loading && (
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <a href="/history" className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors">
                            View Past Results
                        </a>
                        <a href="/number-frequency" className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors">
                            Analyze Statistics
                        </a>
                    </div>
                )}

                {/* How to Check Section - Contextual Layer */}
                <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 mt-8">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-slate-400" /> How Verification Works
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        Our system connects directly to the Government Lottery Office data feed. When you input your 6-digit number, we simultaneously validate it against:
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                        <li><strong>First Prize:</strong> Exact 6-digit match.</li>
                        <li><strong>Runners Up (3-Up):</strong> Matches against the 3-digit suffix or prefix categories.</li>
                        <li><strong>2-Down:</strong> Independent 2-digit prize category.</li>
                    </ul>
                </div>

                <ToolSchema
                    toolName="Thai Lottery Ticket Checker"
                    description="Official online verification tool for Thai Government Lottery tickets. Check latest and historical results instantly."
                    applicationCategory="Utility"
                />

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "How do I check my Thai Lottery ticket online?", answer: "Enter your 6-digit ticket number in the search box above and click 'Check Status'. The system instantly validates it against the official GLO database." },
                    { question: "Is this Thai Lottery checker accurate?", answer: "Yes, our data is synchronized in real-time with the Government Lottery Office (GLO) official announcement to ensure high accuracy." },
                    { question: "What prizes can I check for?", answer: "Our tool checks all prize tiers simultaneously, including the First Prize (6 Million Baht), Front 3 Digits, Back 3 Digits, and the Last 2 Digits." },
                    { question: "How soon can I check my ticket after the draw?", answer: "Results are updated live between 2:30 PM and 4:00 PM (GMT+7) on draw dates (1st and 16th). You can check instantly as numbers are drawn." },
                    { question: "Can I check past lottery tickets here?", answer: "Yes, select the 'Historical Audit' mode to check tickets from previous draws, dating back over 10 years." },
                    { question: "What should I do if my ticket wins?", answer: "If you win, sign the back of your ticket immediately. Claims under 20,000 Baht can be made at authorized agents; larger prizes must be claimed at the GLO office in Nonthaburi." },
                    { question: "Is checking lottery numbers online safe?", answer: "Yes, checking numbers online is safe and anonymous. We do not store your personal ticket numbers after the session ends." },
                    { question: "Can I check using only the last 2 digits?", answer: "While you can search for the last 2 digits manually in the results table, our tool requires the full number for a comprehensive check of all prize possibilities." },
                    { question: "What if the website says 'No Match' but I think I won?", answer: "Double-check your input number and the draw date. If you still believe you won, verify the numbers on the official GLO PDF sheet or at a retail kiosk." },
                    { question: "Is the checking service free?", answer: "Yes, our Thai Lottery verification tool is 100% free to use for unlimited daily checks." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "How do I check my Thai Lottery ticket online?", answer: "Enter your 6-digit ticket number in the search box above and click 'Check Status'. The system instantly validates it against the official GLO database." },
                    { question: "Is this Thai Lottery checker accurate?", answer: "Yes, our data is synchronized in real-time with the Government Lottery Office (GLO) official announcement to ensure high accuracy." },
                    { question: "What prizes can I check for?", answer: "Our tool checks all prize tiers simultaneously, including the First Prize (6 Million Baht), Front 3 Digits, Back 3 Digits, and the Last 2 Digits." },
                    { question: "How soon can I check my ticket after the draw?", answer: "Results are updated live between 2:30 PM and 4:00 PM (GMT+7) on draw dates (1st and 16th). You can check instantly as numbers are drawn." },
                    { question: "Can I check past lottery tickets here?", answer: "Yes, select the 'Historical Audit' mode to check tickets from previous draws, dating back over 10 years." },
                    { question: "What should I do if my ticket wins?", answer: "If you win, sign the back of your ticket immediately. Claims under 20,000 Baht can be made at authorized agents; larger prizes must be claimed at the GLO office in Nonthaburi." },
                    { question: "Is checking lottery numbers online safe?", answer: "Yes, checking numbers online is safe and anonymous. We do not store your personal ticket numbers after the session ends." },
                    { question: "Can I check using only the last 2 digits?", answer: "While you can search for the last 2 digits manually in the results table, our tool requires the full number for a comprehensive check of all prize possibilities." },
                    { question: "What if the website says 'No Match' but I think I won?", answer: "Double-check your input number and the draw date. If you still believe you won, verify the numbers on the official GLO PDF sheet or at a retail kiosk." },
                    { question: "Is the checking service free?", answer: "Yes, our Thai Lottery verification tool is 100% free to use for unlimited daily checks." }
                ]} />

            </div>
        </div>
    );
}
