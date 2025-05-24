import type { NextApiRequest, NextApiResponse } from "next";
import { hasActiveSubscription } from '@/utils/subscription';
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const subscriptions = await prisma.subscription.findMany();
      return res.status(200).json(subscriptions);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
      return res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
