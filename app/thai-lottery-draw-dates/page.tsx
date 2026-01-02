import DrawCalendarClient from './DrawCalendarClient';
export default function DrawCalendarPage() {
    return (
        <DrawCalendarClient />
    );
}

export const metadata = {
    title: "Thai Lottery Draw Dates & Schedule 2025-2026 - Official Calendar",
    description: "Complete schedule of Thai Government Lottery draw dates for 2025-2026.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/thai-lottery-draw-dates`,
    }
};