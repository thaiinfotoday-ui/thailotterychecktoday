export const metadata = {
    title: "Privacy Policy - Thai Lottery Results",
    description: "Privacy Policy for Thai Lottery Check Today.",
    robots: {
        index: false,
        follow: true
    }
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm prose prose-slate max-w-none">
                <p>Last updated: December 25, 2025</p>

                <h3>1. Introduction</h3>
                <p>Welcome to <strong>Thai Lottery Results</strong> ("we," "our," or "us"). We are committed to protecting your privacy online. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.</p>

                <h3>2. Information We Collect</h3>
                <p>We do not require users to create an account to view lottery results. However, we may collect:</p>
                <ul>
                    <li><strong>Log Data:</strong> Browser type, IP address, pages visited, and time spent on site.</li>
                    <li><strong>Cookies:</strong> To improve site performance and user experience (e.g., remembering language preference).</li>
                </ul>

                <h3>3. Valid Data Usage</h3>
                <p>Our website displays public lottery results for informational purposes. We do not collect personal financial information or facilitate gambling transactions.</p>

                <h3>4. Third-Party Services</h3>
                <p>We may use third-party services like Google Analytics to understand site traffic and Google AdSense for displaying advertisements. These services may use their own cookies.</p>

                <h3>5. Contact Us</h3>
                <p>If you have questions about this Privacy Policy, please contact us at contact@thailotterychecktoday.com</p>
            </div>
        </div>
    );
}
