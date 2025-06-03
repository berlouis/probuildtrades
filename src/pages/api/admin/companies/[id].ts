import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendAlertEmail } from "@/lib/sendAlertEmail";
import checkDuplicateLicense from "@/lib/checkDuplicateLicense";
import * as z from "zod";

// Company update validation schema
const companyUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  licenseId: z.string().min(3, "License ID too short").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid company ID" });
  }

  // ADMIN/ROLE CHECK: Add here if you want, otherwise skip (see Builders for pattern)

  if (req.method === "PUT" || req.method === "PATCH") {
    // Zod validation
    const validation = companyUpdateSchema.safeParse(req.body);
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

    // Duplicate-check – only for company updates
    const duplicate = await checkDuplicateLicense(
      "company",
      {
        OR: orFilters,
        id: { not: Number(id) }, // Exclude current company by ID
      }
    );
    if (duplicate.length > 0) {
      for (const dup of duplicate) {
   await prisma.duplicateLicenseFlag.create({
   data: {
    companyId: dup.id, // <--- use companyId here
    matchedField: "licenseId",
    existingValue: dup.licenseId,
    attemptedValue: licenseId || "",
    reason: "Duplicate detected across Builder, Company, or Trade",
  },
});
        await prisma.company.update({
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
          "Company Suspended – Duplicate License Detected",
          `Company ${dup.name || dup.id} has been flagged and suspended due to a duplicate license (${licenseId}).`
        );
      }
      return res.status(409).json({ error: "Duplicate license detected, company(s) flagged." });
    }

    // If no duplicate, update the company
    try {
      const updated = await prisma.company.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          licenseId,
          phone,
          address,
        },
      });
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update company", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  if (req.method === "GET") {
    try {
      const company = await prisma.company.findUnique({
        where: { id: Number(id) },
      });
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      return res.status(200).json(company);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch company", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.company.delete({
        where: { id: Number(id) },
      });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete company", detail: err instanceof Error ? err.message : String(err) });
    }
  }

  res.setHeader("Allow", "GET, PUT, PATCH, DELETE");
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
