'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, ExternalLink } from 'lucide-react';

export default function AdminLayout({ children }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh(); // Clear client state
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight">Admin Console</h1>
                    <p className="text-xs text-slate-500 mt-1">Thai Lottery System</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                        <FileText className="w-5 h-5" />
                        <span>Blog Posts</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-400 cursor-not-allowed">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link href="/" target="_blank" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4">
                        <ExternalLink className="w-4 h-4" /> View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full px-4 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-sm font-medium transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
