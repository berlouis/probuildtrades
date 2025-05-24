#!/usr/bin/env bash
set -e

# If authOptions already exported, do nothing.
if ! grep -q "export .*authOptions" pages/api/auth/\[...nextauth\].ts; then
  # Insert `export` just before the default NextAuth handler
  awk '
    /const +authOptions/  { gsub(/^const/, "export const"); exported=1 }
    { print }
    END { if(!exported) print "// TODO: ensure authOptions is exported" }
  ' pages/api/auth/[...nextauth].ts > tmp && mv tmp pages/api/auth/[...nextauth].ts
fi

npx prisma generate   # no schema change – keeps client fresh
echo "✅ patch_12 complete"
