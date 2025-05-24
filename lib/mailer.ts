import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type EmailOptions = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
}
