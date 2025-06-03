import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all companies flagged as duplicate
  const companies = await prisma.company.findMany({
    where: {
      flagged: true,
      flagReason: { contains: "Duplicate" }
    },
    orderBy: { duplicateFlaggedAt: "desc" },
  });

  res.status(200).json({ companies });
}
