import Image from 'next/image';
import Link from 'next/link';

export default function BlockRenderer({ blocks }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <article className="prose prose-lg prose-slate max-w-none">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'paragraph':
                        return <p key={block.id} className="leading-relaxed text-slate-700">{block.content}</p>;

                    case 'heading':
                        const Tag = block.level || 'h2';
                        return <Tag key={block.id} className="font-bold text-slate-900 mt-8 mb-4">{block.content}</Tag>;

                    case 'list':
                        const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
                        const items = Array.isArray(block.items) ? block.items : [];
                        return (
                            <ListTag key={block.id} className="space-y-1 marker:text-purple-500">
                                {items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ListTag>
                        );

                    case 'quote':
                        return (
                            <blockquote key={block.id} className="border-l-4 border-purple-500 pl-4 py-1 italic bg-slate-50 rounded-r-lg my-6 text-slate-700">
                                "{block.content}"
                            </blockquote>
                        );

                    case 'image':
                        if (!block.url) return null;
                        return (
                            <figure key={block.id} className="my-8">
                                <img
                                    src={block.url}
                                    alt={block.alt || 'Blog image'}
                                    className="w-full h-auto rounded-xl shadow-md border border-slate-200"
                                    loading="lazy"
                                />
                                {block.caption && (
                                    <figcaption className="text-center text-sm text-slate-500 mt-2 italic">
                                        {block.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );

                    default:
                        return null;
                }
            })}
        </article>
    );
}
