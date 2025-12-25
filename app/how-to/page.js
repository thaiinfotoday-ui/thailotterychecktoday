'use client';
import { useLanguage } from '../context/LanguageContext';
import { FileText, HelpCircle, Award, CheckCircle, ChevronRight } from 'lucide-react';

import { HowToIllustration } from '../components/Illustrations2'; // Import new illustration

// Note: Metadata should be added via layout.js for client components
export default function HowToPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <HowToIllustration className="w-32 h-32 mx-auto mb-6 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.howTo.title}</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Complete guide to understanding Thai Lottery rules, prizes, and claiming process.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
                {t.howTo.sections.map((section, index) => (
                    <div key={index} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm flex gap-4 md:gap-6">
                        <div className="shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                {index === 0 && <HelpCircle className="w-6 h-6" />}
                                {index === 1 && <Award className="w-6 h-6" />}
                                {index === 2 && <CheckCircle className="w-6 h-6" />}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                            <p className="text-slate-600 leading-relaxed">{section.desc}</p>
                        </div>
                    </div>
                ))}

                <section className="pt-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t.faq.title}</h2>
                    <div className="space-y-4">
                        {t.faq.items.map((item, i) => (
                            <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm open:shadow-md transition-shadow">
                                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-900 hover:bg-slate-50 select-none list-none">
                                    <span>{item.q}</span>
                                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                    </span>
                                </summary>
                                <div className="px-5 pb-5 pt-0 text-slate-600 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
