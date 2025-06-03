import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendAlertEmail } from "@/lib/sendAlertEmail";
import checkDuplicateLicense from "@/lib/checkDuplicateLicense";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid builder ID" });
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    const { name, email, licenseId, phone, address, ...otherFields } = req.body;

    // Build OR filter for duplicate check
    const orFilters = [
      ...(licenseId ? [{ licenseId }] : []),
      ...(email ? [{ email }] : []),
      ...(phone ? [{ phone }] : []),
      ...(address ? [{ address }] : []),
    ];

    // Duplicate-check – only for builder updates
    const duplicate = await checkDuplicateLicense(
      "builder",
      {
        OR: orFilters,
        id: { not: Number(id) }, // Exclude current builder by ID
      }
    );

    if (duplicate.length > 0) {
      for (const dup of duplicate) {
        await prisma.duplicateLicenseFlag.create({
          data: {
            builderId: dup.id,
            matchedField: "licenseId",
            existingValue: dup.licenseId,
            attemptedValue: licenseId,
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
          ...otherFields,
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
      await prisma.builder.delete({
        where: { id: Number(id) },
      });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete builder", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  res.setHeader("Allow", "GET, PUT, PATCH, DELETE");
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}





