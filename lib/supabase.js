import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
    const errorMsg = 'Missing Supabase environment variables! Please create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY';
    if (typeof window === 'undefined') {
        // Server-side: throw error
        throw new Error(errorMsg);
    } else {
        // Client-side: log warning
        console.error(errorMsg);
    }
}

// Default client (for public operations - client-side)
export const supabase = typeof window !== 'undefined' 
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Server-side client factory (creates fresh instance for each request)
export function createServerClient() {
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase environment variables are missing');
    }
    return createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false, // Don't persist session on server
            autoRefreshToken: false, // Don't auto-refresh on server
        },
    });
}

// Helper to create authenticated client with user's access token
export function createAuthenticatedClient(accessToken) {
    if (!accessToken) {
        throw new Error('Access token is required for authenticated operations');
    }
    
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase environment variables are missing');
    }
    
    return createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}
