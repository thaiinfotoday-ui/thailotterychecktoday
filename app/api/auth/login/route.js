import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        // Authenticate with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (error) {
            console.error("Supabase Auth Error:", error.message);
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (data.session) {
            // Valid login - Set the secure cookie
            // We use the access_token from Supabase as our 'admin_token'
            cookies().set('admin_token', data.session.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: data.session.expires_in, // Uses actual token expiry
                path: '/',
            });

            // Also set refresh token if needed, but for simple admin this is enough
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    } catch (error) {
        console.error("Login Route Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
