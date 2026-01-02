'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, getPath } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link href={getPath('/')} className="flex items-center gap-2">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                            <Image
                                src="/logo.jpg"
                                alt="Thai Lottery Check"
                                fill
                                sizes="(max-width: 640px) 56px, 64px"
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
                    <Link href={getPath('/')} className="text-sm font-medium text-slate-900 hover:text-primary transition-colors">
                        {t.nav.today}
                    </Link>
                    <Link href={getPath('/latest')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        {t.nav.latest}
                    </Link>
                    <Link href={getPath('/history')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        {t.nav.history}
                    </Link>
                    <Link href={getPath('/check')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        {t.nav.check}
                    </Link>
                    <Link href={getPath('/tips')} className="text-sm font-bold text-primary hover:text-red-700 transition-colors bg-red-50 px-3 py-1 rounded-full">
                        VIP Tips
                    </Link>
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
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
                            href={getPath('/')}
                            className="text-primary font-semibold py-2 px-4 bg-red-50 rounded-lg border border-red-100"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.nav.today}
                        </Link>
                        <Link
                            href={getPath('/latest')}
                            className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.nav.latest}
                        </Link>
                        <Link
                            href={getPath('/history')}
                            className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.nav.history}
                        </Link>
                        <Link
                            href={getPath('/check')}
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
