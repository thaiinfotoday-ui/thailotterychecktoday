'use client';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPage() {
    const { lang } = useLanguage();

    const content = {
        en: {
            title: "Privacy Policy",
            updated: "Last Updated: December 25, 2025",
            intro: "We value your privacy. This policy explains how we handle your information when you visit our website.",
            sections: [
                {
                    title: "Information Collection",
                    icon: <Eye className="w-6 h-6" />,
                    text: "We do not require you to create an account or provide personal information to check lottery results. We collect anonymous usage data (like pages visited) to improve our site performance."
                },
                {
                    title: "Cookies & Tracking",
                    icon: <Lock className="w-6 h-6" />,
                    text: "We use standard cookies to remember your language preference and for analytical purposes (e.g., Google Analytics). You can disable cookies in your browser settings at any time."
                },
                {
                    title: "Data Security",
                    icon: <Shield className="w-6 h-6" />,
                    text: "Since we do not collect personal data like names or emails, there is no risk of your personal identity being compromised on our site. We use HTTPS encryption to ensure a secure connection."
                }
            ]
        },
        th: {
            title: "นโยบายความเป็นส่วนตัว",
            updated: "อัปเดตล่าสุด: 25 ธันวาคม 2025",
            intro: "เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ นโยบายนี้อธิบายวิธีที่เราจัดการข้อมูลเมื่อคุณเยี่ยมชมเว็บไซต์ของเรา",
            sections: [
                {
                    title: "การเก็บรวบรวมข้อมูล",
                    icon: <Eye className="w-6 h-6" />,
                    text: "เราไม่ต้องการให้คุณสร้างบัญชีหรือให้ข้อมูลส่วนบุคคลเพื่อตรวจผลสลาก เราเก็บข้อมูลการใช้งานแบบไม่ระบุตัวตน (เช่น หน้าที่เยี่ยมชม) เพื่อปรับปรุงประสิทธิภาพเว็บไซต์"
                },
                {
                    title: "คุกกี้และการติดตาม",
                    icon: <Lock className="w-6 h-6" />,
                    text: "เราใช้คุกกี้มาตรฐานเพื่อจดจำการตั้งค่าภาษาของคุณและเพื่อการวิเคราะห์ (เช่น Google Analytics) คุณสามารถปิดการใช้งานคุกกี้ในการตั้งค่าเบราว์เซอร์ของคุณได้ตลอดเวลา"
                },
                {
                    title: "ความปลอดภัยของข้อมูล",
                    icon: <Shield className="w-6 h-6" />,
                    text: "เนื่องจากเราไม่เก็บข้อมูลส่วนบุคคล เช่น ชื่อหรืออีเมล จึงไม่มีความเสี่ยงที่ข้อมูลส่วนตัวของคุณจะถูกเปิดเผย เราใช้การเข้ารหัส HTTPS เพื่อความปลอดภัยในการเชื่อมต่อ"
                }
            ]
        }
    };

    const c = content[lang === 'th' ? 'th' : 'en'];

    return (
        <div key={lang} className="min-h-screen bg-slate-50 pb-12">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center max-w-3xl">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{c.title}</h1>
                    <p className="text-slate-500 text-lg">{c.intro}</p>
                    <p className="text-sm text-slate-400 mt-4 font-mono">{c.updated}</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
                {c.sections.map((section, idx) => (
                    <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
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
