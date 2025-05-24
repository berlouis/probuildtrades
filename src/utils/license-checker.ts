import { prisma } from "@/lib/prisma";
import { sendLicenseSuspensionNotice } from "./mailer";

export async function enforceLicenseSuspension(builder: any) {
  const now = new Date();

  // Notify builder by email
  if (builder.user && builder.user.email) {
    await sendLicenseSuspensionNotice({
      name: builder.name,
      email: builder.user.email,
      licenseExpiry: builder.licenseExpiry,
    });
  }

  // Update builder license status
  await prisma.builder.update({
    where: { id: builder.id },
    data: {
      licenseEnforcedAt: now,
      flagged: true,
      verified: false,
      licenseStatus: "expired",
    },
  });

  // Log enforcement action
  await prisma.enforcementLog.create({
    data: {
      builderId: builder.id,
      action: "Auto Suspension",
      reason: "License expired",
      createdAt: now,
    },
  });
}
