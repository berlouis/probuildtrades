import { prisma } from "@/lib/prisma";
import { enforceLicenseSuspension } from "./license-checker";

export async function enforceAllLicenses() {
  const builders = await prisma.builder.findMany({
    where: {
      licenseExpiry: {
        lt: new Date(),
      },
      licenseStatus: {
        not: "expired",
      },
    },
    include: {

    },
  });

  for (const builder of builders) {
    await enforceLicenseSuspension(builder);
  }
}
