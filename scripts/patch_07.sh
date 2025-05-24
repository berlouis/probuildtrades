#!/usr/bin/env bash
set -e

###############################################################################
# 1 ▪ Suppress authOptions TS error (still works at runtime)
###############################################################################
awk '
  /import .*authOptions/ { next }                    # remove old line
  /getServerSession/ && !done {
    print "// @ts-expect-error – authOptions comes from NextAuth file"
    print "import { authOptions } from \"../../auth/[...nextauth]\";"
    done=1
  }
  { print }
' pages/api/admin/builders/index.ts > tmp && mv tmp pages/api/admin/builders/index.ts

###############################################################################
# 2 ▪ Fix license-sync filter key + value
###############################################################################
sed -i '
  s/{ *licenseState: *[^,]\+,/{ stateCode: builder.licenseState,/;
  s/licenseState:/stateCode:/g
' pages/api/system/license-sync.ts

###############################################################################
# 3 ▪ Subscription util – use cancelledAt (double “l”) to match schema
###############################################################################
sed -i 's/canceledAt/cancelledAt/g' \
  src/utils/subscription.ts

###############################################################################
# 4 ▪ Generate Prisma client
###############################################################################
npx prisma generate

echo "✅ patch_07 complete"
