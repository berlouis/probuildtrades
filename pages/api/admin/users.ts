import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
type SessionUser = {
  user?: {
    id?: string;
    email?: string;
    role?: string;
  };
};

const session = await getServerSession(req, res, authOptions) as SessionUser;

  if (!session || session.user?.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    // TODO: Fetch users from database
    return res.status(200).json({ users: [] });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
