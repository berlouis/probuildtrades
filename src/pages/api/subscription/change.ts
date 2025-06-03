import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { subscriptionId, planId, paymentInterval } = req.body;
  if (!subscriptionId || !planId || !paymentInterval) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const updated = await prisma.subscription.update({
      where: { id: Number(subscriptionId) },
      data: { planId: Number(planId), paymentInterval },
    });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: "Failed to change plan." });
  }
}
