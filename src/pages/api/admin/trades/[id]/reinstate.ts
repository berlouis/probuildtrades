import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access only." });
  }

  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid trade ID" });
  }
  if (req.method !== "POST" && req.method !== "PATCH") {
    res.setHeader("Allow", "POST, PATCH");
    return res.status(405).end("Method " + req.method + " Not Allowed");
  }

  try {
    const trade = await prisma.trade.update({
      where: { id: Number(id) },
      data: {
        flagged: false,
        licenseStatus: "Active",
      },
    });

    // --- BEGIN AUDIT LOG PATCH ---
    await prisma.auditLog.create({
      data: {
        userId: session.user.id ? Number(session.user.id) : null,
        model: "Trade",
        modelId: trade.id,
        action: "reinstate",
        diff: { previousStatus: "Suspended", newStatus: "Active" },
        ip: Array.isArray(req.headers["x-forwarded-for"])
          ? req.headers["x-forwarded-for"][0]
          : (req.headers["x-forwarded-for"] as string | undefined) ??
            req.socket.remoteAddress ??
            null,
      },
    });
    // --- END AUDIT LOG PATCH ---

    return res.status(200).json(trade);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to reinstate trade", detail: err instanceof Error ? err.message : String(err) });
  }
}
