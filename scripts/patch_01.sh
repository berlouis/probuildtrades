#!/usr/bin/env bash
set -e

### A ▪ cmsPage → cMSPage
sed -i 's/prisma\.cmsPage/prisma.cMSPage/g' \
  pages/[slug].tsx \
  pages/api/admin/cms/pages/[id].ts \
  pages/api/preview.ts

### B ▪ status → licenseStatus
sed -i 's/\.update({[^}]*\bstatus\b/.update({ licenseStatus/' \
  pages/api/admin/builders/[id]/*.ts

echo "✅ Patch 01 done"
