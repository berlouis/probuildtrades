/**
 * Generates breadcrumb JSON-LD schema
 * @param {Array<{ name: string, item: string }>} breadcrumbs
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.item}`,
    })),
  };
}
