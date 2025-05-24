#!/usr/bin/env bash
set -e

# state → licenseState
sed -i 's/\.state\b/.licenseState/g' pages/api/system/license-sync.ts

# enabled → isEnabled
sed -i 's/\.enabled\b/.isEnabled/g' pages/api/system/license-sync.ts

# apiUrl → endpoint  (matches Prisma model)
sed -i 's/\.apiUrl\b/.endpoint/g' pages/api/system/license-sync.ts

# apiToken → apiKey
sed -i 's/\.apiToken\b/.apiKey/g' pages/api/admin/state-api/*/secrets.ts
echo "✅ Patch 03 done"
