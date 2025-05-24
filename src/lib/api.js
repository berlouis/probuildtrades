/**
 * Returns all slugs (placeholder function)
 */
export async function getAllSlugs() {
  return [
    { slug: 'about' },
    { slug: 'services' },
    { slug: 'contact' },
  ];
}

/**
 * Returns page data for a given slug (placeholder)
 */
export async function getPageBySlug(slug) {
  return {
    title: `Page: ${slug}`,
    slug: slug,
    content: `<p>This is placeholder content for the page "${slug}".</p>`,
    description: `Meta description for ${slug}.`,
    locale: 'en',
  };
}
