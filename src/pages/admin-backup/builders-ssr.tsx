import { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminBackupBuilders({ builders }: any) {
  return (
    <AdminLayout title="All Builders (Backup)">
      <h1 className="text-xl font-bold mb-4">Builder List</h1>
      <ul className="space-y-2">
        {builders.map((builder: any) => (
          <li key={builder.id}>
            <strong>{builder.name}</strong> – {builder.email}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );




  return {
    props: { builders },
  };

}



export const getServerSideProps: GetServerSideProps = async () => {
  const builders = await prisma.builder.findMany();

  return {
    props: { builders },
  };
};
