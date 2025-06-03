import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminBackupBuilders({ builders }) {
  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-4">Builder List</h1>
      <pre>{JSON.stringify(builders, null, 2)}</pre>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const buildersRaw = await prisma.builder.findMany();

  const builders = buildersRaw.map(b => ({
    ...b,
    createdAt: b.createdAt?.toISOString() || null,
    updatedAt: b.updatedAt?.toISOString() || null,
    licenseExpiry: b.licenseExpiry?.toISOString() || null,
    licenseEnforcedAt: b.licenseEnforcedAt?.toISOString() || null,
  }));

  return { props: { builders } };
}
