export default function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://thailotterychecktoday.com/#organization",
        "name": "Thai Lottery Check Today",
        "url": "https://thailotterychecktoday.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://thailotterychecktoday.com/logo.png",
            "width": 112,
            "height": 112
        },
        "sameAs": [
            "https://facebook.com/thailotterychecktoday",
            "https://twitter.com/thailotto"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+66-2-528-9999",
            "contactType": "customer service",
            "areaServed": "TH",
            "availableLanguage": ["Thai", "English"]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
