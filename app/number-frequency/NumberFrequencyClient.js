'use client';

import { useState, useMemo } from 'react';
import { Search, TrendingUp, BarChart3, Info, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NumberFrequencyClient({ initialData }) {
    const { t } = useLanguage();
    const [searchNumber, setSearchNumber] = useState('');
    const [numberType, setNumberType] = useState('last2'); // last2, front3, back3, first6

    // Calculate frequency from history data
    const frequencyData = useMemo(() => {
        const counts = {};
        
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

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BarChart3 className="w-8 h-8 text-purple-600" />
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                            Number Frequency Analysis
                        </h1>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Historical frequency analysis of Thai Lottery numbers. This tool shows how often specific numbers have appeared in past draws.
                    </p>
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800 text-left">
                                <strong>Note:</strong> This is informational historical data only. Past frequency does not predict future results. 
                                Always verify results with official sources.
                            </p>
                        </div>
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
                                Number Type
                            </label>
                            <select
                                value={numberType}
                                onChange={(e) => setNumberType(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="last2">Last 2 Digits</option>
                                <option value="front3">Front 3 Digits</option>
                                <option value="back3">Back 3 Digits</option>
                                <option value="first_last2">First Prize (Last 2)</option>
                            </select>
                        </div>

                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Search Specific Number
                            </label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchNumber}
                                    onChange={(e) => setSearchNumber(e.target.value.replace(/\D/g, ''))}
                                    placeholder={`Enter ${numberType === 'last2' ? '2' : '3'} digit number`}
                                    maxLength={numberType === 'last2' ? 2 : 3}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Searched Number Result */}
                    {searchedFrequency !== null && searchedFrequency > 0 && (
                        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                                <div>
                                    <p className="font-semibold text-slate-900">
                                        Number <span className="text-purple-600">{searchNumber}</span> appeared
                                    </p>
                                    <p className="text-2xl font-black text-purple-600">
                                        {searchedFrequency} time{searchedFrequency !== 1 ? 's' : ''}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        Out of {initialData.length} recorded draws ({((searchedFrequency / initialData.length) * 100).toFixed(1)}%)
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
                                    Number <span className="font-semibold">{searchNumber}</span> has not appeared in the recorded history.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">
                            Frequency Ranking
                            <span className="text-sm font-normal text-slate-500 ml-2">
                                ({filteredResults.length} numbers)
                            </span>
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rank</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Number</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Frequency</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Percentage</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Visual</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredResults.map((item, index) => {
                                    const maxCount = Math.max(...filteredResults.map(r => r.count));
                                    const barWidth = (item.count / maxCount) * 100;
                                    
                                    return (
                                        <tr key={item.number} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-slate-600 font-medium">#{index + 1}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-lg font-mono font-bold text-slate-900">{item.number}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-700 font-semibold">{item.count}</span>
                                                <span className="text-slate-400 text-sm ml-1">times</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-600">{item.percentage}%</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                    <div
                                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all"
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

                {/* Disclaimer */}
                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-1">Important Disclaimer:</p>
                            <p>
                                This frequency analysis is for informational purposes only. Historical frequency does not indicate 
                                future probability. Each draw is independent and random. This website does not provide predictions, 
                                gambling services, or ticket sales. Always verify results with official Government Lottery Office sources.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

