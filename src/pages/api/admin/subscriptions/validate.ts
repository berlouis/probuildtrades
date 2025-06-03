import { NextApiRequest, NextApiResponse } from "next";
import { enforceAllLicenses } from "@/utils/enforce-all";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await enforceAllLicenses();
  res.status(200).json({ ok: true });
}
