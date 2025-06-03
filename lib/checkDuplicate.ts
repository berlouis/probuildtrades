import { prisma } from "@/lib/prisma";
interface CheckDuplicatesArgs {
  entity: string;
  excludeId?: number;            // or `string | number` if your IDs can be strings
  fields: { [fieldName: string]: any };
}

// Checks for duplicates across multiple fields and entities
export async function checkDuplicates({
  entity,
  excludeId,
  fields,
}: CheckDuplicatesArgs) {
  const conditions = [];
  for (const key of Object.keys(fields)) {
    if (fields[key]) {
      conditions.push({ [key]: fields[key] });
    }
  }
  if (conditions.length === 0) return [];
  // Check all entities
  const builderDup = await prisma.builder.findMany({
    where: {
      AND: [
        ...conditions,
        excludeId ? { id: { not: excludeId } } : {},
      ],
    },
  });
  const tradeDup = await prisma.trade.findMany({
    where: {
      AND: [
        ...conditions,
        excludeId ? { id: { not: excludeId } } : {},
      ],
    },
  });
  const companyDup = await prisma.company.findMany({
    where: {
      AND: [
        ...conditions,
        excludeId ? { id: { not: excludeId } } : {},
      ],
    },
  });

  return [
    ...builderDup.map(d => ({ ...d, entity: "Builder" })),
    ...tradeDup.map(d => ({ ...d, entity: "Trade" })),
    ...companyDup.map(d => ({ ...d, entity: "Company" })),
  ];
}
