/**
 * Generates organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProBuildTrades",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://facebook.com/probuildtrades",
      "https://twitter.com/probuildtrades",
      "https://linkedin.com/company/probuildtrades"
    ]
  };
}
