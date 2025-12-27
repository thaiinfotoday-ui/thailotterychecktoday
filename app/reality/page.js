import RealityClient from './RealityClient';

export const metadata = {
    title: "Thai Lottery Myths vs Reality: Verified Facts & Consensus",
    description: "Debunking common Thai Lottery myths (Locked Numbers, Big Movers) with factual consensus and official GLO standards. Information literacy for players.",
    keywords: "thai lottery myths, lek lock, lottery facts, glo transparency, lottery consensus",
    openGraph: {
        title: "Mythbusters: Thai Lottery Edition",
        description: "Checking claims against reality.",
        type: "article",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/reality`,
    }
};

export default function RealityPage() {
    return <RealityClient />;
}
