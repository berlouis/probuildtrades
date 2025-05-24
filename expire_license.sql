UPDATE "Builder"
SET "licenseExpiry" = '2022-01-01'
WHERE id = 1
RETURNING id, name, "licenseExpiry";
