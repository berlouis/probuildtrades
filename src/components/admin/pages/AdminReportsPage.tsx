import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface Report {
  id: number;
  type: string;
  summary: string;
  createdAt: string;
}

export default function AdminReportsPage() {
  useRequireAdmin();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch("/api/admin/reports");
      const data = await res.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  return (
    <AdminLayout title="Reports">
      <h2 className="text-2xl font-semibold mb-4">System Reports</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Summary</th>
            <th className="py-2 px-4">Created At</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-2 px-4">{r.type}</td>
              <td className="py-2 px-4">{r.summary}</td>
              <td className="py-2 px-4">{r.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
