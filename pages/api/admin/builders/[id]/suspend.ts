import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { builderId } = req.query;

  if (!builderId || Array.isArray(builderId)) {
    return res.status(400).json({ error: "Invalid builder ID" });
  }

  const builder = await prisma.builder.update({
    where: { id: parseInt(builderId) },
    data: { licenseStatus: "SUSPENDED" },
  });

  await sendEmail(
    builder.email,
    "Builder Suspended",
    "Your builder account has been suspended."
  );

  res.status(200).json({ message: "Builder suspended successfully" });
}
