import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";

const BuilderDetailPage = () => {
  const router = useRouter();
  const { builderId } = router.query;
  const [builder, setBuilder] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuilder = async () => {
      try {
        const res = await fetch(`/api/admin/builders/${builderId}`);
        if (!res.ok) throw new Error("Failed to fetch builder");
        const data = await res.json();
        setBuilder(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (builderId) fetchBuilder();
  }, [builderId]);

  return (
    <AdminLayout title="Builder Details">
      <h1 className="text-2xl font-bold mb-4">Builder Details</h1>
      {error && <p className="text-red-500">{error}</p>}
      {builder && (
        <ul>
          <li><strong>Name:</strong> {builder.name}</li>
          <li><strong>License Number:</strong> {builder.licenseId}</li>
        </ul>
      )}
    </AdminLayout>
  );
};

export default BuilderDetailPage;
