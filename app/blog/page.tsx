import Link from 'next/link';
import { getAllPosts } from '@/lib/blogService';
import { Calendar, User } from 'lucide-react';
import { headers } from 'next/headers';
import ClientLayout from '../components/ClientLayout';
import { getTranslations } from '@/lib/translations';

export const metadata = {
    title: "Thai Lottery Blog - Educational News & Guides",
    description: "Read our latest educational guides and informational updates about Thai Government Lottery.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/blog`,
    },
};

// Cache blog listing for 5 minutes
export const revalidate = 300;

export default async function BlogIndexPage() {
    const headersList = await headers();
    const lang = (headersList.get('x-next-locale') || 'th') as 'th' | 'en';

    // Helper to generate localized paths
    const getPath = (path: string) => {
        if (lang === 'en') {
            return `/en${path === '/' ? '' : path}`;
        }
        return path;
    };

    const publishedPosts = await getAllPosts();

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-16 text-center">
                    <span className="inline-block px-3 py-1 bg-red-100 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        Educational Resources
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                        {lang === 'th' ? 'บทความน่ารู้' : 'Thai Lottery Insights'}
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        {lang === 'th'
                            ? 'เรียนรู้เรื่องราวน่าสนใจเกี่ยวกับสลากกินแบ่งรัฐบาล เคล็ดลับ และข่าวสารล่าสุด'
                            : 'Learn how the lottery works, understand number frequency, and read official updates. Purely informational. No predictions.'}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-5xl">
                {publishedPosts.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <p className="text-lg">No articles published yet.</p>
                        <p className="text-sm">Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {publishedPosts.map(post => (
                            <Link
                                key={post.slug}
                                href={getPath(`/blog/${post.slug}`)}
                                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Placeholder Image handling - in real app, use post.featuredImage */}
                                <div className="h-48 bg-gradient-to-br from-red-100 to-indigo-50 flex items-center justify-center text-red-200">
                                    <span className="text-4xl">📝</span>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            Editor
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                                        {post.seo?.description || "Read more about this topic..."}
                                    </p>
                                    <span className="inline-block mt-4 text-sm font-bold text-primary">
                                        Read Article &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
