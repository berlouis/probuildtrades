import prisma from '@/lib/prisma';

/**
 * Fetch all CMS pages with their translations
 */
export async function getAllPagesWithTranslations() {
  return await prisma.cmsPage.findMany({
    include: {
      translations: true,
    },
  });
}

/**
 * Fetch a single CMS page and its translation
 */
export async function getCMSPageWithTranslation(slug, locale) {
  const page = await prisma.cmsPage.findFirst({
    where: { slug },
    include: {
      translations: {
        where: { locale },
        take: 1,
      },
    },
  });

  if (!page) return null;

  const translation = page.translations[0] || {};
  return {
    title: translation.title || page.title,
    content: translation.content || page.content,
    slug: page.slug,
    locale: translation.locale || locale,
  };
}
