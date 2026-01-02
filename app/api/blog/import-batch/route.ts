import { NextResponse } from 'next/server';
import { createAuthenticatedClient } from '@/lib/supabase';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

export async function POST() {
    console.log("=== STARTING IMPORT BATCH (REVISED) ===");
    try {
        // 1. Verify Authentication
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token');

        console.log("Debug: Checking admin_token");
        if (!token || !token.value) {
            console.error("Debug: Unauthorized - No admin_token cookie found");
            return NextResponse.json({ success: false, error: "Unauthorized: Please log in again." }, { status: 401 });
        }

        const client = createAuthenticatedClient(token.value);

        // 2. Read draft files
        const draftsDir = path.join(process.cwd(), 'app', 'api', 'blog', 'drafts');
        console.log("Debug: Reading drafts from", draftsDir);

        if (!fs.existsSync(draftsDir)) {
            console.error("Debug: Drafts directory not found");
            return NextResponse.json({ success: false, error: "Drafts directory not found on server." });
        }

        const files = fs.readdirSync(draftsDir);
        const importedPosts = [];
        const errors = [];
        const skipped = [];

        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = path.join(draftsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');

                try {
                    const postData = JSON.parse(fileContent);
                    const { title, slug, blocks, status, seo, createdAt } = postData;

                    // Check if exists
                    const { data: existing, error: fetchError } = await client
                        .from('posts')
                        .select('id')
                        .eq('slug', slug)
                        .single();

                    if (fetchError && fetchError.code !== 'PGRST116') {
                        errors.push(`${slug}: DB Check Failed (${fetchError.message})`);
                        continue;
                    }

                    if (!existing) {
                        const dbPayload = {
                            title,
                            slug,
                            content: blocks,
                            status: 'draft',
                            seo_title: seo?.title,
                            seo_description: seo?.description,
                            featured_image: seo?.featuredImage,
                            created_at: createdAt || new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        };

                        const { error: insertError } = await client
                            .from('posts')
                            .insert(dbPayload);

                        if (insertError) {
                            console.error(`Debug: Insert failed for ${slug}:`, insertError);
                            errors.push(`${slug}: Insert Failed (${insertError.message})`);
                        } else {
                            importedPosts.push(title);
                        }
                    } else {
                        skipped.push(slug);
                    }
                } catch (err) {
                    errors.push(`${file}: JSON Parse/Process Error (${err.message})`);
                }
            }
        }

        const summary = {
            success: importedPosts.length > 0 || (skipped.length > 0 && errors.length === 0),
            count: importedPosts.length,
            imported: importedPosts,
            skipped: skipped,
            errors: errors
        };

        console.log("Batch Import Summary:", JSON.stringify(summary, null, 2));

        return NextResponse.json(summary);

    } catch (error) {
        console.error('Debug: Fatal Import error:', error);
        return NextResponse.json({
            success: false,
            error: 'Server Error: ' + error.message
        }, { status: 500 });
    }
}
