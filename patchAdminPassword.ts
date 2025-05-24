import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("Seycomale1956", 10);
  await prisma.user.update({
    where: { email: "admin@probuildtrades.com" },
    data: { password: hashedPassword },
  });

  console.log("✅ Admin password updated.");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  });
