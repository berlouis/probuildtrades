# Step 1: Push schema changes with nullable fields
Write-Output "Pushing Prisma schema changes..."
npx prisma db push

# Step 2: Update NULL values in Plan table with safe defaults
Write-Output "Updating NULL values in Plan table..."
$connectionString = (Get-Content .env | Select-String '^DB_URL=').Line -replace '^DB_URL=', ''
$psqlCommand = @"
UPDATE "Plan" SET "priceMonthly" = 0 WHERE "priceMonthly" IS NULL;
UPDATE "Plan" SET "priceYearly" = 0 WHERE "priceYearly" IS NULL;
"@

# Execute SQL commands using psql
$env:PGPASSWORD = "" # If your password is in DB_URL, you can extract or set here if needed
Write-Output "Executing SQL update commands..."
psql $connectionString -c "$psqlCommand"

# Step 3: Revert schema to required fields for priceMonthly and priceYearly
Write-Output "Reverting schema.prisma to make priceMonthly and priceYearly required..."
$content = Get-Content prisma/schema.prisma -Raw
$content = $content -replace 'priceMonthly\s+Float\?', 'priceMonthly Float'
$content = $content -replace 'priceYearly\s+Float\?', 'priceYearly Float'
Set-Content -Path prisma/schema.prisma -Value $content

# Step 4: Push final schema changes
Write-Output "Pushing final schema changes..."
npx prisma db push

Write-Output "Database updated and schema finalized."
