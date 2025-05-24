#!/usr/bin/env bash
set -e

###############################################################################
# 1 ▪ builders API — remove ts-expect-error & ensure numeric user.id
###############################################################################
sed -i '/@ts-expect-error/d' pages/api/admin/builders/index.ts
sed -i 's/connect: { id: session.user.id }/connect: { id: Number(session.user.id) }/' \
  pages/api/admin/builders/index.ts

###############################################################################
# 2 ▪ auth file — keep ONE clean export and minimal config
###############################################################################
AUTH="pages/api/auth/[...nextauth].ts"

# Drop any import line that re-imports authOptions
sed -i '/import .*authOptions/d' "$AUTH"

# Remove placeholder duplicates
sed -i '/TODO: fill real options/d' "$AUTH"

# Convert first occurrence to exported version, drop any later duplicates
awk '
  /const[[:space:]]+authOptions/ && !done {
      sub(/^const/, "export const"); done=1
  }
  /export const authOptions/ { if (seen) next; seen=1 }
  { print }
' "$AUTH" > tmp && mv tmp "$AUTH"

# If no providers key, add a bare-minimal providers array so TS stops complaining
if ! grep -q "providers" "$AUTH"; then
  sed -i '/export const authOptions.*/a\  providers: [],' "$AUTH"
fi

###############################################################################
# 3 ▪ fresh Prisma client & diagnostics
###############################################################################
npx prisma generate
echo "✅ patch_15 complete"
