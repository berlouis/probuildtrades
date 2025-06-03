import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
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
    const sub = await prisma.subscription.findUnique({
      where: { id: Number(subscriptionId) },
      include: { user: true },
    });
    if (!sub || !sub.user.stripeCustomerId) {
      return res.status(400).json({ error: "No Stripe customer ID found." });
    }
    const intent = await stripe.setupIntents.create({
      customer: sub.user.stripeCustomerId,
    });
    return res.status(200).json({ clientSecret: intent.client_secret });
  } catch (err) {
    return res.status(500).json({ error: "SetupIntent creation failed." });
  }
}
