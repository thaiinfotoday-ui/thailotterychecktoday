'use client';

import { useState, useMemo } from 'react';
import { Search, TrendingUp, BarChart3, Info, AlertCircle, PieChart, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ArticleSchema from '../components/schema/ArticleSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

// Define props type
interface NumberFrequencyClientProps {
    initialData: any[];
}

export default function NumberFrequencyClient({ initialData }: NumberFrequencyClientProps) {
    const { t } = useLanguage();
    const [searchNumber, setSearchNumber] = useState('');
    const [numberType, setNumberType] = useState('last2'); // last2, front3, back3, first6

    // Calculate frequency from history data
    const frequencyData = useMemo(() => {
        const counts: Record<string, number> = {};

        initialData.forEach(item => {
            // Last 2 digits
            if (item.last2) {
                counts[`last2_${item.last2}`] = (counts[`last2_${item.last2}`] || 0) + 1;
            }

            // Front 3 digits
            if (item.front3 && Array.isArray(item.front3)) {
                item.front3.forEach(num => {
                    counts[`front3_${num}`] = (counts[`front3_${num}`] || 0) + 1;
                });
            }

            // Back 3 digits
            if (item.back3 && Array.isArray(item.back3)) {
                item.back3.forEach(num => {
                    counts[`back3_${num}`] = (counts[`back3_${num}`] || 0) + 1;
                });
            }

            // First prize (last 2, last 3, last 4 digits)
            if (item.first) {
                const first = item.first.toString();
                if (first.length === 6) {
                    // Last 2 of first prize
                    const last2 = first.slice(-2);
                    counts[`first_last2_${last2}`] = (counts[`first_last2_${last2}`] || 0) + 1;
                    // Last 3 of first prize
                    const last3 = first.slice(-3);
                    counts[`first_last3_${last3}`] = (counts[`first_last3_${last3}`] || 0) + 1;
                }
            }
        });

        return counts;
    }, [initialData]);

    // Filter and sort results
    const filteredResults = useMemo(() => {
        const prefix = numberType === 'last2' ? 'last2_' :
            numberType === 'front3' ? 'front3_' :
                numberType === 'back3' ? 'back3_' :
                    'first_last2_';

        let results = Object.entries(frequencyData)
            .filter(([key]) => key.startsWith(prefix))
            .map(([key, count]) => ({
                number: key.replace(prefix, ''),
                count,
                percentage: ((count / initialData.length) * 100).toFixed(1)
            }))
            .sort((a, b) => b.count - a.count);

        if (searchNumber) {
            results = results.filter(r => r.number.includes(searchNumber));
        }

        return results;
    }, [frequencyData, numberType, searchNumber, initialData.length]);

    // Get specific number frequency
    const getNumberFrequency = (num) => {
        const prefix = numberType === 'last2' ? 'last2_' :
            numberType === 'front3' ? 'front3_' :
                numberType === 'back3' ? 'back3_' :
                    'first_last2_';
        return frequencyData[`${prefix}${num}`] || 0;
    };

    const searchedFrequency = searchNumber ? getNumberFrequency(searchNumber) : null;

    // Determine title based on type (Micro-Semantics)
    const getChartTitle = () => {
        switch (numberType) {
            case 'last2': return "2-Digit Suffix Frequency";
            case 'front3': return "3-Digit Prefix Frequency";
            case 'back3': return "3-Digit Suffix Frequency";
            case 'first_last2': return "First Prize (Last 2) Distribution";
            default: return "Number Frequency";
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header - Semantic Clustering: "Statistical Analysis" */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase mb-4 border border-blue-100">
                        <Database className="w-3 h-3" />
                        Statistical Data
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BarChart3 className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                            Thai Lottery Frequency Analysis
                        </h1>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Comprehensive dataset visualization showing the <strong className="text-slate-700">historical occurrence rate</strong> of specific Thai Lottery numbers across all prize tiers.
                    </p>
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800 text-left">
                                <strong>Analyst Note:</strong> This data reflects historical Thai Lottery distributions. While patterns (clusters) may appear, each draw remains an independent probability event.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <a href="/check" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                            Verify Winning Numbers <Search className="w-4 h-4" />
                        </a>
                        <a href="/history" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors hover:underline flex items-center gap-1">
                            Full Archive <BarChart3 className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Search Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Number Type Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Prize Category Filter
                            </label>
                            <div className="relative">
                                <PieChart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    value={numberType}
                                    onChange={(e) => setNumberType(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-red-500 appearance-none bg-white"
                                >
                                    <option value="last2">2-Down (2 Digits)</option>
                                    <option value="front3">3-Up Prefix (Front 3)</option>
                                    <option value="back3">3-Up Suffix (Back 3)</option>
                                    <option value="first_last2">First Prize Tail (Last 2)</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Query Specific Integer
                            </label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchNumber}
                                    onChange={(e) => setSearchNumber(e.target.value.replace(/\D/g, ''))}
                                    placeholder={`Enter ${numberType === 'last2' ? '2' : '3'} digit number`}
                                    maxLength={numberType === 'last2' ? 2 : 3}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-red-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Searched Number Result */}
                    {searchedFrequency !== null && searchedFrequency > 0 && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-in zoom-in-50 duration-300">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-semibold text-slate-900">
                                        Number <span className="text-primary font-black text-lg">{searchNumber}</span> recorded frequency:
                                    </p>
                                    <p className="text-2xl font-black text-primary">
                                        {searchedFrequency} occurrences
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        Found in {initialData.length} analyzed draws ({((searchedFrequency / initialData.length) * 100).toFixed(1)}% probability density)
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {searchedFrequency === 0 && searchNumber && (
                        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-slate-400" />
                                <p className="text-slate-600">
                                    Number <span className="font-semibold">{searchNumber}</span> has <span className="underline decoration-wavy decoration-red-400">zero recorded occurrences</span> in this dataset.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-slate-400" />
                            {getChartTitle()}
                        </h2>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                            Dataset: {filteredResults.length} Items
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Number</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Count</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dist %</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Visualization</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredResults.slice(0, 100).map((item, index) => {
                                    const maxCount = Math.max(...filteredResults.map(r => r.count));
                                    const barWidth = (item.count / maxCount) * 100;

                                    return (
                                        <tr key={item.number} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${index < 3 ? 'bg-yellow-100 text-yellow-700' : 'text-slate-400 bg-slate-100'}`}>
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-lg font-mono font-bold text-slate-900">{item.number}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-700 font-semibold">{item.count}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-600 text-sm">{item.percentage}%</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-full bg-slate-100 rounded-full h-2">
                                                    <div
                                                        className="bg-primary/80 h-2 rounded-full transition-all"
                                                        style={{ width: `${barWidth}%` }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredResults.length === 0 && (
                        <div className="p-12 text-center text-slate-500">
                            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                            <p>No results found. Try a different search or number type.</p>
                        </div>
                    )}
                </div>

                <ArticleSchema
                    title="Thai Lottery Number Frequency Analysis (2025)"
                    description="Statistical frequency distribution of Thai Lottery numbers including 2-Down, 3-Up, and First Prize trailing digits based on historical draw data."
                />

                {/* Disclaimer */}
                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-1">Statistical Disclaimer:</p>
                            <p>
                                This tool visualizes historical data ("frequency distribution"). It does not imply predictive capability.
                                Lottery outcomes are mathematically independent events.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "What is the most frequently drawn Thai Lottery number?", answer: "Our data analysis shows the top recurring 2-digit numbers based on historical frequency. Check the 'Rank #1' position in the chart above for the current leader." },
                    { question: "How do these lottery statistics work?", answer: "We aggregate over 10 years of official outcome data and calculate the occurrence count for every possible number (00-99 and 000-999) to visualize distribution patterns." },
                    { question: "Can statistics predict the next winning number?", answer: "No. Mathematically, every lottery draw is an independent event with equal probability. Statistics only show past trends, not future certainty." },
                    { question: "What is a 'Hot Number' in Thai Lottery?", answer: "A 'Hot Number' refers to a digit or set that has appeared more frequently than average in recent draws." },
                    { question: "What is a 'Cold Number'?", answer: "A 'Cold Number' is one that has not been drawn for a long period, which some players believe is 'due' to appear, though this is a gambler's fallacy." },
                    { question: "Do you analyze specific prize categories?", answer: "Yes, you can filter our charts to analyze frequency specifically for First Prize, Front 3, Back 3, or Last 2 Digits separately." },
                    { question: "Why do some numbers seem to win more often?", answer: "Over a short sample size, variance is normal. Over infinite draws, all numbers should statistically even out. The peaks you see are natural variance in a random system." },
                    { question: "How often is this data updated?", answer: "Our statistical database is recalculated immediately following every official draw announcement on the 1st and 16th of the month." },
                    { question: "Can I search for my lucky number's history?", answer: "Yes, use the 'Query Specific Integer' tool above to see exactly how many times your favorite number has appeared in the past." },
                    { question: "Is this data from the official Government Lottery Office?", answer: "Yes, all raw data points used for these calculations are sourced directly from verified GLO result announcements." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "What is the most frequently drawn Thai Lottery number?", answer: "Our data analysis shows the top recurring 2-digit numbers based on historical frequency. Check the 'Rank #1' position in the chart above for the current leader." },
                    { question: "How do these lottery statistics work?", answer: "We aggregate over 10 years of official outcome data and calculate the occurrence count for every possible number (00-99 and 000-999) to visualize distribution patterns." },
                    { question: "Can statistics predict the next winning number?", answer: "No. Mathematically, every lottery draw is an independent event with equal probability. Statistics only show past trends, not future certainty." },
                    { question: "What is a 'Hot Number' in Thai Lottery?", answer: "A 'Hot Number' refers to a digit or set that has appeared more frequently than average in recent draws." },
                    { question: "What is a 'Cold Number'?", answer: "A 'Cold Number' is one that has not been drawn for a long period, which some players believe is 'due' to appear, though this is a gambler's fallacy." },
                    { question: "Do you analyze specific prize categories?", answer: "Yes, you can filter our charts to analyze frequency specifically for First Prize, Front 3, Back 3, or Last 2 Digits separately." },
                    { question: "Why do some numbers seem to win more often?", answer: "Over a short sample size, variance is normal. Over infinite draws, all numbers should statistically even out. The peaks you see are natural variance in a random system." },
                    { question: "How often is this data updated?", answer: "Our statistical database is recalculated immediately following every official draw announcement on the 1st and 16th of the month." },
                    { question: "Can I search for my lucky number's history?", answer: "Yes, use the 'Query Specific Integer' tool above to see exactly how many times your favorite number has appeared in the past." },
                    { question: "Is this data from the official Government Lottery Office?", answer: "Yes, all raw data points used for these calculations are sourced directly from verified GLO result announcements." }
                ]} />
            </div>
        </div>
    );
}
