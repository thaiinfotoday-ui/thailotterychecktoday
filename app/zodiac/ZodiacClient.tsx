'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Moon, Sun, Sparkles, ArrowRight, Table2, Info } from 'lucide-react';
import ArticleSchema from '../components/schema/ArticleSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function ZodiacClient() {
    const { t } = useLanguage();

    // Distant Semantic Concept: Astrology -> Lottery
    // Connecting "Personal Fate" (Distant) to "Lottery Numbers" (Money)
    // The "Cosmic Logic" section adds depth, explaining *why* numbers match elements.

    const zodiacs = [
        { name: "Capricorn (Mangkorn)", dates: "Jan 15 - Feb 12", element: "Earth", lucky: ["2", "8", "9"], color: "Dark Brown", logic: "Stability driven. Numbers 2 (Balance) and 8 (Infinity) resonate with Earth energy." },
        { name: "Aquarius (Kumbha)", dates: "Feb 13 - Mar 14", element: "Air", lucky: ["4", "7", "1"], color: "Electric Blue", logic: "Innovation focused. 4 (Structure) and 7 (Mystic) bridge the gap between idea and reality." },
        { name: "Pisces (Meen)", dates: "Mar 15 - Apr 12", element: "Water", lucky: ["3", "5", "8"], color: "Sea Green", logic: "Intuitive flow. 3 (Creation) and 5 (Change) mirror the fluid nature of Water." },
        { name: "Aries (Mesha)", dates: "Apr 13 - May 14", element: "Fire", lucky: ["1", "9", "4"], color: "Red", logic: "Initiating force. 1 (Self) and 9 (Completion) mark the beginning and end of cycles." },
        { name: "Taurus (Wrishabha)", dates: "May 15 - Jun 14", element: "Earth", lucky: ["6", "5", "2"], color: "Green", logic: "Material growth. 6 (Harmony) attracts abundance in earthy ventures." },
        { name: "Gemini (Mithuna)", dates: "Jun 15 - Jul 15", element: "Air", lucky: ["5", "7", "3"], color: "Yellow", logic: "Dual nature. 5 (Communication) is the bridge between the twin pillars of Gemini." },
        { name: "Cancer (Karakata)", dates: "Jul 16 - Aug 16", element: "Water", lucky: ["2", "4", "6"], color: "Silver", logic: "Protective shell. 2 (Partnership) and 4 (Home) secure the emotional foundation." },
        { name: "Leo (Simha)", dates: "Aug 17 - Sep 16", element: "Fire", lucky: ["1", "9", "5"], color: "Gold", logic: "Solar power. 1 (King) stands central, supported by 9 (Universal Love)." },
        { name: "Virgo (Kanya)", dates: "Sep 17 - Oct 16", element: "Earth", lucky: ["5", "6", "3"], color: "Navy Blue", logic: "Detail oriented. 5 (Analytical) helps parse the chaos into order." },
        { name: "Libra (Tula)", dates: "Oct 17 - Nov 15", element: "Air", lucky: ["6", "7", "2"], color: "Pink", logic: "Balanced scales. 6 (Beauty) and 7 (Truth) weigh equally in the air sign." },
        { name: "Scorpio (Vrischika)", dates: "Nov 16 - Dec 15", element: "Water", lucky: ["9", "3", "8"], color: "Maroon", logic: "Deep transformation. 9 (End) and 8 (Power) govern the cycle of rebirth." },
        { name: "Sagittarius (Dhanu)", dates: "Dec 16 - Jan 14", element: "Fire", lucky: ["3", "5", "1"], color: "Purple", logic: "Expansive arrow. 3 (Growth) shoots towards the horizon of 1 (Unity)." }
    ];

    const [selectedZodiac, setSelectedZodiac] = useState(null);

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <section className="bg-indigo-900 text-white border-b border-indigo-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 animate-spin-slow">
                    <Sun className="w-96 h-96" />
                </div>
                <div className="container mx-auto px-4 py-16 text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800 text-indigo-200 text-xs font-bold uppercase mb-6 border border-indigo-700">
                        <Sparkles className="w-3 h-3" />
                        Astrological Insights
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                        Zodiac <span className="text-amber-400">Lucky Numbers</span>
                    </h1>
                    <p className="text-indigo-200 text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover the numeric patterns aligned with your star sign.
                        A "Distant Semantic" approach to finding your next winning combination.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* Zodiac Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                    {zodiacs.map((z, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedZodiac(z)}
                            className={`p-6 rounded-2xl border text-left transition-all group relative overflow-hidden ${selectedZodiac?.name === z.name ? 'bg-indigo-900 border-indigo-900 text-white shadow-xl scale-105 z-10' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-bold uppercase tracking-wider ${selectedZodiac?.name === z.name ? 'text-indigo-300' : 'text-slate-400'}`}>
                                    {z.dates}
                                </span>
                                {selectedZodiac?.name === z.name && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                            </div>
                            <h3 className={`text-lg font-bold mb-1 ${selectedZodiac?.name === z.name ? 'text-white' : 'text-slate-900'}`}>{z.name}</h3>
                            <div className="flex items-center gap-1 text-xs">
                                <span className={`px-2 py-0.5 rounded ${selectedZodiac?.name === z.name ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-100 text-slate-500'}`}>
                                    {z.element}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Selected Insight */}
                {selectedZodiac && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 z-0" />

                            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-900 font-bold rounded-xl mb-4 text-sm">
                                        Selected: {selectedZodiac.name}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                                        Cosmic Alignment
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                        For {selectedZodiac.name}, the element of <strong>{selectedZodiac.element}</strong> suggests grounding your choices.
                                        Your power color is <strong>{selectedZodiac.color}</strong>.
                                    </p>

                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
                                        <h4 className="flex items-center gap-2 font-bold text-slate-700 mb-2 text-sm uppercase">
                                            <Info className="w-4 h-4 text-indigo-500" /> Cosmic Logic
                                        </h4>
                                        <p className="text-sm text-slate-500 italic">
                                            "{selectedZodiac.logic}"
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Primary Digits</span>
                                            <div className="flex gap-3">
                                                {selectedZodiac.lucky.map(num => (
                                                    <div key={num} className="w-12 h-12 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center text-2xl font-black text-white font-mono transform hover:scale-110 transition-transform">
                                                        {num}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-indigo-900 rounded-3xl p-8 text-center text-white relative">
                                    <Moon className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Ready to Play?</h3>
                                    <p className="text-indigo-200 mb-6 text-sm">
                                        Use these semantic insights to verify against the official results.
                                    </p>
                                    <a href="/check" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold py-3 px-6 rounded-xl transition-colors w-full justify-center shadow-lg shadow-amber-900/20">
                                        Check Numbers <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Semantic Connection / SEO Context */}
                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
                        <Table2 className="w-5 h-5 text-slate-400" /> Why look at Zodiacs?
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Statistical correlation between "Birth Dates" and "Lottery Participation" is high.
                        While lottery is probability-based, many players find confidence in personalized sets derived from their astrological identity.
                    </p>
                </div>

                <ArticleSchema
                    title="Thai Lottery Zodiac Lucky Numbers: Astrological Guide"
                    description="Find your lucky lottery numbers based on your Zodiac sign. A semantic analysis connecting astrology themes to numeric patterns."
                />

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "Can my Zodiac sign really predict Thai Lottery winning numbers?", answer: "Astrology is a belief system, not a science. While many players find success using 'Lucky Numbers' aligned with their star sign, the lottery draw itself is a random mathematical event." },
                    { question: "Which Zodiac sign is considered the luckiest for lottery?", answer: "This varies by year and planetary alignment. In 2024, Earth signs (Taurus, Virgo, Capricorn) are often cited by astrologers as having strong 'financial stability' energy." },
                    { question: "How are these lucky numbers calculated?", answer: "These numbers are derived from 'Numerology', mapping planetary influences and elemental properties (Fire, Water, Air, Earth) to specific digits (0-9)." },
                    { question: "Should I play my lucky color when buying a ticket?", answer: "Many believe that wearing your 'Power Color' or buying a ticket from a vendor wearing that color enhances positive energy (Chi/Prana) during the transaction." },
                    { question: "Do Zodiac lucky numbers change every draw?", answer: "Core numbers (like your Life Path number) remain constant, but 'Transit Numbers' change based on the current position of planets relative to your sign." },
                    { question: "What is the 'Cosmic Logic' mentioned for each sign?", answer: "'Cosmic Logic' explains the semantic connection between a number and a sign's trait. For example, Leos are leaders, so the number '1' (representing unity/beginning) is logically paired with them." },
                    { question: "Can I combine Zodiac numbers with other formulas?", answer: "Yes, many expert players combine their 'Zodiac Set' with statistical data (like 'Hot/Cold' numbers) to create a hybrid strategy." },
                    { question: "Is this based on Thai or Western astrology?", answer: "Our system integrates elements of both Western Zodiac dates and Thai 'Mahasat' numerology to provide a comprehensive perspective." },
                    { question: "How many numbers should I pick from my set?", answer: "We recommend picking 1 or 2 core digits from your set and pairing them with other insights to form a 2-digit or 3-digit number." },
                    { question: "What should I do if my Zodiac numbers haven't won recently?", answer: "Luck is cyclic. If your numbers aren't winning, it might be a 'dormant period'. You can try using the numbers of your 'Rising Sign' instead." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "Can my Zodiac sign really predict Thai Lottery winning numbers?", answer: "Astrology is a belief system, not a science. While many players find success using 'Lucky Numbers' aligned with their star sign, the lottery draw itself is a random mathematical event." },
                    { question: "Which Zodiac sign is considered the luckiest for lottery?", answer: "This varies by year and planetary alignment. In 2024, Earth signs (Taurus, Virgo, Capricorn) are often cited by astrologers as having strong 'financial stability' energy." },
                    { question: "How are these lucky numbers calculated?", answer: "These numbers are derived from 'Numerology', mapping planetary influences and elemental properties (Fire, Water, Air, Earth) to specific digits (0-9)." },
                    { question: "Should I play my lucky color when buying a ticket?", answer: "Many believe that wearing your 'Power Color' or buying a ticket from a vendor wearing that color enhances positive energy (Chi/Prana) during the transaction." },
                    { question: "Do Zodiac lucky numbers change every draw?", answer: "Core numbers (like your Life Path number) remain constant, but 'Transit Numbers' change based on the current position of planets relative to your sign." },
                    { question: "What is the 'Cosmic Logic' mentioned for each sign?", answer: "'Cosmic Logic' explains the semantic connection between a number and a sign's trait. For example, Leos are leaders, so the number '1' (representing unity/beginning) is logically paired with them." },
                    { question: "Can I combine Zodiac numbers with other formulas?", answer: "Yes, many expert players combine their 'Zodiac Set' with statistical data (like 'Hot/Cold' numbers) to create a hybrid strategy." },
                    { question: "Is this based on Thai or Western astrology?", answer: "Our system integrates elements of both Western Zodiac dates and Thai 'Mahasat' numerology to provide a comprehensive perspective." },
                    { question: "How many numbers should I pick from my set?", answer: "We recommend picking 1 or 2 core digits from your set and pairing them with other insights to form a 2-digit or 3-digit number." },
                    { question: "What should I do if my Zodiac numbers haven't won recently?", answer: "Luck is cyclic. If your numbers aren't winning, it might be a 'dormant period'. You can try using the numbers of your 'Rising Sign' instead." }
                ]} />

            </div>
        </div>
    );
}
