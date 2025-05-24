import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const builderId = req.query.id as string;

  if
 (req.method === "DELETE") {
    try {
      await prisma.builder.delete({
        where: { id: parseInt(builderId, 10) },
      });
      return res.status(200).json({ message: "Builder deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete builder", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
