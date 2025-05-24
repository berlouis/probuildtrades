import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface BuilderDocument {
  id: number;
  builderName: string;
  filename: string;
  status: string;
}

export default function BuilderDocumentsPage() {
  useRequireAdmin();
  const [documents, setDocuments] = useState<BuilderDocument[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await fetch("/api/admin/builders/documents");
      const data = await res.json();
      setDocuments(data);
    };
    fetchDocs();
  }, []);

  return (
    <AdminLayout title="Builder Documents">
      <h2 className="text-2xl font-semibold mb-4">Uploaded Documents</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Builder</th>
            <th className="py-2 px-4">Filename</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-t">
              <td className="py-2 px-4">{doc.builderName}</td>
              <td className="py-2 px-4">{doc.filename}</td>
              <td className="py-2 px-4">{doc.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
