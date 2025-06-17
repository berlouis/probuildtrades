import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendAlertEmail } from "@/lib/sendAlertEmail";

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
  if (req.method === "POST") {
    try {
const { name, email, licenseId, phone, address, licenseStatus, licenseClass, licenseExpiry, licenseState, userId } = req.body;
      
      // Check for duplicates
      const duplicates = await checkLicenseDuplicates({ licenseId, email });

      if (duplicates.length > 0) {
        // Flag all duplicates
        for (const dup of duplicates) {
          if (dup.entity === "Trade") {
            await prisma.trade.update({
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

        // After flagging, create new trade:
const trade = await prisma.trade.create({
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
    userId: userId ? Number(userId) : null,        // use body-supplied admin ID
    model: "Trade",
    modelId: trade.id,
    action: "create",
    diff: {
      createdFields: {
        name: trade.name,
        email: trade.email,
        licenseId: trade.licenseId,
        phone: trade.phone,
        address: trade.address,
        licenseStatus: trade.licenseStatus,
        licenseClass: trade.licenseClass,
        licenseExpiry: trade.licenseExpiry,
        licenseState: trade.licenseState,
      },
    },
    ip: req.headers["x-forwarded-for"]
      ? Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : req.headers["x-forwarded-for"]
      : req.socket.remoteAddress ?? null,
  },
});
// --- END AUDIT LOG PATCH ---

sendAlertEmail(
  process.env.ALERT_EMAIL || "admin@example.com",
  "New Trade Registered",
  "Trade " + name + " registered with license " + licenseId + "."
).catch(console.error);

return res.status(201).json(trade);
      }

    } catch (error) {
      console.error("Error in POST /api/admin/trades:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
   } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method " + req.method + " Not Allowed");
  }
}
