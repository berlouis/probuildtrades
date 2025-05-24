import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface Builder {
  id: number;
  name: string;
  email: string;
  plan: string;
  licenseId: string;
}

export default function BuilderListPage() {
  useRequireAdmin();
  const [builders, setBuilders] = useState<Builder[]>([]);

  useEffect(() => {
    const fetchBuilders = async () => {
      const res = await fetch("/api/admin/builders");
      const data = await res.json();
      setBuilders(data);
    };
    fetchBuilders();
  }, []);

  return (
    <AdminLayout title="All Builders">
      <h2 className="text-2xl font-semibold mb-4">Builders</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Plan</th>
            <th className="py-2 px-4">License</th>
          </tr>
        </thead>
        <tbody>
          {builders.map((builder) => (
            <tr key={builder.id} className="border-t">
              <td className="py-2 px-4">{builder.name}</td>
              <td className="py-2 px-4">{builder.email}</td>
              <td className="py-2 px-4">{builder.plan}</td>
              <td className="py-2 px-4">{builder.licenseId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
