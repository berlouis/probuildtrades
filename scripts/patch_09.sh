#!/usr/bin/env bash
set -e

###############################################################################
# 1 ▪ Fix malformed line in pages/api/system/license-sync.ts
#    → ensure proper syntax:  const config = await prisma.stateAPIConfig.findFirst({ where: { stateCode } });
###############################################################################
perl -0777 -pe '
  s|const\s+config\s*=.+?;|const config = await prisma.stateAPIConfig.findFirst({ where: { stateCode } });|s
' -i pages/api/system/license-sync.ts

###############################################################################
# 2 ▪ Remove invalid cancelledAt filter from src/utils/subscription.ts
###############################################################################
sed -i '/cancelledAt/d' src/utils/subscription.ts

###############################################################################
# 3 ▪ Regenerate Prisma client (schema unchanged)
###############################################################################
npx prisma generate

echo "✅ patch_09 complete"
