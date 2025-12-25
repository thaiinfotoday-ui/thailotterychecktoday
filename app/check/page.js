'use client';
import { useState } from 'react';
import { Search, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CheckIllustration } from '../components/Illustrations';

export default function CheckNumberPage() {
    const { t } = useLanguage();
    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null); // 'win', 'lose', 'error'
    const [loading, setLoading] = useState(false);
    const [drawData, setDrawData] = useState(null);

    const handleCheck = async (e) => {
        e.preventDefault();
        if (!number || number.length < 2) return;

        setLoading(true);
        setResult(null);
        setDrawData(null);

        try {
            // Fetch LIVE current draw data
            const res = await fetch('/api/thai-lottery');
            if (!res.ok) throw new Error("Failed to fetch live data");
            const data = await res.json();
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

        } catch (err) {
            console.error(err);
            setResult({ status: 'error', msg: t.check.error });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">

            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center max-w-2xl">
                    <CheckIllustration className="w-40 h-40 mx-auto mb-8 drop-shadow-xl hover:scale-105 transition-transform duration-500" />
                    <h1 className="text-3xl font-black text-slate-900 mb-4">{t.check.title}</h1>
                    <p className="text-slate-500 mb-8">
                        {t.check.subtitle} <span className="font-bold text-purple-600">{t.check.subtitleHighlight}</span>.
                    </p>

                    <form onSubmit={handleCheck} className="max-w-md mx-auto flex flex-col gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                placeholder={t.check.placeholder}
                                className="w-full text-center text-4xl font-mono font-bold tracking-[0.2em] py-6 px-4 border-2 border-slate-200 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 placeholder:text-slate-300 placeholder:text-lg placeholder:tracking-normal placeholder:font-sans transition-all text-slate-900 shadow-sm"
                                value={number}
                                onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                            />
                            {number && (
                                <button
                                    type="button"
                                    onClick={() => setNumber('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 p-2"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || number.length < 2}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" /> {t.check.checkingBtn}
                                </>
                            ) : (
                                <>
                                    <Search className="w-6 h-6" /> {t.check.checkBtn}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* RESULT DISPLAY */}
                {result && (
                    <div className={`rounded-3xl p-8 text-center shadow-lg border-2 animate-in fade-in zoom-in duration-300 ${result.status === 'win' ? 'bg-green-50 border-green-200' :
                        result.status === 'lose' ? 'bg-red-50 border-red-100' : 'bg-slate-100 border-slate-200'
                        }`}>
                        {result.status === 'win' && (
                            <>
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-black text-green-700 mb-2">{t.check.winTitle}</h2>
                                <p className="text-green-600 mb-4">{t.check.winMatch}</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {result.types.map(t => (
                                        <span key={t} className="px-3 py-1 bg-green-200 text-green-800 font-bold rounded-lg text-sm uppercase">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}

                        {result.status === 'lose' && (
                            <>
                                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <XCircle className="w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-bold text-red-700 mb-2">{t.check.loseTitle}</h2>
                                <p className="text-red-500">
                                    {t.check.loseDesc} ({drawData?.date}).
                                </p>
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

                {/* Hint */}
                {!result && !loading && (
                    <div className="text-center text-slate-400 text-sm mt-8">
                        {t.check.disclaimer}
                    </div>
                )}
            </div>

            {/* SEO GUIDE & CONTENT */}
            <div className="container mx-auto px-4 pb-12 max-w-3xl">
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mt-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.checkContent?.guideTitle}</h2>

                    <ul className="space-y-4 mb-10">
                        {t.checkContent?.guideSteps.map((step, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    {i + 1}
                                </div>
                                <p className="text-slate-600 leading-relaxed pt-1">
                                    {step.split('**').map((part, index) =>
                                        index % 2 === 1 ? <strong key={index} className="text-slate-900">{part}</strong> : part
                                    )}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">{t.checkContent?.benefitsTitle}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {t.checkContent?.benefitsText.split('**').map((part, index) =>
                                index % 2 === 1 ? <strong key={index} className="text-slate-900">{part}</strong> : part
                            )}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
