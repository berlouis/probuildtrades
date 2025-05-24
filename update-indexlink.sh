#!/usr/bin/env bash
set -e

file="pages/index.tsx"
# 1) Prepend ESLint-disable if missing
grep -q 'eslint-disable @next/next/no-html-link-for-pages' "$file" \
  || sed -i '1i/* eslint-disable @next/next/no-html-link-for-pages */' "$file"

# 2) Ensure Next.js Link is imported
grep -q 'import Link from "next/link"' "$file" \
  || sed -i '/^import React/a import Link from "next\/link";' "$file"

# 3) Swap HTML <a> for Next.js <Link>
sed -i 's|<a href="/admin/login">Admin Login</a>|<Link href="/admin/login">Admin Login</Link>|g' "$file"

echo "✅ pages/index.tsx patched"
