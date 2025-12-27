'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="w-full border-t border-slate-200 bg-white text-slate-500">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* Column 1: About & Disclaimer */}
                    <div className="space-y-4">
                        <h3 className="text-slate-900 text-lg font-bold">{t.footer.aboutTitle}</h3>
                        <p className="text-sm leading-relaxed text-slate-500">
                            {t.footer.aboutText}
                        </p>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-700 font-bold mb-1">{t.footer.disclaimerTitle}</p>
                            <p className="text-xs text-slate-500 leading-normal">
                                {t.footer.disclaimerText}
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-slate-900 text-lg font-bold">{t.footer.quickLinks}</h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/", label: t.nav.today },
                                { href: "/history", label: t.footer.archive },
                                { href: "/thai-lottery-statistics", label: t.footer.stats },
                                { href: "/tips", label: "VIP Tips & Papers" },
                                { href: "/live", label: "Live Watch" },
                                { href: "/knowledge", label: "Wiki & Glossary" },
                                { href: "/zodiac", label: "Zodiac Signs" },
                                { href: "/sources", label: "Source Comparison" },
                                { href: "/thai-lottery-statistics", label: "Statistical Analysis" },
                                { href: "/win-rate", label: "Win Rate Calculator" },
                                { href: "/reality", label: "Myths & Reality" },
                                { href: "/thai-lottery-draw-dates", label: "Draw Schedule" },
                                { href: "/actions", label: "Action Guide" },
                                { href: "/lexicon", label: "Phrase Taxonomies" },
                                { href: "/how-to", label: t.footer.howTo },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center gap-2 group font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors"></div>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal & Source */}
                    <div className="space-y-4">
                        <h3 className="text-slate-900 text-lg font-bold">{t.footer.legal}</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: "/privacy", label: t.footer.privacy },
                                { href: "/terms", label: t.footer.terms },
                                { href: "/contact", label: t.footer.contact },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-slate-500 hover:text-primary transition-colors hover:underline">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {t.footer.attribution}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-200 bg-slate-50">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} {t.footer.copyright}
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                            {t.footer.status}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
