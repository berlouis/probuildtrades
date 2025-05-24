#!/usr/bin/env bash
set -e

###############################################################################
# 1 ▪ Fix authOptions import path (alias → relative)
###############################################################################
sed -i 's|@/pages/api/auth/\[...nextauth\]|../../auth/[...nextauth]|' \
  pages/api/admin/builders/index.ts

###############################################################################
# 2 ▪ license-sync – replace licenseState filter with stateCode
###############################################################################
sed -i 's/licenseState:/stateCode:/g' pages/api/system/license-sync.ts

###############################################################################
# 3 ▪ cancelledAt → canceledAt (US spelling matches Prisma model)
###############################################################################
sed -i 's/cancelledAt/canceledAt/g' \
  pages/api/admin/subscriptions/cancel.ts \
  src/utils/subscription.ts

###############################################################################
# 4 ▪ Regenerate Prisma client (no schema change)
###############################################################################
npx prisma generate

echo "✅ patch_06 complete"
