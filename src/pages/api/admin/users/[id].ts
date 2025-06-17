import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { z } from "zod";

// PATCH: Editable fields by admin
const UserUpdateSchema = z.object({
  isSuspended: z.boolean().optional(),
  role: z.enum(["user", "admin"]).optional(),
  name: z.string().optional(),
  canSubscribe: z.boolean().optional(),
});

// Admin session check
async function getAdminIdFromSession(req: NextApiRequest) {
  const session = await getSession({ req });
  if (!session || !session.user || session.user.role !== "admin") return null;
  return session.user.id;
}
// Audit log utility
async function logAdminAction({
  adminId,
  action,
  userId,
  before,
  after,
}: {
  adminId: number;
  action: string;
  userId: number;
  before: any;
  after: any;
}) {
  await prisma.auditLog.create({
    data: {
      userId: adminId,     // The admin performing the action
      model: "User",
      modelId: userId,     // The affected user
      action,
      diff: { before, after },
    },
  });
}


// Cascade suspend/reactivate
async function cascadeSuspension(userId: number, suspend: boolean) {
  await prisma.builder.updateMany({ where: { userId }, data: { isSuspended: suspend } });
  await prisma.trade.updateMany({ where: { userId }, data: { isSuspended: suspend } });
  await prisma.company.updateMany({ where: { userId }, data: { isSuspended: suspend } });
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const stringId = Array.isArray(id) ? id[0] : id;
  if (!stringId) {
  return res.status(400).json({ error: "Missing user ID" });
}
  const userId = parseInt(stringId);
  if (isNaN(userId)) {
  return res.status(400).json({ error: "Invalid user ID" });
}


  // Admin session check
  const adminId = await getAdminIdFromSession(req);
  if (!adminId) {
    return res.status(403).json({ error: "Admin privileges required" });
  }

  // Fetch existing user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Handle GET (view user)
  if (req.method === "GET") {
    return res.status(200).json(user);
  }

  // Handle PATCH (update user, e.g. suspend)
  if (req.method === "PATCH") {
    try {
      const parsed = UserUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }

      const before = { ...user };
      const updateFields = { ...parsed.data };

     // Cascade suspend/reactivate if requested
     if (
       typeof parsed.data.isSuspended === "boolean" &&
       parsed.data.isSuspended !== user.isSuspended
     ) {
       await cascadeSuspension(userId, parsed.data.isSuspended);
     }

      const updated = await prisma.user.update({
        where: { id: userId },
        data: updateFields,
      });
   await logAdminAction({
    adminId: typeof adminId === "string" ? parseInt(adminId) : adminId,
    action: "patch",
    userId,
    before,
    after: updated,
});
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ error: "Server error", details: err });
    }
  }
  // Handle DELETE (soft suspend user and linked entities)
  if (req.method === "DELETE") {
    try {
      const before = { ...user };
      // Soft suspend user and all related entities
      await cascadeSuspension(userId, true);
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { isSuspended: true },
      });
     await logAdminAction({
      adminId: typeof adminId === "string" ? parseInt(adminId) : adminId,
      action: "delete",
      userId,
      before,
      after: updated,
    });

      return res.status(200).json({ success: true, user: updated });
    } catch (err) {
      return res.status(500).json({ error: "Server error", details: err });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: "Method not allowed" });
}
