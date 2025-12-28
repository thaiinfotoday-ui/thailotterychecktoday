'use client';
import { useLanguage } from '../context/LanguageContext';
import { Youtube, Calendar, Radio, Signal, HelpCircle } from 'lucide-react';
import BroadcastEventSchema from '../components/schema/BroadcastEventSchema';
import FAQAccordion from '../components/FAQAccordion';
import FAQPageSchema from '../components/schema/FAQPageSchema';

export default function LiveClient() {
    const { lang } = useLanguage();

    // Strategy: Broadcast Event Entity
    // Providing "Live Signal" metadata to search engines.
    // Determining the next draw date dynamically.

    const today = new Date();
    const nextDraw = new Date();
    if (today.getDate() > 16) {
        nextDraw.setMonth(today.getMonth() + 1);
        nextDraw.setDate(1);
    } else if (today.getDate() > 1) {
        nextDraw.setDate(16);
    } else {
        nextDraw.setDate(1);
    }
    const nextDrawISO = nextDraw.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-12">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12 pt-8">
                    <span className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full text-xs font-bold uppercase animate-pulse mb-4 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                        <Signal className="w-3 h-3" />
                        Live Signal: Standby
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        Thai Lottery <span className="text-red-500">Live Stream</span>
                    </h1>
                    <p className="text-slate-400 max-w-lg text-lg leading-relaxed">
                        Watch the official Government Lottery Office (GLO) draw broadcast live.
                        Digital signal quality optimized for mobile latency.
                    </p>
                </div>

                {/* Video Player Placeholder */}
                <div className="max-w-4xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20 border border-slate-800 aspect-video relative group">
                    {/* Placeholder Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-900/80 backdrop-blur-sm z-10 group-hover:bg-slate-900/60 transition-all cursor-pointer">
                        <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 ring-4 ring-red-900/50">
                            <Youtube className="w-12 h-12 text-white fill-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Waiting for Signal...</h2>
                        <div className="flex items-center gap-2 text-slate-300 font-mono mt-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                            <Calendar className="w-4 h-4 text-red-400" />
                            <span>Next Broadcast: {nextDrawISO} @ 14:30 GMT+7</span>
                        </div>
                    </div>

                    {/* Simulated "Static" or Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur hover:bg-slate-800 transition-colors group">
                        <Radio className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-lg mb-2 text-white">Live Radio</h3>
                        <p className="text-sm text-slate-400">AM 891 KHz (Thailand Only). Low bandwidth audio-only stream backup.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur hover:bg-slate-800 transition-colors group">
                        <Youtube className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-lg mb-2 text-white">YouTube Live</h3>
                        <p className="text-sm text-slate-400">Direct feed from Official GLO Channel. 1080p HD support.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur hover:bg-slate-800 transition-colors group">
                        <Calendar className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-lg mb-2 text-white">Schedule</h3>
                        <p className="text-sm text-slate-400">Broadcast starts approx. 14:15. Results flow from 14:30 to 16:00.</p>
                    </div>
                </div>

                <div className="mt-16 max-w-3xl mx-auto text-center border-t border-slate-800 pt-8">
                    <h4 className="text-slate-500 text-sm font-bold uppercase mb-4 flex items-center justify-center gap-2">
                        <HelpCircle className="w-4 h-4" /> Troubleshooting
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        If the stream buffers, try lowering quality to 720p. For official written results, check the <a href="/latest" className="text-blue-400 hover:text-blue-300 underline">Latest Draw</a> page which updates faster than the video feed latency.
                    </p>
                </div>

                <BroadcastEventSchema
                    name={`Thai Lottery Live Draw ${nextDrawISO}`}
                    startDate={`${nextDrawISO}T14:30:00+07:00`}
                    url="https://thailotterychecktoday.com/live"
                    description={`Watch the live broadcast of the Thai Government Lottery draw for ${nextDrawISO}. Streaming directly from the GLO office.`}
                />

                {/* FAQ Section */}
                <FAQAccordion faqs={[
                    { question: "What time does the Thai Lottery live draw start?", answer: "The official live broadcast usually starts at 2:30 PM (14:30) Thailand Standard Time. The signal goes live approx 15 minutes prior." },
                    { question: "Where can I watch the Thai Lottery live?", answer: "You can watch it here on this page (via YouTube feed), on local Thai TV channels (Thairath TV 32, Amarin TV 34), or listen via AM 891 Radio." },
                    { question: "Is this live stream official?", answer: "Yes, we embed the official video feed provided by the Government Lottery Office (GLO) or authorized broadcasters like Thairath TV." },
                    { question: "Why is the live stream buffering?", answer: "Buffering can occur due to high Viewer Congestion during the draw. Try lowering the video quality to 720p or refreshing the page." },
                    { question: "Which prize is drawn first?", answer: "The draw sequence typically starts with smaller prizes (2nd, 3rd, 4th, 5th) and concludes with the major prizes (Last 2 Digits, First Prize) around 3:50 PM." },
                    { question: "Can I watch the draw on my mobile phone?", answer: "Yes, our player is optimized for mobile devices (iOS/Android) and works on 4G/5G networks." },
                    { question: "What should I do if the video doesn't load?", answer: "If the video fails, please use the 'Check Results' button to see the text version of the winning numbers, which updates even faster than the video feed." },
                    { question: "How long does the broadcast last?", answer: "The entire draw procedure lasts approximately 90 minutes, ending around 4:00 PM." },
                    { question: "Are the balls transparent?", answer: "Yes, the GLO uses transparent mixing machines and balls to ensure complete transparency and prevent fraud." },
                    { question: "Who spins the wheels?", answer: "Honorary guests, selected from various government and civil sectors, are invited to rotate the mixing machines for each draw." }
                ]} />
                <FAQPageSchema faqs={[
                    { question: "What time does the Thai Lottery live draw start?", answer: "The official live broadcast usually starts at 2:30 PM (14:30) Thailand Standard Time. The signal goes live approx 15 minutes prior." },
                    { question: "Where can I watch the Thai Lottery live?", answer: "You can watch it here on this page (via YouTube feed), on local Thai TV channels (Thairath TV 32, Amarin TV 34), or listen via AM 891 Radio." },
                    { question: "Is this live stream official?", answer: "Yes, we embed the official video feed provided by the Government Lottery Office (GLO) or authorized broadcasters like Thairath TV." },
                    { question: "Why is the live stream buffering?", answer: "Buffering can occur due to high Viewer Congestion during the draw. Try lowering the video quality to 720p or refreshing the page." },
                    { question: "Which prize is drawn first?", answer: "The draw sequence typically starts with smaller prizes (2nd, 3rd, 4th, 5th) and concludes with the major prizes (Last 2 Digits, First Prize) around 3:50 PM." },
                    { question: "Can I watch the draw on my mobile phone?", answer: "Yes, our player is optimized for mobile devices (iOS/Android) and works on 4G/5G networks." },
                    { question: "What should I do if the video doesn't load?", answer: "If the video fails, please use the 'Check Results' button to see the text version of the winning numbers, which updates even faster than the video feed." },
                    { question: "How long does the broadcast last?", answer: "The entire draw procedure lasts approximately 90 minutes, ending around 4:00 PM." },
                    { question: "Are the balls transparent?", answer: "Yes, the GLO uses transparent mixing machines and balls to ensure complete transparency and prevent fraud." },
                    { question: "Who spins the wheels?", answer: "Honorary guests, selected from various government and civil sectors, are invited to rotate the mixing machines for each draw." }
                ]} />
            </div>
        </div>
    );
}
