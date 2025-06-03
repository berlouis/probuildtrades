export async function checkForDuplicateBuilder(builderData: {
  id?: number,
  name: string,
  email: string,
  licenseId?: string,
  phone?: string,
  address?: string
}) {
  const { id, name, email, licenseId, phone, address } = builderData;

  const orFilters: Array<{ name?: string; email?: string; licenseId?: string; phone?: string; address?: string }> = [];
  if (name) orFilters.push({ name });
  if (email) orFilters.push({ email });
  if (licenseId) orFilters.push({ licenseId });
  if (phone) orFilters.push({ phone });
  if (address) orFilters.push({ address });

const duplicates = await prisma!.builder.findMany({
    where: {
      OR: orFilters,
      NOT: id ? { id } : undefined
    }
  });
  return duplicates;
}
