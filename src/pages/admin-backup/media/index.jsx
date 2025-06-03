import Image from "next/image";

export default function AdminMediaBackupPage() {
  const mediaUrl = "/uploads/sample.jpg"; // replace with dynamic URL in your app
  return (
    <div>
      <h1>Media Backup</h1>
      <Image
        src={mediaUrl}
        alt="Media"
        width={600}
        height={400}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
