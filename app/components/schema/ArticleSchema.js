export default function ArticleSchema({ title, description, datePublished, authorName = "Thai Lottery Analyst" }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "datePublished": datePublished || "2024-01-01T00:00:00.000Z",
        "author": {
            "@type": "Person",
            "name": authorName,
            "url": "https://thailotterychecktoday.com/about"
        },
        "publisher": {
            "@id": "https://thailotterychecktoday.com/#organization"
        },
        "image": {
            "@type": "ImageObject",
            "url": "https://thailotterychecktoday.com/opengraph-image.png"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://thailotterychecktoday.com"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
