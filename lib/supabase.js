import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Warning if keys are missing in development
if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials missing! Authentication will fail.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
