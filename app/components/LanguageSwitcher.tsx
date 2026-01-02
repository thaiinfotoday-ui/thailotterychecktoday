'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface LanguageSwitcherProps {
    currentLang?: string;
    className?: string;
}

export default function LanguageSwitcher({ currentLang, className = '' }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [lang, setLang] = useState(currentLang || 'th');

    useEffect(() => {
        // Detect language from pathname
        if (pathname.startsWith('/en')) {
            setLang('en');
        } else if (pathname.startsWith('/th')) {
            setLang('th');
        } else {
            setLang('th'); // default
        }
    }, [pathname]);

    const switchLanguage = (newLang: 'th' | 'en') => {
        // Remove current language prefix from pathname
        let basePath = pathname;
        if (pathname.startsWith('/th')) {
            basePath = pathname.replace(/^\/th/, '') || '/';
        } else if (pathname.startsWith('/en')) {
            basePath = pathname.replace(/^\/en/, '') || '/';
        }

        // Navigate to new language path
        const newPath = `/${newLang}${basePath}`;
        router.push(newPath);
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                onClick={() => switchLanguage('th')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${lang === 'th'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                aria-label="Switch to Thai"
            >
                ไทย
            </button>
            <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${lang === 'en'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
}
