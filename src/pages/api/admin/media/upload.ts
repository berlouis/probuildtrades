import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      const timestamp = Date.now();
      const cleanName = part.originalFilename?.replace(/\s+/g, '_') || 'upload';
      return `${timestamp}_${cleanName}`;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    const uploadedFiles = Object.values(files).map((file: any) => ({
      filename: path.basename(file[0].filepath),
      originalName: file[0].originalFilename,
      type: file[0].mimetype,
      size: file[0].size,
    }));

    return res.status(200).json({ files: uploadedFiles });
  });
}
