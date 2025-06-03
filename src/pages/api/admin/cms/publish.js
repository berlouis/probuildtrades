import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const updatedPage = await prisma.page.update({
      where: { id: Number(id) },
      data: { published: true },
    });
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish page' });
  }
}
