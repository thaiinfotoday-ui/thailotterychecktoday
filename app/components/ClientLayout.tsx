'use client';

import { usePathname } from 'next/navigation';
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <div className="flex-grow pb-16 md:pb-0">
                {children}
            </div>
            <Footer />
            <MobileNav />
        </>
    );
}
