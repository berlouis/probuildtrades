-- Fix Builder: use licenseStatus if licenseState is incorrect
UPDATE "Builder"
SET
  "licenseStatus" = COALESCE("licenseStatus", 'active'),
  "licenseClass" = COALESCE("licenseClass", 'A'),
  "licenseExpiry" = COALESCE("licenseExpiry", now())
WHERE "licenseStatus" IS NULL OR "licenseClass" IS NULL OR "licenseExpiry" IS NULL;

-- Skip Metadata (key/value columns do not exist — remove from schema if unused)

-- Skip Plan: ensure actual columns exist before patching

-- Fix User: ensure updatedAt is present
UPDATE "User"
SET
  "updatedAt" = now()
WHERE "updatedAt" IS NULL;
