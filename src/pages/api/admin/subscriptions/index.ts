import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const subs = await prisma.subscription.findMany({
      orderBy: { id: "asc" },
      include: {
        user: { select: { id: true, name: true } },
        plan: { select: { id: true, name: true } },
      },
    });
    return res.json(subs);
  }
  res.status(405).json({ error: "Method not allowed" });
}
