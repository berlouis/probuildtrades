#!/usr/bin/env bash
set -e

AUTH="pages/api/auth/[...nextauth].ts"
BUILDERS="pages/api/admin/builders/index.ts"

###############################################################################
# 1 ▪ Auth file – one clean export + default
###############################################################################
# Drop any existing authOptions lines to avoid duplicates
sed -i '/authOptions/d' "$AUTH"

# Insert fresh definition just before default NextAuth export
awk '
  /export default/ && !done {
    print "export const authOptions = {"
    print "  providers: [],  // TODO: add real NextAuth providers"
    print "};"
    print ""
    print "export default authOptions;"
    done=1
  }
  { print }
' "$AUTH" > tmp && mv tmp "$AUTH"

###############################################################################
# 2 ▪ Builders API – use default import
###############################################################################
sed -i 's|import { authOptions }|import authOptions|g' "$BUILDERS"

###############################################################################
# 3 ▪ Fresh Prisma client & diagnostics
###############################################################################
npx prisma generate
echo "✅ patch_16 complete"
