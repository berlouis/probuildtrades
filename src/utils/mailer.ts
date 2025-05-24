export async function sendLicenseSuspensionNotice({
  name,
  email,
  licenseExpiry,
}: {
  name: string;
  email: string;
  licenseExpiry: Date;
}) {
  console.log(`📧 Sending license suspension notice to ${email} for ${name}. Expired on ${licenseExpiry}`);
  // TODO: Replace with actual email service logic
}
