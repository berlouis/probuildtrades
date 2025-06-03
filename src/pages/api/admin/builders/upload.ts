import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadsDir = path.join(process.cwd(), "public", "uploads");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const form = formidable({
    uploadDir: uploadsDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      return `${Date.now()}_${part.originalFilename}`;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    return res.status(200).json({ message: "File uploaded", files });
  });
}

// Note: formidable handles parsing; no need for bodyParser
// Ensure /public/uploads is served statically or protected if needed
