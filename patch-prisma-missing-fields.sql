-- Patch missing fields in Builder
UPDATE "Builder"
SET
  "licenseState" = COALESCE("licenseState", 'NSW'),
  "licenseClass" = COALESCE("licenseClass", 'A'),
  "licenseExpiry" = COALESCE("licenseExpiry", now())
WHERE "licenseState" IS NULL OR "licenseClass" IS NULL OR "licenseExpiry" IS NULL;

-- Patch missing fields in Metadata
UPDATE "Metadata"
SET
  "key" = COALESCE("key", 'default_key_' || id),
  "value" = COALESCE("value", 'default_value_' || id)
WHERE "key" IS NULL OR "value" IS NULL;

-- Patch missing fields in Plan
UPDATE "Plan"
SET
  "durationDays" = COALESCE("durationDays", 30),
  "price" = COALESCE("price", 0.0)
WHERE "durationDays" IS NULL OR "price" IS NULL;

-- Patch missing fields in User
UPDATE "User"
SET
  "updatedAt" = now()
WHERE "updatedAt" IS NULL;

-- Patch missing fields in StateAPIConfig
UPDATE "StateAPIConfig"
SET
  "state" = COALESCE("state", 'NSW'),
  "apiSecret" = COALESCE("apiSecret", 'temporary_secret')
WHERE "state" IS NULL OR "apiSecret" IS NULL;
