/**
 * Generates breadcrumb schema in JSON-LD format
 * @param {Array<{ name: string, item: string }>} crumbs
 */
export function generateBreadcrumbSchema(crumbs) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.item}`,
    })),
  };
}
