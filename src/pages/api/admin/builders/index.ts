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
          if (dup.entity === "Builder") {
            await prisma.builder.update({
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

        // After flagging, create new builder:
const builder = await prisma.builder.create({
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
       // Send alert email
        sendAlertEmail(
         "New Builder Registered",
         "Builder " + name + " registered with license " + licenseId + ".",
         "admin@example.com" // or your actual recipient
       ).catch(console.error);

        return res.status(201).json(builder);
      }

    } catch (error) {
      console.error("Error in POST /api/admin/builders:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
 return res.status(405).end("Method " + req.method + " Not Allowed");
  }
}
