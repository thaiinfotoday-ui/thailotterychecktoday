'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw, ArrowRight } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function Error({ error, reset }) {
    const { t } = useLanguage();

    useEffect(() => {
        // Log error to console or error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-slate-50">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Error Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="p-6 bg-red-100 rounded-full">
                            <AlertTriangle className="w-16 h-16 text-red-600" />
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Something Went Wrong
                        </h1>
                        <p className="text-lg text-slate-600">
                            We encountered an unexpected error. Don't worry, our team has been notified.
                        </p>
                        {process.env.NODE_ENV === 'development' && error && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                                <p className="text-sm font-mono text-red-800 break-all">
                                    {error.message || 'Unknown error occurred'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={reset}
                            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transform hover:-translate-y-0.5"
                        >
                            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            Try Again
                        </button>

                        <Link
                            href="/"
                            className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                        >
                            <Home className="w-5 h-5" />
                            {t.notFound.homeBtn}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Helpful Links */}
                    <div className="mt-16 p-8 bg-white border border-slate-200 rounded-2xl">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            What you can do:
                        </h3>
                        <ul className="text-left space-y-3 text-slate-600">
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Refresh the page or try again in a few moments</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Go back to the homepage and navigate from there</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Clear your browser cache and cookies if the problem persists</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>If this continues, the issue may be temporary. Please try again later</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Navigation */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
                        <Link href="/latest" className="text-red-600 hover:text-red-700 font-medium">
                            Latest Draw
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link href="/history" className="text-red-600 hover:text-red-700 font-medium">
                            History
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link href="/check" className="text-red-600 hover:text-red-700 font-medium">
                            Check Number
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

