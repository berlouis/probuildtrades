import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const meta = await prisma.metadata.findMany();
    return res.status(200).json(meta);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
