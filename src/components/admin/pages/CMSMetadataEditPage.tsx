import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface Metadata {
  pageSlug: string;
  title: string;
  description: string;
  keywords: string;
}

export default function CMSMetadataEditPage() {
  useRequireAdmin();
  const router = useRouter();
  const { id } = router.query;

  const [meta, setMeta] = useState<Metadata>({
    pageSlug: "",
    title: "",
    description: "",
    keywords: "",
  });

  useEffect(() => {
    if (!id) return;
    const fetchMeta = async () => {
      const res = await fetch(`/api/admin/cms/metadata/${id}`);
      const data = await res.json();
      setMeta(data);
    };
    fetchMeta();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch(`/api/admin/cms/metadata/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meta),
    });
    alert("Metadata updated!");
  };

  return (
    <AdminLayout title={`Edit Metadata #${id}`}>
      <div className="mb-4">
        <label className="block font-medium">Page Slug</label>
        <input
          type="text"
          name="pageSlug"
          value={meta.pageSlug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={meta.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={meta.description}
          onChange={handleChange}
          className="w-full p-2 border rounded h-24"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Keywords</label>
        <input
          type="text"
          name="keywords"
          value={meta.keywords}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Metadata
      </button>
    </AdminLayout>
  );
}
