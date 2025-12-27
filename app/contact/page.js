export const metadata = {
    title: "Contact Us - Thai Lottery Results",
    description: "Get in touch with us regarding Thai Lottery Results informational website.",
    robots: {
        index: false,
        follow: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/contact`,
    },
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Contact Us</h1>
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-slate-600 mb-6 leading-relaxed">
                    We value your feedback and inquiries. If you have any questions about our website, suggestions for improvement, or need to report an error in the data, please feel free to reach out to us.
                </p>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="min-w-[100px] font-bold text-slate-700">Email:</div>
                        <div className="text-primary font-medium">contact@thailotterychecktoday.com</div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="min-w-[100px] font-bold text-slate-700">Response:</div>
                        <div className="text-slate-600">We aim to respond to all inquiries within 24-48 hours.</div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <p className="text-sm text-slate-400 italic">
                        Note: We are an informational website only. We cannot assist with claiming prizes, buying tickets, or direct lottery office inquiries. Please contact the GLO directly for official matters.
                    </p>
                </div>
            </div>
        </div>
    );
}
