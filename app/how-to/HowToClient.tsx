'use client';
import { useLanguage } from '../context/LanguageContext';
import { Award, Briefcase, Building, MapPin, Receipt, Clock, Wallet, HelpCircle, ChevronRight, Search, Zap, ExternalLink, ShieldCheck } from 'lucide-react';
import ArticleSchema from '../components/schema/ArticleSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function HowToClient() {
    const { t } = useLanguage();

    // Strategy: Contextual Layers & Implied Intents
    // We are expanding the guide to answer "Implicit Questions" within the lottery journey.
    // Buying -> Checking -> Claiming -> Taxing.
    // This addresses "Singular Intents" of the user.

    const prizeStructure = [
        { name: "First Prize (รางวัลที่ 1)", reward: "6,000,000 THB", quantity: "1", odds: "1 : 1,000,000", icon: Award, color: "text-amber-500", bg: "bg-amber-100" },
        { name: "Nearby First Prize", reward: "100,000 THB", quantity: "2", odds: "2 : 1,000,000", icon: Award, color: "text-slate-500", bg: "bg-slate-100" },
        { name: "Second Prize", reward: "200,000 THB", quantity: "5", odds: "5 : 1,000,000", icon: Award, color: "text-purple-500", bg: "bg-purple-100" },
        { name: "Third Prize", reward: "80,000 THB", quantity: "10", odds: "10 : 1,000,000", icon: Award, color: "text-blue-500", bg: "bg-blue-100" },
        { name: "Fourth Prize", reward: "40,000 THB", quantity: "50", odds: "50 : 1,000,000", icon: Award, color: "text-green-500", bg: "bg-green-100" },
        { name: "Fifth Prize", reward: "20,000 THB", quantity: "100", odds: "100 : 1,000,000", icon: Award, color: "text-pink-500", bg: "bg-pink-100" },
        { name: "Last 2 Digits", reward: "2,000 THB", quantity: "10,000", odds: "1 : 100", icon: Receipt, color: "text-red-500", bg: "bg-red-100" },
        { name: "Front 3 Digits", reward: "4,000 THB", quantity: "2,000", odds: "2 : 1,000", icon: Receipt, color: "text-orange-500", bg: "bg-orange-100" },
        { name: "Last 3 Digits", reward: "4,000 THB", quantity: "2,000", odds: "2 : 1,000", icon: Receipt, color: "text-indigo-500", bg: "bg-indigo-100" },
    ];

    const offices = [
        { name: "GLO Head Office", location: "Nonthaburi", type: "Headquarters", hours: "07:30 - 15:00" },
        { name: "Krung Thai Bank", location: "Nationwide", type: "Authorized Agent", hours: "Banking Hours" },
        { name: "GSB (Omsin Bank)", location: "Nationwide", type: "Authorized Agent", hours: "Banking Hours" }
    ];

    const deepInsights = [
        {
            topic: "Taxation on Winnings",
            content: "Unlike many countries, Thai Lottery winnings are practically tax-free. You only pay a small stamp duty: 0.5% for government tickets and 1% for charity tickets. This is deducted at source.",
            icon: Receipt
        },
        {
            topic: "Claiming Deadline",
            content: "You have exactly 2 years from the draw date to claim your prize. Unclaimed money is remitted to the state revenue as unearned income.",
            icon: Clock
        },
        {
            topic: "Where to Buy Safety",
            content: "Always look for authorized retailers (80 THB fixed price). Buying from overpriced resellers entails legal neutrality but financial loss.",
            icon: ShieldCheck
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase mb-6 border border-blue-100">
                        <Briefcase className="w-3 h-3" />
                        Comprehensive Guide
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                        Thai Lottery <span className="text-blue-600">Player's Protocol</span>
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                        The definitive handbook. From simplified structure to deep "Singular Intents" like taxation, claiming deadlines, and safety protocols.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-5xl">

                {/* Micro-Principle: Deep Answers (Contextual Layers) */}
                <div className="mb-16 grid md:grid-cols-3 gap-6">
                    {deepInsights.map((insight, idx) => (
                        <div key={idx} className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md relative overflow-hidden group hover:border-blue-500 transition-colors">
                            <insight.icon className="w-12 h-12 text-slate-800 absolute -bottom-2 -right-2 transform group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> {insight.topic}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                                {insight.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 1. Prize Structure Entity List */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Wallet className="w-8 h-8 text-slate-900" />
                        <h2 className="text-2xl font-black text-slate-900">Prize Structure Matrix</h2>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="p-5 font-bold text-slate-500 uppercase tracking-widest text-xs">Prize Category</th>
                                        <th className="p-5 font-bold text-slate-500 uppercase tracking-widest text-xs">Reward Value</th>
                                        <th className="p-5 font-bold text-slate-500 uppercase tracking-widest text-xs">Quantity</th>
                                        <th className="p-5 font-bold text-slate-500 uppercase tracking-widest text-xs hidden md:table-cell">Probability</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {prizeStructure.map((prize, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl ${prize.bg} ${prize.color} flex items-center justify-center shrink-0`}>
                                                        <prize.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-slate-900 text-base">{prize.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg font-mono font-bold">
                                                    {prize.reward}
                                                </span>
                                            </td>
                                            <td className="p-5 text-slate-600 font-medium">
                                                {prize.quantity} Rewards
                                            </td>
                                            <td className="p-5 text-slate-400 hidden md:table-cell font-mono text-xs">
                                                {prize.odds}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 2. Claiming Process Entity */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Building className="w-6 h-6 text-slate-900" />
                            <h2 className="text-2xl font-black text-slate-900">Claiming Process</h2>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
                            <ol className="relative border-l-2 border-slate-100 ml-3 space-y-8">
                                <li className="ml-6">
                                    <span className="absolute -left-[9px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 ring-4 ring-white">
                                        <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                                    </span>
                                    <h3 className="flex items-center mb-1 text-lg font-bold text-slate-900">Verify Ticket</h3>
                                    <p className="mb-2 text-sm text-slate-500">Ensure the ticket is genuine, not torn, and signed on the back.</p>
                                </li>
                                <li className="ml-6">
                                    <span className="absolute -left-[9px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                    </span>
                                    <h3 className="mb-1 text-lg font-bold text-slate-900">Visit GLO or Bank</h3>
                                    <p className="mb-2 text-sm text-slate-500">
                                        For prizes &lt; 20,000 THB, visit authorized agents. For higher prizes, visit GLO Head Office.
                                    </p>
                                </li>
                                <li className="ml-6">
                                    <span className="absolute -left-[9px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 ring-4 ring-white">
                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                    </span>
                                    <h3 className="mb-1 text-lg font-bold text-slate-900">Receive Payment</h3>
                                    <p className="mb-2 text-sm text-slate-500">
                                        Tax deduction: 0.5% (GLO) or 1% (Charity). Bring your ID Card.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="w-6 h-6 text-slate-900" />
                            <h2 className="text-2xl font-black text-slate-900">Authorized Locations</h2>
                        </div>
                        <div className="space-y-4">
                            {offices.map((office, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{office.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{office.type}</span>
                                            <span>• {office.location}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                            <Clock className="w-3 h-3" /> {office.hours}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Brand Pulse / Social Signal Simulation */}
                            <div className="mt-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Briefcase className="w-32 h-32 transform rotate-12" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">Community Pulse</span>
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                    </div>
                                    <h4 className="font-black text-xl mb-4">Player Sentiment</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
                                            <span className="text-blue-100">Most Asked Brand Query</span>
                                            <span className="font-bold">"GLO Claim Deadline"</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
                                            <span className="text-blue-100">Social Mention Velocity</span>
                                            <span className="font-bold flex items-center gap-1 text-green-300"><TrendingUp className="w-4 h-4" /> High</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQs - Preserving existing functionality */}
                {/* FAQs - Enhanced with NLP Questions */}
                <FAQAccordion faqs={[
                    { question: "How do I claim a Thai Lottery prize?", answer: "For small prizes (under 20,000 Baht), you can claim cash at authorized retail agents. For larger prizes, including the First Prize, you must visit the GLO Head Office in Nonthaburi." },
                    { question: "What documents do I need to claim a win?", answer: "You must bring the original winning ticket (signed on the back) and your national ID card (for Thais) or Passport (for foreigners)." },
                    { question: "Is there a tax on lottery winnings for foreigners?", answer: "Yes, the tax rate is the same for everyone. 0.5% (stamp duty) for GLO tickets and 1% for Charity Lottery tickets. It is deducted immediately at payout." },
                    { question: "Can I buy Thai Lottery tickets online?", answer: "Yes, the official way to buy online is through the 'Pao Tang' mobile application (L6 Digital Lottery) at the fixed price of 80 Baht." },
                    { question: "How much is one lottery ticket?", answer: "The official government price is 80 Baht per ticket. However, street vendors often sell 'sets' (multiple tickets) at higher prices due to scarcity." },
                    { question: "What is the deadline for claiming a prize?", answer: "You have exactly 2 years from the date of the draw to claim your money. After this period, the funds are remitted to the state as revenue." },
                    { question: "What happens if I lose my winning ticket?", answer: "The GLO strictly pays the holder of the physical ticket. If lost, you should file a police report immediately, but claiming without the ticket is legally difficult." },
                    { question: "How do I check if my ticket is real?", answer: "Authentic tickets have a specific watermark, 2D barcode, and unique paper texture. You can verify the 2D barcode using the GLO's verification app." },
                    { question: "Can I win multiple prizes with one ticket?", answer: "Yes! A single ticket can win multiple distinct prizes (e.g., matching the First Prize and also a 2-digit suffix prize) if the numbers align." },
                    { question: "What are the odds of winning the First Prize?", answer: "The probability of winning the First Prize (6 Million Baht) is exactly 1 in 1,000,000, as there are one million possible 6-digit combinations." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "How do I claim a Thai Lottery prize?", answer: "For small prizes (under 20,000 Baht), you can claim cash at authorized retail agents. For larger prizes, including the First Prize, you must visit the GLO Head Office in Nonthaburi." },
                    { question: "What documents do I need to claim a win?", answer: "You must bring the original winning ticket (signed on the back) and your national ID card (for Thais) or Passport (for foreigners)." },
                    { question: "Is there a tax on lottery winnings for foreigners?", answer: "Yes, the tax rate is the same for everyone. 0.5% (stamp duty) for GLO tickets and 1% for Charity Lottery tickets. It is deducted immediately at payout." },
                    { question: "Can I buy Thai Lottery tickets online?", answer: "Yes, the official way to buy online is through the 'Pao Tang' mobile application (L6 Digital Lottery) at the fixed price of 80 Baht." },
                    { question: "How much is one lottery ticket?", answer: "The official government price is 80 Baht per ticket. However, street vendors often sell 'sets' (multiple tickets) at higher prices due to scarcity." },
                    { question: "What is the deadline for claiming a prize?", answer: "You have exactly 2 years from the date of the draw to claim your money. After this period, the funds are remitted to the state as revenue." },
                    { question: "What happens if I lose my winning ticket?", answer: "The GLO strictly pays the holder of the physical ticket. If lost, you should file a police report immediately, but claiming without the ticket is legally difficult." },
                    { question: "How do I check if my ticket is real?", answer: "Authentic tickets have a specific watermark, 2D barcode, and unique paper texture. You can verify the 2D barcode using the GLO's verification app." },
                    { question: "Can I win multiple prizes with one ticket?", answer: "Yes! A single ticket can win multiple distinct prizes (e.g., matching the First Prize and also a 2-digit suffix prize) if the numbers align." },
                    { question: "What are the odds of winning the First Prize?", answer: "The probability of winning the First Prize (6 Million Baht) is exactly 1 in 1,000,000, as there are one million possible 6-digit combinations." }
                ]} />

                <ArticleSchema
                    title="Thai Lottery Player's Protocol: Rules, Prizes & Taxation"
                    description="The complete guide to the Thai Lottery ecosystem. Covering prize structures, claiming processes, taxation laws, and authorized retail safety."
                />

            </div>
        </div>
    );
}

function TrendingUp(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}
