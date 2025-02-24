/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.arwindpianist.store', // Your site's URL
    generateRobotsTxt: true, // Generate robots.txt
    changefreq: 'daily', // Change frequency for the single page
    priority: 1.0, // Highest priority for the single page
    sitemapSize: 5000, // Max number of URLs per sitemap (irrelevant for a single page)
    exclude: [], // No pages to exclude
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*', // Allow all bots
          allow: '/', // Allow the root page
        },
      ],
    },
  };