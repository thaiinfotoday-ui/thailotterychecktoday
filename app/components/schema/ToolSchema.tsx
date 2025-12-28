export default function ToolSchema({ toolName, description, applicationCategory = "UtilitiesApplication", operatingSystem = "Any" }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": toolName,
        "description": description,
        "applicationCategory": applicationCategory,
        "operatingSystem": operatingSystem,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "THB"
        },
        "featureList": [
            "Real-time Computation",
            "Historical Data Integration",
            "Mobile Responsive"
        ],
        "author": {
            "@id": "https://thailotterychecktoday.com/#organization"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
