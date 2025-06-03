import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Admin/auth check omitted for brevity; add if required
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { builderId, matchedField, existingValue, attemptedValue, reason } = req.body;

  if (!builderId || !matchedField || !existingValue || !attemptedValue || !reason) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 1. Create a DuplicateLicenseFlag
  const flag = await prisma.duplicateLicenseFlag.create({
    data: {
      builderId,
      matchedField,
      existingValue,
      attemptedValue,
      reason,
    },
  });
// 2. Suspend the builder (enforcement logic)
  await prisma.builder.update({
    where: { id: builderId },
    data: {
      flagged: true,
      licenseStatus: "Suspended (Duplicate Detected)",
    },
  });

  res.status(200).json({ success: true, flag });
}
