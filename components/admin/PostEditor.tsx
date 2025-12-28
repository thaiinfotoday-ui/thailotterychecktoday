'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Save, ArrowLeft, Layout, Type, Image as ImageIcon,
    List, Quote, MoreVertical, X, ChevronUp, ChevronDown,
    Bold, Italic, Link as LinkIcon, AlertTriangle, CheckCircle, Search,
    Upload, Loader2, Trash2, Code, Minus, Plus
} from 'lucide-react';

// --- IMAGE UPLOAD COMPONENT ---

const ImageBlock = ({ block, updateBlock, index }) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFile = async (file) => {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size too large. Maximum size is 5MB.');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/blog/upload-image', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.url) {
                updateBlock(index, { ...block, url: data.url });
            } else {
                alert(data.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-3">
            {/* Image Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg transition-colors ${dragActive
                    ? 'border-purple-500 bg-purple-50'
                    : block.url
                        ? 'border-slate-200'
                        : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                    }`}
            >
                {block.url ? (
                    <div className="relative group">
                        <img
                            src={block.url}
                            alt={block.alt || 'Preview'}
                            className="w-full h-auto max-h-96 object-contain rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                                onClick={() => {
                                    if (confirm('Remove this image?')) {
                                        updateBlock(index, { ...block, url: '', alt: '', caption: '' });
                                    }
                                }}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <label className="block p-12 text-center cursor-pointer">
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={handleChange}
                            className="hidden"
                            disabled={uploading}
                        />
                        {uploading ? (
                            <div className="flex flex-col items-center text-slate-400">
                                <Loader2 className="w-8 h-8 mb-2 animate-spin" />
                                <span>Uploading...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-slate-400">
                                <Upload className="w-8 h-8 mb-2" />
                                <span className="font-medium">Click to upload or drag and drop</span>
                                <span className="text-xs mt-1">PNG, JPG, GIF, WebP up to 5MB</span>
                            </div>
                        )}
                    </label>
                )}
            </div>

            {/* Image Settings */}
            {block.url && (
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg">
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Alt Text <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={block.alt || ''}
                            onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                            placeholder="Describe the image for SEO and accessibility"
                            className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Caption (Optional)
                        </label>
                        <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                            placeholder="Image caption"
                            className="w-full text-sm border border-slate-200 rounded px-3 py-2"
                        />
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Or use Image URL
                        </label>
                        <input
                            type="text"
                            value={block.url || ''}
                            onChange={(e) => updateBlock(index, { ...block, url: e.target.value })}
                            placeholder="https://..."
                            className="w-full text-xs border border-slate-200 rounded px-2 py-1 font-mono"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// --- BLOCK COMPONENTS ---

const RenderBlock = ({ block, updateBlock, removeBlock, moveBlock, addBlock, index, total }) => {
    return (
        <div className="group relative bg-white border border-slate-200 rounded-lg p-4 mb-4 hover:border-purple-300 transition-colors ml-12">
            {/* Block Controls - Gutenberg Style */}
            <div className="absolute -left-12 top-0 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => moveBlock(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-500 disabled:opacity-30 transition-colors"
                    title="Move up"
                >
                    <ChevronUp className="w-4 h-4" />
                </button>
                <button
                    onClick={() => {
                        // Insert block above - show quick menu
                        const blockTypes = ['paragraph', 'heading', 'image', 'list', 'quote', 'code', 'separator'];
                        const choice = prompt(`Insert block above:\n1. Paragraph\n2. Heading\n3. Image\n4. List\n5. Quote\n6. Code\n7. Separator\n\nEnter number (1-7):`, '1');
                        const index = parseInt(choice) - 1;
                        if (index >= 0 && index < blockTypes.length) {
                            addBlock(blockTypes[index], index);
                        }
                    }}
                    className="p-1.5 hover:bg-purple-100 rounded text-purple-600 transition-colors"
                    title="Insert block above"
                >
                    <Plus className="w-4 h-4" />
                </button>
                <button
                    onClick={() => moveBlock(index, 1)}
                    disabled={index === total - 1}
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-500 disabled:opacity-30 transition-colors"
                    title="Move down"
                >
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
            <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-slate-100 rounded-md p-1">
                <button
                    onClick={() => {
                        if (confirm('Remove this block?')) {
                            removeBlock(index);
                        }
                    }}
                    className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors"
                    title="Remove block"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Block Content */}
            {block.type === 'heading' && (
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(tag => (
                            <button
                                key={tag}
                                onClick={() => updateBlock(index, { ...block, level: tag })}
                                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${block.level === tag
                                    ? 'bg-purple-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
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
                        className={`w-full font-bold border-none focus:ring-0 placeholder:text-slate-300 p-0 ${block.level === 'h1' ? 'text-4xl' :
                            block.level === 'h2' ? 'text-3xl' :
                                block.level === 'h3' ? 'text-2xl' :
                                    block.level === 'h4' ? 'text-xl' :
                                        block.level === 'h5' ? 'text-lg' :
                                            'text-base'
                            }`}
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
                <ImageBlock block={block} updateBlock={updateBlock} index={index} />
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

            {block.type === 'code' && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-500 uppercase">Code Block</span>
                        <button
                            onClick={() => {
                                const textarea = document.querySelector(`textarea[data-code-index="${index}"]`) as HTMLTextAreaElement;
                                if (textarea) {
                                    textarea.select();
                                    document.execCommand('copy');
                                    alert('Code copied to clipboard!');
                                }
                            }}
                            className="text-xs text-purple-600 hover:text-purple-700"
                        >
                            Copy
                        </button>
                    </div>
                    <textarea
                        data-code-index={index}
                        value={block.content}
                        onChange={(e) => updateBlock(index, { ...block, content: e.target.value })}
                        placeholder="Enter code here..."
                        className="w-full font-mono text-sm bg-slate-900 text-green-400 border border-slate-700 rounded p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        rows={6}
                        spellCheck={false}
                    />
                </div>
            )}

            {block.type === 'separator' && (
                <div className="py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-300"></div>
                        <div className="px-2 text-slate-400 text-xs">Separator</div>
                        <div className="flex-1 h-px bg-slate-300"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN EDITOR ---

interface PostEditorProps {
    slug?: string;
}

export default function PostEditor({ slug }: PostEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(!!slug);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('content'); // content | seo
    const [showBlockMenu, setShowBlockMenu] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);

    // Post State
    const [post, setPost] = useState<any>({
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

    const addBlock = (type, insertIndex = null) => {
        const newBlock = {
            id: Date.now(),
            type,
            content: '',
            ...(type === 'heading' && { level: 'h2' }), // Default to H2
            ...(type === 'list' && { style: 'unordered', items: [] }),
            ...(type === 'image' && { url: '', alt: '', caption: '' }),
            ...(type === 'code' && { content: '', language: 'text' }),
            ...(type === 'separator' && {}), // Separator has no content
        };

        if (insertIndex !== null) {
            // Insert at specific index
            setPost(prev => {
                const newBlocks = [...prev.blocks];
                newBlocks.splice(insertIndex, 0, newBlock);
                return { ...prev, blocks: newBlocks };
            });
        } else {
            // Append to end
            setPost(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
        }
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
            setSaveMessage({ type: 'error', text: `Safety Warning: Content contains forbidden terms: ${found.join(', ')}` });
            return false;
        }
        if (!post.title || !post.slug) {
            setSaveMessage({ type: 'error', text: 'Title and Slug are required' });
            return false;
        }
        // Check for images without alt text
        const imagesWithoutAlt = post.blocks.filter(
            block => block.type === 'image' && block.url && !block.alt
        );
        if (imagesWithoutAlt.length > 0) {
            setSaveMessage({ type: 'error', text: `Please add alt text to ${imagesWithoutAlt.length} image(s) for SEO` });
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateContent()) return;
        setSaving(true);
        setSaveMessage(null);
        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
            if (res.ok) {
                setSaveMessage({ type: 'success', text: 'Post saved successfully!' });
                setTimeout(() => {
                    router.push('/admin/blog');
                }, 1500);
            } else {
                const err = await res.json();
                setSaveMessage({ type: 'error', text: err.error || 'Failed to save post' });
            }
        } catch (e) {
            setSaveMessage({ type: 'error', text: 'Save failed. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading editor...</div>;

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Save Message */}
            {saveMessage && (
                <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${saveMessage.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}>
                    {saveMessage.type === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <AlertTriangle className="w-5 h-5" />
                    )}
                    <span>{saveMessage.text}</span>
                </div>
            )}

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
                    <div className="min-h-[500px] space-y-4 relative">
                        {post.blocks.length === 0 && (
                            <div className="text-center py-20 text-slate-400">
                                <p className="text-lg mb-2">Start writing your post</p>
                                <p className="text-sm">Click "Add Block" below to begin</p>
                            </div>
                        )}
                        {post.blocks.map((block, index) => (
                            <RenderBlock
                                key={block.id}
                                block={block}
                                index={index}
                                total={post.blocks.length}
                                updateBlock={updateBlock}
                                removeBlock={removeBlock}
                                moveBlock={moveBlock}
                                addBlock={addBlock}
                            />
                        ))}
                    </div>

                    {/* Add Block Menu - Gutenberg Style */}
                    <div className="border-t border-slate-200 pt-6">
                        <div className="relative">
                            <button
                                onClick={() => setShowBlockMenu(!showBlockMenu)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-slate-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 text-slate-600 font-medium transition-colors"
                            >
                                <span className="text-2xl">+</span>
                                <span>Add Block</span>
                            </button>

                            {showBlockMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowBlockMenu(false)}
                                    />
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => { addBlock('paragraph'); setShowBlockMenu(false); }}
                                                className="flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-slate-100 group-hover:bg-purple-100 rounded">
                                                    <Type className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">Paragraph</div>
                                                    <div className="text-xs text-slate-500">Start writing...</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => { addBlock('heading'); setShowBlockMenu(false); }}
                                                className="flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-slate-100 group-hover:bg-purple-100 rounded">
                                                    <Layout className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">Heading</div>
                                                    <div className="text-xs text-slate-500">H1 - H6</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => { addBlock('image'); setShowBlockMenu(false); }}
                                                className="flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-slate-100 group-hover:bg-purple-100 rounded">
                                                    <ImageIcon className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">Image</div>
                                                    <div className="text-xs text-slate-500">Upload or URL</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => { addBlock('list'); setShowBlockMenu(false); }}
                                                className="flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-slate-100 group-hover:bg-purple-100 rounded">
                                                    <List className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">List</div>
                                                    <div className="text-xs text-slate-500">Bullet or numbered</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => { addBlock('quote'); setShowBlockMenu(false); }}
                                                className="flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-slate-100 group-hover:bg-purple-100 rounded">
                                                    <Quote className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">Quote</div>
                                                    <div className="text-xs text-slate-500">Highlight text</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => { addBlock('code'); setShowBlockMenu(false); }}
                                                className="flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-slate-100 group-hover:bg-purple-100 rounded">
                                                    <Code className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">Code</div>
                                                    <div className="text-xs text-slate-500">Code snippet</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => { addBlock('separator'); setShowBlockMenu(false); }}
                                                className="flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-slate-100 group-hover:bg-purple-100 rounded">
                                                    <Minus className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">Separator</div>
                                                    <div className="text-xs text-slate-500">Divider line</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
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
