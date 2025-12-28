export const metadata = {
    title: "Terms of Service - Thai Lottery Results",
    description: "Terms and Conditions for using Thai Lottery Check Today.",
    robots: {
        index: false,
        follow: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/terms`,
    },
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm prose prose-slate max-w-none">
                <p>Last updated: December 25, 2025</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                <h3>2. Informational Purpose Only</h3>
                <p>This website represents independent analysis and historical data of the Thai Government Lottery. <strong>We are NOT affiliated with the Government Lottery Office (GLO).</strong> Use the information at your own risk. Always verify results with official sources before discarding tickets.</p>

                <h3>3. No Gambling Services</h3>
                <p>We do not sell lottery tickets, accept bets, or facilitate any form of online gambling. All content is strictly for informational and educational purposes.</p>

                <h3>4. Accuracy of Data</h3>
                <p>While we strive for accuracy, we cannot guarantee that the data provided is error-free. We verify results from multiple sources (Sanook, Thairath), but technical errors may occur.</p>

                <h3>5. Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.</p>
            </div>
        </div>
    );
}
