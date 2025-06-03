import { sendAlertEmail } from "./sendAlertEmail";

export async function sendExpiryWarningEmail(to: string, name: string, expiryDate: Date) {
  const subject = `Your ProBuildTrades License is Expiring Soon`;
  const html = `
    <p>Dear ${name},</p>
    <p>Your license is set to expire on <strong>${expiryDate.toDateString()}</strong>.</p>
    <p>Please renew your license promptly to avoid suspension of your account.</p>
    <p>Thank you,<br/>ProBuildTrades Team</p>
  `;
  await sendAlertEmail(to, subject, html);
}

export async function sendSuspensionAlertEmail(to: string, name: string, reason: string) {
  const subject = `Your ProBuildTrades Account Has Been Suspended`;
  const html = `
    <p>Dear ${name},</p>
    <p>Your account has been suspended due to the following reason:</p>
    <p><em>${reason}</em></p>
    <p>Please contact support for more information.</p>
    <p>Thank you,<br/>ProBuildTrades Team</p>
  `;
  await sendAlertEmail(to, subject, html);
}
