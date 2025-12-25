import { supabase, createServerClient, createAuthenticatedClient } from '@/lib/supabase';

// Helper to normalize DB snake_case to Frontend camelCase
function normalizePost(post) {
    if (!post) return null;
    return {
        ...post,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        publishedAt: post.published_at,
        // Map DB 'content' (JSON) to 'blocks' for editor/renderer, or keep as is if naming matches
        // Editor uses 'blocks', DB uses 'content'.
        blocks: post.content || [],
        seo: {
            title: post.seo_title || '',
            description: post.seo_description || '',
            featuredImage: post.featured_image || ''
        }
    };
}

// Get the appropriate client (server-side or client-side)
function getClient() {
    // If we're on the server, use server client
    if (typeof window === 'undefined') {
        return createServerClient();
    }
    // If we're on the client and supabase exists, use it
    if (supabase) {
        return supabase;
    }
    // Fallback to server client
    return createServerClient();
}

// Public read operations
export async function getAllPosts() {
    const client = getClient();
    const { data, error } = await client
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
    return (data || []).map(normalizePost);
}

export async function getPostBySlug(slug) {
    const client = getClient();
    const { data, error } = await client
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) return null;
    return normalizePost(data);
}

// Authenticated write operations (require access token)
export async function savePost(postData, accessToken) {
    if (!accessToken) {
        throw new Error('Authentication required to save posts');
    }

    const authenticatedSupabase = createAuthenticatedClient(accessToken);

    // Map Frontend fields to DB columns
    const { title, slug, blocks, status, seo } = postData;

    // Check if exists
    const { data: existing } = await authenticatedSupabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .single();

    const dbPayload = {
        title,
        slug,
        content: blocks, // Save 'blocks' array into 'content' jsonb column
        status,
        seo_title: seo?.title,
        seo_description: seo?.description,
        featured_image: seo?.featuredImage,
        updated_at: new Date().toISOString()
    };

    let result;
    if (existing) {
        // Update
        result = await authenticatedSupabase
            .from('posts')
            .update(dbPayload)
            .eq('slug', slug)
            .select()
            .single();
    } else {
        // Insert
        result = await authenticatedSupabase
            .from('posts')
            .insert({
                ...dbPayload,
                published_at: status === 'published' ? new Date().toISOString() : null
            })
            .select()
            .single();
    }

    if (result.error) throw new Error(result.error.message);
    return normalizePost(result.data);
}

export async function deletePost(slug, accessToken) {
    if (!accessToken) {
        throw new Error('Authentication required to delete posts');
    }

    const authenticatedSupabase = createAuthenticatedClient(accessToken);
    const { error } = await authenticatedSupabase
        .from('posts')
        .delete()
        .eq('slug', slug);

    if (error) throw new Error(error.message);
    return true;
}
