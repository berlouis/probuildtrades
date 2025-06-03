import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { subscriptionId } = req.body;
  if (!subscriptionId) {
    return res.status(400).json({ error: "Missing subscription ID." });
  }
  try {
    // Set status to cancelled
    const subscription = await prisma.subscription.update({
      where: { id: Number(subscriptionId) },
      data: { status: "cancelled" },
      include: { user: true, plan: true },
    });

    // Optionally log this action for audit trail
    // await prisma.cancellationLog.create({ ... })

    // Enforcement: flag license, email, phone so they cannot be reused
    await prisma.user.update({
      where: { id: subscription.userId },
      data: {
        canSubscribe: false, // You will need this field in your User model
      },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to cancel subscription." });
  }
}
