/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Suppress middleware deprecation warning (middleware still works in Next.js 16.1.1)
  // This is a future deprecation notice, not an immediate breaking change
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
