import { NextResponse } from 'next/server';

export function middleware(request) {
    // 1. Check if route is protected (Admin Routes)
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for auth cookie
        const token = request.cookies.get('admin_token');

        if (!token) {
            // Redirect unauthenticated users to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
