import nodemailer from "nodemailer";

// Use your real SMTP config here
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

export async function sendAlertEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"ProBuildTrades" <no-reply@probuildtrades.com>`,
    to,
    subject,
    html
  });
}
