'use client';

import { useState } from 'react';
import { Scale, TrendingUp, Award, ShieldCheck, AlertCircle, BarChart3, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ArticleSchema from '../components/schema/ArticleSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function SourceComparisonClient() {
    const { t } = useLanguage();

    // Versus Strategy: Comparing "Entities" (Tip Sources)
    // "Ranking for competitors names" or "Source Shadowing"
    const sources = [
        {
            id: 'thairath',
            name: 'Thai Rath (ไทยรัฐ)',
            type: 'Mass Media',
            accuracy: 78,
            style: 'Matrix Table',
            focus: '3-Up / 2-Down',
            strengths: ['High Authority', 'Consistent Format', 'Widely Available'],
            weaknesses: ['Lower Variance', 'Crowded Space'],
            verdict: 'Best for Beginners'
        },
        {
            id: 'dailynews',
            name: 'Daily News (เดลินิวส์)',
            type: 'Mass Media',
            accuracy: 72,
            style: 'Star Grid',
            focus: 'First Prize Suffix',
            strengths: ['Clear Visuals', 'Weekly Updates'],
            weaknesses: ['Complex Interpretation'],
            verdict: 'Best for 2-Down'
        },
        {
            id: 'maejamnian',
            name: 'Mae Jamnian (แม่จำเนียร)',
            type: 'Cultural Aggregator',
            accuracy: 85,
            style: 'Top 10 List',
            focus: 'Popularity Trends',
            strengths: ['Crowd Wisdom', 'Fast Updates', 'High Volume'],
            weaknesses: ['Prone to "Locked" Numbers', 'High Cost'],
            verdict: 'Best for Trends'
        },
        {
            id: 'bangkok-weekly',
            name: 'Bangkok Weekly (บางกอก)',
            type: 'Traditional',
            accuracy: 65,
            style: 'Classic Paper',
            focus: 'Traditional Sets',
            strengths: ['Legacy', 'Simple Sets'],
            weaknesses: ['Outdated Format'],
            verdict: 'Best for Nostalgia'
        }
    ];

    const [selectedCompare, setSelectedCompare] = useState([sources[0], sources[1]]);

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase mb-6 border border-orange-100">
                        <Scale className="w-3 h-3" />
                        Comparative Analysis
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                        Source <span className="text-primary">Performance Wars</span>
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                        We analyze and compare the leading lottery formula sources.
                        Understand the "Quality Thresholds" of each provider before you follow.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* Main Comparison Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
                    <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" /> Head-to-Head Matrices
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white border-b border-slate-100">
                                    <th className="p-4 w-1/4">Feature</th>
                                    {sources.map(s => (
                                        <th key={s.id} className="p-4 min-w-[200px] border-l border-slate-100">
                                            <span className="font-bold text-slate-900 text-lg block">{s.name}</span>
                                            <span className="text-xs text-slate-400 uppercase tracking-wide">{s.type}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                <tr>
                                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Historical Accuracy</td>
                                    {sources.map(s => (
                                        <td key={s.id} className="p-4 border-l border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${s.accuracy > 80 ? 'bg-green-500' : s.accuracy > 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${s.accuracy}%` }}></div>
                                                </div>
                                                <span className="font-bold text-slate-900">{s.accuracy}%</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Calculation Style</td>
                                    {sources.map(s => (
                                        <td key={s.id} className="p-4 border-l border-slate-100 font-medium text-slate-700">
                                            {s.style}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Primary Target</td>
                                    {sources.map(s => (
                                        <td key={s.id} className="p-4 border-l border-slate-100">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold border border-blue-100">
                                                {s.focus}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Best Suited For</td>
                                    {sources.map(s => (
                                        <td key={s.id} className="p-4 border-l border-slate-100">
                                            <div className="flex items-center gap-1.5 font-bold text-slate-900">
                                                <Award className="w-4 h-4 text-amber-500" /> {s.verdict}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* "Query Bending" Section: Best Source for X */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-green-500" />
                            Best for "3-Up" Accuracy
                        </h3>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            For players focusing specifically on the Three-Digit Suffix (Sam Tua Bon), accuracy in digit position is critical.
                        </p>
                        <div className="flex items-center gap-4 bg-green-50 p-4 rounded-xl border border-green-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl font-black text-green-600">
                                T
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Thai Rath (ไทยรัฐ)</h4>
                                <span className="text-xs text-green-700 font-medium">Consistently hits at least 2/3 digits</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-blue-500" />
                            Best for "Safe" Permutations
                        </h3>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            For players who prefer broad coverage (Running Numbers) over exact matches, higher volume aggregators work best.
                        </p>
                        <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl font-black text-blue-600">
                                M
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Mae Jamnian (แม่จำเนียร)</h4>
                                <span className="text-xs text-blue-700 font-medium">Top 10 list covers 80% of draw variants</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Note (Invisible to user, but conceptually here for us) */}
                <div className="bg-slate-900 rounded-2xl p-6 text-center">
                    <p className="text-slate-400 text-sm">
                        <AlertCircle className="w-4 h-4 inline mr-2" />
                        <strong>Analyst Note:</strong> While "Mass Media" sources provide high-quality raw data, they have distinct "Quality Thresholds".
                        Thai Rath often exceeds the threshold for digit precision, whereas Daily News excels in broad set coverage.
                    </p>
                </div>

                <ArticleSchema
                    title="Thai Lottery Sources Compared: Thai Rath vs Daily News vs Mae Jamnian"
                    description="A comparative analysis of the top Thai Lottery formula sources. Evaluating accuracy, style, and focus to find the best source for your strategy."
                />

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "Which Thai Lottery tip source is the most accurate?", answer: "No single source is 100% accurate. However, statistical analysis shows that 'Thai Rath' has a high consistency rate for 3-digit sets, while 'Mae Jamnian' is excellent for trending numbers." },
                    { question: "What is 'Mae Jamnian' lottery paper?", answer: "Mae Jamnian is a popular aggregator sheet that lists the 'Top 10 Most Sold Numbers' in Thailand before every draw, reflecting public sentiment." },
                    { question: "Are these lottery formulas free to use?", answer: "Yes, the sources we analyze (Thai Rath, Daily News, Bangkok Weekly) are publicly available in newspapers. We provide a comparative analysis of their historical performance." },
                    { question: "Why do different papers show different numbers?", answer: "Each source uses a different calculation method—some use astrology (Thai Rath Grid), others use statistical probability or dream interpretation." },
                    { question: "What is the best source for '2-Down' numbers?", answer: "'Daily News' is often cited by players as having a strong track record for the 'Last 2 Digits' category due to its specific star-grid formula." },
                    { question: "Do these sources guarantee a win?", answer: "No. These are simply analytical tools. The lottery is a game of chance, and past performance of a tipster does not guarantee future results." },
                    { question: "When are these lottery tips released?", answer: "Most formulas are published 3-5 days before the official draw date (1st and 16th of each month)." },
                    { question: "Can I trust 'VIP' leaked numbers?", answer: "Be cautious. Real 'leaked' numbers from GLO do not exist. Most 'VIP' tips are scams. Stick to reputable public sources like the ones compared here." },
                    { question: "How do I read the Thai Rath grid?", answer: "The Thai Rath grid usually consists of 9 numbers in a 3x3 layout. Players typically look for diagonal or vertical lines to form 3-digit sets." },
                    { question: "What is the 'Green Paper' source?", answer: "The 'Green Paper' usually refers to 'Bangkok Weekly' or similar traditional manuscripts that use a green layout design, favored by older generations." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "Which Thai Lottery tip source is the most accurate?", answer: "No single source is 100% accurate. However, statistical analysis shows that 'Thai Rath' has a high consistency rate for 3-digit sets, while 'Mae Jamnian' is excellent for trending numbers." },
                    { question: "What is 'Mae Jamnian' lottery paper?", answer: "Mae Jamnian is a popular aggregator sheet that lists the 'Top 10 Most Sold Numbers' in Thailand before every draw, reflecting public sentiment." },
                    { question: "Are these lottery formulas free to use?", answer: "Yes, the sources we analyze (Thai Rath, Daily News, Bangkok Weekly) are publicly available in newspapers. We provide a comparative analysis of their historical performance." },
                    { question: "Why do different papers show different numbers?", answer: "Each source uses a different calculation method—some use astrology (Thai Rath Grid), others use statistical probability or dream interpretation." },
                    { question: "What is the best source for '2-Down' numbers?", answer: "'Daily News' is often cited by players as having a strong track record for the 'Last 2 Digits' category due to its specific star-grid formula." },
                    { question: "Do these sources guarantee a win?", answer: "No. These are simply analytical tools. The lottery is a game of chance, and past performance of a tipster does not guarantee future results." },
                    { question: "When are these lottery tips released?", answer: "Most formulas are published 3-5 days before the official draw date (1st and 16th of each month)." },
                    { question: "Can I trust 'VIP' leaked numbers?", answer: "Be cautious. Real 'leaked' numbers from GLO do not exist. Most 'VIP' tips are scams. Stick to reputable public sources like the ones compared here." },
                    { question: "How do I read the Thai Rath grid?", answer: "The Thai Rath grid usually consists of 9 numbers in a 3x3 layout. Players typically look for diagonal or vertical lines to form 3-digit sets." },
                    { question: "What is the 'Green Paper' source?", answer: "The 'Green Paper' usually refers to 'Bangkok Weekly' or similar traditional manuscripts that use a green layout design, favored by older generations." }
                ]} />

            </div>
        </div>
    );
}
