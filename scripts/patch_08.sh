#!/usr/bin/env bash
set -e

###############################################################################
# 1 ▪ license-sync – use stateCode instead of licenseState
###############################################################################
sed -i 's/findFirst({[^}]*{ *licenseState[^}]*}/findFirst({ where: { stateCode } })/' \
  pages/api/system/license-sync.ts

###############################################################################
# 2 ▪ subscription util + API – use canceledAt (US spelling)
###############################################################################
sed -i 's/cancelledAt/canceledAt/g' \
  src/utils/subscription.ts \
  pages/api/admin/subscriptions/cancel.ts
###############################################################################
# 3 ▪ regenerate Prisma client (schema unchanged)
###############################################################################
npx prisma generate

echo "✅ patch_08 complete"
