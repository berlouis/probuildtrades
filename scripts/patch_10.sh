#!/usr/bin/env bash
set -e

###############################################################################
# 1 ▪ Strip canceledAt filter (field doesn’t exist in Prisma model)
###############################################################################
sed -i '/canceledAt:/d' src/utils/subscription.ts

###############################################################################
# 2 ▪ Regenerate Prisma client (schema unchanged)
###############################################################################
npx prisma generate

echo "✅ patch_10 complete"
