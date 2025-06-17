import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendAlertEmail } from "@/lib/sendAlertEmail";
import checkDuplicateLicense from "@/lib/checkDuplicateLicense";
import * as z from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Zod schema for builder validation
const builderUpdateSchema = z.object({
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
    return res.status(400).json({ error: "Invalid builder ID" });
  }
  if (req.method === "PUT" || req.method === "PATCH") {
    // Validate input
    const validation = builderUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(422).json({ error: "Invalid input", details: validation.error.flatten() });
    }
      const { name, email, licenseId, phone, address } = validation.data;
      const userId = req.body.userId;
    // Build OR filter for duplicate check
    const orFilters = [
      ...(licenseId ? [{ licenseId }] : []),
      ...(email ? [{ email }] : []),
      ...(phone ? [{ phone }] : []),
      ...(address ? [{ address }] : []),
    ];

    // Cross-entity duplicate-check (excludes self)
    const duplicate = await checkDuplicateLicense(
      "builder",
      {
        OR: orFilters,
        id: { not: Number(id) },
      }
    );

    if (duplicate.length > 0) {
      for (const dup of duplicate) {
        await prisma.duplicateLicenseFlag.create({
          data: {
            builderId: dup.id,
            matchedField: "licenseId",
            existingValue: dup.licenseId,
            attemptedValue: licenseId || "",
            reason: "Duplicate detected across Builder, Company, or Trade",
          },
        });
        await prisma.builder.update({
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
          "Builder Suspended – Duplicate License Detected",
          `Builder ${dup.name || dup.id} has been flagged and suspended due to a duplicate license (${licenseId}).`
        );
      }
      return res.status(409).json({ error: "Duplicate license detected, builder(s) flagged." });
    }

    // If no duplicate, update the builder
    try {
      const updated = await prisma.builder.update({
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
      return res.status(200).json(updated);




    } catch (err) {
      return res.status(500).json({ error: "Failed to update builder", detail: err instanceof Error ? err.message : String(err) });
    }
  }
  if (req.method === "GET") {
    try {
      const builder = await prisma.builder.findUnique({
        where: { id: Number(id) },
      });
      if (!builder) {
        return res.status(404).json({ error: "Builder not found" });
      }
      return res.status(200).json(builder);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch builder", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  if (req.method === "DELETE") {
  try {
    // Delete the builder and keep the deleted record for audit diff
    const deletedBuilder = await prisma.builder.delete({
      where: { id: Number(id) },
    });

    // --- BEGIN AUDIT LOG PATCH ---
    await prisma.auditLog.create({
      data: {
        userId: session?.user?.id ? Number(session.user.id) : null,
        model: "Builder",
        modelId: deletedBuilder.id,
        action: "delete",
        diff: { deletedFields: deletedBuilder },
        ip: req.headers["x-forwarded-for"]
          ? Array.isArray(req.headers["x-forwarded-for"])
            ? req.headers["x-forwarded-for"][0]
            : req.headers["x-forwarded-for"]
          : null,
      },
    });
    // --- END AUDIT LOG PATCH ---

    return res.status(204).end();
  } catch (err) {
    return res
      .status(500)
      .json({
        error: "Failed to delete builder",
        detail: err instanceof Error ? err.message : String(err),
      });
  }
 }

  res.setHeader("Allow", "GET, PUT, PATCH, DELETE");
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}






