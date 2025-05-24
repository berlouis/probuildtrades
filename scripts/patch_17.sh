#!/usr/bin/env bash
set -e

###############################################################################
# 1 ▪ Rewrite pages/api/auth/[...nextauth].ts
###############################################################################
cat <<'AUTH' > pages/api/auth/[...nextauth].ts
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { type AuthOptions } from "next-auth";

/**
 * Your real providers & callbacks go here.
 * TS is happy as long as the object satisfies AuthOptions.
 */
export const authOptions: AuthOptions = {
  providers: [],          // TODO: add real providers
  pages: { signIn: "/admin/login" },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
AUTH

###############################################################################
# 2 ▪ Builders API – switch back to named import
###############################################################################
sed -i 's|import authOptions|import { authOptions }|' \
  pages/api/admin/builders/index.ts

###############################################################################
# 3 ▪ Fresh Prisma client & diagnostics
###############################################################################
npx prisma generate
echo "✅ patch_17 complete"
