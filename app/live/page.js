import LiveClient from './LiveClient';

export const metadata = {
    title: "Watch Thai Lottery Live - Official Draw Broadcast Stream",
    description: "Watch the Thai Lottery draw live online. Official signal from GLO Thailand. Real-time winning numbers announcement stream.",
    keywords: "thai lottery live, watch live lottery, glo live stream, thai lottery video, live draw thailand",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/live`,
    }
};

export default function LivePage() {
    return <LiveClient />;
}
