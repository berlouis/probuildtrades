import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const plans = await prisma.plan.findMany({
      orderBy: { id: "asc" },
    });
    return res.json(plans);
  }
  res.status(405).json({ error: "Method not allowed" });
}
