# Removes zero-width spaces and other hidden chars
sed -i 's/[\u200B-\u200D\uFEFF]//g' pages/admin/builders/index.tsx
