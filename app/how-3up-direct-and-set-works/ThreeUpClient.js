'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, BookOpen, Info, HelpCircle, AlertTriangle, ArrowRight, Table as TableIcon } from 'lucide-react';

export default function ThreeUpClient() {
    const [input, setInput] = useState('');
    const [permutations, setPermutations] = useState([]);

    const handleCalculate = (e) => {
        const val = e.target.value;
        // Allow only numbers, max 3 digits
        const cleanVal = val.replace(/\D/g, '').slice(0, 3);
        setInput(cleanVal);

        if (cleanVal.length === 3) {
            const perms = getUniquePermutations(cleanVal);
            setPermutations(perms);
        } else {
            setPermutations([]);
        }
    };

    const getUniquePermutations = (str) => {
        if (str.length !== 3) return [];
        const arr = str.split('');
        const results = new Set();

        const permute = (arr, m = []) => {
            if (arr.length === 0) {
                results.add(m.join(''));
            } else {
                for (let i = 0; i < arr.length; i++) {
                    const curr = arr.slice();
                    const next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next));
                }
            }
        };

        permute(arr);
        return Array.from(results).sort();
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-900">
            {/* Header Section */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center max-w-3xl">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-6">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        What Is 3UP Direct and 3UP Set in Thai Lottery?
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        An educational guide to understanding the structure and comparison of 3-digit numbers in the Thai Lottery system.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">

                {/* Introduction Disclaimer */}
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-blue-800 text-sm leading-relaxed">
                        <strong>Educational Purpose Only:</strong> This page explains mathematical concepts and definitions related to lottery number formats. We do not provide predictions, strategies, or sell tickets.
                    </p>
                </div>

                {/* Section 1: What is 3UP Direct */}
                <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                        What is "3UP Direct"?
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        "3UP Direct" implies a <strong>precise match</strong>. In the context of 3-digit numbers, it refers to a set of three digits that matches the reference number in the <strong>exact same order</strong>.
                    </p>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">Example</h3>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="text-center">
                                <span className="block text-xs text-slate-400 mb-1">Reference Number</span>
                                <span className="text-3xl font-mono font-bold text-slate-900 tracking-widest bg-white px-4 py-2 rounded border border-slate-200">123</span>
                            </div>
                            <ArrowRight className="hidden md:block text-slate-300" />
                            <div className="text-center">
                                <span className="block text-xs text-slate-400 mb-1">Direct Match</span>
                                <span className="text-3xl font-mono font-bold text-green-600 tracking-widest bg-green-50 px-4 py-2 rounded border border-green-200">123</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3 text-center md:text-left">
                            Only "123" is a direct match. "321" or "213" are not.
                        </p>
                    </div>
                </section>

                {/* Section 2: What is 3UP Set */}
                <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                        What is "3UP Set"?
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        "3UP Set" (often called "Ramble" or "Box" in other regions) refers to matching the <strong>digits</strong> of a number, but in <strong>any order</strong>. If the reference number contains the digits 1, 2, and 3, any combination of these three digits is considered part of the "Set".
                    </p>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">Example</h3>
                        <p className="mb-4 text-slate-700">If reference is <strong className="font-mono">123</strong>, the Set includes:</p>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {['123', '132', '213', '231', '312', '321'].map(num => (
                                <div key={num} className="bg-white text-center py-2 px-3 rounded border border-slate-200 font-mono font-bold text-slate-700">
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mathematical Explanation */}
                <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Calculator className="w-6 h-6 text-slate-400" />
                        <h2 className="text-xl font-bold text-slate-800">The Math Behind Combinations</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        The number of ways you can arrange 3 digits depends on whether the digits are unique. This is calculated using basic factorials (3!).
                    </p>
                    <ul className="space-y-4 text-slate-600">
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">A</span>
                            <div>
                                <strong className="text-slate-900 block">3 Unique Digits (e.g., 123)</strong>
                                There are 6 possible arrangements (3 × 2 × 1 = 6).
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">B</span>
                            <div>
                                <strong className="text-slate-900 block">2 Unique Digits (e.g., 112)</strong>
                                There are 3 possible arrangements (e.g., 112, 121, 211).
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">C</span>
                            <div>
                                <strong className="text-slate-900 block">1 Unique Digit (e.g., 111)</strong>
                                There is only 1 arrangement (111).
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Interactive Tool */}
                <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8 rounded-2xl border border-indigo-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">3-Digit Combination Viewer</h2>
                    <p className="text-center text-slate-500 mb-6 max-w-lg mx-auto">
                        Enter any 3-digit number to see all its possible arrangements (Set).
                    </p>

                    <div className="max-w-xs mx-auto mb-8">
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            value={input}
                            onChange={handleCalculate}
                            placeholder="Enter 3 digits (e.g., 592)"
                            className="w-full text-center text-3xl font-mono font-bold tracking-widest py-4 px-6 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-300 placeholder:text-xl placeholder:tracking-normal"
                        />
                    </div>

                    {permutations.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                {permutations.length} Possible Arrangements
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {permutations.map((perm) => (
                                    <div key={perm} className="bg-white shadow-sm border border-indigo-100 px-6 py-3 rounded-xl font-mono text-xl font-bold text-indigo-900 min-w-[5rem] text-center">
                                        {perm}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Comparison Table */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
                        <TableIcon className="w-5 h-5 text-slate-400" />
                        <h2 className="text-lg font-bold text-slate-900">Comparison Summary</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white border-b border-slate-100">
                                    <th className="px-6 py-4 font-bold text-slate-700 w-1/3">Feature</th>
                                    <th className="px-6 py-4 font-bold text-purple-700 w-1/3 bg-purple-50/50">3UP Direct</th>
                                    <th className="px-6 py-4 font-bold text-blue-700 w-1/3 bg-blue-50/50">3UP Set</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-slate-600">Definition</td>
                                    <td className="px-6 py-4 text-slate-600 bg-purple-50/30">Exact digits, exact order</td>
                                    <td className="px-6 py-4 text-slate-600 bg-blue-50/30">Same digits, any order</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-slate-600">Matching Criteria</td>
                                    <td className="px-6 py-4 text-slate-600 bg-purple-50/30">Strict</td>
                                    <td className="px-6 py-4 text-slate-600 bg-blue-50/30">Flexible</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-slate-600">Example (Ref: 123)</td>
                                    <td className="px-6 py-4 text-slate-600 bg-purple-50/30">123 only</td>
                                    <td className="px-6 py-4 text-slate-600 bg-blue-50/30">123, 132, 213, 231, 312, 321</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Comparison Links */}
                <div className="flex flex-col md:flex-row gap-4">
                    <Link href="/" className="flex-1 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                        <span className="text-sm text-slate-500 block mb-1">Check current results</span>
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                            Today's Lottery Results <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                    <Link href="/history" className="flex-1 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                        <span className="text-sm text-slate-500 block mb-1">View past data</span>
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                            Historical Results <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                </div>

                {/* FAQ */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="bg-white border border-slate-200 rounded-xl overflow-hidden group">
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50">
                                <span>What does "3UP" mean in Thai Lottery?</span>
                                <HelpCircle className="w-5 h-5 text-slate-300" />
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                "3UP" generally refers to the 3-digit number of the First Prize or the 3-digit suffix prizes in the Thai Government Lottery structure.
                            </div>
                        </details>
                        <details className="bg-white border border-slate-200 rounded-xl overflow-hidden group">
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50">
                                <span>Is knowing this useful for playing?</span>
                                <HelpCircle className="w-5 h-5 text-slate-300" />
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                Understanding these terms helps you correctly interpret lottery results and check tickets accurately. It does not effectively increase your probability of winning, as the lottery is random.
                            </div>
                        </details>
                        <details className="bg-white border border-slate-200 rounded-xl overflow-hidden group">
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50">
                                <span>Is this an official definition?</span>
                                <HelpCircle className="w-5 h-5 text-slate-300" />
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                These terms (Direct, Set) are common terminology used by enthusiasts and checking tools to describe number matching. The official Government Lottery (GLO) simply refers to specific prize categories like First Prize, Front 3, and Back 3.
                            </div>
                        </details>
                    </div>
                </section>

                {/* Mandatory Disclaimer */}
                <div className="mt-8 p-6 border-t border-slate-200 text-center">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2 max-w-2xl mx-auto">
                        <AlertTriangle className="w-4 h-4" />
                        This content is provided for informational and educational purposes only. It does not provide predictions, strategies, or advice related to gambling or lottery participation.
                    </p>
                </div>

            </div>
        </div>
    );
}
