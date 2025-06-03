import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, description, keywords } = req.body;

    try {
      const updated = await prisma.metadata.update({
        where: { id: Number(id) },
        data: { title, description, keywords },
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Metadata update failed:", error);
      return res.status(500).json({ error: "Failed to update metadata" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
