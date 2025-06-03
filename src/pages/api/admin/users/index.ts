import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminRole } from "@/lib/middleware/requireAdminRole";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAdmin = await requireAdminRole(req, res);
  if (!isAdmin) return;

  const users = await prisma.user.findMany();
  res.status(200).json(users);
}
