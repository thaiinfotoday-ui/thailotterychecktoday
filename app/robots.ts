export default function robots() {
    // Use environment variable or fallback
    // Always use the production domain for SEO/Sitemap, unless strictly overridden by NEXT_PUBLIC_SITE_URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/private/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
