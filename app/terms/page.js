'use client';
import { FileText, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TermsPage() {
    const { lang } = useLanguage();

    const content = {
        en: {
            title: "Terms of Service",
            intro: "Please read these terms carefully before using our website. By accessing this site, you agree to be bound by these terms.",
            sections: [
                {
                    title: "Informational Purpose Only",
                    icon: <Info className="w-6 h-6" />,
                    text: "This website provides Thai Lottery results for informational purposes only. We are NOT an official website of the Government Lottery Office (GLO) and not affiliated with any government agency."
                },
                {
                    title: "No Gambling Services",
                    icon: <AlertTriangle className="w-6 h-6" />,
                    text: "We do NOT sell lottery tickets, do not accept bets, and do not encourage gambling. We strictly serve as a result-checking utility."
                },
                {
                    title: "Accuracy of Information",
                    icon: <CheckCircle className="w-6 h-6" />,
                    text: "While we strive for 100% accuracy by automating data fetching from official sources, errors may occur. You should always verify your winning ticket at an official GLO counter before discarding it."
                },
                {
                    title: "Limitation of Liability",
                    icon: <FileText className="w-6 h-6" />,
                    text: "We are not liable for any losses or damages arising from the use of this website or reliance on the information provided herein."
                }
            ]
        },
        th: {
            title: "เงื่อนไขการให้บริการ",
            intro: "โปรดอ่านเงื่อนไขเหล่านี้อย่างละเอียดก่อนใช้เว็บไซต์ การเข้าใช้เว็บไซต์นี้ถือว่าคุณยอมรับข้อผูกพันตามเงื่อนไขเหล่านี้",
            sections: [
                {
                    title: "เพื่อเป็นข้อมูลเท่านั้น",
                    icon: <Info className="w-6 h-6" />,
                    text: "เว็บไซต์นี้ให้บริการข้อมูลผลสลากกินแบ่งรัฐบาลเพื่อเป็นวิทยาทานเท่านั้น เราไม่ใช่เว็บไซต์ทางการของสำนักงานสลากกินแบ่งรัฐบาล (GLO) และไม่มีส่วนเกี่ยวข้องกับหน่วยงานรัฐ"
                },
                {
                    title: "ไม่มีการและบริการพนัน",
                    icon: <AlertTriangle className="w-6 h-6" />,
                    text: "เราไม่ขายสลากกินแบ่ง ไม่รับแทงพนนัน และไม่สนับสนุนการพนันทุกรูปแบบ เราทำหน้าที่เป็นเครื่องมือตรวจสอบผลรางวัลเท่านั้น"
                },
                {
                    title: "ความถูกต้องของข้อมูล",
                    icon: <CheckCircle className="w-6 h-6" />,
                    text: "แม้เราจะพยายามรวบรวมข้อมูลให้ถูกต้อง 100% จากแหล่งข้อมูลทางการ แต่อาจเกิดข้อผิดพลาดได้ คุณควรตรวจสอบสลากที่ถูกรางวัลกับเคาน์เตอร์กองสลากฯ อีกครั้งเสมอ"
                },
                {
                    title: "ข้อจำกัดความรับผิดชอบ",
                    icon: <FileText className="w-6 h-6" />,
                    text: "เราไม่รับผิดชอบต่อความสูญเสียหรือความเสียหายใดๆ ที่เกิดขึ้นจากการใช้เว็บไซต์นี้ หรือการอ้างอิงข้อมูลที่ปรากฏบนเว็บไซต์"
                }
            ]
        }
    };

    const c = content[lang === 'th' ? 'th' : 'en'];

    return (
        <div key={lang} className="min-h-screen bg-slate-50 pb-12">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center max-w-3xl">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{c.title}</h1>
                    <p className="text-slate-500 text-lg">{c.intro}</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
                {c.sections.map((section, idx) => (
                    <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex gap-4">
                            <div className="shrink-0 w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
                                {section.icon}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h2>
                                <p className="text-slate-600 leading-relaxed">{section.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
