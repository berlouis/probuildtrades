import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const page = await prisma.cMSPage.findUnique({ where: { id: Number(id) } });
    return res.status(200).json(page);
  }

  if (req.method === "PUT") {
    const { title, content, type, isDraft } = req.body;

    const updated = await prisma.cMSPage.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        type,
        isDraft: !!isDraft,
      },
    });

    return res.status(200).json(updated);
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
