'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Save, ArrowLeft, Layout, Type, Image as ImageIcon,
    List, Quote, MoreVertical, X, ChevronUp, ChevronDown,
    Bold, Italic, Link as LinkIcon, AlertTriangle, CheckCircle, Search
} from 'lucide-react';

// --- BLOCK COMPONENTS ---

const RenderBlock = ({ block, updateBlock, removeBlock, moveBlock, index, total }) => {
    return (
        <div className="group relative bg-white border border-slate-200 rounded-lg p-4 mb-4 hover:border-purple-300 transition-colors">
            {/* Block Controls */}
            <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-slate-100 rounded-md p-1">
                <button onClick={() => moveBlock(index, -1)} disabled={index === 0} className="p-1 hover:bg-slate-100 rounded text-slate-500 disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveBlock(index, 1)} disabled={index === total - 1} className="p-1 hover:bg-slate-100 rounded text-slate-500 disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                </button>
                <button onClick={() => removeBlock(index)} className="p-1 hover:bg-red-50 text-red-500 rounded">
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Block Content */}
            {block.type === 'heading' && (
                <div>
                    <div className="flex gap-2 mb-2">
                        {['h2', 'h3', 'h4'].map(tag => (
                            <button
                                key={tag}
                                onClick={() => updateBlock(index, { ...block, level: tag })}
                                className={`px-2 py-1 text-xs font-bold rounded ${block.level === tag ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                            >
                                {tag.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(index, { ...block, content: e.target.value })}
                        placeholder={`Heading ${block.level?.replace('h', '') || '2'}...`}
                        className="w-full text-xl font-bold border-none focus:ring-0 placeholder:text-slate-300 p-0"
                    />
                </div>
            )}

            {block.type === 'paragraph' && (
                <textarea
                    value={block.content}
                    onChange={(e) => updateBlock(index, { ...block, content: e.target.value })}
                    placeholder="Type your paragraph here..."
                    rows={Math.max(2, block.content.split('\n').length)}
                    className="w-full resize-y border-none focus:ring-0 text-slate-700 leading-relaxed placeholder:text-slate-300 p-0"
                />
            )}

            {block.type === 'image' && (
                <div className="space-y-3">
                    <label className="block p-8 border-2 border-dashed border-slate-200 rounded-lg text-center cursor-pointer hover:bg-slate-50 transition-colors">
                        {block.url ? (
                            <img src={block.url} alt="Preview" className="max-h-64 mx-auto rounded shadow-sm" />
                        ) : (
                            <div className="text-slate-400 flex flex-col items-center">
                                <ImageIcon className="w-8 h-8 mb-2" />
                                <span>Click to enter Image URL</span>
                            </div>
                        )}
                        {/* Since we don't have a real upload backend, we use URL input for now */}
                    </label>
                    <input
                        type="text"
                        value={block.url || ''}
                        onChange={(e) => updateBlock(index, { ...block, url: e.target.value })}
                        placeholder="Image URL (https://...)"
                        className="w-full text-sm border border-slate-200 rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        value={block.alt || ''}
                        onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                        placeholder="Alt text (Required for SEO)"
                        className="w-full text-sm border border-slate-200 rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        value={block.caption || ''}
                        onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                        placeholder="Caption (Optional)"
                        className="w-full text-xs text-slate-500 border-none bg-transparent p-0 focus:ring-0"
                    />
                </div>
            )}

            {block.type === 'list' && (
                <div>
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={() => updateBlock(index, { ...block, style: 'unordered' })}
                            className={`px-2 py-1 text-xs font-medium rounded ${block.style === 'unordered' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                            Bullet List
                        </button>
                        <button
                            onClick={() => updateBlock(index, { ...block, style: 'ordered' })}
                            className={`px-2 py-1 text-xs font-medium rounded ${block.style === 'ordered' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                            Numbered List
                        </button>
                    </div>
                    <textarea
                        value={Array.isArray(block.items) ? block.items.join('\n') : block.items} // Handle legacy
                        onChange={(e) => updateBlock(index, { ...block, items: e.target.value.split('\n') })}
                        placeholder="Item 1&#10;Item 2&#10;Item 3"
                        className="w-full border border-slate-200 rounded p-3 text-sm font-mono leading-7 bg-slate-50 focus:bg-white transition-colors"
                        rows={5}
                    />
                    <p className="text-xs text-slate-400 mt-1">One item per line</p>
                </div>
            )}

            {block.type === 'quote' && (
                <div className="flex gap-4">
                    <Quote className="w-8 h-8 text-slate-200 shrink-0" />
                    <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(index, { ...block, content: e.target.value })}
                        placeholder="Enter quote..."
                        className="w-full text-lg italic text-slate-600 border-none focus:ring-0 p-0 placeholder:text-slate-300"
                        rows={2}
                    />
                </div>
            )}
        </div>
    );
};

// --- MAIN EDITOR ---

export default function PostEditor({ slug }) {
    const router = useRouter();
    const [loading, setLoading] = useState(!!slug);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('content'); // content | seo

    // Post State
    const [post, setPost] = useState({
        title: '',
        slug: '',
        status: 'draft',
        createdAt: new Date().toISOString(),
        seo: {
            title: '',
            description: '',
            canonical: '',
        },
        blocks: [
            { id: 1, type: 'paragraph', content: '' } // Initial block
        ]
    });

    useEffect(() => {
        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/blog?slug=${slug}`); // Fetch all usually, but here we probably need a single fetch endpoint. 
            // My API currently returns ALL posts on GET /api/blog. 
            // Let's rely on list filtering or update API. Warning: returning huge lists is bad.
            // For this demo, let's assume client-side find since I didn't verify single GET support.
            // ACTUALLY, I'll just add `getPostBySlug` via new API param logic or filter content.
            // The service has `getPostBySlug`. Let's update the API route? No, I can't edit it easily again without overwriting.
            // Wait, I can just fetch all and filter client side for now. It's an admin panel.
            const allPosts = await res.json();
            const found = allPosts.find(p => p.slug === slug); // Client side search
            if (found) setPost(found);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // --- ACTIONS ---

    const addBlock = (type) => {
        const newBlock = {
            id: Date.now(),
            type,
            content: '',
            ...(type === 'heading' && { level: 'h2' }),
            ...(type === 'list' && { style: 'unordered', items: [] }),
            ...(type === 'image' && { url: '', alt: '', caption: '' }),
        };
        setPost(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    };

    const updateBlock = (index, updatedBlock) => {
        const newBlocks = [...post.blocks];
        newBlocks[index] = updatedBlock;
        setPost(prev => ({ ...prev, blocks: newBlocks }));
    };

    const removeBlock = (index) => {
        setPost(prev => ({
            ...prev,
            blocks: prev.blocks.filter((_, i) => i !== index)
        }));
    };

    const moveBlock = (index, direction) => {
        const newBlocks = [...post.blocks];
        const targetIndex = index + direction;
        if (targetIndex >= 0 && targetIndex < newBlocks.length) {
            [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
            setPost(prev => ({ ...prev, blocks: newBlocks }));
        }
    };

    const generateSlug = () => {
        const slug = post.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setPost(prev => ({ ...prev, slug }));
    };

    const validateContent = () => {
        const FORBIDDEN = ['win money', 'prediction', 'pass formula', 'guaranteed', 'buy ticket'];
        const content = JSON.stringify(post);
        const found = FORBIDDEN.filter(word => content.toLowerCase().includes(word));
        if (found.length > 0) {
            alert(`Safety Warning: Content contains forbidden terms: ${found.join(', ')}`);
            return false;
        }
        if (!post.title || !post.slug) {
            alert('Title and Slug are required');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateContent()) return;
        setSaving(true);
        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
            if (res.ok) {
                alert('Post saved successfully!');
                router.push('/admin/blog');
            } else {
                const err = await res.json();
                alert(`Error: ${err.error}`);
            }
        } catch (e) {
            alert('Save failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading editor...</div>;

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-100 z-10 py-4 border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2 hover:bg-slate-200 rounded-lg text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-900">
                        {slug ? 'Edit Post' : 'New Post'}
                    </h1>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {post.status}
                    </span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setPost(p => ({ ...p, status: p.status === 'published' ? 'draft' : 'published' }))}
                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                        {post.status === 'published' ? 'Revert to Draft' : 'Publish'}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save</>}
                    </button>
                </div>
            </div>

            <div className="flex gap-8 items-start">

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    {/* Title Input */}
                    <input
                        type="text"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                        onBlur={() => !slug && !post.slug && generateSlug()} // Auto-gen slug on blur
                        placeholder="Post Title (H1)"
                        className="w-full text-4xl font-black bg-transparent border-none placeholder:text-slate-300 focus:ring-0 p-0"
                    />

                    {/* Editor Canvas */}
                    <div className="min-h-[500px] space-y-4">
                        {post.blocks.map((block, index) => (
                            <RenderBlock
                                key={block.id}
                                block={block}
                                index={index}
                                total={post.blocks.length}
                                updateBlock={updateBlock}
                                removeBlock={removeBlock}
                                moveBlock={moveBlock}
                            />
                        ))}
                    </div>

                    {/* Add Block Menu */}
                    <div className="border-t border-slate-200 pt-6">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Add Block</p>
                        <div className="flex gap-2">
                            <button onClick={() => addBlock('paragraph')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded hover:border-purple-300 hover:text-purple-600 text-sm font-medium text-slate-600 transition-colors">
                                <Type className="w-4 h-4" /> Text
                            </button>
                            <button onClick={() => addBlock('heading')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded hover:border-purple-300 hover:text-purple-600 text-sm font-medium text-slate-600 transition-colors">
                                <Layout className="w-4 h-4" /> Heading
                            </button>
                            <button onClick={() => addBlock('image')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded hover:border-purple-300 hover:text-purple-600 text-sm font-medium text-slate-600 transition-colors">
                                <ImageIcon className="w-4 h-4" /> Image
                            </button>
                            <button onClick={() => addBlock('list')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded hover:border-purple-300 hover:text-purple-600 text-sm font-medium text-slate-600 transition-colors">
                                <List className="w-4 h-4" /> List
                            </button>
                            <button onClick={() => addBlock('quote')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded hover:border-purple-300 hover:text-purple-600 text-sm font-medium text-slate-600 transition-colors">
                                <Quote className="w-4 h-4" /> Quote
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="w-80 shrink-0 space-y-6">
                    {/* Slug */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">URL Slug</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={post.slug}
                                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                                className="w-full text-sm font-mono bg-slate-50 border border-slate-200 rounded px-2 py-1"
                            />
                            <button onClick={generateSlug} title="Regenerate" className="p-1 hover:bg-slate-100 rounded text-slate-500">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* SEO Panel */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Search className="w-4 h-4 text-purple-600" /> SEO Settings
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={post.seo.title}
                                    onChange={(e) => setPost({ ...post, seo: { ...post.seo, title: e.target.value } })}
                                    className="w-full text-sm border border-slate-200 rounded px-3 py-2"
                                    placeholder={post.title || "Same as H1"}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Meta Description</label>
                                <textarea
                                    value={post.seo.description}
                                    onChange={(e) => setPost({ ...post, seo: { ...post.seo, description: e.target.value } })}
                                    className="w-full text-sm border border-slate-200 rounded px-3 py-2 h-24"
                                    placeholder="Brief summary for Google..."
                                />
                                <p className={`text-xs text-right mt-1 ${post.seo.description.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                                    {post.seo.description.length}/160
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Safety Check */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4" /> Content Guardrails
                        </h3>
                        <ul className="text-xs text-blue-800 space-y-1 pl-5 list-disc">
                            <li>No gambling promotion</li>
                            <li>No "guaranteed win" claims</li>
                            <li>Minimum 300 words recommended</li>
                            <li>Alt text required on images</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
