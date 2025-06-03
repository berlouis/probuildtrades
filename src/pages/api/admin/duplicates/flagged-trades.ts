import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all trades flagged as duplicate
  const trades = await prisma.trade.findMany({
    where: {
      flagged: true,
      flagReason: { contains: "Duplicate" }
    },
    orderBy: { duplicateFlaggedAt: "desc" },
  });

  res.status(200).json({ trades });
}
