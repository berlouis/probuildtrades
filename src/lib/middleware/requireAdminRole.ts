import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import type { NextApiRequest, NextApiResponse } from "next";

export async function requireAdminRole(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    res.status(403).json({ error: "Access denied" });
    return false;
  }
  return true;
}
