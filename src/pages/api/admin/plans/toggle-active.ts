import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { id, isActive } = req.body;
  if (!id || typeof isActive !== "boolean") {
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const plan = await prisma.plan.update({
      where: { id: Number(id) },
      data: { isActive },
    });
    return res.status(200).json(plan);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update status." });
  }
}
