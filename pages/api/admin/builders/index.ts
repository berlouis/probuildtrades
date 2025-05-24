import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import authOptions from "../../auth/authOptions";
import { getServerSession } from "next-auth/next";

/**
 * Admin Builders API
 *  • POST   – create builder
 *  • GET    – list builders
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        email,
        licenseId,
        licenseClass,
        licenseState,
        verified = false,
      } = req.body;
      const newBuilder = await prisma.builder.create({
        data: {
          // required relation to User
          User: { connect: { id: Number(session.user.id) } },

          // core fields
          name,
          email,

          // license meta
          licenseId,
          licenseClass,
          licenseState,
          licenseStatus: "ACTIVE",
          licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          verified,
        },
      });

      return res.status(201).json(newBuilder);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create builder" });
    }
  }

  if (req.method === "GET") {
    const builders = await prisma.builder.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(builders);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
