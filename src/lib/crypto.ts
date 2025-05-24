import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const KEY = crypto.createHash("sha256").update(process.env.SECRET_KEY!).digest().slice(0, 32);
const IV = Buffer.alloc(16, 0);

export function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
