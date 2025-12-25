import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        // Validate input
        if (!username || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Debug Log (Server Side)
        console.log("Attempting login for:", username);

        // Create a fresh Supabase client for this request (required for server-side auth)
        const supabase = createServerClient();

        // Authenticate with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (error) {
            console.error("Supabase Auth Error:", error.message);
            // Return specific error message to help debug
            return NextResponse.json({ 
                error: error.message || 'Invalid email or password' 
            }, { status: 401 });
        }

        if (data.session) {
            // Valid login - Set the secure cookie
            const cookieStore = await cookies(); // Next.js 15+ compat
            cookieStore.set('admin_token', data.session.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: data.session.expires_in || 3600, // Default to 1 hour if not provided
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Login succeeded but no session returned' }, { status: 500 });
    } catch (error) {
        console.error("Login Route Error:", error);
        return NextResponse.json({ 
            error: 'Internal Server Error: ' + error.message 
        }, { status: 500 });
    }
}
