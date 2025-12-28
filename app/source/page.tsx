'use client';
import { Database, Server, Info, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SourcePage() {
    const { lang } = useLanguage();

    const content = {
        en: {
            title: "Data Sources & Disclaimer",
            intro: "Transparency is our priority. Below is the detailed information about where we collect our data.",
            sections: [
                {
                    title: "Data Collection Method",
                    icon: <Database className="w-6 h-6" />,
                    text: "Results are collected from publicly available third-party sources and official announcements broadcasted by the Government Lottery Office (GLO). We use automated systems to aggregate this public information for user convenience."
                },
                {
                    title: "Official Verification",
                    icon: <Info className="w-6 h-6" />,
                    text: "While we aim for 100% accuracy, this website is a secondary reference source. We strongly recommend all users to verify their physical tickets at an official GLO distribution center or checking via the official GLO application before discarding any ticket."
                },
                {
                    title: "No Affiliation",
                    icon: <Globe className="w-6 h-6" />,
                    text: "We are an independent informational platform and are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with the Government Lottery Office of Thailand."
                }
            ]
        },
        th: {
            title: "แหล่งที่มาของข้อมูล",
            intro: "ความโปร่งใสคือหัวใจสำคัญของเรา ด้านล่างคือรายละเอียดเกี่ยวกับแหล่งที่มาของข้อมูลที่เรานำเสนอ",
            sections: [
                {
                    title: "วิธีการรวบรวมข้อมูล",
                    icon: <Database className="w-6 h-6" />,
                    text: "ผลรางวัลถูกรวบรวมจากแหล่งข้อมูลสาธารณะและการประกาศอย่างเป็นทางการของสำนักงานสลากกินแบ่งรัฐบาล (GLO) เราใช้ระบบอัตโนมัติในการรวบรวมข้อมูลเหล่านี้เพื่ออำนวยความสะดวกแก่ผู้ใช้งาน"
                },
                {
                    title: "การตรวจสอบความถูกต้อง",
                    icon: <Info className="w-6 h-6" />,
                    text: "แม้เราจะมุ่งมั่นในความถูกต้องแม่นยำ แต่เว็บไซต์นี้เป็นเพียงแหล่งอ้างอิงลำดับรอง เราขอแนะนำให้ผู้ใช้ทุกท่านตรวจสอบสลากฉบับจริงที่ตัวแทนจำหน่ายหรือช่องทางของกองสลากฯ ก่อนทิ้งสลากเสมอ"
                },
                {
                    title: "ไม่มีความเกี่ยวข้องอย่างเป็นทางการ",
                    icon: <Globe className="w-6 h-6" />,
                    text: "เราเป็นแพลตฟอร์มข้อมูลอิสระ และไม่ได้เป็นตัวแทน เกี่ยวข้อง หรือได้รับอนุญาตจากสำนักงานสลากกินแบ่งรัฐบาลแต่อย่างใด ข้อมูลทั้งหมดเป็นการนำเสนอเพื่อสาธารณประโยชน์"
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
                        <Server className="w-8 h-8" />
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
