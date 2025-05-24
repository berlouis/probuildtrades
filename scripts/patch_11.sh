#!/usr/bin/env bash
set -e

# Strip the endDate filter in the active-subscription guard
sed -i '
  /endDate:/,/},/d
' src/utils/subscription.ts

npx prisma generate   # client refresh (schema unchanged)
echo "✅ patch_11 complete"
