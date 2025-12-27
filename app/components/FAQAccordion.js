'use client';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion({ faqs, title = "Frequently Asked Questions" }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 bg-white rounded-3xl border border-slate-200 shadow-sm mt-12">
            <div className="px-6 md:px-12">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase mb-4">
                        <HelpCircle className="w-4 h-4" />
                        Common Queries
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">{title}</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Answers to the most common questions about the Thai Lottery, optimized for quick understanding.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md bg-slate-50/50"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-white"
                            >
                                <span className="font-bold text-slate-900 text-lg pr-8">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
