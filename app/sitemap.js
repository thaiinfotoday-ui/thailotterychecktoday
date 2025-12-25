import { getHistoryData } from '@/lib/historyData';

export default async function sitemap() {
    // Use environment variable or fallback to localhost for development
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
            'https://thailotterychecktoday.com');

    // Fetch all history data (pass limit 1000 or similar if needed, or modify getHistoryData to return all)
    // The current getHistoryData supports generic fetch. We'll grab the first page with a large size if possible, 
    // strictly speaking getHistoryData slices. 
    // For now, I'll just call it and assume it returns what we need or I might need to hack it to get ALL.
    // The current implementation slices. I will import the mock data directly if possible? 
    // No, good practice is to use the getter. I'll fetch page 1 and assume it's enough for now or loop.
    // Actually, looking at getHistoryData, it takes `page` param. It slices 10. 
    // I should probably update getHistoryData to support 'all' but I cannot easily edit shared lib logic without risk.
    // I will read the mock data directly if I can? 
    // Actually, I can just import `mockHistoryData` from the lib file since it is exported!

    // Rereading file: `export const mockHistoryData = [...]` YES.

    const historyEntries = (await import('@/lib/historyData')).staticHistoryData.map(item => ({
        url: `${baseUrl}/history/${item.date}`,
        lastModified: new Date(item.date),
        changeFrequency: 'never', // History doesn't change
        priority: 0.6,
    }));

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/latest`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/history`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/check`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/how-to`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/number-frequency`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/thai-lottery-draw-dates`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/thai-lottery-statistics`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    return [...staticRoutes, ...historyEntries];
}
