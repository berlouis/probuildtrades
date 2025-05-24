import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendCancellationNotice(email: string) {
  const from = process.env.FROM_EMAIL!;

  const info = await transporter.sendMail({
    from,
    to: email,
    subject: 'Your ProBuildTrades Subscription Has Been Cancelled',
    html: `
      <p>Hello,</p>
      <p>Your subscription has been successfully cancelled. You will no longer be charged and your access has been revoked.</p>
      <p>If this was a mistake or you wish to rejoin, please contact us.</p>
      <br />
      <p>– ProBuildTrades Team</p>
    `,
  });

  console.log('📧 Cancellation email sent:', info.messageId);
}

interface Builder {
  name: string;
  email: string;
  licenseExpiry: Date | null;
}

export async function sendLicenseExpiryWarning(builder: Builder, daysLeft: number) {
  if (!builder.email) return;

  const formattedDate = builder.licenseExpiry?.toDateString() ?? "N/A";
  const subject = `⚠️ Your license expires in ${daysLeft} day(s)`;
  const html = `
    <p>Hello ${builder.name},</p>
    <p>Your trade license is set to expire on <strong>${formattedDate}</strong>.</p>
    <p>Please renew it before then to avoid suspension from the ProBuildTrades platform.</p>
    <p>Regards,<br/>ProBuildTrades Compliance Team</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: builder.email,
    subject,
    html,
  });
}

export async function sendLicenseSuspensionNotice(builder: Builder) {
  if (!builder.email) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: builder.email,
    subject: `❌ Your account has been suspended`,
    html: `
      <p>Hello ${builder.name},</p>
      <p>Your license was marked as invalid, expired, or suspended.</p>
      <p>Your account is now <strong>temporarily deactivated</strong> on ProBuildTrades.</p>
      <p>Please contact support once the license is renewed.</p>
    `,
  });
}

export async function sendLicenseReinstatedNotice(builder: Builder) {
  if (!builder.email) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: builder.email,
    subject: `✅ Your account has been reinstated`,
    html: `
      <p>Hello ${builder.name},</p>
      <p>Your license has been verified, and your account is now <strong>active</strong> again on ProBuildTrades.</p>
      <p>Thank you for staying compliant.</p>
    `,
  });
}
