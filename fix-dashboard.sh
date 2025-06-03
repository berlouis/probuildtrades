#!/usr/bin/env bash
set -euo pipefail

FILE="pages/dashboard/index.tsx"
BACKUP="$FILE.bak.$(date +%Y%m%d%H%M%S)"
cp "$FILE" "$BACKUP"

echo "Backup created at $BACKUP"

# 1. Extract the Stripe useEffect and Change-Plan block
stripe="$(awk '/setup-intent/ {start=NR-1} start&&/}\, \[subscription\]\);/ {print NR; exit}' "$FILE")"
plan_start="$(grep -n -m1 "// State for Change Plan" "$FILE" | cut -d: -f1)"
plan_end="$(awk -v s="$plan_start" 'NR>=s && /}, \[\]\);/ {print NR; exit}' "$FILE")"

# bail if markers are missing
if [[ -z "$stripe" || -z "$plan_start" || -z "$plan_end" ]]; then
  echo "!! Could not locate Stripe or Change-Plan markers. No changes made."
  exit 1
fi

# shellcheck disable=SC2002
stripe_block=$(sed -n "${stripe},$((stripe+9))p" "$FILE")
plan_block=$(sed -n "${plan_start},${plan_end}p"   "$FILE")
# 2. Remove those blocks from the file
tmp="$(mktemp)"
awk -v s1="$stripe" -v e1="$((stripe+9))" -v s2="$plan_start" -v e2="$plan_end" '
NR>=s1 && NR<=e1 {next}
NR>=s2 && NR<=e2 {next}
{print}
' "$FILE" > "$tmp"

# 3. Build the new file:
#    hooks (original order) + plan_block + stripe_block + rest of file
awk -v plan="$plan_block" -v stripe="$stripe_block" '
/^import/ {print; next}
# first hook block ends at the first blank line after last existing useEffect
/};$/ && hook==0 {hook=1; print; print plan; print stripe; next}
{print}
' "$tmp" > "${tmp}.final"

# 4. Remove duplicate changeSaving / changeError still further down
sed -i '/const \[changeSaving.*\]/1d' "${tmp}.final"
sed -i '/const \[changeError.*\]/1d'  "${tmp}.final"

# 5. Remove stray single <section style={{ marginTop: 24 }}>
sed -i '/^[[:space:]]*<section style={{ marginTop: 24 }}/d' "${tmp}.final"
mv "${tmp}.final" "$FILE"
rm "$tmp"
echo "Dashboard hooks reordered successfully."
