import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { subscriptionId, reason } = req.body;
  if (!subscriptionId) {
    return res.status(400).json({ error: "Missing subscription ID." });
  }
  try {
    const subscription = await prisma.subscription.update({
      where: { id: Number(subscriptionId) },
      data: { status: "cancelled" },
      include: { user: true },
    });

    // Optionally log the admin action and reason (audit log could be a separate model)
    // await prisma.adminActionLog.create({ ... })

    await prisma.user.update({
      where: { id: subscription.userId },
      data: { canSubscribe: false },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to force-cancel subscription." });
  }
}
