export const metadata = {
    title: "Check Your Thai Lottery Number - Verify Ticket",
    description: "Enter your lottery number to check if you won. Compare against latest Thai Lottery draw results instantly.",
    keywords: "check lottery number, verify ticket, thai lottery checker, number verification",
    openGraph: {
        title: "Check Your Thai Lottery Number",
        description: "Verify your lottery ticket against latest draw results",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Check Thai Lottery Number",
        description: "Verify if your ticket won",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function CheckLayout({ children }) {
    return children;
}


// Force rebuild
