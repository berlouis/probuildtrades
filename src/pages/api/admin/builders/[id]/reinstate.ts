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
    data: { licenseStatus: "ACTIVE" },
  });
// --- BEGIN AUDIT LOG PATCH ---
await prisma.auditLog.create({
  data: {
    userId: null,                         // set an admin ID here if you have it
    model: "Builder",
    modelId: builder.id,
    action: "reinstate",
    diff: { previousStatus: "SUSPENDED", newStatus: "ACTIVE" },
    ip: req.headers["x-forwarded-for"]
      ? Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : req.headers["x-forwarded-for"]
      : req.socket.remoteAddress ?? null,
  },
});
// --- END AUDIT LOG PATCH ---

  await sendEmail(
    builder.email,
    "Builder Reinstated",
    "Your builder account has been reinstated."
  );

  res.status(200).json({ message: "Builder reinstated successfully" });
}
