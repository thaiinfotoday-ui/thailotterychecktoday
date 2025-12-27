
export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
            {/* Animated Logo Container */}
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black text-slate-900">TL</span>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 animate-pulse">
                Loading Results...
            </h2>
            <p className="text-sm text-slate-400 mt-2">
                Retrieving data from GLO Signal
            </p>
        </div>
    );
}
