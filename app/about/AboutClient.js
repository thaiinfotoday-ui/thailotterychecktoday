'use client';

import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Target, Users, Database, Globe, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutClient() {
    const { lang } = useLanguage();

    // Organization Schema for Entity Identity Resolution
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Thai Lottery Check Today",
        "url": "https://thailotterychecktoday.com",
        "logo": "https://thailotterychecktoday.com/logo.jpg",
        "description": "A digital platform specializing in statistical analysis and real-time reporting of Thai Government Lottery results.",
        "foundingDate": "2024",
        "knowsAbout": ["Thai Lottery", "Statistical Analysis", "Probability", "Government Lottery Office"],
        "mission": "To provide accurate, transparent, and analytically rich lottery data to the public.",
        "sameAs": [
            "https://twitter.com/thailotterycheck",
            "https://facebook.com/thailotterycheck"
        ]
    };

    return (
        <div className="min-h-screen bg-white pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {/* Entity Header */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase mb-6 tracking-widest">
                        Corporate Profile
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        About <span className="text-primary">Thai Lottery Check Today</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        We are a specialized digital information provider focusing on the transparency, historical archiving, and statistical analysis of the Thai Government Lottery (GLO).
                    </p>
                </div>
            </section>

            {/* Core Identity Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Constructing a <span className="text-primary">Trusted Digital Identity</span>
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                In an ecosystem filled with ambiguous data sources, <strong>Thai Lottery Check Today</strong> establishes itself as a definitive reference point (Knowledge Node). We do not conduct gambling operations; rather, we function as an <strong>Informational Entity</strong> aggregating public domain data.
                            </p>
                            <p>
                                Our proprietary algorithms process historical draw data to identify patterns (Entity-Attribute Relationships) and ensure 100% verification against official GLO announcements.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <ShieldCheck className="w-8 h-8 text-green-500 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-1">Verified Data</h3>
                            <p className="text-xs text-slate-500">Cross-referenced with GLO official signals.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <Database className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-1">Structured Archive</h3>
                            <p className="text-xs text-slate-500">10+ Years of structured historical records.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <Target className="w-8 h-8 text-red-500 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-1">Precision</h3>
                            <p className="text-xs text-slate-500">Zero-latency result updates.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <Users className="w-8 h-8 text-purple-500 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-1">Community</h3>
                            <p className="text-xs text-slate-500">Serving 1M+ monthly users.</p>
                        </div>
                    </div>
                </div>

                {/* Mission & Values */}
                <div className="border-t border-slate-100 pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-900">Our Operational Values</h2>
                        <p className="text-slate-500">Defining our entity through our actions and standards</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Globe,
                                title: "Transparency",
                                desc: "We believe lottery data belongs to the public. We present it without bias or alteration, preserving its original integrity."
                            },
                            {
                                icon: Award,
                                title: "Excellence",
                                desc: "Our platform leverages modern web technologies (Next.js) to deliver the fastest, most responsive experience in the industry."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Responsibility",
                                desc: "We strictly adhere to responsible information sharing, ensuring our content is distinct from gambling solicitation."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 hover:bg-slate-50 rounded-2xl transition-colors">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect with the Official Source</h2>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Access our full database of historical results and analytical tools.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/history" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                                View Archives
                            </Link>
                            <Link href="/contact" className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
