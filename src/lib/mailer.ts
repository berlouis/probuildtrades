export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  console.log("📧 Stub email sent to:", to);
  console.log("📨 Subject:", subject);
  console.log("📝 Body:", body);
  // TODO: Replace with actual email service integration (Nodemailer, etc.)
}
