import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const pages = await prisma.page.findMany();
    res.json(pages);
  } else {
    res.status(405).end();
  }
}
