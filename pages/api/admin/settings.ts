import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Placeholder: Return dummy settings
  return res.status(200).json({
    siteName: "ProBuildTrades",
    defaultLanguage: "en",
    timezone: "Australia/Sydney"
  });
}
