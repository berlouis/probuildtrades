import { prisma } from "@/lib/prisma";

/**
 * Generic duplicate license checker for Builder, Company, Trade, etc.
 * @param entity - "builder" | "company" | "trade"
 * @param fields - Object containing keys to check (name, email, licenseId, phone, address, etc.)
 * @param excludeId - Optionally exclude a given record (e.g., when updating)
 */
export async function checkForDuplicateEntity(entity: "builder" | "company" | "trade", fields: any, excludeId?: number) {
  const where: any = [];
  if (fields.licenseId) where.push({ licenseId: fields.licenseId });
  if (fields.email) where.push({ email: fields.email });
  if (fields.phone) where.push({ phone: fields.phone });
  if (fields.name) where.push({ name: fields.name });
  if (fields.address) where.push({ address: fields.address });

  if (where.length === 0) return [];

return await (prisma as any)[entity].findMany({
    where: {
      OR: where,
      ...(excludeId && { id: { not: excludeId } }),
    },
  });
}
