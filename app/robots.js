export default function robots() {
    // Use environment variable or fallback
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
            'https://thailotterychecktoday.com');

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/private/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
