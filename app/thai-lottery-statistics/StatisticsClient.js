'use client';

import { useMemo } from 'react';
import { BarChart3, TrendingUp, Award, Info, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StatisticsClient({ initialData }) {
    const { t } = useLanguage();

    // Calculate all statistics
    const stats = useMemo(() => {
        const last2Counts = {};
        const front3Counts = {};
        const back3Counts = {};
        const firstLast2Counts = {};
        const firstLast3Counts = {};
        const years = new Set();

        initialData.forEach(item => {
            // Extract year
            if (item.date) {
                const year = item.date.split('-')[0];
                years.add(year);
            }

            // Last 2 digits
            if (item.last2) {
                last2Counts[item.last2] = (last2Counts[item.last2] || 0) + 1;
            }

            // Front 3 digits
            if (item.front3 && Array.isArray(item.front3)) {
                item.front3.forEach(num => {
                    front3Counts[num] = (front3Counts[num] || 0) + 1;
                });
            }

            // Back 3 digits
            if (item.back3 && Array.isArray(item.back3)) {
                item.back3.forEach(num => {
                    back3Counts[num] = (back3Counts[num] || 0) + 1;
                });
            }

            // First prize analysis
            if (item.first && item.first.length === 6) {
                const first = item.first.toString();
                const last2 = first.slice(-2);
                const last3 = first.slice(-3);
                firstLast2Counts[last2] = (firstLast2Counts[last2] || 0) + 1;
                firstLast3Counts[last3] = (firstLast3Counts[last3] || 0) + 1;
            }
        });

        // Get top numbers
        const getTopNumbers = (counts, limit = 10) => {
            return Object.entries(counts)
                .map(([number, count]) => ({ number, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, limit);
        };

        return {
            totalDraws: initialData.length,
            years: Array.from(years).sort(),
            topLast2: getTopNumbers(last2Counts, 10),
            topFront3: getTopNumbers(front3Counts, 10),
            topBack3: getTopNumbers(back3Counts, 10),
            topFirstLast2: getTopNumbers(firstLast2Counts, 10),
            topFirstLast3: getTopNumbers(firstLast3Counts, 10),
        };
    }, [initialData]);

    const StatCard = ({ title, icon: Icon, children, color = 'purple' }) => {
        const colors = {
            purple: 'from-purple-500 to-pink-500',
            blue: 'from-blue-500 to-cyan-500',
            green: 'from-green-500 to-emerald-500',
        };

        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-gradient-to-r ${colors[color]} rounded-lg text-white`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                </div>
                {children}
            </div>
        );
    };

    const TopNumbersList = ({ numbers, label }) => (
        <div className="space-y-2">
            {numbers.map((item, index) => {
                const maxCount = numbers[0].count;
                const percentage = ((item.count / stats.totalDraws) * 100).toFixed(1);
                const barWidth = (item.count / maxCount) * 100;

                return (
                    <div key={item.number} className="flex items-center gap-3">
                        <span className="text-slate-400 text-sm font-medium w-8">#{index + 1}</span>
                        <span className="font-mono font-bold text-slate-900 w-16">{item.number}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
                                style={{ width: `${barWidth}%` }}
                            />
                        </div>
                        <span className="text-slate-600 text-sm font-semibold w-16 text-right">
                            {item.count}x
                        </span>
                        <span className="text-slate-400 text-xs w-12 text-right">
                            {percentage}%
                        </span>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BarChart3 className="w-8 h-8 text-purple-600" />
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                            Thai Lottery Statistics
                        </h1>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Historical data analysis of Thai Lottery results. This page shows statistical patterns from past draws.
                    </p>
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800 text-left">
                                <strong>Important:</strong> These statistics are for informational purposes only.
                                Historical data does not predict future results. Each draw is independent and random.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Draws" icon={Award} color="purple">
                        <p className="text-3xl font-black text-slate-900">{stats.totalDraws}</p>
                        <p className="text-sm text-slate-500 mt-1">Recorded draws in database</p>
                    </StatCard>

                    <StatCard title="Years Covered" icon={TrendingUp} color="blue">
                        <p className="text-3xl font-black text-slate-900">{stats.years.length}</p>
                        <p className="text-sm text-slate-500 mt-1">
                            {stats.years[0]} - {stats.years[stats.years.length - 1]}
                        </p>
                    </StatCard>

                    <StatCard title="Data Points" icon={BarChart3} color="green">
                        <p className="text-3xl font-black text-slate-900">
                            {stats.totalDraws * 5}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">Numbers analyzed</p>
                    </StatCard>
                </div>

                {/* Top Numbers Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <StatCard title="Most Common Last 2 Digits" icon={BarChart3}>
                        <TopNumbersList numbers={stats.topLast2} label="Last 2" />
                    </StatCard>

                    <StatCard title="Most Common Front 3 Digits" icon={BarChart3}>
                        <TopNumbersList numbers={stats.topFront3} label="Front 3" />
                    </StatCard>

                    <StatCard title="Most Common Back 3 Digits" icon={BarChart3}>
                        <TopNumbersList numbers={stats.topBack3} label="Back 3" />
                    </StatCard>

                    <StatCard title="First Prize - Last 2 Digits" icon={Award}>
                        <TopNumbersList numbers={stats.topFirstLast2} label="First Last 2" />
                    </StatCard>
                </div>

                {/* First Prize Analysis */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Award className="w-6 h-6 text-purple-600" />
                        <h2 className="text-xl font-bold text-slate-900">First Prize Analysis</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Most Common Last 3 Digits</h3>
                            <TopNumbersList numbers={stats.topFirstLast3} label="Last 3" />
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold text-slate-700 mb-2">Insights</h3>
                            <ul className="text-sm text-slate-600 space-y-1">
                                <li>• First prize numbers are 6 digits</li>
                                <li>• Analysis shows last 2-3 digit patterns</li>
                                <li>• Each draw is completely independent</li>
                                <li>• No pattern predicts future results</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Year-wise Breakdown */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Year-wise Coverage</h2>
                    <div className="flex flex-wrap gap-2">
                        {stats.years.map(year => {
                            const yearData = initialData.filter(item => item.date?.startsWith(year));
                            return (
                                <div
                                    key={year}
                                    className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg"
                                >
                                    <span className="font-semibold text-slate-900">{year}</span>
                                    <span className="text-slate-500 text-sm ml-2">
                                        ({yearData.length} draws)
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Important Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-2">Statistical Analysis Disclaimer:</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>These statistics show <strong>historical patterns only</strong></li>
                                <li>Past frequency does <strong>not indicate future probability</strong></li>
                                <li>Each lottery draw is <strong>completely independent and random</strong></li>
                                <li>This website does <strong>not provide predictions or gambling services</strong></li>
                                <li>Always verify results with <strong>official Government Lottery Office sources</strong></li>
                            </ul>
                            <p className="mt-3 font-semibold">
                                This is informational historical data analysis. We do not sell tickets, provide predictions,
                                or offer gambling services.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SEO CONTENT */}
                <div className="mt-12 border-t border-slate-200 pt-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.statsContent?.title}</h2>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        {t.statsContent?.intro.split('**').map((part, index) =>
                            index % 2 === 1 ? <strong key={index} className="text-purple-700">{part}</strong> : part
                        )}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{t.statsContent?.methodologyTitle}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {t.statsContent?.methodologyText.split('**').map((part, index) =>
                                    index % 2 === 1 ? <strong key={index} className="text-slate-800">{part}</strong> : part
                                )}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{t.statsContent?.disclaimerTitle}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {t.statsContent?.disclaimerText.split('**').map((part, index) =>
                                    index % 2 === 1 ? <strong key={index} className="text-slate-800">{part}</strong> : part
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

