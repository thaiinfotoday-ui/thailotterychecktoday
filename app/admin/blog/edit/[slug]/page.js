'use client';
import { use } from 'react';
import PostEditor from '@/components/admin/PostEditor';

export default function EditPostPage({ params }) {
    // Unwrap params using React.use for Next.js 15+ compatibility or standard await await
    // Actually, params is a Promise in recent Next.js versions, but for now let's treat it safely.
    // In strict Next.js 15, params is async.
    // However, for safety in this "v14/v15?" environment, let's use the hook.
    const resolvedParams = use(params);
    return <PostEditor slug={resolvedParams.slug} />;
}
