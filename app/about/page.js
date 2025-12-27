import AboutClient from './AboutClient';

export const metadata = {
    title: "About Us - Thai Lottery Check Today & GLO Analytics",
    description: "Learn about Thai Lottery Check Today, a premier digital platform for statistical analysis, historical archives, and real-time reporting of Government Lottery Office results.",
    keywords: "about us, thai lottery organization, glo reporting, lottery analytics, company profile",
    openGraph: {
        title: "About Thai Lottery Check Today - Entity Profile",
        description: "Official entity profile and mission statement of Thai Lottery Check Today.",
        type: "profile",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/about`,
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
