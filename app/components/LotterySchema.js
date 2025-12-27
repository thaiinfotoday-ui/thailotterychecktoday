export default function LotterySchema({ data }) {
    if (!data || !data.date) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "LotteryDrawing",
        "name": `Thai Lottery Draw ${data.date}`,
        "description": `Official Thai Lottery results for ${data.date}. First Prize: ${data.results?.first_prize}, Last 2: ${data.results?.last_two}.`,
        "datePublished": data.date,
        "lotteryName": "Thai Government Lottery",
        "offers": {
            "@type": "Offer",
            "price": "80",
            "priceCurrency": "THB",
            "availability": "https://schema.org/InStock",
            "url": "https://thailotterychecktoday.com/how-to"
        },
        "organizer": {
            "@type": "Organization",
            "name": "The Government Lottery Office (GLO)",
            "url": "https://www.glo.or.th"
        },
        "result": [
            {
                "@type": "LotteryResult",
                "name": "First Prize",
                "prizeMatch": "6/6",
                "prizeAmount": {
                    "@type": "MonetaryAmount",
                    "currency": "THB",
                    "value": "6000000"
                },
                "winningNumber": data.results?.first_prize
            },
            {
                "@type": "LotteryResult",
                "name": "Last 2 Digits",
                "prizeMatch": "2/2",
                "prizeAmount": {
                    "@type": "MonetaryAmount",
                    "currency": "THB",
                    "value": "2000"
                },
                "winningNumber": data.results?.last_two
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
