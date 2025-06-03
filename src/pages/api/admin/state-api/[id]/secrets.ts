import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { decrypt } from '@/lib/crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  try {
    const config = await prisma.stateAPIConfig.findUnique({
      where: { id: Number(id) },
    });

    if (!config) return res.status(404).json({ error: 'Not found' });

    const apiKey = config.apiKey ? decrypt(config.apiKey) : null;
    const apiToken = config.apiKey ? decrypt(config.apiKey) : null;

    return res.status(200).json({ apiKey, apiToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load secrets' });
  }
}
