import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

type RemoteLicenseData = {
  licenseId: string;
  status: string;
  expiry: string;
  verified: boolean;
};

async function fetchRemoteLicense(stateCode: string, licenseId: string): Promise<RemoteLicenseData | null> {
  const config = await prisma.stateAPIConfig.findFirst({ where: { stateCode } });
  if (!config || !config.enabled || !config.apiUrl) return null; 
 
 return {
    licenseId,
    status: "active", // simulate possible values like "revoked", "expired"
    expiry: new Date(Date.now() + 30 * 86400000).toISOString(),
    verified: true,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const builders = await prisma.builder.findMany();

    for (const builder of builders) {
      if (!builder.licenseId || !builder.licenseState) continue;

      const remote = await fetchRemoteLicense(builder.licenseState, builder.licenseId);
      if (!remote) continue;

      let update: any = {};
      let reason = "";

      if (remote.status.toLowerCase() !== builder.licenseStatus.toLowerCase()) {
        update.licenseStatus = remote.status.toUpperCase();
        reason = `Status changed to ${remote.status}`;
      }
 if (new Date(remote.expiry) < new Date()) {
        update.status = "SUSPENDED";
        update.flagged = true;
        reason = `License expired on ${remote.expiry}`;
      }

      if (remote.verified !== builder.verified) {
        update.verified = remote.verified;
        reason = `Verification updated to ${remote.verified}`;
      }

      if (Object.keys(update).length > 0) {
        await prisma.builder.update({
          where: { id: builder.id },
          data: update,
        });

        await prisma.enforcementLog.create({
          data: {
            builderId: builder.id,
            action: "Auto-Enforcement",
            reason,
          },
        });
      }
    }

    return res.status(200).json({ message: "License sync complete" });
  } catch (error) {
    console.error("License sync error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
