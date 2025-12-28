import ThreeUpClient from './ThreeUpClient';

export const metadata = {
    title: "What is 3UP Direct and 3UP Set in Thai Lottery? - Explained",
    description: "Educational guide explaining the difference between 3UP Direct and 3UP Set in Thai Lottery. Understand how 3-digit number patterns and combinations work.",
    keywords: "3up direct, 3up set, thai lottery 3up, lottery combinations, 3-digit permutation, educational lottery guide",
    openGraph: {
        title: "Understanding 3UP Direct vs 3UP Set",
        description: "Learn the difference between Direct and Set matches in Thai Lottery numbers.",
        type: "article",
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function ThreeUpPage() {
    return <ThreeUpClient />;
}
