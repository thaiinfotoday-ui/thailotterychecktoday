export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://thailotterychecktoday.com/#website",
                "url": "https://thailotterychecktoday.com",
                "name": "Thai Lottery Results Check Today",
                "description": "Official Thai Lottery Results, Statistics, and Historical Data Archive.",
                "potentialAction": [
                    {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://thailotterychecktoday.com/history?year={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    }
                ],
                "inLanguage": "en-US"
            },
            {
                "@type": "Organization",
                "@id": "https://thailotterychecktoday.com/#organization",
                "name": "Thai Lottery Check Today",
                "url": "https://thailotterychecktoday.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://thailotterychecktoday.com/opengraph-image.png",
                    "width": 1200,
                    "height": 630,
                    "caption": "Thai Lottery Check Today"
                },
                "sameAs": [
                    "https://facebook.com/thailotterychecktoday",
                    "https://twitter.com/thailotto"
                ]
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
