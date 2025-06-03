import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig as string, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("❌ Invalid webhook signature", err);
    return res.status(400).end("Webhook Error");
  }

  switch (event.type) {
    case "customer.subscription.deleted":
    case "invoice.payment_failed":
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer.toString();

      const builder = await prisma.builder.findFirst({
        where: { stripeCustomerId: customerId },
      });

      if (!builder) {
        console.warn("⚠️ Builder not found for Stripe customer:", customerId);
        break;
      }

      const now = new Date();
      const isExpired = builder.licenseExpiry && new Date(builder.licenseExpiry) < now;
      const isFlagged = builder.flagged;
      const isSuspended = builder.licenseStatus === "Suspended";

      if (isExpired || isFlagged || isSuspended) {
        try {
          await stripe.subscriptions.cancel(subscription.id);
          await prisma.builder.delete({ where: { id: builder.id } });
          console.log(`🚫 Builder ${builder.name} removed due to license violation`);
        } catch (cancelErr) {
          console.error("🔥 Failed to cancel subscription or delete builder:", cancelErr);
        }
      }

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
