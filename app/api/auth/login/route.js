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
        
        // Check environment variables (for debugging)
        const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
        const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        console.log("Env check - URL:", hasSupabaseUrl, "Key:", hasSupabaseKey);

        // Create a fresh Supabase client for this request (required for server-side auth)
        let supabase;
        try {
            supabase = createServerClient();
        } catch (clientError) {
            console.error("Failed to create Supabase client:", clientError.message);
            return NextResponse.json({ 
                error: 'Server configuration error. Please check environment variables.' 
            }, { status: 500 });
        }

        // Authenticate with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (error) {
            console.error("Supabase Auth Error:", {
                message: error.message,
                status: error.status,
                code: error.code
            });
            
            // Return user-friendly error messages
            let errorMessage = 'Invalid email or password';
            if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Invalid email or password';
            } else if (error.message.includes('Email not confirmed')) {
                errorMessage = 'Please confirm your email address first';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            return NextResponse.json({ 
                error: errorMessage 
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

            console.log("Login successful for:", username);
            return NextResponse.json({ success: true });
        }

        console.error("Login succeeded but no session returned");
        return NextResponse.json({ error: 'Login succeeded but no session returned' }, { status: 500 });
    } catch (error) {
        console.error("Login Route Error:", error);
        return NextResponse.json({ 
            error: 'Internal Server Error: ' + error.message 
        }, { status: 500 });
    }
}
