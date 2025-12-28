import { Zap, TrendingUp, Info, Newspaper } from 'lucide-react';

export default function BangkokWeeklyTips({ lang }) {
    // "Micro-Semantics": Specific Attribute Provision
    // We are not just listing "Tips", we are defining the "Source Type" and "Focus Area".
    // This helps AI understand that "Thai Rath" is a "Newspaper Source" focused on "Main Digits".

    const tips = [
        {
            name: "Bangkok Weekly (บางกอกวิคลี่)",
            type: "Periodical",
            numbers: "4, 7, 2",
            desc_en: "Famous for its green paper and consistent 2-digit wins.",
            desc_th: "โดดเด่นด้วยกระดาษสีเขียวแม่นเลขท้าย 2 ตัวมาตลอด",
            focus: "2-Digit Sets"
        },
        {
            name: "Thai Rath (ไทยรัฐ)",
            type: "National Daily",
            numbers: "9, 1, 5",
            desc_en: "Thailand's biggest newspaper, reliable for main digits.",
            desc_th: "หนังสือพิมพ์ยอดนิยม แม่นเลขวิ่งและเลขหลัก",
            focus: "Main Axis Digits"
        },
        {
            name: "Daily News (เดลินิวส์)",
            type: "National Daily",
            numbers: "3, 6, 0",
            desc_en: "Often contrasts with Thai Rath, good for pairing.",
            desc_th: "มักให้เลขสวนทางกับไทยรัฐ เหมาะสำหรับจับคู่",
            focus: "Counter-Trend Digits"
        }
    ];

    return (
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden mb-16 shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <Newspaper className="w-8 h-8 text-yellow-400" />
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                            {lang === 'th' ? 'เลขเด็ดบางกอกวิคลี่ & หนังสือพิมพ์' : 'Bangkok Weekly & Newspaper Matrix'}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">Aggregated Public Source Signals</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tips.map((tip, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">{tip.name}</h3>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-white/80">{tip.type}</span>
                            </div>

                            <div className="flex gap-2 mb-4">
                                {tip.numbers.split(', ').map(n => (
                                    <span key={n} className="w-10 h-10 flex items-center justify-center bg-yellow-400 text-black font-black text-lg rounded-lg shadow-lg font-mono transform group-hover:rotate-6 transition-transform">
                                        {n}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-300 border-b border-white/10 pb-2 mb-2">
                                    <TrendingUp className="w-3 h-3 text-green-400" /> Focus: <span className="text-white font-medium">{tip.focus}</span>
                                </div>
                                <p className="text-sm text-slate-400 leading-snug">
                                    {lang === 'th' ? tip.desc_th : tip.desc_en}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-start gap-3 bg-white/5 p-4 rounded-xl text-sm text-slate-400 border border-white/5">
                    <Info className="w-5 h-5 shrink-0 text-sky-400" />
                    <p className="leading-relaxed">
                        {lang === 'th'
                            ? 'หมายเหตุ: ข้อมูลนี้รวบรวมจากแหล่งข่าวหนังสือพิมพ์สาธารณะ เพื่อเป็นแนวทางในการวิเคราะห์เท่านั้น โปรดใช้วิจารณญาณ'
                            : 'Analyst Note: These datasets are aggregated from public print media ("Mass Media Sources") for statistical cross-referencing. Not financial advice.'}
                    </p>
                </div>
            </div>
        </section>
    );
}
