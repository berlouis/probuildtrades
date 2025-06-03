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
  const { subscriptionId, paymentMethodId } = req.body;
  if (!subscriptionId || !paymentMethodId) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    // Retrieve subscription to get customer ID
    const sub = await prisma.subscription.findUnique({
      where: { id: Number(subscriptionId) },
      include: { user: true },
    });
  if (!sub || !sub.user.stripeCustomerId) {
  return res.status(400).json({ error: "No Stripe customer ID found." });
}

 const stripeCustomerId = sub.user.stripeCustomerId;
 if (!stripeCustomerId) {
  return res.status(400).json({ error: "Stripe customer ID is missing." });
}

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: sub.user.stripeCustomerId,
    });

    // Set it as the default payment method
    await stripe.customers.update(stripeCustomerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to attach payment method." });
  }
}
