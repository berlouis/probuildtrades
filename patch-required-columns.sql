-- Add missing required columns with safe defaults

-- Builder
ALTER TABLE "Builder" ADD COLUMN IF NOT EXISTS "licenseState" TEXT DEFAULT 'NSW';

-- Metadata
ALTER TABLE "Metadata" ADD COLUMN IF NOT EXISTS "key" TEXT DEFAULT 'default_key';
ALTER TABLE "Metadata" ADD COLUMN IF NOT EXISTS "value" TEXT DEFAULT 'default_value';

-- Plan
ALTER TABLE "Plan" ADD COLUMN IF NOT EXISTS "durationDays" INTEGER DEFAULT 30;
ALTER TABLE "Plan" ADD COLUMN IF NOT EXISTS "price" FLOAT DEFAULT 0.0;

-- StateAPIConfig
ALTER TABLE "StateAPIConfig" ADD COLUMN IF NOT EXISTS "state" TEXT DEFAULT 'NSW';
ALTER TABLE "StateAPIConfig" ADD COLUMN IF NOT EXISTS "apiSecret" TEXT DEFAULT 'temp_secret';
