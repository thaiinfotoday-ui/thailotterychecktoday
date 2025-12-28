export default function BroadcastEventSchema({ name, startDate, url, description }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BroadcastEvent",
        "name": name,
        "startDate": startDate,
        "eventStatus": "https://schema.org/EventScheduled",
        "isAccessibleForFree": true,
        "url": url,
        "description": description,
        "broadcastOfEvent": {
            "@type": "Event",
            "name": name,
            "description": "official Thai Government Lottery semi-monthly draw."
        },
        "organizer": {
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
