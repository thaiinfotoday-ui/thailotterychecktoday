
export default function sitemap() {
    const baseUrl = 'https://thailotterychecktoday.com';
    const currentDate = new Date().toISOString();

    const routes = [
        '',
        '/latest',
        '/check',
        '/history',
        '/number-frequency',
        '/knowledge',
        '/how-to',
        '/zodiac',
        '/tips',
        '/sources',
        '/live',
        '/about',
        '/faq',
        '/thai-lottery-draw-dates',
        '/thai-lottery-statistics',
        '/win-rate',
        '/reality',
        '/how-3up-direct-and-set-works',
        '/lexicon',
        '/contact',
        '/privacy',
        '/terms'
    ].flatMap((route) => {
        // Thai URL (Default, Root)
        const thaiUrl = {
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: route === '/latest' ? 'hourly' : 'daily',
            priority: route === '' ? 1.0 : route === '/latest' ? 0.9 : 0.8,
            alternates: {
                languages: {
                    en: `${baseUrl}/en${route}`,
                    th: `${baseUrl}${route}`,
                },
            },
        };

        // English URL (/en prefix)
        const englishUrl = {
            url: `${baseUrl}/en${route}`,
            lastModified: currentDate,
            changeFrequency: route === '/latest' ? 'hourly' : 'daily',
            priority: route === '' ? 1.0 : route === '/latest' ? 0.9 : 0.8,
            alternates: {
                languages: {
                    en: `${baseUrl}/en${route}`,
                    th: `${baseUrl}${route}`,
                },
            },
        };

        return [thaiUrl, englishUrl];
    });

    return routes;
}
