import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendAlertEmail } from "@/lib/sendAlertEmail";
import checkDuplicateLicense from "@/lib/checkDuplicateLicense";
import * as z from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Zod schema for trade validation
const tradeUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  licenseId: z.string().min(3, "License ID too short").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ADMIN AUTH CHECK
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }

  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid trade ID" });
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    // Validate input
    const validation = tradeUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(422).json({ error: "Invalid input", details: validation.error.flatten() });
    }
    const { name, email, licenseId, phone, address } = validation.data;

    // Build OR filter for duplicate check
    const orFilters = [
      ...(licenseId ? [{ licenseId }] : []),
      ...(email ? [{ email }] : []),
      ...(phone ? [{ phone }] : []),
      ...(address ? [{ address }] : []),
    ];

    // Cross-entity duplicate-check (excludes self)
    const duplicate = await checkDuplicateLicense(
      "trade",
      {
        OR: orFilters,
        id: { not: Number(id) },
      }
    );

    if (duplicate.length > 0) {
      for (const dup of duplicate) {
 await prisma.duplicateLicenseFlag.create({
   data: {
    tradeId: dup.id, // <--- use tradeId here
    matchedField: "licenseId",
    existingValue: dup.licenseId,
    attemptedValue: licenseId || "",
    reason: "Duplicate detected across Builder, Company, or Trade",
  },
});
        await prisma.trade.update({
          where: { id: dup.id },
          data: {
            flagged: true,
            licenseStatus: "Suspended (Duplicate License)",
            duplicateFlaggedAt: new Date(),
          },
        });
        // Send alert email for compliance/fraud reporting
        await sendAlertEmail(
          dup.email,
          "Trade Suspended – Duplicate License Detected",
          `Trade ${dup.name || dup.id} has been flagged and suspended due to a duplicate license (${licenseId}).`
        );
      }
      return res.status(409).json({ error: "Duplicate license detected, trade(s) flagged." });
    }

    // If no duplicate, update the trade
    try {
      const updated = await prisma.trade.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          licenseId,
          phone,
          address,
          // If you allow extra fields, add ...req.body here
        },
      });

// --- BEGIN AUDIT LOG PATCH ---
  await prisma.auditLog.create({
    data: {
      userId: session?.user?.id ? Number(session.user.id) : null,
      model: "Trade",
      modelId: updated.id,
      action: "update",
      diff: { updatedFields: req.body },
      ip: Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : (req.headers["x-forwarded-for"] as string | undefined) ??
          req.socket.remoteAddress ??
          null,
    },
  });
// --- END AUDIT LOG PATCH ---

      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update trade", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  if (req.method === "GET") {
    try {
      const trade = await prisma.trade.findUnique({
        where: { id: Number(id) },
      });
      if (!trade) {
        return res.status(404).json({ error: "Trade not found" });
      }
      return res.status(200).json(trade);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch trade", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  if (req.method === "DELETE") {
    try {
    const deletedTrade = await prisma.trade.delete({
      where: { id: Number(id) },
    });

    // --- BEGIN AUDIT LOG PATCH ---
    await prisma.auditLog.create({
      data: {
        userId: session?.user?.id ? Number(session.user.id) : null,
        model: "Trade",
        modelId: deletedTrade.id,
        action: "delete",
        diff: { deletedFields: deletedTrade },
        ip: Array.isArray(req.headers["x-forwarded-for"])
          ? req.headers["x-forwarded-for"][0]
          : (req.headers["x-forwarded-for"] as string | undefined) ??
            req.socket.remoteAddress ??
            null,
      },
    });
    // --- END AUDIT LOG PATCH ---

    return res.status(204).end();

    } catch (err) {
      return res.status(500).json({ error: "Failed to delete trade", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  res.setHeader("Allow", "GET, PUT, PATCH, DELETE");
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
