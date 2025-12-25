import { promises as fs } from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'data', 'posts');

// Ensure directory exists
async function ensureDir() {
    try {
        await fs.access(POSTS_DIR);
    } catch {
        await fs.mkdir(POSTS_DIR, { recursive: true });
    }
}

export async function getAllPosts() {
    await ensureDir();
    const files = await fs.readdir(POSTS_DIR);
    const posts = [];

    for (const file of files) {
        if (file.endsWith('.json')) {
            const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
            try {
                posts.push(JSON.parse(content));
            } catch (e) {
                console.error(`Failed to parse post: ${file}`, e);
            }
        }
    }

    // Sort by published date desc
    return posts.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
}

export async function getPostBySlug(slug) {
    await ensureDir();
    const filePath = path.join(POSTS_DIR, `${slug}.json`);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch {
        return null;
    }
}

export async function savePost(postData) {
    await ensureDir();

    // Auto-generate fields
    const now = new Date().toISOString();
    const post = {
        ...postData,
        updatedAt: now,
        createdAt: postData.createdAt || now,
    };

    if (!post.slug) {
        throw new Error("Slug is required");
    }

    const filePath = path.join(POSTS_DIR, `${post.slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(post, null, 2), 'utf-8');
    return post;
}

export async function deletePost(slug) {
    await ensureDir();
    const filePath = path.join(POSTS_DIR, `${slug}.json`);
    try {
        await fs.unlink(filePath);
        return true;
    } catch {
        return false;
    }
}
