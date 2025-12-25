import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllPosts, savePost, deletePost } from '@/lib/blogService';

// Helper to verify authentication
async function verifyAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token || !token.value) {
        return null;
    }
    
    return token.value;
}

export async function GET() {
    try {
        const posts = await getAllPosts();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        // Verify authentication
        const accessToken = await verifyAuth();
        if (!accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();

        // Basic Validation
        if (!data.title || !data.slug) {
            return NextResponse.json({ error: "Title and Slug are required" }, { status: 400 });
        }

        const savedPost = await savePost(data, accessToken);
        return NextResponse.json(savedPost);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        // Verify authentication
        const accessToken = await verifyAuth();
        if (!accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ error: "Slug required" }, { status: 400 });
        }

        await deletePost(slug, accessToken);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
