// src/pages/api/admin/companies/flag-duplicate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { sendAlertEmail } from "@/lib/sendAlertEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { companyId, reason = "Duplicate License Detected" } = req.body as {
    companyId?: number | string;
    reason?: string;
  };

  if (!companyId) {
    return res.status(400).json({ error: "companyId is required" });
  }

// ─── 1.1. Create DuplicateLicenseFlag for audit consistency ──────────────
const duplicateFlag = await prisma.duplicateLicenseFlag.create({
  data: {
    companyId: Number(companyId),
    matchedField: "licenseId", // or adapt if you want to match another field
    existingValue: companyId ? String(companyId) : "",
    attemptedValue: companyId ? String(companyId) : "",
    reason,
  },
});

  const company = await prisma.company.update({
    where: { id: Number(companyId) },
    data: {
      flagged: true,
      flagReason: reason,
      licenseStatus: "Suspended (Duplicate Detected)",
      duplicateFlaggedAt: new Date(),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: Number(session.user.id),
      model: "Company",
      modelId: company.id,
      action: "flag-duplicate",
      diff: { flagged: true, flagReason: reason },
      ip: Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : (req.headers["x-forwarded-for"] as string | undefined) ??
          req.socket.remoteAddress ??
          null,
    },
  });

  sendAlertEmail(
    company.email,
    "Company Suspended – Duplicate License",
    `Company ${company.name} (${company.licenseId}) was flagged and suspended.`
  ).catch(console.error);

  return res.status(200).json({ success: true, company });
}
