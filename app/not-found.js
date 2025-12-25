'use client';

import Link from 'next/link';
import { Home, Search, History, HelpCircle, ArrowRight, FileQuestion } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function NotFound() {
    const { t } = useLanguage();

    const quickLinks = [
        {
            href: '/',
            icon: Home,
            title: t.nav.today || 'Today Results',
            desc: 'View latest lottery results'
        },
        {
            href: '/latest',
            icon: Search,
            title: t.nav.latest || 'Latest Draw',
            desc: 'Check the most recent draw'
        },
        {
            href: '/history',
            icon: History,
            title: t.nav.history || 'History',
            desc: 'Browse past results'
        },
        {
            href: '/check',
            icon: Search,
            title: t.nav.check || 'Check Number',
            desc: 'Verify your ticket number'
        },
        {
            href: '/how-to',
            icon: HelpCircle,
            title: t.tools.howToTitle || 'How to Play',
            desc: 'Learn rules and prizes'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Main 404 Section */}
                    <div className="text-center mb-16 relative">
                        {/* Background Decor */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/30 blur-[120px] rounded-full"></div>
                        </div>

                        <div className="relative z-10 space-y-6">
                            {/* 404 Number with Animation */}
                            <div className="relative">
                                <h1 className="text-[180px] md:text-[220px] font-black leading-none bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent select-none">
                                    404
                                </h1>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <FileQuestion className="w-32 h-32 text-purple-200/50" />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-4 -mt-8">
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                                    {t.notFound.title}
                                </h2>
                                <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
                                    {t.notFound.desc}
                                </p>
                                <p className="text-slate-500 text-sm md:text-base">
                                    The page you're looking for might have been moved, deleted, or doesn't exist.
                                </p>
                            </div>

                            {/* Primary Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                                <Link
                                    href="/"
                                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all w-full sm:w-auto justify-center shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transform hover:-translate-y-0.5"
                                >
                                    <Home className="w-5 h-5" />
                                    {t.notFound.homeBtn}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    href="/latest"
                                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-purple-200 text-slate-700 font-semibold rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all w-full sm:w-auto justify-center shadow-sm hover:shadow-md"
                                >
                                    <Search className="w-5 h-5" />
                                    {t.notFound.checkBtn}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
                            Popular Pages
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {quickLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all hover:-translate-y-1"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-purple-100 group-hover:bg-purple-200 rounded-lg transition-colors">
                                                <Icon className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                                                    {link.title}
                                                </h4>
                                                <p className="text-sm text-slate-500">
                                                    {link.desc}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="mt-16 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
                        <div className="text-center space-y-4">
                            <HelpCircle className="w-12 h-12 text-purple-600 mx-auto" />
                            <h3 className="text-xl font-bold text-slate-900">
                                Need Help?
                            </h3>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                If you believe this is an error, please check the URL or try navigating from our homepage. 
                                You can also browse our history section to find past lottery results.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                                <Link
                                    href="/history"
                                    className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                                >
                                    <History className="w-4 h-4" />
                                    View History
                                </Link>
                                <span className="text-slate-300">•</span>
                                <Link
                                    href="/how-to"
                                    className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    How to Use
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
