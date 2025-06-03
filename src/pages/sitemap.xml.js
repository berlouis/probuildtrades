export async function getServerSideProps({ res }) {
  const { default: prisma } = await import('@/lib/prisma')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://probuildtrades.com'
  const staticPaths = ['/', '/about', '/contact']
  const builders = await prisma.builder.findMany({ select: { id: true } })

  const urls = []
  staticPaths.forEach(p => urls.push(baseUrl + p))
  builders.forEach(b => {
    urls.push(baseUrl + '/admin/builders/' + b.id + '/documents')
    urls.push(baseUrl + '/admin/builders/' + b.id + '/flagged')
  })

  const xmlParts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ]
  urls.forEach(u => xmlParts.push('  <url><loc>' + u + '</loc></url>'))
  xmlParts.push('</urlset>')

  res.setHeader('Content-Type', 'application/xml')
  res.write(xmlParts.join('\n'))
  res.end()
  return { props: {} }
}
export default function SiteMap() { return null }
