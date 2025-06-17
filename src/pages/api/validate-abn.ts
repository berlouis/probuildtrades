import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { abn } = req.body;
  // For demo: 12345678901 is "valid", anything else is "invalid"
  if (abn === "12345678901") {
    res.status(200).json({ valid: true });
  } else {
    res.status(200).json({ valid: false });
  }
}
