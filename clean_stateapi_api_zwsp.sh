sed -i '1s/^\xEF\xBB\xBF//' pages/api/admin/state-api/index.ts
sed -i 's/[\u200B-\u200D\uFEFF]//g' pages/api/admin/state-api/index.ts
