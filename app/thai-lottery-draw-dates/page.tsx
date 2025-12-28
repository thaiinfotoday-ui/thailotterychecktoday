import DrawCalendarClient from './DrawCalendarClient';

// ISR: Regenerate page every 24 hours (draw dates are static)
export const revalidate = 86400;

export const metadata = {
    title: "Thai Lottery Draw Dates & Schedule 2025 - Official Calendar",
    description: "Complete schedule of Thai Government Lottery draw dates for 2025. Know when results are announced (1st and 16th of each month).",
    keywords: "thai lottery schedule, draw dates, lottery calendar, result dates, GLO schedule",
    openGraph: {
        title: "Thai Lottery Draw Dates & Schedule 2025",
        description: "Official Thai Lottery draw schedule and result announcement dates",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Thai Lottery Draw Schedule",
        description: "Complete calendar of Thai Lottery draw dates",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/thai-lottery-draw-dates`,
    }
};

export default function DrawCalendarPage() {
    return <DrawCalendarClient />;
}

