export default function CollectionSchema({ name, description, hasPart = [] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": name,
        "description": description,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": hasPart.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "url": item.url
            }))
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
