// src/lib/checkDuplicateLicense.ts

import { PrismaClient } from "@prisma/client";

// Either import the singleton from your app structure, or instantiate here:
export const prisma = new PrismaClient();

/**
 * Check for duplicate entries in a given Prisma model (builder, company, trade).
 * @param modelName - "builder" | "company" | "trade"
 * @param where - Prisma where clause object, must contain OR: [{ ... }]
 * @returns Array of duplicates (max 5)
 */
export async function checkDuplicateLicense(
  modelName: "builder" | "company" | "trade",
  where: Record<string, any>
) {
  // Defensive: make sure OR filter exists and has at least one condition
  if (!where?.OR || !Array.isArray(where.OR) || where.OR.length === 0) return [];

  // Dynamically select the model and run findMany with a limit
  const duplicates = await (prisma as any)[modelName].findMany({
    where,
    take: 5,
  });

  return duplicates;
}

// Example usage (elsewhere in your project):
// import { checkDuplicateLicense } from "@/lib/checkDuplicateLicense";
// const dups = await checkDuplicateLicense("builder", { OR: [{ licenseId }, { email }] });
// const dups = await checkDuplicateLicense("company", { OR: [{ licenseId }, { phone }] });
// const dups = await checkDuplicateLicense("trade", { OR: [{ licenseId }, { address }] });

// You may want to export default if your app expects it:
export default checkDuplicateLicense;
