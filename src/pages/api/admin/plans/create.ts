import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check admin session
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Admin access required" });
  }

  const {
    name,
    tier,
    priceMonthly,
    priceYearly,
    description,
    isActive,
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  // Both prices are optional, but if present, ensure they're valid decimals
  let priceMonthlyValue = priceMonthly ? priceMonthly.toString() : undefined;
  let priceYearlyValue = priceYearly ? priceYearly.toString() : undefined;

  try {
    const plan = await prisma.plan.create({
      data: {
        name,
        tier: tier || undefined,
        priceMonthly: priceMonthlyValue,
        priceYearly: priceYearlyValue,
        description: description || undefined,
        isActive: typeof isActive === "boolean" ? isActive : true,
      },
    });
    return res.status(200).json(plan);
  } catch (error) {
    return res.status(500).json({ error: "Error creating plan" });
  }
}
