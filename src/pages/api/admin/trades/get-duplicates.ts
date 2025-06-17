import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Returns any Builder / Trade / Company that shares the exact licenseId
 * (excluding the caller’s own tradeId if you pass it as ?excludeId=123).
 * GET  /api/admin/trades/get-duplicates?licenseId=ABC123&excludeId=44
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { licenseId, excludeId } = req.query;
  if (!licenseId || Array.isArray(licenseId)) {
    return res.status(400).json({ error: "licenseId query param required" });
  }

  const [builderDup, tradeDup, companyDup] = await Promise.all([
    prisma.builder.findMany({
      where: { licenseId },
    }),
    prisma.trade.findMany({
      where: { licenseId, ...(excludeId ? { id: { not: Number(excludeId) } } : {}) },
    }),
    prisma.company.findMany({
      where: { licenseId },
    }),
  ]);

  const duplicates = [
    ...builderDup.map((d) => ({ ...d, entity: "Builder" })),
    ...tradeDup.map((d) => ({ ...d, entity: "Trade" })),
    ...companyDup.map((d) => ({ ...d, entity: "Company" })),
  ];

  return res.status(200).json({ duplicates });
}
