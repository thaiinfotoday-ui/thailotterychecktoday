'use client';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
    const { lang } = useLanguage();

    const content = {
        en: {
            title: "Contact Us",
            subtitle: "Have questions or found a bug? We'd love to hear from you.",
            emailLabel: "Email Support",
            email: "support@thailottery.com",
            formTitle: "Send a Message",
            name: "Your Name",
            message: "Message",
            send: "Send Message",
            note: "For official inquiries regarding prize claims, please contact the Government Lottery Office directly."
        },
        th: {
            title: "ติดต่อเรา",
            subtitle: "มีคำถามหรือพบข้อผิดพลาด? เรายินดีที่จะรับฟังจากคุณ",
            emailLabel: "อีเมลสนับสนุน",
            email: "support@thailottery.com",
            formTitle: "ส่งข้อความถึงเรา",
            name: "ชื่อของคุณ",
            message: "ข้อความ",
            send: "ส่งข้อความ",
            note: "สำหรับการสอบถามเรื่องการขึ้นเงินรางวัล โปรดติดต่อสำนักงานสลากกินแบ่งรัฐบาลโดยตรง"
        }
    };

    const c = content[lang === 'th' ? 'th' : 'en'];

    return (
        <div key={lang} className="min-h-screen bg-slate-50 pb-12">
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center max-w-2xl">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{c.title}</h1>
                    <p className="text-slate-500 text-lg">{c.subtitle}</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* INFO CARD */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Info</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{c.emailLabel}</h3>
                                    <p className="text-slate-500">{c.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Office (GLO)</h3>
                                    <p className="text-slate-500 text-sm">
                                        359 Nonthaburi Road, Tha Sai, <br />
                                        Mueang Nonthaburi 11000
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">(For official claims only)</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-slate-50 rounded-xl text-sm text-slate-500 border border-slate-100">
                            {c.note}
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">{c.formTitle}</h2>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{c.name}</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                                <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{c.message}</label>
                                <textarea rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"></textarea>
                            </div>
                            <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                                {c.send}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
