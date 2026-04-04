/**
 * Sitemap + robots.txt generator (next-sitemap).
 *
 * IMPORTANT: `npm run build` runs `postbuild` → next-sitemap overwrites
 * `public/robots.txt`. Maintain crawler rules here, not only by editing
 * the committed `public/robots.txt` snapshot.
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl: "https://arwindpianist.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 1.0,
  sitemapSize: 5000,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
  },
}
