# Backup schema.prisma
Copy-Item prisma/schema.prisma prisma/schema.prisma.bak

# Read schema.prisma content
$content = Get-Content prisma/schema.prisma -Raw

# Replace priceMonthly and priceYearly to nullable
$content = $content -replace 'priceMonthly\s+Float', 'priceMonthly Float?'
$content = $content -replace 'priceYearly\s+Float', 'priceYearly Float?'

# Write changes back
Set-Content -Path prisma/schema.prisma -Value $content

Write-Output "Schema patched: priceMonthly and priceYearly are now nullable."
