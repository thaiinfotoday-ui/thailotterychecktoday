import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAuthenticatedClient } from '@/lib/supabase';

// Helper to verify authentication
async function verifyAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token || !token.value) {
        return null;
    }
    
    return token.value;
}

export async function POST(req) {
    try {
        // Verify authentication
        const accessToken = await verifyAuth();
        if (!accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the file from form data
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ 
                error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' 
            }, { status: 400 });
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({ 
                error: 'File size too large. Maximum size is 5MB.' 
            }, { status: 400 });
        }

        // Create authenticated Supabase client
        const supabase = createAuthenticatedClient(accessToken);

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExt = file.name.split('.').pop();
        const fileName = `blog/${timestamp}-${randomString}.${fileExt}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('blog-images')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Supabase Storage Error:', error);
            return NextResponse.json({ 
                error: 'Failed to upload image: ' + error.message 
            }, { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(fileName);

        return NextResponse.json({
            success: true,
            url: urlData.publicUrl,
            path: fileName
        });

    } catch (error) {
        console.error('Image Upload Error:', error);
        return NextResponse.json({ 
            error: 'Internal Server Error: ' + error.message 
        }, { status: 500 });
    }
}

