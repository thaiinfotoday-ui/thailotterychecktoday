'use client';

import { Calendar, Clock, Info, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CalendarIllustration } from '../components/Illustrations2';

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
                    type: 'First Draw'
                });

                // 16th of each month
                dates.push({
                    date: new Date(year, month - 1, 16),
                    drawNumber: `${year}-${String(month).padStart(2, '0')}-16`,
                    type: 'Second Draw'
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
                })
            }));
    };

    const upcomingDraws = generateDrawDates();
    const nextDraw = upcomingDraws[0];

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-12 text-center">
                    <CalendarIllustration className="w-32 h-32 mx-auto mb-6 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Calendar className="w-8 h-8 text-purple-600" />
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                            Thai Lottery Draw Schedule
                        </h1>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Official schedule of Thai Government Lottery draws. Results are announced twice monthly on the 1st and 16th.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Next Draw Highlight */}
                {nextDraw && (
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl mb-8 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">Next Draw</h2>
                        </div>
                        <p className="text-3xl font-black mb-2">{nextDraw.formattedDate}</p>
                        <p className="text-purple-100 text-lg">
                            Results typically announced between 2:30 PM - 4:00 PM (GMT+7)
                        </p>
                    </div>
                )}

                {/* Schedule Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-6 h-6 text-blue-600" />
                            <h3 className="text-lg font-bold text-slate-900">Draw Frequency</h3>
                        </div>
                        <ul className="space-y-2 text-slate-600">
                            <li>• <strong>2 draws per month</strong></li>
                            <li>• <strong>1st of each month</strong> - First draw</li>
                            <li>• <strong>16th of each month</strong> - Second draw</li>
                            <li>• <strong>24 draws per year</strong> total</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6 text-purple-600" />
                            <h3 className="text-lg font-bold text-slate-900">Result Announcement</h3>
                        </div>
                        <ul className="space-y-2 text-slate-600">
                            <li>• <strong>Time:</strong> 2:30 PM - 4:00 PM (GMT+7)</li>
                            <li>• <strong>Location:</strong> Government Lottery Office (GLO)</li>
                            <li>• <strong>Broadcast:</strong> Live on TV and official website</li>
                            <li>• <strong>Update:</strong> Our site updates within minutes</li>
                        </ul>
                    </div>
                </div>

                {/* Upcoming Draws Calendar */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50">
                        <h2 className="text-xl font-bold text-slate-900">
                            Upcoming Draw Schedule
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Next 12 months of scheduled draws
                        </p>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {upcomingDraws.map((draw, index) => {
                            const isNext = index === 0;
                            return (
                                <div
                                    key={draw.drawNumber}
                                    className={`p-6 hover:bg-slate-50 transition-colors ${isNext ? 'bg-purple-50 border-l-4 border-purple-600' : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${isNext
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {String(Math.ceil((index + 1) / 2)).padStart(2, '0')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-lg">
                                                    {draw.formattedDate}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    {draw.type} • {draw.shortDate}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {isNext && (
                                                <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full mb-2">
                                                    Next Draw
                                                </span>
                                            )}
                                            <p className="text-sm text-slate-500">
                                                Results: 2:30 PM - 4:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Important Notes */}
                <div className="mt-8 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-2">About Thai Lottery Draws:</p>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Draws are conducted by the Government Lottery Office (GLO)</li>
                                    <li>Results are official and verified by GLO authorities</li>
                                    <li>All draws follow strict government regulations</li>
                                    <li>Results are publicly announced and broadcast live</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-sm text-amber-800">
                                <p className="font-semibold mb-1">Note:</p>
                                <p>
                                    Draw dates are scheduled in advance but may occasionally be adjusted by the Government Lottery Office.
                                    Always verify the official schedule on the GLO website. This calendar is for informational purposes only.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

