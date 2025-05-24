import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Invalid slug" });
  }

  const page = await prisma.cMSPage.findUnique({
    where: { slug },
  });

  if (!page || !page.isDraft) {
    return res.status(404).json({ message: "Page not found or not a draft" });
  }
  res.setPreviewData({});
  res.writeHead(307, { Location: `/${slug}` });
  res.end();
}
