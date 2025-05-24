#!/usr/bin/env bash
set -e

# In builders API: switch to default import, correct relative path
sed -i 's|import.*authOptions.*|import authOptions from "../../auth/authOptions";|' \
  pages/api/admin/builders/index.ts

npx prisma generate   # no schema change – keeps client fresh
echo "✅ patch_18 complete"
