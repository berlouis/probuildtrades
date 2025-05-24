import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

async function checkLicenseCompliance() {
  // TODO: Fetch live license data from government API
  // For now, simulate checking license expiry and suspend builders if expired

  const builders = await prisma.builder.findMany();

  for (const builder of builders) {
    if (builder.licenseExpiry && new Date(builder.licenseExpiry) < new Date()) {
      if (builder.licenseStatus !== "Suspended") {
        await prisma.builder.update({
          where: { id: builder.id },
          data: { licenseStatus: "Suspended" },
        });
        // TODO: Add notification logic here (email/admin alert)
      }
    }
  }

  return { message: "License enforcement complete." };
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await checkLicenseCompliance();
    res.status(200).json(result);
  } catch (error) {
    console.error("License enforcement error:", error);
    res.status(500).json({ error: "Failed to enforce licenses." });
  }
}
