import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface FlaggedBuilder {
  id: number;
  name: string;
  email: string;
  issue: string;
}

export default function BuilderFlaggedPage() {
  useRequireAdmin();
  const [flagged, setFlagged] = useState<FlaggedBuilder[]>([]);

  useEffect(() => {
    const fetchFlagged = async () => {
      const res = await fetch("/api/admin/builders/flagged");
      const data = await res.json();
      setFlagged(data);
    };
    fetchFlagged();
  }, []);

  return (
    <AdminLayout title="Flagged Builders">
      <h2 className="text-2xl font-semibold mb-4">Flagged Builder Reports</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Issue</th>
          </tr>
        </thead>
        <tbody>
          {flagged.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="py-2 px-4">{b.name}</td>
              <td className="py-2 px-4">{b.email}</td>
              <td className="py-2 px-4">{b.issue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
