// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const payments = await prisma.payment.findMany();
      return res.status(200).json(payments);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      return res.status(500).json({ error: "Failed to fetch payments" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
