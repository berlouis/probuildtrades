#!/usr/bin/env bash
set -e

grep -rl --exclude-dir=node_modules '\blicenseNumber\b' pages src \
  | xargs sed -i 's/licenseNumber/licenseId/g'

echo "✅ Patch 02 done"
