import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllPosts, savePost, deletePost, getAdminPosts } from '@/lib/blogService';

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
    console.log("=== API/BLOG GET called ===");
    try {
        const accessToken = await verifyAuth();
        console.log("Debug: accessToken present?", !!accessToken);

        if (accessToken) {
            console.log("Debug: Fetching Admin Posts (including drafts)");
            const posts = await getAdminPosts(accessToken);
            console.log(`Debug: Admin Fetch result: ${posts.length} posts`);
            return NextResponse.json(posts);
        }

        console.log("Debug: Fetching Public Posts (published only)");
        const posts = await getAllPosts();
        console.log(`Debug: Public Fetch result: ${posts.length} posts`);
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Debug: API/BLOG GET Error:", error);
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
