'use client';
import Link from 'next/link';
import { Home, Search, Clock, BarChart2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function MobileNav() {
    const pathname = usePathname();
    const { t } = useLanguage();

    // Only show on smaller screens, sticky at bottom
    // We add pb-safe for iOS home indicator safety if needed

    const navItems = [
        { href: '/', label: t.nav.today, icon: Home },
        { href: '/check', label: t.nav.check, icon: Search },
        { href: '/thai-lottery-draw-dates', label: "Schedule", icon: Clock },
        { href: '/thai-lottery-statistics', label: "Stats", icon: BarChart2 },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-purple-600' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium leading-none">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
