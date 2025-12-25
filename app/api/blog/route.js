import { NextResponse } from 'next/server';
import { getAllPosts, savePost, deletePost } from '@/lib/blogService';

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
        const data = await req.json();

        // Basic Validation
        if (!data.title || !data.slug) {
            return NextResponse.json({ error: "Title and Slug are required" }, { status: 400 });
        }

        const savedPost = await savePost(data);
        return NextResponse.json(savedPost);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ error: "Slug required" }, { status: 400 });
        }

        await deletePost(slug);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
