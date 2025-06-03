import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    console.log('Contact form submission:', { name, email, message });

    // TODO: Add DB storage or email sending here

    return res.status(200).json({ message: 'Form received' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
