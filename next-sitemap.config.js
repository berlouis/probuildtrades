/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://renosolutions.com.au',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://renosolutions.com.au/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Custom logic for specific pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Higher priority for key pages
    if (
      path.includes('/bathroom-renovation-packages') ||
      path.includes('/kitchen-renovation-packages') ||
      path.includes('/home-renovation-packages') ||
      path.includes('/contact')
    ) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
