import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Utility: log enforcement action
async function logEnforcement({
  userId,
  builderId,
  companyId,
  tradeId,
  action,
  reason,
  status,
  performedBy = "system",
  details = "",
}: {
  userId?: number;
  builderId?: number;
  companyId?: number;
  tradeId?: number;
  action: string;
  reason?: string;
  status: string;
  performedBy?: string;
  details?: string;
}) {
  await prisma.enforcementLog.create({
    data: {
      userId,
      builderId,
      companyId,
      tradeId,
      action,
      reason,
      status,
      performedBy,
      details,
    },
  });
}

// Main enforcement runner

runEnforcement()
  .catch((err) => {
    console.error("ENFORCEMENT ERROR:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("=== ENFORCEMENT JOB END ===");
  });


// Fetch builders with expired, suspended, revoked, or fraudulent licenses
async function getBuildersToEnforce() {
  const now = new Date();
  return await prisma.builder.findMany({
    where: {
      AND: [
        { licenseExpiry: { lt: now } }, // License expired,
        { isSuspended: false },              // Not already suspended
      ],
    },
  });
}

// Fetch companies with expired licenses and not suspended
async function getCompaniesToEnforce() {
  const now = new Date();
  return await prisma.company.findMany({
    where: {
      AND: [
        { licenseExpiry: { lt: now } },
        { isSuspended: false },
      ],
    },
  });
}
async function enforceCompanies() {
  try {
    const expiredCompanies = await getCompaniesToEnforce();
    console.log(`Found ${expiredCompanies.length} companies with expired licenses.`);

    if (expiredCompanies.length > 0) {
      await suspendExpiredCompanies(expiredCompanies);
    } else {
      console.log("No companies require suspension.");
    }
  } catch (error) {
    console.error("Error during company enforcement run:", error);
  }
}

// Fetch trades with expired licenses and not suspended
async function getTradesToEnforce() {
  const now = new Date();
  return await prisma.trade.findMany({
    where: {
      AND: [
        { licenseExpiry: { lt: now } },
        { isSuspended: false },
      ],
    },
  });
}

async function enforceTrades() {
  try {
    const expiredTrades = await getTradesToEnforce();
    console.log(`Found ${expiredTrades.length} trades with expired licenses.`);

    if (expiredTrades.length > 0) {
      await suspendExpiredTrades(expiredTrades);
    } else {
      console.log("No trades require suspension.");
    }
  } catch (error) {
    console.error("Error during trade enforcement run:", error);
  }
}

import { sendExpiryWarningEmail, sendSuspensionAlertEmail } from "@/lib/licenseAlerts";


async function warnUpcomingExpiries() {
  const now = new Date();
  const threshold = new Date(now);
  threshold.setDate(now.getDate() + 30);

  // Fetch builders with licenseExpiryDate between now and threshold, not suspended
  const expiringBuilders = await prisma.builder.findMany({
    where: {
   licenseExpiry: {
   gte: now,
   lte: threshold,
},
      isSuspended: false,
    },
  });


  for (const builder of expiringBuilders) {
    try {
      await sendExpiryWarningEmail(builder.email, builder.name || "Builder", builder.licenseExpiry);
      await logEnforcement({
        builderId: builder.id,
        userId: builder.userId,
        action: "expiry_warning_sent",
        reason: `License expiring on ${builder.licenseExpiry.toISOString()}`,
        status: "success",
        performedBy: "system",
      });
      console.log(`Expiry warning sent to builder ${builder.id}`);
    } catch (error) {
      await logEnforcement({
        builderId: builder.id,
        userId: builder.userId,
        action: "expiry_warning_sent",
        reason: `License expiring on ${builder.licenseExpiry.toISOString()}`,
        status: "failure",
        performedBy: "system",
        details: error instanceof Error ? error.message : String(error),
      });
      console.error(`Failed to send expiry warning to builder ${builder.id}:`, error);
    }
  }
}

async function runEnforcement() {
  console.log("=== ENFORCEMENT JOB START ===");
  try {
    await warnUpcomingExpiries();

    const expiredBuilders = await getBuildersToEnforce();
    console.log(`Found ${expiredBuilders.length} builders with expired licenses.`);
    if (expiredBuilders.length > 0) {
      await suspendExpiredBuilders(expiredBuilders);
    } else {
      console.log("No builders require suspension.");
    }

    const expiredCompanies = await getCompaniesToEnforce();
    console.log(`Found ${expiredCompanies.length} companies with expired licenses.`);
    if (expiredCompanies.length > 0) {
      await suspendExpiredCompanies(expiredCompanies);
    } else {
      console.log("No companies require suspension.");
    }

    const expiredTrades = await getTradesToEnforce();
    console.log(`Found ${expiredTrades.length} trades with expired licenses.`);
    if (expiredTrades.length > 0) {
      await suspendExpiredTrades(expiredTrades);
    } else {
      console.log("No trades require suspension.");
    }
  } catch (error) {
    console.error("Error during enforcement run:", error);
  }
}

async function suspendExpiredBuilders(builders: any[]) {
  for (const builder of builders) {
    try {
      await prisma.builder.update({
        where: { id: builder.id },
        data: { isSuspended: true, suspensionReason: "License expired" },
      });

      // Send suspension alert email
      await sendSuspensionAlertEmail(builder.email, builder.name || "Builder", "License expired");

      await logEnforcement({
        userId: builder.userId,
        builderId: builder.id,
        action: "auto_suspend",
        reason: "License expired",
        status: "success",
        performedBy: "system",
      });

      console.log(`Builder ${builder.id} suspended and alerted due to expired license.`);

    } catch (error) {
      await logEnforcement({
        userId: builder.userId,
        builderId: builder.id,
        action: "auto_suspend",
        reason: "License expired",
        status: "failure",
        performedBy: "system",
        details: error instanceof Error ? error.message : String(error),
      });
      console.error(`Failed to suspend builder ${builder.id}:`, error);
    }
  }
}

async function suspendExpiredCompanies(companies: any[]) {
  for (const company of companies) {
    try {
      await prisma.company.update({
        where: { id: company.id },
        data: { isSuspended: true, suspensionReason: "License expired" },
      });

      // Send suspension alert email
      await sendSuspensionAlertEmail(company.email, company.name || "Company", "License expired");

      await logEnforcement({
        userId: company.userId,
        companyId: company.id,
        action: "auto_suspend",
        reason: "License expired",
        status: "success",
        performedBy: "system",
      });

      console.log(`Company ${company.id} suspended and alerted due to expired license.`);

    } catch (error) {
      await logEnforcement({
        userId: company.userId,
        companyId: company.id,
        action: "auto_suspend",
        reason: "License expired",
        status: "failure",
        performedBy: "system",
        details: error instanceof Error ? error.message : String(error),
      });
      console.error(`Failed to suspend company ${company.id}:`, error);
    }
  }
}

async function suspendExpiredTrades(trades: any[]) {
  for (const trade of trades) {
    try {
      await prisma.trade.update({
        where: { id: trade.id },
        data: { isSuspended: true, suspensionReason: "License expired" },
      });

      // Send suspension alert email
      await sendSuspensionAlertEmail(trade.email, trade.name || "Trade", "License expired");

      await logEnforcement({
        userId: trade.userId,
        tradeId: trade.id,
        action: "auto_suspend",
        reason: "License expired",
        status: "success",
        performedBy: "system",
      });

      console.log(`Trade ${trade.id} suspended and alerted due to expired license.`);

    } catch (error) {
      await logEnforcement({
        userId: trade.userId,
        tradeId: trade.id,
        action: "auto_suspend",
        reason: "License expired",
        status: "failure",
        performedBy: "system",
        details: error instanceof Error ? error.message : String(error),
      });
      console.error(`Failed to suspend trade ${trade.id}:`, error);
    }
  }
}
