import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendAlertEmail } from "@/lib/sendAlertEmail";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Checks for license duplication across Builder, Trade, and Company
async function checkLicenseDuplicates({ licenseId, email }: { licenseId: string; email?: string }) {
  const builderDup = await prisma.builder.findMany({
    where: { licenseId, ...(email ? { email: { not: email } } : {}) },
  });
  const tradeDup = await prisma.trade.findMany({ where: { licenseId } });
  const companyDup = await prisma.company.findMany({ where: { licenseId } });
  return [
    ...builderDup.map((d) => ({ ...d, entity: "Builder" })),
    ...tradeDup.map((d) => ({ ...d, entity: "Trade" })),
    ...companyDup.map((d) => ({ ...d, entity: "Company" })),
  ];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }

  if (req.method === "POST") {
    try {
const { name, email, licenseId, phone, address, licenseStatus, licenseClass, licenseExpiry, licenseState, userId } = req.body;

      // Check for duplicates
      const duplicates = await checkLicenseDuplicates({ licenseId, email });

      if (duplicates.length > 0) {
        // Flag all duplicates
        for (const dup of duplicates) {
          if (dup.entity === "Company") {
            await prisma.company.update({
              where: { id: dup.id },
              data: {
                flagged: true,
                flagReason: "Duplicate License Detected",
                duplicateFlaggedAt: new Date(),
                licenseStatus: "Suspended (Duplicate Detected)",
              },
            });
          } else if (dup.entity === "Trade") {
            await prisma.trade.update({
              where: { id: dup.id },
              data: {
                flagged: true,
                flagReason: "Duplicate License Detected",
                duplicateFlaggedAt: new Date(),
                licenseStatus: "Suspended (Duplicate Detected)",
              },
            });
          } else if (dup.entity === "Company") {
            await prisma.company.update({
              where: { id: dup.id },
              data: {
                flagged: true,
                flagReason: "Duplicate License Detected",
                duplicateFlaggedAt: new Date(),
                licenseStatus: "Suspended (Duplicate Detected)",
              },
            });
          }
        }

        // After flagging, create new company:
        const company = await prisma.company.create({
          data: {
            name,
            email,
            licenseId,
            phone,
            address,
            licenseStatus,
            licenseClass,
            licenseExpiry: new Date(licenseExpiry),
            licenseState,
            userId,
          },
        });

// --- BEGIN AUDIT LOG PATCH ---
await prisma.auditLog.create({
  data: {
    userId: session?.user?.id ? Number(session.user.id) : null, // use admin ID if available
    model: "Company",
    modelId: company.id,
    action: "create",
    diff: {
      createdFields: {
        name: company.name,
        email: company.email,
        licenseId: company.licenseId,
        phone: company.phone,
        address: company.address,
        licenseStatus: company.licenseStatus,
        licenseClass: company.licenseClass,
        licenseExpiry: company.licenseExpiry,
        licenseState: company.licenseState,
      },
    },
    ip: Array.isArray(req.headers["x-forwarded-for"])
      ? req.headers["x-forwarded-for"][0]
      : (req.headers["x-forwarded-for"] as string | undefined) ??
        req.socket.remoteAddress ??
        null,
  },
});

// --- END AUDIT LOG PATCH ---

     // Send alert email
     sendAlertEmail(
       "New Company Registered",
       "Company " + name + " registered with license " + licenseId + ".",
       "admin@example.com" // <-- Replace with the actual recipient email!
      ).catch(console.error);


      return res.status(201).json(company);
    }
  } catch (error) {
    console.error("Error in POST /api/admin/companies:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}   // ← newly inserted: closes the 'if (req.method === "POST")'
  else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method " + req.method + " Not Allowed");
  }
}
