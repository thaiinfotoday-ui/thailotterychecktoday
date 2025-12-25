'use client';
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
                            <li>
                                <a href="/" className="text-sm hover:text-purple-600 transition-colors flex items-center gap-2 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    {t.nav.today}
                                </a>
                            </li>
                            <li>
                                <a href="/history" className="text-sm hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-purple-500 transition-colors"></span>
                                    {t.footer.archive}
                                </a>
                            </li>
                            <li>
                                <a href="/statistics" className="text-sm hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-purple-500 transition-colors"></span>
                                    {t.footer.stats}
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="text-sm hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-purple-500 transition-colors"></span>
                                    {t.footer.howTo}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Source */}
                    <div className="space-y-4">
                        <h3 className="text-slate-900 text-lg font-bold">{t.footer.legal}</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/privacy" className="hover:text-purple-600 transition-colors">{t.footer.privacy}</a></li>
                            <li><a href="/terms" className="hover:text-purple-600 transition-colors">{t.footer.terms}</a></li>
                            <li><a href="/contact" className="hover:text-purple-600 transition-colors">{t.footer.contact}</a></li>
                        </ul>
                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-xs text-slate-400">
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
