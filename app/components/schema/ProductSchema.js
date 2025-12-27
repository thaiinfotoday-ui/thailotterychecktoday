export default function ProductSchema({ name, description, brand, offers }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "description": description,
        "brand": {
            "@type": "Brand",
            "name": brand
        },
        "offers": offers.map(offer => ({
            "@type": "Offer",
            "url": "https://thailotterychecktoday.com/tips",
            "priceCurrency": "THB",
            "price": offer.price,
            "availability": "https://schema.org/InStock",
            "name": offer.name
        })),
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4.8",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Lottery Analyst"
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
