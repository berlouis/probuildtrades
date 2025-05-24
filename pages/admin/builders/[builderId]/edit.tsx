import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const EditBuilder = () => {
  const router = useRouter();
  const { builderId } = router.query;
  const [builder, setBuilder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuilder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/builders/${builderId}`);
        if (!res.ok) throw new Error("Failed to fetch builder");
        const data = await res.json();
        setBuilder(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (builderId) fetchBuilder();
  }, [builderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/builders/${builderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(builder),
      });
      if (!res.ok) throw new Error("Update failed");
      router.push("/admin/builders");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AdminLayout title="Edit Builder">
      <h1>Edit Builder</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={builder?.name || ""}
            onChange={(e) =>
              setBuilder((prev: any) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <label>License Number:</label>
          <input
            type="text"
            value={builder?.licenseId || ""}
            onChange={(e) =>
              setBuilder((prev: any) => ({
                ...prev,
                licenseId: e.target.value,
              }))
            }
            required
          />
          <button type="submit">Update</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}
    </AdminLayout>
  );
};

export default EditBuilder;
