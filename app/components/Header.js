'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, toggleLanguage, lang } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo.jpg"
                                alt="Thai Lottery Check"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold text-primary hidden sm:block">
                            {t.title}
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-slate-900 hover:text-primary transition-colors">
                        {t.nav.today}
                    </Link>
                    <Link href="/latest" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        {t.nav.latest}
                    </Link>
                    <Link href="/history" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        {t.nav.history}
                    </Link>
                    <Link href="/check" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        {t.nav.check}
                    </Link>
                    <Link href="/tips" className="text-sm font-bold text-primary hover:text-red-700 transition-colors bg-red-50 px-3 py-1 rounded-full">
                        VIP Tips
                    </Link>
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200"
                        aria-label="Switch Language"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-semibold w-5">{lang.toUpperCase()}</span>
                    </button>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 -mr-2 text-slate-600 hover:text-slate-900"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white transition-all">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4 shadow-xl">
                        <Link
                            href="/"
                            className="text-primary font-semibold py-2 px-4 bg-red-50 rounded-lg border border-red-100"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.nav.today}
                        </Link>
                        <Link
                            href="/latest"
                            className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.nav.latest}
                        </Link>
                        <Link
                            href="/history"
                            className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.nav.history}
                        </Link>
                        <Link
                            href="/check"
                            className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.nav.check}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
