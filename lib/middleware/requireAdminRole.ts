import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export function requireAdminRole(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    return handler(req, res);
  };
}
