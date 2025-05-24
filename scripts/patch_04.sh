#!/usr/bin/env bash
set -e

###############################################################################
# 1. Fix misplaced field names in API routes
###############################################################################

# A) status  -> licenseStatus (reinstate / suspend)
sed -i 's/data: *{ *status:/data: { licenseStatus:/g' \
  pages/api/admin/builders/[id]/reinstate.ts \
  pages/api/admin/builders/[id]/suspend.ts

# B) state   -> licenseState  (builder create + license-sync logic)
sed -i 's/\bstate\b/licenseState/g' pages/api/admin/builders/index.ts
sed -i 's/\bstate\b/licenseState/g' pages/api/system/license-sync.ts

# C) StateAPIConfig query should use stateCode
sed -i 's/where: *{ *licenseState:/where: { stateCode:/g' \
  pages/api/system/license-sync.ts

# D) builderId filters -> id
sed -i 's/builderId/id/g' pages/api/admin/subscriptions/cancel.ts \
                         src/utils/subscription.ts

###############################################################################
# 2. Extend Builder model with missing fields
###############################################################################
add_fields() {
cat <<'F' >> prisma/schema.prisma
  stripeCustomerId  String?
  flagged           Boolean   @default(false)
  verified          Boolean   @default(false)
  licenseEnforcedAt DateTime?
F
}

# Insert just before the closing brace of model Builder
awk '
  /model[[:space:]]+Builder[[:space:]]+{/ {print; inB=1; next}
  inB && /^}/            {add_fields(); inB=0}
  {print}
  function add_fields(){print "  stripeCustomerId  String?\n  flagged           Boolean   @default(false)\n  verified          Boolean   @default(false)\n  licenseEnforcedAt DateTime?"}
' prisma/schema.prisma > prisma/schema.tmp && mv prisma/schema.tmp prisma/schema.prisma


###############################################################################
# 3. Format & push schema, regen client
###############################################################################
npx prisma format
npx prisma db push
npx prisma generate

echo "✅ patch_04 complete"
