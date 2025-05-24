import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Missing id" });

  try {
    await prisma.subscription.updateMany({
      where: { id },
      data: { status: "cancelled" },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Cancel subscription failed:", err);
    return res.status(500).json({ error: "Failed to cancel subscription" });
  }
}
