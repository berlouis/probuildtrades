/**
 * Generates JSON-LD structured data for a service
 * @param {Object} param0
 * @param {string} param0.name - Service name
 * @param {string} param0.description - Service description
 * @param {string} param0.url - URL to the service page
 */
export function generateServiceSchema({ name, description, url }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "ProBuildTrades",
      url: siteUrl,
    },
    url: `${siteUrl}${url}`,
  };
}
