import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";

const BuilderDocumentsPage = () => {
  const router = useRouter();
  const { builderId } = router.query;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch(`/api/admin/builders/${builderId}/documents`);
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = await res.json();
        setDocuments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (builderId) fetchDocuments();
  }, [builderId]);

  return (
    <AdminLayout title="Builder Documents">
      <h1>Builder Documents</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {documents.map((doc: any, index: number) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
};

export default BuilderDocumentsPage;
