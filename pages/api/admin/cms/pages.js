import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    console.log('DELETE request received with id:', id);

    if (!id) {
      return res.status(400).json({ message: 'Missing page ID' });
    }
    try {
      const deletedPage = await prisma.page.delete({
        where: { id: Number(id) },
      });
      console.log('Deleted page:', deletedPage);
      return res.status(200).json(deletedPage);
    } catch (error) {
      console.error('Error deleting page:', error);
      return res.status(500).json({ message: 'Error deleting page', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
