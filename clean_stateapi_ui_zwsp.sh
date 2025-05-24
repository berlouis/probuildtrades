sed -i '1s/^\xEF\xBB\xBF//' pages/admin/state-api/index.tsx
sed -i 's/[\u200B-\u200D\uFEFF]//g' pages/admin/state-api/index.tsx
