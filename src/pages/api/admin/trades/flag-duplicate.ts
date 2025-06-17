// src/pages/api/admin/trades/flag-duplicate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { sendAlertEmail } from "@/lib/sendAlertEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ─── Admin auth ──────────────────────────────────────────────────────────────
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { tradeId, reason = "Duplicate License Detected" } = req.body as {
    tradeId?: number | string;
    reason?: string;
  };

  if (!tradeId) {
    return res.status(400).json({ error: "tradeId is required" });
  }
// 1. Suspend & flag the trade (do this first!)
const trade = await prisma.trade.update({
  where: { id: Number(tradeId) },
  data: {
    flagged: true,
    flagReason: reason,
    licenseStatus: "Suspended (Duplicate Detected)",
    duplicateFlaggedAt: new Date(),
  },
});

// 2. Create DuplicateLicenseFlag (now you can use trade.licenseId)
const duplicateFlag = await prisma.duplicateLicenseFlag.create({
  data: {
    tradeId: Number(tradeId),
    matchedField: "licenseId",
    existingValue: trade.licenseId ? String(trade.licenseId) : "",
    attemptedValue: trade.licenseId ? String(trade.licenseId) : "",
    reason,
  },
});

  // ─── 2. Audit Log  ───────────────────────────────────────────────────────────
  await prisma.auditLog.create({
    data: {
      userId: Number(session.user.id),
      model: "Trade",
      modelId: trade.id,
      action: "flag-duplicate",
      diff: { flagged: true, flagReason: reason },
      ip: Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : (req.headers["x-forwarded-for"] as string | undefined) ??
          req.socket.remoteAddress ??
          null,
    },
  });

  // ─── 3. Optional alert e-mail ────────────────────────────────────────────────
  sendAlertEmail(
    trade.email,
    "Trade Suspended – Duplicate License",
    `Trade ${trade.name} (${trade.licenseId}) was flagged and suspended.`
  ).catch(console.error);

  return res.status(200).json({ success: true, trade });
}
