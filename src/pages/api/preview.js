import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { slug = '' } = req.query;
  res.setPreviewData({});
    res.redirect('/' + slug);
}
