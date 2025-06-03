import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const flags = await prisma.duplicateLicenseFlag.findMany({
    include: { Builder: true },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({ flags });
}
