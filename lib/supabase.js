import { createClient } from '@supabase/supabase-js';

// Helper to get environment variables (read at runtime for serverless compatibility)
function getEnvVars() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return { supabaseUrl, supabaseKey };
}

// Default client (for public operations - client-side only)
export const supabase = typeof window !== 'undefined' 
    ? (() => {
        const { supabaseUrl, supabaseKey } = getEnvVars();
        if (!supabaseUrl || !supabaseKey) {
            console.error('Missing Supabase environment variables!');
            return null;
        }
        return createClient(supabaseUrl, supabaseKey);
    })()
    : null;

// Server-side client factory (creates fresh instance for each request)
export function createServerClient() {
    const { supabaseUrl, supabaseKey } = getEnvVars();
    
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
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
    
    const { supabaseUrl, supabaseKey } = getEnvVars();
    
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
