import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) return res.status(400).json({ error: "Invalid company ID" });

  // ADMIN AUTH CHECK
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin")
    return res.status(403).json({ error: "Admin access only." });

  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const company = await prisma.company.update({
    where: { id: Number(id) },
    data: { licenseStatus: "SUSPENDED" },
  });

  // --- AUDIT LOG ---
  await prisma.auditLog.create({
    data: {
      userId: Number(session.user.id),
      model: "Company",
      modelId: company.id,
      action: "suspend",
      diff: { newStatus: "SUSPENDED" },
      ip: Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : (req.headers["x-forwarded-for"] as string | undefined) ??
          req.socket.remoteAddress ??
          null,
    },
  });

  return res.status(200).json({ message: "Company suspended", company });
}
