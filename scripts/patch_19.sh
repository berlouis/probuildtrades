#!/usr/bin/env bash
set -e

SCHEMA="prisma/schema.prisma"

###############################################################################
# 1 ▪ Fix native type on amount
###############################################################################
sed -i 's/@db.Numeric(12, 2)/@db.Decimal(12, 2)/' "$SCHEMA"

###############################################################################
# 2 ▪ Add payments[] relation on Builder (only if missing)
###############################################################################
if ! grep -qE 'payments[[:space:]]+Payment\[\]' "$SCHEMA"; then
  awk '
    # insert just before closing brace of Builder model
    /model[[:space:]]+Builder[[:space:]]+{/ { inB=1 }
    inB && /^}/ {
      print "  payments      Payment[]"
      inB=0
    }
    { print }
  ' "$SCHEMA" > tmp && mv tmp "$SCHEMA"
fi

###############################################################################
# 3 ▪ Format, push, regenerate client
###############################################################################
npx prisma format
npx prisma db push
npx prisma generate

echo "✅ patch_19 complete"
