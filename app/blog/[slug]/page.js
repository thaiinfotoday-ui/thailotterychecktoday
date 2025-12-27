import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/blogService';
import BlockRenderer from '@/components/blog/BlockRenderer';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};

    return {
        title: post.seo?.title || post.title,
        description: post.seo?.description || `Read about ${post.title}`,
        alternates: {
            canonical: `/blog/${post.slug}`,
        }
    };
}

export default async function BlogPostPage({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
            {/* Header / Hero */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 pt-12 pb-16 max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-primary font-bold">
                                E
                            </span>
                            <span>By Editor</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <BlockRenderer blocks={post.blocks} />

                <div className="mt-12 pt-8 border-t border-slate-100">
                    <p className="text-sm text-slate-400 italic text-center">
                        This article is for educational purposes only.
                    </p>
                </div>
            </main>
        </div>
    );
}
