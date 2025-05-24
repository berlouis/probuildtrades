# Path to your Footer.tsx
\$footer = "src/components/layout/Footer.tsx"

# Read file
\$content = Get-Content \$footer

# 1) Remove the dir={isRTL ? 'rtl' : 'ltr'} attribute
\$content = \$content -replace "dir=\{isRTL \? 'rtl' : 'ltr'\}", ""

# 2) Remove the \${isRTL ? 'rounded-r-md' : 'rounded-l-md'} interpolation
\$content = \$content -replace "\$\{isRTL \? 'rounded-r-md' : 'rounded-l-md'\}", ""

# 3) Convert backtick template literal className to normal string
\$content = \$content -replace "className=\`([^`]*)\`", 'className=\"\$1\"'

# Write updated content back
Set-Content -Path \$footer -Value \$content -Encoding UTF8

# Rebuild
npm run build
