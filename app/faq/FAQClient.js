'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { FAQIllustration } from '../components/Illustrations2';

export default function FAQClient() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(0);

    // Extended FAQ items with categories
    const faqCategories = [
        {
            title: 'General Questions',
            items: [
                {
                    q: 'What is Thai Lottery?',
                    a: 'Thai Lottery (สลากกินแบ่งรัฐบาล) is the official government lottery of Thailand, managed by the Government Lottery Office (GLO). Draws are held twice monthly on the 1st and 16th of each month.'
                },
                {
                    q: 'Is this website official?',
                    a: 'No, this is an informational website. We aggregate public data from official sources (Sanook, Thairath, Kapook) for easy checking. We do not sell tickets or provide gambling services.'
                },
                {
                    q: 'How often are lottery draws held?',
                    a: 'Thai Lottery draws are held twice per month - on the 1st and 16th of each month. Results are typically announced between 2:30 PM and 4:00 PM (GMT+7) Thailand time.'
                },
                {
                    q: 'Where can I buy lottery tickets?',
                    a: 'Official lottery tickets can be purchased from authorized retailers throughout Thailand. Each ticket costs 80 Baht (official price). Always buy from licensed sellers to avoid fake tickets.'
                }
            ]
        },
        {
            title: 'Checking Results',
            items: [
                {
                    q: 'How do I check if my number won?',
                    a: 'Use our "Check Your Number" tool on the homepage or visit /check. Enter your ticket number and it will compare against the latest draw results. Always verify with official sources.'
                },
                {
                    q: 'What time are results announced?',
                    a: 'Results are typically announced between 2:30 PM and 4:00 PM (GMT+7) on draw days (1st and 16th of each month). Our website updates within minutes of the official announcement.'
                },
                {
                    q: 'How accurate are the results on this site?',
                    a: 'We source data from multiple trusted news websites (Sanook, Thairath, Kapook) and update immediately after official announcements. However, always verify winning tickets at official GLO counters before discarding them.'
                },
                {
                    q: 'Can I check past results?',
                    a: 'Yes! Visit our History page to browse past draws by date. You can also use the Number Frequency tool to see how often specific numbers have appeared historically.'
                }
            ]
        },
        {
            title: 'Prizes & Claiming',
            items: [
                {
                    q: 'How much is the First Prize?',
                    a: 'The First Prize (รางวัลที่ 1) is 6,000,000 Baht per winning ticket. There is typically one first prize winner per draw.'
                },
                {
                    q: 'Where can I claim my prize?',
                    a: 'Prizes under 20,000 Baht can be claimed at authorized retail agents (may have 1-2% service fee). Larger prizes must be claimed at the Government Lottery Office in Nonthaburi (near Don Mueang Airport).'
                },
                {
                    q: 'How long do I have to claim my prize?',
                    a: 'Prize claims must be made within 2 years from the draw date. After that, the prize expires. Always claim as soon as possible.'
                },
                {
                    q: 'What documents do I need to claim a prize?',
                    a: 'You need the original winning ticket and a valid ID card (Thai national) or passport (foreigner). For large prizes, additional documentation may be required. Contact GLO for details.'
                }
            ]
        },
        {
            title: 'Safety & Verification',
            items: [
                {
                    q: 'How do I spot a fake lottery ticket?',
                    a: 'Official tickets have specific watermarks visible when held to light, unique paper texture, and official GLO stamps. Buy only from licensed retailers and verify tickets at official counters.'
                },
                {
                    q: 'Is it safe to check results online?',
                    a: 'Yes, checking results online is safe. We only display publicly available information. We do not collect ticket numbers or personal information. Always verify winning tickets at official locations.'
                },
                {
                    q: 'Can I trust the statistics and frequency data?',
                    a: 'Our statistics are based on historical data from past draws. However, remember that each draw is independent - past frequency does not predict future results. This is informational data only.'
                }
            ]
        },
        {
            title: 'Website & Tools',
            items: [
                {
                    q: 'What tools are available on this website?',
                    a: 'We offer: Latest Results, History Archive, Check Your Number tool, Number Frequency Analysis, Statistics, Draw Calendar, and comprehensive FAQ. All tools are free and informational.'
                },
                {
                    q: 'Do you sell lottery tickets?',
                    a: 'No. This website is purely informational. We do not sell tickets, provide gambling services, or offer predictions. We only display publicly available lottery results.'
                },
                {
                    q: 'How often is the website updated?',
                    a: 'Results are updated within minutes of official announcements on draw days. Our backend automatically fetches from multiple sources and refreshes twice daily via secure cron jobs.'
                },
                {
                    q: 'Can I use this website on mobile?',
                    a: 'Yes! Our website is fully responsive and works on all devices - desktop, tablet, and mobile phones. All features are accessible on mobile browsers.'
                }
            ]
        }
    ];

    // Filter FAQs based on search
    const filteredCategories = faqCategories.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Flatten all FAQs for global search
    const allFAQs = faqCategories.flatMap(cat => cat.items);
    const globalSearchResults = searchQuery
        ? allFAQs.filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Generate JSON-LD for Search Engines
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFAQs.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <FAQIllustration className="w-32 h-32 mx-auto mb-6 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <HelpCircle className="w-8 h-8 text-purple-600" />
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                            Frequently Asked Questions
                        </h1>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed mb-6">
                        Find answers to common questions about Thai Lottery results, checking numbers, prizes, and more.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for questions..."
                                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        {searchQuery && (
                            <p className="text-sm text-slate-500 mt-2 text-left">
                                Found {globalSearchResults.length} result{globalSearchResults.length !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Link
                        href="/check"
                        className="p-4 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all"
                    >
                        <h3 className="font-semibold text-slate-900 mb-1">Check Your Number</h3>
                        <p className="text-sm text-slate-500">Verify if you won</p>
                    </Link>
                    <Link
                        href="/latest"
                        className="p-4 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all"
                    >
                        <h3 className="font-semibold text-slate-900 mb-1">Latest Results</h3>
                        <p className="text-sm text-slate-500">View current draw</p>
                    </Link>
                    <Link
                        href="/thai-lottery-draw-dates"
                        className="p-4 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all"
                    >
                        <h3 className="font-semibold text-slate-900 mb-1">Draw Schedule</h3>
                        <p className="text-sm text-slate-500">Upcoming dates</p>
                    </Link>
                </div>

                {/* FAQ Categories */}
                {filteredCategories.map((category, catIndex) => (
                    <div key={catIndex} className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{category.title}</h2>
                        <div className="space-y-3">
                            {category.items.map((item, itemIndex) => {
                                const globalIndex = faqCategories
                                    .slice(0, catIndex)
                                    .reduce((sum, cat) => sum + cat.items.length, 0) + itemIndex;
                                const isOpen = openIndex === globalIndex;

                                return (
                                    <details
                                        key={itemIndex}
                                        open={isOpen}
                                        className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors"
                                    >
                                        <summary
                                            className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 select-none"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleFAQ(globalIndex);
                                            }}
                                        >
                                            <span className="pr-4">{item.q}</span>
                                            <ChevronDown
                                                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </summary>
                                        <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                            {item.a}
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* No Results */}
                {searchQuery && filteredCategories.length === 0 && (
                    <div className="text-center py-12">
                        <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No FAQs found matching "{searchQuery}"</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Still Have Questions */}
                <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Still have questions?</h3>
                    <p className="text-slate-600 mb-4">
                        For official information, visit the Government Lottery Office website or contact them directly.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/how-to"
                            className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                        >
                            How to Play Guide
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/thai-lottery-statistics"
                            className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                        >
                            View Statistics
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

