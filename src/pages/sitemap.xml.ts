import { GetServerSideProps } from "next";

type Page = {
  pageSlug: string;
  updatedAt: string | Date;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages: Page[] = await fetch('https://probuildtrades.com/api/pages').then(r => r.json());

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page: Page) => `<url>
    <loc>https://probuildtrades.com/${page.pageSlug}</loc>
    <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
  </url>`
    )
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
