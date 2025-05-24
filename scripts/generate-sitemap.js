#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const fs   = require('fs');
const path = require('path');

async function main() {
  const prisma = new PrismaClient();
  try {
    // fetch published posts
    const posts = await prisma.post.findMany({
      where:  { published: true },
      select: { slug: true, updatedAt: true },
    });

    // start XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml    += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // home page
    xml +=
      '  <url>\n' +
      '    <loc>https://probuildtrades.com/</loc>\n' +
      '    <lastmod>' + new Date().toISOString() + '</lastmod>\n' +
      '  </url>\n';

    // each blog post
    for (const p of posts) {
      xml +=
        '  <url>\n' +
        '    <loc>https://probuildtrades.com/blog/' + p.slug + '</loc>\n' +
        '    <lastmod>' + p.updatedAt.toISOString() + '</lastmod>\n' +
        '  </url>\n';
    }

    // close XML
    xml += '</urlset>\n';

    // write out
    const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(outPath, xml);
    console.log('✅ sitemap.xml generated (' + (posts.length + 1) + ' URLs)');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
