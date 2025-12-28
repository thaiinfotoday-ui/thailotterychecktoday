
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
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '/latest' ? 'hourly' : 'daily',
        priority: route === '' ? 1.0 : route === '/latest' ? 0.9 : 0.8,
    }));

    return routes;
}
