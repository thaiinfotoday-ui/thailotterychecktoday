'use client';

import { Calendar, Clock, Info, CalendarDays } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ArticleSchema from '../components/schema/ArticleSchema';

export default function DrawCalendarClient() {
    const { t } = useLanguage();

    // Generate draw dates for 2025
    const generateDrawDates = () => {
        const dates = [];
        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear + 1];

        years.forEach(year => {
            for (let month = 1; month <= 12; month++) {
                // 1st of each month
                dates.push({
                    date: new Date(year, month - 1, 1),
                    drawNumber: `${year}-${String(month).padStart(2, '0')}-01`,
                    type: 'First Regular Draw'
                });

                // 16th of each month
                dates.push({
                    date: new Date(year, month - 1, 16),
                    drawNumber: `${year}-${String(month).padStart(2, '0')}-16`,
                    type: 'Second Regular Draw'
                });
            }
        });

        // Filter out past dates (optional - or show all)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return dates
            .filter(d => d.date >= today)
            .slice(0, 24) // Next 12 months (24 draws)
            .map(d => ({
                ...d,
                formattedDate: d.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                shortDate: d.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                isoDate: d.date.toISOString().split('T')[0]
            }));
    };

    const upcomingDraws = generateDrawDates();
    const nextDraw = upcomingDraws[0];

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header - Contextual Focus: "Official Schedule" */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase mb-4 border border-red-100">
                        <CalendarDays className="w-3 h-3" />
                        Official GLO Calendar
                    </div>


                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Calendar className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                            Thai Lottery Draw Schedule (2025-2026)
                        </h1>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Complete timetable of upcoming government lottery events. Draws occur semi-monthly on the <strong className="text-slate-700">1st</strong> and <strong className="text-slate-700">16th</strong>.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Next Draw Highlight */}
                {nextDraw && (
                    <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl mb-8 shadow-lg shadow-red-200/50">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">Next Scheduled Event</h2>
                        </div>
                        <p className="text-3xl font-black mb-2">{nextDraw.formattedDate}</p>
                        <div className="text-red-100 text-lg flex items-center gap-2 mt-4">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                            Results announced live between 14:30 - 16:00 (GMT+7)
                        </div>
                    </div>
                )}

                {/* Schedule Information Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-6 h-6 text-blue-600" />
                            <h3 className="text-lg font-bold text-slate-900">Frequency Protocol</h3>
                        </div>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                Standard Cycle: <strong className="text-slate-800">2 Draws / Month</strong>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                <span>Day 1: <strong className="text-slate-800">1st of Month</strong> (First Draw)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                <span>Day 16: <strong className="text-slate-800">16th of Month</strong> (Second Draw)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                Total Events: <strong className="text-slate-800">24 Draws / Year</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6 text-primary" />
                            <h3 className="text-lg font-bold text-slate-900">Broadcast Logistics</h3>
                        </div>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                <span>Time Window: <strong className="text-slate-800">14:30 - 16:00 (GMT+7)</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                <span>Authority: <strong className="text-slate-800">GLO (Government Lottery Office)</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                <span>Channels: TV Broadcast, Official Radio, Website</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Upcoming Draws Calendar */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Upcoming Event Timeline
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Confirmed dates for 2025-2026 Fiscal Year
                            </p>
                        </div>
                        <CalendarDays className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="divide-y divide-slate-100">
                        {upcomingDraws.map((draw, index) => {
                            const isNext = index === 0;
                            return (
                                <div
                                    key={draw.drawNumber}
                                    className={`p-6 hover:bg-slate-50 transition-colors ${isNext ? 'bg-red-50 border-l-4 border-primary' : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold border ${isNext
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-slate-700 border-slate-200'
                                                }`}>
                                                <span className="text-xs uppercase opacity-70">{draw.date.toLocaleString('default', { month: 'short' })}</span>
                                                <span className="text-xl leading-none">{draw.date.getDate()}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                                    {draw.formattedDate}
                                                    {isNext && <span className="px-2 py-0.5 rounded text-[10px] bg-red-200 text-red-800 uppercase tracking-wide">Next</span>}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    Event Type: <span className="font-medium text-slate-700">{draw.type}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500 font-mono">
                                                ID: {draw.drawNumber}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <ArticleSchema
                    title="Thai Lottery Draw Schedule 2025"
                    description="Official calendar of Thai government lottery draw dates, times, and broadcast schedules."
                />

                {/* Important Notes */}
                <div className="mt-8 space-y-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-600">
                                <p className="font-bold text-slate-900 mb-2">Authority Statement</p>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Events are administered strictly by the Government Lottery Office (GLO).</li>
                                    <li>Dates may be adjusted for national holidays or special events (e.g., New Year, Songkran).</li>
                                    <li>This schedule is synchronized with the official GLO public announcements.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
