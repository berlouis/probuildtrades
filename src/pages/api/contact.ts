import type { NextApiRequest, NextApiResponse } from 'next';
import { sendAlertEmail } from '@/lib/sendAlertEmail'; // <-- Use your real utility

type Data = { message: string };

// Helper email validation
function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // TODO: Add DB storage if required

    // Example: Send email (adjust as per your sendAlertEmail signature)
    try {
      await sendAlertEmail(
        "admin@probuildtrades.com",  // Your admin/support email
        "New Contact Form Submission",
        `From: ${name} <${email}>\n\n${message}`
      );
    } catch (err) {
      return res.status(500).json({ message: 'Failed to send email.' });
    }

    return res.status(200).json({ message: 'Form received. Thank you!' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}


