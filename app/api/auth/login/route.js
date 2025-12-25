import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Simple Hardcoded Auth for demonstration
// In production, move to Environment Variables or DB
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'lottery2025';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            // Set secure cookie
            cookies().set('admin_token', 'validated_token_12345', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
