#!/usr/bin/env bash
set -e

NEXTAUTH_FILE="pages/api/auth/[...nextauth].ts"

# If authOptions is missing or not exported, create / fix it
if ! grep -q "export .*authOptions" "$NEXTAUTH_FILE"; then
  # 1) Detect the authOptions definition (const / let / var)
  if grep -q "const[[:space:]]\+authOptions" "$NEXTAUTH_FILE"; then
    # Turn `const authOptions` into `export const authOptions`
    sed -i 's/^const[[:space:]]\+authOptions/export const authOptions/' "$NEXTAUTH_FILE"
  else
    # authOptions not present – insert a minimal placeholder before the default export
    awk '
      /export default/ && !inserted {
        print "export const authOptions = {};  // TODO: fill real options"; inserted=1
      }
      { print }
    ' "$NEXTAUTH_FILE" > tmp && mv tmp "$NEXTAUTH_FILE"
  fi
fi

# 2) Quick sanity: ensure the builders API imports correctly
sed -i 's|import { authOptions }.*|import { authOptions } from "../../auth/[...nextauth]";|' \
  pages/api/admin/builders/index.ts

npx prisma generate     # no schema change – keeps client fresh
echo "✅ patch_13 complete"
