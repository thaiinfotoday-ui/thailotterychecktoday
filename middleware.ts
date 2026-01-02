import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 1. Admin Route Protection
    if (pathname.startsWith('/admin')) {
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }
        const token = request.cookies.get('admin_token');
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return NextResponse.next();
    }

    // 2. Language Handling (SEO Strategy)
    // If URL starts with /th/ or is exactly /th, explicitly set header for server to know.
    if (pathname === '/th' || pathname.startsWith('/th/')) {
        const newUrl = new URL(pathname.replace(/^\/th/, '') || '/', request.url);
        const response = NextResponse.rewrite(newUrl);
        response.headers.set('x-next-locale', 'th');
        return response;
    }

    // Handle /en prefix similarly to avoid 404s if users navigate to it
    if (pathname === '/en' || pathname.startsWith('/en/')) {
        const newUrl = new URL(pathname.replace(/^\/en/, '') || '/', request.url);
        const response = NextResponse.rewrite(newUrl);
        response.headers.set('x-next-locale', 'en');
        return response;
    }

    // Default: Check if user prefers Thai but visited root (Optional: Redirect? Nah, better let them choose)
    // We just proceed as English (default)
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
