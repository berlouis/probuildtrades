import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  // ⬇️ PATCH: Admin check
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  // ...rest of your logic...

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
// --- BEGIN AUDIT LOG PATCH ---
await prisma.auditLog.create({
  data: {
    userId: session?.user?.id ? Number(session.user.id) : null,   // set admin ID if you have it
    model: "Builder",
    modelId: builderId,
    action: "flag-duplicate",
    diff: {
      flagged: true,
      licenseStatus: "Suspended (Duplicate Detected)",
      reason,
    },
    ip: req.headers["x-forwarded-for"]
      ? Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : req.headers["x-forwarded-for"]
      : req.socket.remoteAddress ?? null,
  },
});
// --- END AUDIT LOG PATCH ---

  res.status(200).json({ success: true, flag });
}
