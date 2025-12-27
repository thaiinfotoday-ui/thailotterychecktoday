import { Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LuckyNumbersGuide() {
    const { t, lang } = useLanguage();

    const dreamInterpretations = [
        { obj: "Snake (งู)", num: "5, 6, 8" },
        { obj: "Fish (ปลา)", num: "8" },
        { obj: "Elephant (ช้าง)", num: "9, 1" },
        { obj: "Gold (ทอง)", num: "2, 4" },
        { obj: "Dead Person (คนตาย)", num: "0, 4" },
        { obj: "Car Accident (อุบัติเหตุ)", num: "7, 4" }
    ];

    if (lang !== 'th' && lang !== 'en') return null;

    return (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                <div>
                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded uppercase mb-1 inline-block">
                        Culture
                    </span>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        {lang === 'th' ? 'ทำนายฝัน & เลขนำโชค' : 'Thai Dream Interpretations'}
                    </h2>
                </div>
            </div>

            <div className="p-6">
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    {lang === 'th'
                        ? 'คนไทยมีความเชื่อว่าความฝันสามารถบอกใบ้ถึงตัวเลขนำโชคได้ นี่คือคู่มือการตีความฝันยอดนิยม:'
                        : 'In Thai culture, dreams are often interpreted as signs for lucky lottery numbers. Here are common interpretations:'}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dreamInterpretations.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="font-medium text-slate-700">{item.obj}</span>
                            <span className="font-bold font-mono text-primary bg-white px-2 py-0.5 rounded border border-slate-200">
                                {item.num}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-slate-600 flex gap-3">
                    <div className="shrink-0 pt-1">💡</div>
                    <div>
                        <strong className="block text-slate-800 mb-1">{lang === 'th' ? 'เกร็ดความรู้:' : 'Did you know?'}</strong>
                        {lang === 'th'
                            ? 'เลข 9 ถือเป็นเลขมงคลที่สุดในไทย เพราะเสียงอ่าน "ก้าว" พ้องกันกับคำว่า ก้าวหน้า (Progress).'
                            : 'The number 9 is considered the luckiest number in Thailand because it sounds like "Kao" (Moving Forward/Progress).'}
                    </div>
                </div>
            </div>
        </section>
    );
}
